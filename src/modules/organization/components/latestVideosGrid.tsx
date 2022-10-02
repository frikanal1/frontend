import { styled } from "@mui/system"
import { useQuery } from "@apollo/client"
import { GetLatestVideosDocument } from "../../../generated/graphql"
import { VideoGrid } from "../../video/components/VideoGrid"
import React from "react"

const Content = styled("div")``

export const LatestVideosGrid = ({ organizationId }: { organizationId: string }) => {
  const query = useQuery(GetLatestVideosDocument, { variables: { orgId: organizationId } })
  const videos = query.data?.organization.latestVideos
  if (!videos) return null

  return (
    <Content>
      <h4>Nyeste videoer</h4>
      <VideoGrid videos={videos} />
    </Content>
  )
}
