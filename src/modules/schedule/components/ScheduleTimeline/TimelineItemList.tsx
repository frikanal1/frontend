import { getPreciseHours } from "../../helpers/getPreciseHours"
import { ScheduleEntry } from "../../types"
import { TimelineItem } from "./TimelineItem"

const VIRTUALIZATION_PADDING = 64

export type TimelineItemListProps = {
  entries: ScheduleEntry[]
  scrollTop: number
  containerHeight: number
  height: number
}

export function TimelineItemList(props: TimelineItemListProps) {
  const { entries, scrollTop, containerHeight, height } = props

  return (
    <>
      {entries.map((entry) => {
        const startsAt = new Date(entry.startsAt)
        const endsAt = new Date(entry.endsAt)

        const startHour = getPreciseHours(startsAt)
        const endHour = getPreciseHours(endsAt)

        const length = Math.abs(startHour - endHour)

        const position = (startHour / 24) * height
        const entryHeight = (length / 24) * height

        const isBelowTop = position + VIRTUALIZATION_PADDING > scrollTop
        const isAboveBottom = position + entryHeight - VIRTUALIZATION_PADDING < scrollTop + containerHeight

        if (!isBelowTop || !isAboveBottom) return null

        return <TimelineItem key={entry.startsAt} entry={entry} position={position} height={entryHeight} />
      })}
    </>
  )
}
