import React, { useEffect, useRef, useState } from "react"
import { Lines } from "./Lines"
import { Playhead } from "./Playhead"
import { TimelineItemList } from "./TimelineItemList"
import { GetScheduleDocument } from "../../../../generated/graphql"
import { useQuery } from "@apollo/client"
import { add } from "date-fns"

export type ScheduleTimelineProps = {
  date: Date
  /** The height of an hour, specified in pixels */
  zoom: number
  className?: string
}

export function ScheduleTimeline({ date, zoom, className }: ScheduleTimelineProps) {
  const { data } = useQuery(GetScheduleDocument, { variables: { filter: { from: date, to: add(date, { days: 1 }) } } })
  const entries = data?.schedule.items

  const ref = useRef<HTMLDivElement>(null)
  const timelineHeight = zoom * 24

  const [containerHeight, setContainerHeight] = useState(1000)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const { current: container } = ref
    if (!container) return

    setContainerHeight(container.offsetHeight)
    const handleScroll = () => {
      setScrollTop(container.scrollTop)
    }

    container.addEventListener("scroll", handleScroll)
    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className={"border-2 border-orange-400 rounded-md overflow-y-auto drop-shadow-xl  " + className} ref={ref}>
      <div className={`  relative mt-8 mr-1 ml-6`}>
        <Playhead height={timelineHeight} />
        <Lines scrollTop={scrollTop} containerHeight={containerHeight} height={timelineHeight} />
        <TimelineItemList
          entries={entries}
          scrollTop={scrollTop - 32}
          containerHeight={containerHeight}
          height={timelineHeight}
        />
      </div>
    </div>
  )
}
