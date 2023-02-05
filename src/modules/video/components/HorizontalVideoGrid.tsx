import { EmptyState } from "src/modules/ui/components/EmptyState"
import { LatestVideosFragment } from "../../../generated/graphql"
import Link from "next/link"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import { VideoThumbnail } from "../../../pages/video"

export type VideoGridProps = {
  videos?: LatestVideosFragment["latestVideos"]
}

export function HorizontalVideoGrid({ videos }: VideoGridProps) {
  if (!videos) return null
  if (!videos.length) return <EmptyState title="Ingen videoer enda" icon="film" />

  return (
    <div className={"flex gap-4 flex-nowrap"}>
      {videos.map(({ id, title, createdAt, images, duration, description }) => (
        <div key={id} className={"w-56 h-64 bg-gradient-to-t from-green-200 to-green-400 rounded-md"}>
          <div className={"flex p-2 h-full flex-col justify-between"}>
            <Link href={`/video/${id}`} passHref>
              <VideoThumbnail video={{ images, duration }} />
              <div className={"pt-2"}>{title}</div>
            </Link>
            <div className={"overflow-hidden text-xs"}>{description}</div>
            <div>lastet opp {format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
