import { format } from "date-fns"
import { nb } from "date-fns/locale"
import React from "react"
import { Video } from "../../../generated/graphql"
import { useRouter } from "next/router"

export type RecentVideoItemProps = {
  video: Pick<Video, "id" | "title" | "createdAt" | "images">
}

export const RecentVideoItem = ({ video: { id, title, createdAt, images } }: RecentVideoItemProps) => {
  const router = useRouter()
  return (
    <div className={"bg-white cursor-pointer "} onClick={() => router.push(`/video/${id}`)}>
      <h3 className={"font-bold text-lg text-slate-900"}>
        <a>{title}</a>
      </h3>
      <div className={"flex"}>
        <div className={"aspect-video"}>
          <img alt={"thumbnail"} className="w-40 rounded-lg border-slate-700 border-1" src={images.thumbMedium} />
        </div>
        <div className={"pl-2"}>
          <div className={"text-slate-500"}>{format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</div>
        </div>
      </div>
    </div>
  )
}
