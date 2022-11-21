import { RecentVideoItem } from "./RecentVideoItem"
import React from "react"
import { LatestVideosFragment } from "../../../generated/graphql"
import Link from "next/link"

interface LatestVideosSidebarProps {
  className?: string
  latestVideos: LatestVideosFragment
}

const LatestVideosHeading = ({ id, name }: { id: string; name: string }) => (
  <div className={"lg:mx-3 lg:mb-4 p-4 bg-gradient-to-b from-red-700 to-red-900 text-white"}>
    <h3 className={"text-xl lg:text-3xl text-white mix-blend-luminosity opacity-90 font-bold"}>Nyeste videoer</h3>
    <h5 className="text-md lg:text-2xl text-white mix-blend-luminosity opacity-80 font-semibold lg:pb-1 ">
      <span className={"font-semibold text-gray-300"}>fra </span>
      <Link className={"font-bold"} href={`/organization/${id}`} passHref>
        {name}
      </Link>
    </h5>
  </div>
)

export const LatestVideosSidebar = ({
  className,
  latestVideos: { latestVideos, id, name },
}: LatestVideosSidebarProps) => (
  <div className={className}>
    <LatestVideosHeading id={id} name={name} />
    <div className="flex flex-col lg:gap-4 lg:px-3 ">
      {latestVideos?.map((x) => (
        <RecentVideoItem key={x.id} video={x} />
      ))}
    </div>
  </div>
)
