import { UpcomingProgramme } from "./UpcomingProgramme"
import React, { useState } from "react"
import { CurrentProgramme } from "./CurrentProgramme"
import { FrontpageScheduleFragment, GetFrontpageDocument, Maybe } from "../../../generated/graphql"
import { useQuery } from "@apollo/client"
import { useInterval } from "usehooks-ts"
import { add } from "date-fns"

/**
 * Returns the index of the last element in the array where predicate is true, and -1
 * otherwise.
 * @param array The source array to search in
 * @param predicate find calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true. If such an element is found,
 * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
 */
export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length
  while (l--) {
    if (predicate(array[l], l, array)) return l
  }
  return -1
}

const getPlayingNow = (now: Date, items?: Maybe<Array<Maybe<FrontpageScheduleFragment>>>) => {
  if (!items?.length) return -1

  // Find the index of the last item in the schedule
  const currentProgramme = findLastIndex(items, (i) => new Date(i?.start) <= now)

  if (new Date(items[currentProgramme]?.start) >= now) return -1

  return currentProgramme
}

export const FrontpageScheduleView = () => {
  // Timestamp used as parameter to GraphQL query
  const [queryTime, setQueryTime] = useState<Date>(new Date())
  useInterval(() => setQueryTime(new Date()), 120 * 1000)

  // Timestamp used to determine which program is displayed
  const [displayTime, setDisplayTime] = useState<Date>(new Date())
  useInterval(() => setDisplayTime(new Date()), 1000)

  const { data } = useQuery(GetFrontpageDocument, {
    variables: { filter: { from: queryTime, to: add(queryTime, { hours: 5 }) } },
  })

  if (!data) return null

  const { items } = data.schedule

  const currentlyPlaying = getPlayingNow(displayTime, items)

  if (currentlyPlaying === -1) return null

  return (
    <div className="p-4 xl:p-8">
      <CurrentProgramme entry={items?.[currentlyPlaying]} />
      <div className={"md:text-xl text-green-100/70 font-bold font-condensed xl:pt-2"}>senere</div>
      <UpcomingProgramme className="text-green-200 font-light" entry={items?.[currentlyPlaying + 1]} />
      <UpcomingProgramme className="text-green-300 font-light" entry={items?.[currentlyPlaying + 2]} />
    </div>
  )
}
