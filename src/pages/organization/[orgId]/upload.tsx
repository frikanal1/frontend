import React, { ReactNode, useState } from "react"
import { useQuery } from "@apollo/client"
import { GetOrganizationDocument } from "../../../generated/graphql"
import { RequireUserIsEditor } from "../../../refactor/requireUserIsEditor"
import { VideoCreationUpload } from "../../../refactor/videoCreationUpload"
import { OrganizationPageParams } from "./index"
import { GetServerSideProps } from "next"
import { VideoCreationForm } from "src/refactor/VideoCreationForm"
import { VideoCreationPublish } from "../../../refactor/VideoCreationPublish"
import FileDownloadDoneRoundedIcon from "@mui/icons-material/FileDownloadDoneRounded"

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
    <div className={"flex p-3 flex-col lg:flex-row " + className ?? ""} aria-disabled={disabled}>
      {children}
    </div>
  )

  return (
    <RequireUserIsEditor organization={organization}>
      <div className="">
        <h3 className="text-3xl bg-black font-bold text-white p-8">Ny video for {organization.name}</h3>
        <ColoredBar className={" bg-gradient-to-t from-teal-500 to-teal-400 text-black"}>
          <Step>
            <StepNumber>1.</StepNumber> last opp fil
          </Step>
          <div className={"w-full px-5"}>
            {!mediaId ? (
              <VideoCreationUpload onComplete={setMediaId} />
            ) : (
              <div className={"flex h-full items-center"}>
                <div className={"text-5xl border-black"}>
                  <FileDownloadDoneRoundedIcon sx={{ fontSize: "inherit", marginRight: ".25em" }} />
                  ferdig
                </div>
              </div>
            )}
          </div>
        </ColoredBar>
        <ColoredBar
          disabled={!mediaId}
          className={
            `bg-gradient-to-t from-teal-400 to-teal-300 text-black transition-all delay-500 duration-500 ease-in-out ` +
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
          className={`bg-gradient-to-t from-teal-300 to-teal-200 text-black ${videoId || "grayscale opacity-50"}`}
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

export const getServerSideProps: GetServerSideProps<UploadPageProps> = async (ctx) => {
  const { orgId } = ctx.params as OrganizationPageParams

  return { props: { orgId } }
}

export default UploadPage
