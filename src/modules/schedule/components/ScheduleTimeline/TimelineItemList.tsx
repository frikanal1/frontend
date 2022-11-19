import { useEffect, useState } from "react"
import { getPreciseHours } from "../../helpers/getPreciseHours"
import { TimelineItem } from "./TimelineItem"
import { ProgramFragment } from "../../../../generated/graphql"

const VIRTUALIZATION_PADDING = 64

export type TimelineItemListProps = {
  entries?: ProgramFragment[]
  scrollTop: number
  containerHeight: number
  height: number
}

export type CalculatedEntry = {
  entry: ProgramFragment
  top: number
  bottom: number
}

export function TimelineItemList(props: TimelineItemListProps) {
  const { entries, scrollTop, containerHeight, height } = props

  const [calculated, setCalculated] = useState<CalculatedEntry[] | undefined>()

  useEffect(() => {
    const newlyCalculated = entries?.map((entry) => {
      const start = new Date(entry.start)
      const end = new Date(entry.end)

      const startHour = getPreciseHours(start)
      const endHour = getPreciseHours(end)

      const top = (startHour / 24) * height
      const bottom = (endHour / 24) * height

      return { entry, top, bottom }
    })

    setCalculated(newlyCalculated)
  }, [entries, height])

  return (
    <>
      {calculated?.map((calculation) => {
        const { entry, top, bottom } = calculation
        const height = Math.abs(top - bottom)

        const scrollBottom = scrollTop + containerHeight + VIRTUALIZATION_PADDING
        const isVisible = scrollBottom > top && scrollTop - VIRTUALIZATION_PADDING < bottom

        if (!isVisible) return null

        return <TimelineItem key={entry.start} entry={entry} position={top} height={height} />
      })}
    </>
  )
}
