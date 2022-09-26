import { styled } from "@mui/system"
import { RecentVideoItem } from "./RecentVideoItem"
import React from "react"
import { useQuery } from "@apollo/client"
import { GetLatestVideosDocument, Organization } from "../../../generated/graphql"
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
  organization: Pick<Organization, "id" | "name">
}

export const LatestVideosSidebar = ({ organization }: LatestVideosSidebarProps) => {
  const query = useQuery(GetLatestVideosDocument, { variables: { orgId: organization.id } })

  const latestVideos = query?.data?.organization.latestVideos

  return (
    <LatestVideosSidebarDiv>
      <SidebarTitle>Nyeste videoer fra {organization.name}</SidebarTitle>
      {latestVideos && latestVideos.map((x) => <RecentVideoItem key={x.id} videoId={x.id} />)}
    </LatestVideosSidebarDiv>
  )
}
