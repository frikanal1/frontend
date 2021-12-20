import { VideoData } from "modules/video/types"

export type BaseScheduleEntry = {
  startsAt: string
  endsAt: string
}

export type JukeboxScheduleEntry = BaseScheduleEntry & {
  type: "jukebox"
  video: VideoData
}

export type ScheduleEntry = JukeboxScheduleEntry
