import { format } from "date-fns"
import { useRef } from "react"
import { styled } from "@mui/system"

import { useAnimation } from "src/modules/ui/hooks/useAnimation"
import { getPreciseHours } from "../../helpers/getPreciseHours"

const Container = styled("div")`
  display: flex;
  align-items: center;
  position: absolute;

  height: 1px;
  left: 0px;
  right: 0px;

  z-index: 2;

  &:after {
    flex: 1;
    height: 2px;

    display: block;
    content: "";

    background: ${(props) => props.theme.palette.primary.main};
  }
`

const Time = styled("div")`
  font-size: 0.9em;
  font-weight: 600;

  background: ${(props) => props.theme.palette.primary.main};
  padding: 7px;

  margin-left: -7px;
  border-radius: 3px;
`

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
    <Container ref={ref}>
      <Time ref={timeRef}>00:00</Time>
    </Container>
  )
}
