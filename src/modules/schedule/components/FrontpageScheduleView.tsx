import { UpcomingProgramme } from "./UpcomingProgramme"
import React from "react"
import { CurrentProgramme } from "./CurrentProgramme"
import { useSchedule } from "./useSchedule"

export const FrontpageScheduleView = () => {
  const { schedule, current } = useSchedule()
  if (!schedule) return null

  return (
    <div className="p-4 xl:px-8 xl:py-6">
      <CurrentProgramme entry={current(0)} />
      <UpcomingProgramme className="text-green-200 font-light" entry={current(1)} />
      <UpcomingProgramme className="text-green-200 font-light" entry={current(2)} />
    </div>
  )
}
