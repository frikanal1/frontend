import { styled } from "@mui/system"
import Link from "next/link"
import { FrontpageScheduleFragment } from "../../../generated/graphql"

const Container = styled("div")`
  margin: 1em 0;
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
      <h4>
        <Link href={`/video/${video.id}`} passHref>
          <a>{video.title}</a>
        </Link>
      </h4>
      <h5>
        <Link href={`/organization/${video.organization.id}`} passHref>
          <a>{video.organization.name}</a>
        </Link>
      </h5>
      <Description>{video.description}</Description>
    </Container>
  )
}
