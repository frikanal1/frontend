import { styled } from "@mui/system"
import { format } from "date-fns"
import Link from "next/link"
import React from "react"
import { ProgramFragment } from "../../../generated/graphql"

const Container = styled("div")`
  display: flex;
  align-items: flex-start;

  margin-bottom: 32px;
`

const Time = styled("span")`
  font-size: 1em;
  font-weight: 600;

  color: ${(props) => props.theme.palette.text.secondary};

  margin-top: 1px;
`

const PrimaryInfo = styled("div")`
  display: flex;
  flex-direction: column;

  flex: 1;
  width: 0;

  margin-left: 16px;
`

const Title = styled("div")`
  display: inline;

  font-size: 1.1em;
  font-weight: 700;
`

const Organization = styled("div")`
  font-size: 1.1em;
  font-weight: 400;
`

export type ScheduleTimelineItemProps = {
  entry: ProgramFragment
}

export function ScheduleTimelineItem({ entry }: ScheduleTimelineItemProps) {
  const { video } = entry

  return (
    <Container>
      <Time>{format(new Date(entry.startsAt), "HH:mm")}</Time>
      <PrimaryInfo>
        <Title>
          <Link href={`/video/${video.id}`} passHref>
            <a>{video.title}</a>
          </Link>
        </Title>
        <Organization>
          <Link href={`/organization/${video.organization.id}`} passHref>
            <a>{video.organization.name}</a>
          </Link>
        </Organization>
      </PrimaryInfo>
    </Container>
  )
}
