import { styled } from "@mui/system"
import { VideoPlayer } from "src/modules/video/components/VideoPlayer"
import React from "react"
import { Meta } from "src/modules/core/components/Meta"
import { GetVideoDocument, Video } from "../../generated/graphql"
import { VideoPageMetaBar } from "../../modules/video/components/videoPageMetaBar"
import { LatestVideosSidebar } from "../../modules/video/components/latestVideosSidebar"
import { VideoPageBreakpoint } from "../../modules/video/constants"
import { GetServerSideProps } from "next"
import assert from "assert"
import { client } from "../../modules/apollo/client"

const Container = styled("div")`
  display: flex;
  width: 100%;

  @media (max-width: ${VideoPageBreakpoint}px) {
    flex-direction: column;
  }
`

const VStack = styled("div")`
  flex: 1;
`

interface VideoPageProps {
  video: Video
}

export const VideoPage = ({ video }: VideoPageProps) => (
  <Container>
    <Meta
      meta={{
        title: video.title,
        description: video.description,
        author: video.organization.name,
      }}
    />
    <VStack>
      <VideoPlayer video={video} width={1280} height={720} />
      <VideoPageMetaBar {...video} />
    </VStack>
    <LatestVideosSidebar latestVideos={video.organization} />
  </Container>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = context.params?.videoId

  assert(videoId)

  const { data } = await client.query({ query: GetVideoDocument, variables: { videoId: videoId as string } })
  return { props: { video: data.video } }
}

export default VideoPage
