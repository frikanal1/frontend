import { styled } from "@mui/system"
import { VideoPlayer } from "src/modules/video/components/VideoPlayer"
import React from "react"
import { Meta } from "src/modules/core/components/Meta"
import { GetServerSideProps, NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import { GetVideoDocument } from "../../generated/graphql"
import { useQuery } from "@apollo/client"
import { VideoPageMetaBar } from "../../modules/video/components/videoPageMetaBar"
import { LatestVideosSidebar } from "../../modules/video/components/latestVideosSidebar"
import { VideoPageBreakpoint } from "../../modules/video/constants"

const Container = styled("div")`
  display: flex;

  @media (max-width: ${VideoPageBreakpoint}px) {
    flex-direction: column;
  }
`

const Content = styled("div")`
  flex: 1;
`

export type VideoPageProps = {
  videoId: string
}

interface VideoPageParams extends ParsedUrlQuery {
  videoId: string
}

export const VideoPage: NextPage<VideoPageProps> = ({ videoId }) => {
  const query = useQuery(GetVideoDocument, { variables: { videoId } })

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

export const getServerSideProps: GetServerSideProps<VideoPageProps> = async (ctx) => {
  const { videoId } = ctx.params as VideoPageParams

  if (!videoId) console.error(`no videoId arrived for video page getstaticprops!`)

  return { props: { videoId } }
}

export default VideoPage
