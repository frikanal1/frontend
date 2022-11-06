import { VideoPlayer } from "src/modules/video/components/VideoPlayer"
import React from "react"
import { Meta } from "src/modules/core/components/Meta"
import { GetVideoDocument, GetVideoQuery } from "../../generated/graphql"
import { VideoPageMetaBar } from "../../modules/video/components/videoPageMetaBar"
import { LatestVideosSidebar } from "../../modules/video/components/latestVideosSidebar"
import { GetServerSideProps } from "next"
import assert from "assert"
import { client } from "../../modules/apollo/client"
import { ModuleHeading } from "../../refactor/ModuleHeading"
import { ParsedUrlQuery } from "querystring"

export interface VideoPageParams extends ParsedUrlQuery {
  videoId: string
}

interface VideoPageProps {
  video: GetVideoQuery["video"]
}

export const VideoPage = ({ video }: VideoPageProps) => (
  <div className={"flex gap-5 flex-col lg:flex-row w-full"}>
    <Meta
      meta={{
        title: video.title,
        description: video.description,
        author: video.organization.name,
      }}
    />
    <div className={"flex flex-col max-w-[1280px] w-full"}>
      <div className="bg-green-800 drop-shadow-2xl text-sm w-full">
        <ModuleHeading
          className={
            "text-white bg-gradient-to-b from-transparent to-gray-800 opacity-90 mix-blend-luminosity p-8 pb-5"
          }
        >
          {video.title}
        </ModuleHeading>
        <VideoPlayer video={video} />
        <VideoPageMetaBar video={video} />
      </div>
    </div>
    <LatestVideosSidebar className={"lg:w-1/3 drop-shadow-lg"} latestVideos={video.organization} />
  </div>
)

export const getServerSideProps: GetServerSideProps<VideoPageProps> = async (ctx) => {
  const { videoId } = ctx.params as VideoPageParams

  assert(videoId)

  const {
    data: { video },
  } = await client.query({ query: GetVideoDocument, variables: { videoId: videoId as string } })

  return { props: { video } }
}

export default VideoPage
