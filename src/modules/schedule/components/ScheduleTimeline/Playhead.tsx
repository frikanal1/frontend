import { format } from "date-fns"
import { useRef } from "react"

import { useAnimation } from "src/modules/ui/hooks/useAnimation"
import { getPreciseHours } from "../../helpers/getPreciseHours"

export type PlayheadProps = {
  height: number
}

export function Playhead(props: PlayheadProps) {
  const { height } = props

  const ref = useRef<HTMLDivElement>(null)
  const timeRef = useRef<HTMLDivElement>(null)

  useAnimation(() => {
    const { current: playhead } = ref
    const { current: time } = timeRef
    if (!playhead || !time) return

    const y = (getPreciseHours(new Date()) / 24) * height

    playhead.style.transform = `translateY(${Math.floor(y)}px)`
    time.innerText = format(new Date(), "HH:mm")
  })

  return (
    <div
      className={
        "h-[2px] absolute left-0 right-0 z-20 flex flex-col items-center" +
        "[&:after]:content-[''] [&:after]:block [&:after]:h-[2px] [&:after]:bg-orange-300"
      }
      ref={ref}
    >
      <div className={"bg-orange-400 font-semibold -ml-[7px]"} ref={timeRef}>
        00:00
      </div>
    </div>
  )
}
