import { styled } from "@mui/system"
import Link from "next/link"
import { FrontpageScheduleFragment } from "../../../generated/graphql"

const Container = styled("div")``

const Title = styled("h2")`
  font-size: 1.5em;
  margin-bottom: 2px;
`

const Organization = styled("h3")`
  font-size: 1.1em;
  font-weight: 400;

  margin-bottom: 12px;
`

const Description = styled("p")`
  white-space: pre-wrap;
  word-break: break-word;
`

export type ScheduleItemBlurbProps = {
  entry: FrontpageScheduleFragment
  className?: string
}

export function ScheduleItemBlurb(props: ScheduleItemBlurbProps) {
  const { entry, className } = props
  const { video } = entry

  return (
    <Container className={className}>
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
      <Description>{video.description}</Description>
    </Container>
  )
}
