import styled from "@emotion/styled"
import { format } from "date-fns"
import { useStores } from "modules/state/manager"
import Link from "next/link"
import React from "react"
import { ScheduleEntry } from "../types"

const Container = styled.div`
  display: flex;
  align-items: flex-start;

  margin-bottom: 32px;
`

const Time = styled.span`
  font-size: 1em;
  font-weight: 600;

  color: ${(props) => props.theme.fontColor.subdued};

  margin-top: 1px;
`

const PrimaryInfo = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  width: 0;

  margin-left: 16px;
`

const Title = styled.div`
  display: inline;

  font-size: 1.1em;
  font-weight: 700;
`

const Organization = styled.div`
  font-size: 1.1em;
  font-weight: 400;
`

export type ScheduleTimelineItemProps = {
  entry: ScheduleEntry
}

export function ScheduleTimelineItem(props: ScheduleTimelineItemProps) {
  const { videoStore } = useStores()
  const { entry } = props

  const video = videoStore.getResourceById(entry.video.id)

  return (
    <Container>
      <Time>{format(new Date(entry.startsAt), "HH:mm")}</Time>
      <PrimaryInfo>
        <Title>
          <Link href={`/video/${video.data.id}`} passHref>
            <a>{video.data.title}</a>
          </Link>
        </Title>
        <Organization>
          <Link href={`/organization/${video.organization.data.id}`} passHref>
            <a>{video.organization.data.name}</a>
          </Link>
        </Organization>
      </PrimaryInfo>
    </Container>
  )
}
