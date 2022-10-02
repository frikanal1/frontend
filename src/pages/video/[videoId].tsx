import { styled } from "@mui/system"
import { VideoPlayer } from "src/modules/video/components/VideoPlayer"
import React from "react"
import { Meta } from "src/modules/core/components/Meta"
import { GetVideoDocument } from "../../generated/graphql"
import { useQuery } from "@apollo/client"
import { VideoPageMetaBar } from "../../modules/video/components/videoPageMetaBar"
import { LatestVideosSidebar } from "../../modules/video/components/latestVideosSidebar"
import { VideoPageBreakpoint } from "../../modules/video/constants"
import { useRouter } from "next/router"

const Container = styled("div")`
  display: flex;
  width: 100%;

  @media (max-width: ${VideoPageBreakpoint}px) {
    flex-direction: column;
  }
`

const Content = styled("div")`
  flex: 1;
`

export const VideoPage = () => {
  const { videoId } = useRouter().query

  const query = useQuery(GetVideoDocument, { variables: { videoId: videoId as string } })

  const { video } = query.data || {}

  if (!video) return null

  return (
    <Container>
      <Meta
        meta={{
          title: video.title,
          description: video.description,
          author: video.organization.name,
        }}
      />
      <Content>
        <VideoPlayer video={video} width={1280} height={720} />
        <VideoPageMetaBar {...video} />
      </Content>
      <LatestVideosSidebar organization={video.organization} />
    </Container>
  )
}

export default VideoPage
