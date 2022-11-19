import { format, setMinutes, startOfToday } from "date-fns"

const VIRTUALIZATION_PADDING = 64

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

        const lineStyle =
          "flex absolute left-0 right-0 fill-green-300 " +
          "[&:after]:block [&:after]:w-full [&:after]:h-[1px] [&:after]:bg-orange-300 [&:after]:content-[''] " +
          "[&:after]:ml-4"

        return (
          <div className={lineStyle} key={index} style={style}>
            {format(setMinutes(startOfToday(), index), "HH:mm")}
          </div>
        )
      })}
    </>
  )
}
