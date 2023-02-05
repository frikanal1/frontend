import { format } from "date-fns"
import { nb } from "date-fns/locale"
import React from "react"
import { Video } from "../../../generated/graphql"
import { useRouter } from "next/router"
import { VideoThumbnail } from "../../../pages/video"

export type RecentVideoItemProps = {
  video: Pick<Video, "id" | "title" | "createdAt" | "images" | "duration">
}

export const RecentVideoItem = ({ video }: RecentVideoItemProps) => {
  const router = useRouter()
  const { id, title, createdAt } = video
  return (
    <div className={"bg-white cursor-pointer "} onClick={() => router.push(`/video/${id}`)}>
      <div className={"flex items-between"}>
        <VideoThumbnail className={"basis-40 flex-none"} video={video} />
        <div className={"pl-2 flex flex-col justify-between max-h-full"}>
          <h3 className={"font-bold text-md text-slate-900 overflow-hidden "}>
            <a>{title}</a>
          </h3>
          <div className={"text-slate-500"}>{format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</div>
        </div>
      </div>
    </div>
  )
}
