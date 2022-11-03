import React, { useCallback, useState } from "react"
import { useQuery } from "@apollo/client"
import { GetOrganizationDocument, Maybe } from "../../../generated/graphql"
import { useCookie } from "react-use"
import * as Progress from "@radix-ui/react-progress"

import { useTus } from "use-tus"
// Polyfills for useTus - else it throws "ReferenceError: regeneratorRuntime is not defined"
import "core-js/stable"
import "regenerator-runtime/runtime"
import { GetServerSideProps } from "next/types"
import getConfig from "next/config"
import { OrganizationPageParams } from "./index"
import { RequireUserIsEditor } from "../../../refactor/requireUserIsEditor"
import { UploadFileSelector } from "../../../refactor/uploadFileSelector"

interface UploadPageProps {
  orgId: string
}

const { publicRuntimeConfig } = getConfig()

const UploadProgressBar = ({ progress }: { progress: number }) => (
  <div>
    <Progress.Root
      max={100}
      value={progress}
      className={"border-black bg-red w-full h-9 relative overflow-hidden"}
      style={{ borderRadius: "99999px" }}
    >
      <Progress.Indicator
        className={"border-red-100 border-2 w-full h-9 bg-red-100"}
        style={{
          transform: `translateX(-${100 - progress}%)`,
          transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />
    </Progress.Root>
  </div>
)

export const UploadPage = ({ orgId }: UploadPageProps) => {
  const { data } = useQuery(GetOrganizationDocument, { variables: { orgId } })
  const { upload, setUpload } = useTus({ autoStart: true })
  const [csrfToken] = useCookie("fk-csrf")
  // const [mediaId, setMediaId] = useState()
  const [jobId, setJobId] = useState()
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const handleSetUpload = useCallback(
    (file?: Maybe<File>) => {
      if (!file) return

      setUpload(file, {
        endpoint: publicRuntimeConfig.FK_API + "/upload/video",
        onBeforeRequest: (req) => {
          if (!csrfToken) throw new Error("Cannot upload without CSRF token!")
          const xhr = req.getUnderlyingObject() as XMLHttpRequest
          xhr.withCredentials = true
          xhr.setRequestHeader("X-CSRF-Token", csrfToken)
        },
        onProgress: (bytesSent, bytesTotal) => {
          setUploadProgress((bytesSent / bytesTotal) * 100)
        },
        chunkSize: 2 ** 23, // or Node throws a server-side exception of some sort
        onAfterResponse: (req: any) => {
          const xhr = req.getUnderlyingObject() as XMLHttpRequest
          // Kludge to get an onSuccess which also reads mediaId/jobId
          // The last PATCH will return 200, others return 204 No Content
          if (req._method === "PATCH" && xhr.status === 200) {
            const { jobId } = JSON.parse(xhr.responseText)
            // setMediaId(mediaId)
            setJobId(jobId)
          }
        },
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
      })
    },
    [setUpload, csrfToken]
  )

  if (!csrfToken || !data) return null

  const { organization } = data

  return (
    <RequireUserIsEditor organization={organization}>
      <div className="w-full">
        <h3 className="text-3xl bg-black text-white p-8">Ny video for {organization.name}</h3>
        <div className={"bg-amber-900 flex text-white p-3"}>
          <div className={"w-1/5 text-2xl p-5"}>
            <div className={"text-5xl"}>1.</div> last opp fil
          </div>
          <div className={"grow"}>
            <div>
              <UploadFileSelector handleStart={handleSetUpload} />
              {upload && !jobId && <UploadProgressBar progress={uploadProgress} />}
            </div>
          </div>
        </div>
        <div className={"bg-amber-500 text-black flex p-3"}>
          <div className={"w-1/5 text-2xl p-5"}>
            <div className={"text-5xl"}>2.</div> oppgi metadata
          </div>
          <div className={"grow"}>{jobId && jobId}</div>
        </div>
        <div className={"bg-amber-300 text-black flex p-3"}>
          <div className={"w-1/5 text-2xl p-5"}>
            <div className={"text-5xl"}>3.</div> publisér!
          </div>
          <div className={"grow"}>Checkbox her, jeg bekrefter det juridiske, bla bla</div>
        </div>
      </div>
    </RequireUserIsEditor>
  )
}

export const getServerSideProps: GetServerSideProps<UploadPageProps> = async (ctx) => {
  const { orgId } = ctx.params as OrganizationPageParams

  return { props: { orgId } }
}

export default UploadPage
