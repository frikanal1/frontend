import { UpcomingProgramme } from "./UpcomingProgramme"
import React, { useState } from "react"
import { CurrentProgramme } from "./CurrentProgramme"
import { FrontpageScheduleFragment, GetFrontpageDocument, Maybe } from "../../../generated/graphql"
import { useQuery } from "@apollo/client"
import { useInterval } from "usehooks-ts"

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

  const lastIndex = findLastIndex(items, (i) => (i ? new Date(i.startsAt) <= now : true))

  if (items[lastIndex]?.endsAt <= now) return lastIndex

  return -1
}

export const FrontpageScheduleView = () => {
  const query = useQuery(GetFrontpageDocument)
  const scheduleItems = query?.data?.schedule?.items

  const [time, setTime] = useState<Date>(new Date())

  // Update the UI every second
  useInterval(() => setTime(new Date()), 1000)

  const currentlyPlaying = getPlayingNow(time, scheduleItems)

  if (currentlyPlaying === -1) return null

  return (
    <div className="p-4 xl:p-8">
      <CurrentProgramme entry={scheduleItems?.[currentlyPlaying]} />
      <div className={"md:text-xl text-white opacity-60 mix-blend-luminosity font-bold font-condensed xl:pt-2"}>
        senere
      </div>
      <UpcomingProgramme className="text-green-200 font-light" entry={scheduleItems?.[currentlyPlaying + 1]} />
      <UpcomingProgramme className="text-green-300 font-light" entry={scheduleItems?.[currentlyPlaying + 2]} />
    </div>
  )
}
