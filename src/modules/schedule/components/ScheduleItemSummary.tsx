import { styled } from "@mui/system"
import Link from "next/link"
import { humanizeScheduleItemDate } from "../helpers/humanizeScheduleItemDate"
import { FrontpageScheduleFragment } from "../../../generated/graphql"

const Container = styled("div")`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 16px;
    border-top: solid 2px ${(props) => props.theme.palette.divider};
    padding-top: 16px;
  }
`

const PrimaryInfo = styled("div")`
  display: flex;
  flex-direction: column;

  flex: 1;
  width: 0;
`

const Title = styled("a")`
  font-size: 1.1em;
  font-weight: 600;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Organization = styled("a")`
  font-size: 1.1em;
  font-weight: 400;

  margin-top: 2px;
`

const Time = styled("span")`
  font-size: 1em;
  font-weight: 600;
  color: ${(props) => props.theme.palette.text.secondary};

  margin-left: 24px;
`

export type ScheduleItemSummary = {
  entry: FrontpageScheduleFragment
}

export function ScheduleItemSummary({ entry }: ScheduleItemSummary) {
  if (!entry) return null

  return (
    <Container>
      <PrimaryInfo>
        <Link href={`/video/${entry.video.id}`} passHref>
          <Title>{entry.video.title}</Title>
        </Link>
        <Link href={`/organization/${entry.video.organization.id}`} passHref>
          <Organization>{entry.video.organization.name}</Organization>
        </Link>
      </PrimaryInfo>
      <Time>{humanizeScheduleItemDate(new Date(entry.startsAt))}</Time>
    </Container>
  )
}
