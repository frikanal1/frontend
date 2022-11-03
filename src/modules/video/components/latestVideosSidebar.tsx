import { RecentVideoItem } from "./RecentVideoItem"
import React from "react"
import { LatestVideosFragment } from "../../../generated/graphql"

interface LatestVideosSidebarProps {
  className?: string
  latestVideos: LatestVideosFragment
}

export const LatestVideosSidebar = ({ className, latestVideos }: LatestVideosSidebarProps) => (
  <div className={"w-full lg:w-1/3 " + className || ""}>
    <div className="space-y-3 pb-1 lg:px-3 ">
      <div className={"p-3 bg-slate-500 text-white"}>
        <h3 className={"text-xl lg:text-3xl text-slate-200 font-bold"}>Nyeste videoer</h3>
        <h5 className="text-l lg:text-2xl text-slate-300 font-bold lg:pb-1 ">fra {latestVideos.name}</h5>
      </div>
      {latestVideos.latestVideos!.map((x) => (
        <RecentVideoItem key={x.id} video={x} />
      ))}
    </div>
  </div>
)
