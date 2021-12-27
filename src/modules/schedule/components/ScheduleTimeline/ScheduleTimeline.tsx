import styled from "@emotion/styled"
import React, { useEffect, useRef, useState } from "react"
import { ScheduleEntry } from "../../types"
import { Lines } from "./Lines"
import { Playhead } from "./Playhead"
import { TimelineItemList } from "./TimelineItemList"

const Container = styled.div`
  height: 100%;

  overflow-y: scroll;

  scrollbar-color: ${(props) => props.theme.color.accent} transparent;
  scrollbar-width: auto;

  border: solid 1px ${(props) => props.theme.color.divider};
  border-radius: 3px;

  box-shadow: 2px 2px 11px 2px rgba(0, 0, 0, 0.1);
`

const Inner = styled.div`
  position: relative;

  margin-top: 32px;
  margin-right: 8px;
  margin-left: 24px;
`

export type ScheduleTimelineProps = {
  entries: ScheduleEntry[]
  /** The height of an hour, specified in pixels */
  zoom: number
}

export function ScheduleTimeline(props: ScheduleTimelineProps) {
  const { entries, zoom } = props

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
  })

  return (
    <Container ref={ref}>
      <Inner style={{ height: `${timelineHeight}px` }}>
        <Playhead height={timelineHeight} />
        <Lines scrollTop={scrollTop} containerHeight={containerHeight} height={timelineHeight} />
        <TimelineItemList
          entries={entries}
          scrollTop={scrollTop}
          containerHeight={containerHeight}
          height={timelineHeight}
        />
      </Inner>
    </Container>
  )
}
