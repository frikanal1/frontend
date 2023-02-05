import { GetFrontpageDocument, ProgramFragment } from "../../../generated/graphql"
import { useState } from "react"
import { useInterval } from "usehooks-ts"
import { useQuery } from "@apollo/client"
import { add, sub } from "date-fns"

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

// TODO: Test coverage
const getPlayingNow = (now: Date, items?: ProgramFragment[]): number => {
  if (!items?.length) return -1

  // Finn siste program som har startet i fortiden
  const currentProgramme = findLastIndex(items, (f) => new Date(f.start) <= now)
  const currentProgrammeStart = new Date(items[currentProgramme]?.start)

  if (currentProgrammeStart >= now) return -1

  return currentProgramme
}

export const useSchedule = (): {
  schedule: ProgramFragment[] | undefined
  current: (offset: number) => ProgramFragment | undefined
} => {
  // This timestamp request new data from the backend once every two minutes.
  const [queryTime, setQueryTime] = useState<Date>(new Date())
  useInterval(() => setQueryTime(new Date()), 120 * 1000)

  // Timestamp used to determine which program is displayed
  const [displayTime, setDisplayTime] = useState<Date>(new Date())
  useInterval(() => setDisplayTime(new Date()), 1000)

  const { data, previousData } = useQuery(GetFrontpageDocument, {
    variables: { filter: { from: sub(queryTime, { hours: 5 }), to: add(queryTime, { hours: 5 }) } },
  })

  const schedule = data?.schedule?.items || previousData?.schedule?.items

  const currentlyPlayingIndex = getPlayingNow(displayTime, schedule)

  const current = (offset: number = 0) => schedule?.[currentlyPlayingIndex + offset]

  return {
    schedule,
    current,
  }
}
