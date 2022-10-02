import { styled } from "@mui/system"
import { Meta } from "src/modules/core/components/Meta"
import { CalendarInput } from "src/modules/core/components/CalendarInput"
import React, { useState } from "react"
import { ScheduleTimeline } from "src/modules/schedule/components/ScheduleTimeline/ScheduleTimeline"
import { useQuery } from "@apollo/client"
import { GetScheduleDocument } from "../generated/graphql"

const breakpoint = 700

const Container = styled("div")`
  display: flex;
  width: 100%;

  @media (max-width: ${breakpoint}px) {
    flex-direction: column;
  }
`

const Sidebar = styled("div")`
  width: 320px;

  padding-left: 32px;

  @media (max-width: ${breakpoint}px) {
    border-left: none;
    padding-left: 0px;
    margin-left: 0px;

    width: 100%;
    order: -1;

    margin-bottom: 32px;
  }
`

const Result = styled("div")`
  flex: 1;
  max-height: calc(100vh - 325px);
`

export const Schedule = () => {
  const [date, setDate] = useState<Date>(new Date())
  const query = useQuery(GetScheduleDocument, { variables: { date } })
  const selectedDateItems = query.data?.schedule.items

  return (
    <Container>
      <Meta
        meta={{
          title: "Sendeplan",
          description: "Oversikt over programmer som blir sendt i dag",
        }}
      />
      <Result>
        <ScheduleTimeline entries={selectedDateItems} zoom={500} />
      </Result>
      <Sidebar>
        <CalendarInput value={date} onChange={setDate} />
      </Sidebar>
    </Container>
  )
}

export default Schedule
