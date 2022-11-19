import { ProgramFragment } from "../../../../generated/graphql"

export type TimelineItemProps = {
  entry: ProgramFragment
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

    return <h3>{title}</h3>
  }

  return (
    <div className={"absolute left-14 right-0 p-4 rounded-md bg-[#0058ff7d] z-30"} style={style}>
      {renderTitle()}
    </div>
  )
}
