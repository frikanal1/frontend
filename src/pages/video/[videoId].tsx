import { VideoPlayer } from "src/modules/video/components/VideoPlayer"
import React from "react"
import { Meta } from "src/modules/core/components/Meta"
import { GetVideoDocument, GetVideoQuery } from "../../generated/graphql"
import { VideoPageMetaBar } from "../../modules/video/components/videoPageMetaBar"
import { LatestVideosSidebar } from "../../modules/video/components/latestVideosSidebar"
import { GetServerSideProps } from "next"
import assert from "assert"
import { client } from "../../modules/apollo/client"
import { ParsedUrlQuery } from "querystring"

export interface VideoPageParams extends ParsedUrlQuery {
  videoId: string
}

interface VideoPageProps {
  video: GetVideoQuery["video"]["get"]
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
    <div className={"bg-green-800 drop-shadow-2xl h-fit"}>
      <VideoPlayer video={video} />
      <VideoPageMetaBar video={video} />
    </div>
    <LatestVideosSidebar className={"lg:w-1/3 drop-shadow-md"} latestVideos={video.organization} />
  </div>
)

export const getServerSideProps: GetServerSideProps<VideoPageProps> = async (ctx) => {
  const { videoId } = ctx.params as VideoPageParams

  assert(videoId)

  const {
    data: {
      video: { get },
    },
  } = await client.query({ query: GetVideoDocument, variables: { videoId: videoId as string } })

  return { props: { video: get } }
}

export default VideoPage
