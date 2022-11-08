import { EmptyState } from "src/modules/ui/components/EmptyState"
import { LatestVideosFragment } from "../../../generated/graphql"
import Link from "next/link"
import { format } from "date-fns"
import { nb } from "date-fns/locale"

export type VideoGridProps = {
  videos?: LatestVideosFragment["latestVideos"]
}

export function HorizontalVideoGrid({ videos }: VideoGridProps) {
  if (!videos) return null
  if (!videos.length) return <EmptyState title="Ingen videoer enda" icon="film" />

  return (
    <div className={"flex gap-4 flex-nowrap"}>
      {videos.map(({ id, title, createdAt, images }) => (
        <div key={id} className={"max-w-[250px] h-[300px] bg-gradient-to-b from-green-100 to-green-200 rounded-md"}>
          <div className={"flex h-full flex-col justify-between"}>
            <Link href={`/video/${id}`} passHref>
              <a>
                <img className="aspect-video block" alt={"thumbnail"} src={images.thumbLarge} />
                <div className={"p-2"}>{title}</div>
              </a>
            </Link>
            <div className={"p-2"}>lastet opp {format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
