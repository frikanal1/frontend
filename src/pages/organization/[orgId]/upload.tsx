import React, { useCallback, useContext, useState } from "react"
import { useQuery } from "@apollo/client"
import { GetOrganizationDocument, Maybe, OrganizationDataFragment } from "../../../generated/graphql"
import UserContext from "../../../refactor/UserContext"
import { useCookie } from "react-use"
import * as Progress from "@radix-ui/react-progress"

import { useTus } from "use-tus"
// Polyfills for useTus - else it throws "ReferenceError: regeneratorRuntime is not defined"
import "core-js/stable"
import "regenerator-runtime/runtime"
import { GetServerSideProps } from "next/types"
import getConfig from "next/config"
import { Button } from "../../../modules/ui/components/Button"

export interface RequireUserIsEditorOfProps {
  // The organization against which we check the
  organization: OrganizationDataFragment
  children: React.ReactNode
}

// Returns its children elements if the user is the editor of the organization.
// If user is not, show an error message.
export const RequireUserIsEditorOf: React.FC<RequireUserIsEditorOfProps> = ({ organization, children }) => {
  const { session } = useContext(UserContext)

  if (organization?.editor?.id !== session?.user?.id)
    return <div>Kun redaktøren for denne organisasjonen har adgang til å publisere videoer.</div>
  else return <>{children}</>
}

interface UploadPageProps {
  orgId: string
}

const { publicRuntimeConfig } = getConfig()

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-gray-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

const FileSelector = ({ handleStart }: { handleStart: (file: File) => void }) => {
  const [file, setFile] = useState<Maybe<File>>()

  return (
    <>
      <div className="max-w-xl p-2">
        <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <span className="flex items-center space-x-2">
            <UploadIcon />
            <span className="font-medium text-gray-600">
              Drop files to Attach, or <span className="text-blue-600 underline">browse</span>
            </span>
          </span>
          <input
            type="file"
            name="file_upload"
            className="hidden"
            onChange={(event) => {
              console.log(event)
              setFile(event.target.files?.item(0))
            }}
          />
        </label>
      </div>
      {file?.name}
      <Button className="" onClick={() => file && handleStart(file)}>
        Upload
      </Button>
    </>
  )
}

const UploadProgressBar = ({ progress }: { progress: number }) => (
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
          console.log("progress", bytesSent / bytesTotal)
          setUploadProgress((bytesSent / bytesTotal) * 100)
        },
        chunkSize: 2 ** 23,
        onAfterResponse: (req: any) => {
          const xhr = req.getUnderlyingObject() as XMLHttpRequest
          // Kludge to get an onSuccess which also reads mediaId/jobId
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
    <RequireUserIsEditorOf organization={organization}>
      <div className="max-w">
        <h3 className="text-xl">Last opp video for {organization.name}</h3>
        {!upload && <FileSelector handleStart={handleSetUpload} />}
        {upload && !jobId && <UploadProgressBar progress={uploadProgress} />}
        {jobId && jobId}
      </div>
    </RequireUserIsEditorOf>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const orgId = params?.orgId?.toString()

  return { props: { orgId } }
}

export default UploadPage
