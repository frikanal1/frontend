import { useStores } from "../../state/manager"
import { ScheduleItemSummary } from "./ScheduleItemSummary"
import React from "react"
import { styled } from "@mui/system"
import { ScheduleItemBlurb } from "./ScheduleItemBlurb"

const NowPlaying = styled(ScheduleItemBlurb)`
  margin-top: 16px;
`

const NextTitle = styled("h3")`
  margin-top: 32px;
  font-size: 1.5em;
`

const Schedule = styled("div")`
  margin-top: 16px;
`
export const ScheduleFrontpageWidget = () => {
  const { scheduleStore } = useStores()
  const [now, ...later] = scheduleStore.upcoming

  if (!now) return null

  return (
    <>
      <NowPlaying entry={now} />
      <NextTitle>Senere</NextTitle>
      <Schedule>
        {later.map((x) => (
          <ScheduleItemSummary key={x.startsAt} entry={x} />
        ))}
      </Schedule>
    </>
  )
}
