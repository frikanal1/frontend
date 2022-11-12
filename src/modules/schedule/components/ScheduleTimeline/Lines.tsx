import { styled } from "@mui/system"
import { format, setMinutes, startOfToday } from "date-fns"

const VIRTUALIZATION_PADDING = 64

const Line = styled("div")<{ strength: number }>`
  display: flex;
  align-items: center;
  position: absolute;

  height: 1px;
  left: 0px;
  right: 0px;

  font-size: 0.9em;
  color: green;

  &:after {
    display: block;
    content: "";

    width: 100%;
    height: 1px;
    margin-left: 16px;

    background: orange;
    opacity: ${(props) => props.strength};
  }
`

export type LinesProps = {
  scrollTop: number
  containerHeight: number
  height: number
}

export function Lines(props: LinesProps) {
  const { height, containerHeight, scrollTop } = props

  const minutesInADay = 24 * 60
  const lines = new Array(minutesInADay).fill(undefined)

  return (
    <>
      {lines.map((_, index) => {
        const y = height * (index / minutesInADay)

        const isBelowTop = y + VIRTUALIZATION_PADDING > scrollTop
        const isAboveBottom = y - VIRTUALIZATION_PADDING < scrollTop + containerHeight

        if (!isBelowTop || !isAboveBottom) return null

        const tenth = index % 5 === 0
        const hour = index % 60 === 0

        if (!tenth && !hour) return null

        const style: React.CSSProperties = {
          top: `${y}px`,
        }

        return (
          <Line key={index} style={style} strength={1}>
            {format(setMinutes(startOfToday(), index), "HH:mm")}
          </Line>
        )
      })}
    </>
  )
}
