import { Meta } from "src/modules/core/components/Meta"
import { CalendarDaySelector } from "src/modules/schedule/components/CalendarDaySelector"
import React, { useState } from "react"
import { ScheduleTimeline } from "src/modules/schedule/components/ScheduleTimeline/ScheduleTimeline"

export const Schedule = () => {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className={"flex gap-8 mt-4 min-h-[800px]"}>
      <Meta
        meta={{
          title: "Sendeplan",
          description: "Timeplan for sending",
        }}
      />
      <CalendarDaySelector className={"grow-0 w-1/5"} selectedDate={date} onChange={setDate} />
      <ScheduleTimeline className={"grow "} date={date} zoom={500} />
    </div>
  )
}

export default Schedule
