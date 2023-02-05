import { UpcomingProgramme } from "./UpcomingProgramme"
import React from "react"
import { CurrentProgramme } from "./CurrentProgramme"
import { useSchedule } from "./useSchedule"

export const FrontpageScheduleView = () => {
  const { schedule, current } = useSchedule()
  if (!schedule) return null

  return (
    <div className="p-4 xl:p-8">
      <CurrentProgramme entry={current(0)} />
      <div className={"md:text-xl text-green-100/70 font-bold font-condensed xl:pt-2"}>senere</div>
      <UpcomingProgramme className="text-green-200 font-light" entry={current(1)} />
      <UpcomingProgramme className="text-green-300 font-light" entry={current(2)} />
    </div>
  )
}
