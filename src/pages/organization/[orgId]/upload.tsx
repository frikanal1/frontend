import React, { ReactNode, useState } from "react"
import { useQuery } from "@apollo/client"
import { GetOrganizationDocument } from "../../../generated/graphql"
import { RequireUserIsEditor } from "../../../refactor/requireUserIsEditor"
import { VideoCreationUpload, VideoUploadDone } from "../../../refactor/videoCreationUpload"
import { OrganizationPageParams } from "./index"
import { GetServerSideProps } from "next"
import { VideoCreationForm } from "src/refactor/VideoCreationForm"
import { VideoCreationPublish } from "../../../refactor/VideoCreationPublish"

export interface UploadPageProps {
  orgId: string
}

export const UploadPage = ({ orgId }: UploadPageProps) => {
  const { data } = useQuery(GetOrganizationDocument, { variables: { orgId } })

  const [mediaId, setMediaId] = useState<string>()
  const [videoId, setVideoId] = useState<string>()

  if (!data) return null

  const { organization } = data

  const StepNumber = ({ children }: { children: string }) => (
    <span className={"text-lg lg:text-5xl font-bold lg:font-black lg:block"}>{children}</span>
  )

  const Step = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
    <div className={"lg:w-1/3 text-lg lg:text-2xl p-2 lg:p-5 font-bold " + className}>{children}</div>
  )

  const ColoredBar = ({
    children,
    className = "",
    disabled = false,
  }: {
    children: ReactNode
    className?: string
    disabled?: boolean
  }) => (
    <div className={"flex p-3 pr-0 flex-col lg:flex-row " + className ?? ""} aria-disabled={disabled}>
      {children}
    </div>
  )

  return (
    <RequireUserIsEditor organization={organization}>
      <div className="">
        <h3 className="text-3xl bg-black font-bold text-white p-8">Ny video for {organization.name}</h3>
        <ColoredBar className={" bg-gradient-to-t from-green-500 to-green-400 text-black"}>
          <Step>
            <StepNumber>1.</StepNumber> last opp fil
          </Step>
          <div className={"w-full px-5"}>
            {!mediaId ? <VideoCreationUpload onComplete={setMediaId} /> : <VideoUploadDone />}
          </div>
        </ColoredBar>
        <ColoredBar
          disabled={!mediaId}
          className={
            `bg-gradient-to-t from-green-400 to-green-300 text-black transition-all delay-500 duration-500 ease-in-out ` +
            ` aria-disabled:opacity-50 aria-disabled:grayscale`
          }
        >
          <Step>
            <StepNumber>2.</StepNumber> oppgi metadata
          </Step>
          <div className={`w-full px-5`}>
            {mediaId && <VideoCreationForm mediaId={mediaId} organizationId={organization.id} onCreated={setVideoId} />}
          </div>
        </ColoredBar>
        <ColoredBar
          className={`bg-gradient-to-t from-green-300 to-green-200 text-black ${videoId || "grayscale opacity-50"}`}
        >
          <Step>
            <StepNumber>3.</StepNumber> publisér!
          </Step>
          {videoId && (
            <div className={"flex p-5 w-full min-h-full"}>
              <VideoCreationPublish videoId={videoId} />
            </div>
          )}
        </ColoredBar>
      </div>
    </RequireUserIsEditor>
  )
}

export const getServerSideProps: GetServerSideProps<UploadPageProps> = async ({ params }) => {
  const { orgId } = params as OrganizationPageParams

  return { props: { orgId } }
}

export default UploadPage
