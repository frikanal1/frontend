import { SearchFunction } from "../../refactor/searchFunction"
import { BasicVideoMetadataFragment, GetVideosDocument, Video } from "../../generated/graphql"
import { useQuery } from "@apollo/client"
import Link from "next/link"
import { addMinutes, format } from "date-fns"
import nb from "date-fns/locale/nb"
import cx from "classnames"

export const formatVideoDuration = (seconds?: number | null): string => {
  if (!seconds) return ""

  const duration = addMinutes(new Date(seconds * 1000), new Date().getTimezoneOffset())
  return format(duration, duration.getHours() ? "H:mm:ss" : "mm:ss")
}

export const VideoThumbnail = ({
  video,
  className,
}: {
  video: Pick<Video, "duration" | "images">
  className?: string
}) => {
  return (
    <div className={cx("relative", className)}>
      <div className={"absolute bg-gray-800/50 leading-4 p-1 right-0 bottom-0 m-1 text-white"}>
        {formatVideoDuration(video.duration)}
      </div>
      <img alt={""} src={video.images.thumbLarge} />
    </div>
  )
}

const VideoCard = ({ video }: { video: BasicVideoMetadataFragment }) => {
  return (
    <Link href={`/video/${video.id}`} className={"snap-start"}>
      <div className={"bg-black/60 rounded-md w-52 h-64"}>
        <VideoThumbnail video={video} />
        <div className={"p-2"}>
          <div className={"font-bold text-white/80"}>{video.title}</div>
          <div className={"font-bold text-white/70"}>{video.organization.name}</div>
          <div className={"text-white/70"}>{format(new Date(video.createdAt), "d MMMM yyyy", { locale: nb })}</div>
        </div>
      </div>
    </Link>
  )
}

const NewestVideos = ({ className }: { className?: string }) => {
  const { data } = useQuery(GetVideosDocument)

  const videos = data?.video.list.items

  return (
    <div className={className + " p-4 h-full bg-gradient-to-bl from-transparent via-black/10 to-black/40 w-full"}>
      <div className={"text-3xl font-bold text-white/95 pb-1"}>Nyeste videoer</div>
      <div className={"flex py-2 gap-4 overflow-x-scroll scroll-smooth snap-x horizontal-list"}>
        {videos?.map((v) => v && <VideoCard key={v.id} video={v} />)}
      </div>
    </div>
  )
}

export const ArchivePage = ({ children }: { children: React.ReactNode }) => (
  <div className={"space-y-4"}>
    <SearchFunction className={"drop-shadow-xl relative z-10"} />
    <div className={"scroll-m-0 gap-8 flex flex-row "}>{children}</div>
  </div>
)

export const ArchiveHome = () => {
  return (
    <ArchivePage>
      <NewestVideos className={"drop-shadow-xl grow bg-orange-700"} />
    </ArchivePage>
  )
}

export default ArchiveHome
