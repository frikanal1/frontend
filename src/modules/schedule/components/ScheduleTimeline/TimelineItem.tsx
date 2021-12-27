import styled from "@emotion/styled"
import { ScheduleEntry } from "../../types"

const Container = styled.div`
  min-height: 16px;

  padding: 0px 16px;

  background: #0058ff7d;
  border: solid 1px rgba(0, 0, 0, 0.1);

  position: absolute;
  left: 52px;
  right: 0px;

  z-index: 3;

  border-radius: 3px;
`

const Title = styled.h3`
  margin-top: 16px;
  font-size: 0.9em;
`

export type TimelineItemProps = {
  entry: ScheduleEntry
  position: number
  height: number
}

export function TimelineItem(props: TimelineItemProps) {
  const { entry, position, height } = props
  const { title } = entry.video

  const style: React.CSSProperties = {
    top: `${position}px`,
    height: `${height}px`,
  }

  const renderTitle = () => {
    if (height < 48) return null

    return <Title>{title}</Title>
  }

  return <Container style={style}>{renderTitle()}</Container>
}
