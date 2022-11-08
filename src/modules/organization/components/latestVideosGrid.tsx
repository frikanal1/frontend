import { HorizontalVideoGrid } from "../../video/components/HorizontalVideoGrid"
import React from "react"
import { LatestVideosFragment } from "../../../generated/graphql"

export const LatestVideosGrid = ({ latestVideos }: { latestVideos: LatestVideosFragment["latestVideos"] }) => {
  if (!latestVideos) return null
  return (
    <div>
      <h4 className={"lg:text-2xl font-bold text-green-800 py-1"}>Nyeste videoer</h4>
      <HorizontalVideoGrid videos={latestVideos} />
    </div>
  )
}
