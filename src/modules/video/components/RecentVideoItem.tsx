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
      <div className={"flex items-between"}>
        <div className={"aspect-video w-32 shrink-0"}>
          <img alt={""} className="border-slate-700 rounded-lg p-1 border-1" src={images.thumbMedium} />
        </div>
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
