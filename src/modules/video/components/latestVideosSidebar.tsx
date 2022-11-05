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
    <div className="space-y-5 pb-1 lg:px-3 ">
      <div className={"p-6 bg-gradient-to-b from-slate-500 to-slate-600 text-white "}>
        <h3 className={"text-xl lg:text-3xl text-slate-100 font-bold"}>Nyeste videoer</h3>
        <h5 className="text-l lg:text-2xl text-slate-200 font-semibold lg:pb-1 ">
          fra{" "}
          <span className={"font-bold"}>
            <Link href={`/organization/${latestVideos.id}`} passHref>
              <a>{latestVideos.name}</a>
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
