import { styled } from "@mui/system"
import { RecentVideoItem } from "./RecentVideoItem"
import React from "react"
import { LatestVideosFragment } from "../../../generated/graphql"
import { VideoPageBreakpoint } from "../constants"

const SidebarTitle = styled("h5")`
  font-size: 1.2em;
  font-weight: 500;

  margin-bottom: 16px;
`

export const LatestVideosSidebarDiv = styled("div")`
  width: 380px;
  margin-left: 32px;

  @media (max-width: ${VideoPageBreakpoint}px) {
    width: 100%;

    margin-left: 0px;
    margin-top: 32px;
  }
`

interface LatestVideosSidebarProps {
  latestVideos: LatestVideosFragment
}

export const LatestVideosSidebar = ({ latestVideos }: LatestVideosSidebarProps) => (
  <LatestVideosSidebarDiv>
    <SidebarTitle>Nyeste videoer fra {latestVideos.name}</SidebarTitle>
    {latestVideos.latestVideos!.map((x) => (
      <RecentVideoItem key={x.id} videoId={x.id} />
    ))}
  </LatestVideosSidebarDiv>
)
