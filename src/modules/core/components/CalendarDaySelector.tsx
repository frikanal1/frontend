import { add, eachDayOfInterval, format, isMonday, isSameDay, isToday, lastDayOfMonth, previousMonday } from "date-fns"
import { IconButton } from "src/modules/ui/components/IconButton"
import { useState } from "react"
import nb from "date-fns/locale/nb"
import { startOfMonth } from "date-fns/fp"

const CalendarWeekdays = () => (
  <div className={"flex pt-2"}>
    {Array(7)
      .fill(undefined)
      .map((_, d) => (
        <span className={"w-[calc(100%/7)] text-center"} key={d}>
          {format(add(previousMonday(new Date()), { days: d }), "iii", { locale: nb })}
        </span>
      ))}
  </div>
)

const CalendarDay = ({ date, active, onChange }: { date: Date; active?: boolean; onChange: (date: Date) => void }) => {
  const baseDateStyle =
    "w-[calc(100%/7)] aspect-square border-2 border-transparent rounded-full " +
    "cursor-pointer flex items-center justify-center"

  const baseLinkStyle = "w-[2ch] text-right leading-none"

  const selectedLinkStyle = active ? "" : ""
  const selectedDateStyle = active ? "border-orange-700" : ""

  const todayDateStyle = isToday(date) ? "" : ""
  const todayLinkStyle = isToday(date) ? "text-green-600" : ""

  const linkStyle = [baseLinkStyle, selectedLinkStyle, todayLinkStyle].join(" ")
  const dateStyle = [baseDateStyle, selectedDateStyle, todayDateStyle].join(" ")

  return (
    <div key={date.toISOString()} className={dateStyle} onClick={() => onChange(date)}>
      <a className={linkStyle}>{format(date, "d", { locale: nb })}</a>
    </div>
  )
}

const CalendarDays = ({ date, onChange }: { date: Date; onChange: (date: Date) => void }) => {
  const firstDayOfMonth = startOfMonth(date)
  const lastMondayBeforeMonthStart = isMonday(firstDayOfMonth) ? firstDayOfMonth : previousMonday(firstDayOfMonth)
  const dates = eachDayOfInterval({ start: lastMondayBeforeMonthStart, end: lastDayOfMonth(date) })

  return (
    <div className={"flex flex-wrap pt-1"}>
      {dates.map((day) => (
        <CalendarDay key={day.toISOString()} date={day} active={isSameDay(date, day)} onChange={onChange} />
      ))}
    </div>
  )
}

const CalendarNavigator = ({ currentDate, onChange }: { currentDate: Date; onChange: (date: Date) => void }) => {
  const addMonths = (amount: number) => onChange(startOfMonth(add(currentDate, { months: amount })))

  return (
    <div className={"flex items-center text-lg font-semibold"}>
      <IconButton onClick={() => addMonths(-1)} title="Forrige" icon="chevronLeft" />
      <span className={"grow text-center"}>{format(currentDate, "MMMM yyyy", { locale: nb })}</span>
      <IconButton onClick={() => addMonths(1)} title="Neste" icon="chevronRight" />
    </div>
  )
}

export type CalendarInputProps = {
  selectedDate?: Date
  onChange: (date: Date) => void
  className?: string
}

export function CalendarDaySelector({ selectedDate = new Date(), onChange, className }: CalendarInputProps) {
  // Add two hours, so we don't have to think about timezones... :)
  const [visibleDate, setVisibleDate] = useState(add(startOfMonth(selectedDate), { hours: 2 }))

  return (
    <div className={className}>
      <CalendarNavigator currentDate={visibleDate} onChange={setVisibleDate} />
      <div className={"px-4"}>
        <CalendarWeekdays />
        <CalendarDays date={selectedDate} onChange={onChange} />
      </div>
    </div>
  )
}
