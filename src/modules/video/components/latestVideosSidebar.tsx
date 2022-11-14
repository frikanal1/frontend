import { RecentVideoItem } from "./RecentVideoItem"
import React from "react"
import { LatestVideosFragment } from "../../../generated/graphql"
import Link from "next/link"

interface LatestVideosSidebarProps {
  className?: string
  latestVideos: LatestVideosFragment
}

export const LatestVideosSidebar = ({ className, latestVideos }: LatestVideosSidebarProps) => (
  <div className={"w-full lg:w-1/3 " + className || ""}>
    <div className="space-y-5 lg:px-3 ">
      <div className={"p-4 bg-gradient-to-b from-red-700 to-red-900 text-white "}>
        <h3 className={"text-xl lg:text-3xl text-white mix-blend-luminosity opacity-90 font-bold"}>Nyeste videoer</h3>
        <h5 className="text-l lg:text-2xl text-white mix-blend-luminosity opacity-80 font-semibold lg:pb-1 ">
          <span className={"font-semibold text-gray-300"}>fra </span>
          <span className={"font-bold"}>
            <Link href={`/organization/${latestVideos.id}`} passHref>
              {latestVideos.name}
            </Link>
          </span>
        </h5>
      </div>
      {latestVideos.latestVideos!.map((x) => (
        <RecentVideoItem key={x.id} video={x} />
      ))}
    </div>
  </div>
)
