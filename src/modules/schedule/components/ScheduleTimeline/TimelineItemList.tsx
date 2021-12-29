import { useEffect, useState } from "react"
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

export type CalculatedEntry = {
  entry: ScheduleEntry
  top: number
  bottom: number
}

export function TimelineItemList(props: TimelineItemListProps) {
  const { entries, scrollTop, containerHeight, height } = props

  const [calculated, setCalculated] = useState<CalculatedEntry[]>([])

  useEffect(() => {
    const newlyCalculated = entries.map((entry) => {
      const startsAt = new Date(entry.startsAt)
      const endsAt = new Date(entry.endsAt)

      const startHour = getPreciseHours(startsAt)
      const endHour = getPreciseHours(endsAt)

      const top = (startHour / 24) * height
      const bottom = (endHour / 24) * height

      return { entry, top, bottom }
    })

    setCalculated(newlyCalculated)
  }, [entries, height])

  return (
    <>
      {calculated.map((calculation) => {
        const { entry, top, bottom } = calculation
        const height = Math.abs(top - bottom)

        const scrollBottom = scrollTop + containerHeight + VIRTUALIZATION_PADDING
        const isVisible = scrollBottom > top && scrollTop - VIRTUALIZATION_PADDING < bottom

        if (!isVisible) return null

        return <TimelineItem key={entry.startsAt} entry={entry} position={top} height={height} />
      })}
    </>
  )
}
