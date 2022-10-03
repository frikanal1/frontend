import { ScheduleItemSummary } from "./ScheduleItemSummary"
import React, { useState } from "react"
import { styled } from "@mui/system"
import { ScheduleItemBlurb } from "./ScheduleItemBlurb"
import { FrontpageScheduleFragment, GetFrontpageDocument, Maybe } from "../../../generated/graphql"
import { useQuery } from "@apollo/client"
import { useInterval } from "usehooks-ts"

const NextTitle = styled("h3")`
  margin-top: 32px;
  font-size: 1.5em;
`

const Schedule = styled("div")`
  margin-top: 16px;
`

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

const getPlayingNow = (now: Date, items?: Maybe<Array<Maybe<FrontpageScheduleFragment>>>) =>
  findLastIndex(items || [], (i) => (i ? new Date(i.startsAt) <= now : true))

export const ScheduleFrontpageWidget = () => {
  const query = useQuery(GetFrontpageDocument)
  const scheduleItems = query?.data?.schedule?.items

  const [time, setTime] = useState<Date>(new Date())
  useInterval(() => setTime(new Date()), 1000)

  if (!scheduleItems) return null

  const currentlyPlaying = getPlayingNow(time, scheduleItems)

  if (currentlyPlaying == -1) return null

  return (
    <>
      <ScheduleItemBlurb entry={scheduleItems[currentlyPlaying]} />
      <NextTitle>Senere</NextTitle>
      <Schedule>
        <ScheduleItemSummary entry={scheduleItems[currentlyPlaying + 1]} />
        <ScheduleItemSummary entry={scheduleItems[currentlyPlaying + 2]} />
      </Schedule>
    </>
  )
}
