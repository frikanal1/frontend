import styled from "@emotion/styled"
import { useStores } from "modules/state/manager"
import Link from "next/link"
import { ScheduleEntry } from "../types"

const Container = styled.div``

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 2px;
`

const Organization = styled.h3`
  font-size: 1.1em;
  font-weight: 400;

  margin-bottom: 12px;
`

const Description = styled.p`
  white-space: pre-wrap;
  word-break: break-word;
`

export type ScheduleItemBlurbProps = {
  entry: ScheduleEntry
  className?: string
}

export function ScheduleItemBlurb(props: ScheduleItemBlurbProps) {
  const { videoStore } = useStores()
  const { entry, className } = props

  const video = videoStore.getResourceById(entry.video.id)

  return (
    <Container className={className}>
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
      <Description>{video.data.description}</Description>
    </Container>
  )
}
