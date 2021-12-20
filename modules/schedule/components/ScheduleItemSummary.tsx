import styled from "@emotion/styled"
import { useStores } from "modules/state/manager"
import Link from "next/link"
import { humanizeScheduleItemDate } from "../helpers/humanizeScheduleItemDate"
import { ScheduleEntry } from "../types"

const Container = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 16px;
    border-top: solid 2px ${(props) => props.theme.color.divider};
    padding-top: 16px;
  }
`

const PrimaryInfo = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  width: 0;
`

const Title = styled.a`
  font-size: 1.1em;
  font-weight: 600;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Organization = styled.a`
  font-size: 1.1em;
  font-weight: 400;

  margin-top: 2px;
`

const Time = styled.span`
  font-size: 1em;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor.muted};

  margin-left: 24px;
`

export type ScheduleItemSummary = {
  entry: ScheduleEntry
}

export function ScheduleItemSummary(props: ScheduleItemSummary) {
  const { videoStore } = useStores()
  const { entry } = props

  const video = videoStore.getResourceById(entry.video.id)

  return (
    <Container>
      <PrimaryInfo>
        <Link href={`/video/${video.data.id}`} passHref>
          <Title>{video.data.title}</Title>
        </Link>
        <Link href={`/organization/${video.organization.data.id}`} passHref>
          <Organization>{video.organization.data.name}</Organization>
        </Link>
      </PrimaryInfo>
      <Time>{humanizeScheduleItemDate(new Date(entry.startsAt))}</Time>
    </Container>
  )
}
