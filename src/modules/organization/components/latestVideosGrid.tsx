import { styled } from "@mui/system"
import { VideoGrid } from "../../video/components/VideoGrid"
import React from "react"
import { LatestVideosFragment } from "../../../generated/graphql"

const Content = styled("div")``

export const LatestVideosGrid = ({ latestVideos }: { latestVideos: LatestVideosFragment["latestVideos"] }) => {
  if (!latestVideos) return null
  return (
    <Content>
      <h4>Nyeste videoer</h4>
      <VideoGrid videos={latestVideos} />
    </Content>
  )
}
