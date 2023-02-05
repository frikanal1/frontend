import React, { useState } from "react"
import { UserPageLayout } from "../../refactor/user/UserPageLayout"
import { ProgramFragment, VideoSearchDocument, VideoSearchResultFragment } from "../../generated/graphql"
import cx from "classnames"
import { format } from "date-fns"
import { useSchedule } from "../../modules/schedule/components/useSchedule"
import { useDebounce } from "usehooks-ts"
import { useQuery } from "@apollo/client"
import { TextField } from "@mui/material"

const ScheduleView = ({ schedule, className }: { schedule?: ProgramFragment[]; className?: string }) => (
  <div className={cx("font-mono border-2 border-black rounded-lg", className)}>
    <h3 className={"text-center p-2 text-lg font-bold bg-black text-white"}>Sendeplan</h3>
    <div className={"p-2"}>
      {schedule?.map(({ id, start, end, video: { title } }) => (
        <div key={id} className={"border-2"}>
          <span>{format(new Date(start), "HH:mm:ss")}</span>-<span>{format(new Date(end), "HH:mm:ss")}</span>{" "}
          <span>{title}</span>
        </div>
      ))}
    </div>
  </div>
)

const ScheduleVideoSearch = ({
  onSelect,
  className,
}: {
  onSelect: (result: VideoSearchResultFragment) => void
  className?: string
}) => {
  const [query, setQuery] = useState("")
  const { data } = useQuery(VideoSearchDocument, { variables: { query: useDebounce(query) } })

  return (
    <div className={cx("font-mono border-2 border-black rounded-lg", className)}>
      <h3 className={"text-center p-2 text-lg font-bold bg-black text-white"}>Søk</h3>
      <div className={"p-2"}>
        <TextField fullWidth onChange={(e) => setQuery(e.target.value)}></TextField>
        {data?.video?.search?.items.map((video) => {
          return (
            <div className={"border-2 m-1 p-2"} key={video.id} onClick={() => onSelect(video)}>
              {video.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ScheduleActionPanel = ({
  className,
  selectedVideo,
}: {
  className?: string
  selectedVideo?: VideoSearchResultFragment
}) => {
  return (
    <div className={cx("border-2 border-black rounded-lg", className)}>
      <h3 className={"font-mono text-center p-2 text-lg font-bold bg-black text-white"}>Handlinger</h3>
      {selectedVideo ? (
        <div>
          <img alt={"Thumbnail"} src={selectedVideo.images.thumbMedium} />
          <div className={"border-b-2 border-b-black mb-2"}>{selectedVideo.title}</div>
          <div></div>
        </div>
      ) : (
        <div className={"rounded-b-lg p-2 text-gray-700 text-center italic bg-gray-300"}>
          Velg en video med søkepanelet under
        </div>
      )}
    </div>
  )
}

const Schedule = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoSearchResultFragment>()
  const { schedule } = useSchedule()
  return (
    <UserPageLayout>
      <div className={"bg-white p-4"}>
        <h2 className={"text-2xl"}>Sendeplan prototype</h2>
        <p className={"pb-4"}>Dette er kun en prototype. Vi beklager et litt vel utilitært brukergrensesnitt.</p>
        <div className={"flex gap-4 w-full"}>
          <ScheduleView className={"grow"} schedule={schedule} />
          <div className={"basis-1/3 space-y-4"}>
            <ScheduleActionPanel selectedVideo={selectedVideo} />
            <ScheduleVideoSearch onSelect={setSelectedVideo} />
            &nbsp;
          </div>
        </div>
      </div>
    </UserPageLayout>
  )
}

export default Schedule
