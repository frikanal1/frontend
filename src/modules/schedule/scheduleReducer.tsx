import { Reducer } from "react"
import { areIntervalsOverlapping, compareAsc } from "date-fns"
import { Maybe } from "@graphql-tools/utils"

export type ScheduleStateVideo = {
  id: string
  title: string
}

type ScheduleReducerAction =
  | { type: "add"; payload: ScheduleStateEntry }
  | { type: "remove"; payload: { id: string } }
  | { type: "propose"; payload: ScheduleStateEntry }

export type ScheduleStateEntry = {
  id: string
  when: Interval
  source: "jukebox" | "member"
  video: ScheduleStateVideo
  threatened?: boolean
}

type ScheduleState = {
  change: Maybe<{
    canAdd: boolean
  }>
  entries: ScheduleStateEntry[]
  error: string | undefined
}

export const scheduleReducer: Reducer<ScheduleState, ScheduleReducerAction> = (state, action) => {
  switch (action.type) {
    case "add":
      state.entries.splice(0, 0, action.payload)
      state.entries.sort((a, b) => compareAsc(a.when.start, b.when.start))
      return state
    case "propose":
      const overlapping = state.entries.filter(({ when }) => areIntervalsOverlapping(when, action.payload.when))
      const threatened = overlapping.filter(({ source }) => source === "jukebox")
      const immutable = overlapping.filter(({ source }) => source !== "jukebox")
      threatened.forEach((threatenedEntry) => (threatenedEntry.threatened = true))
      return { ...state, change: { canAdd: !immutable.length } }
    case "remove":
      const index = state.entries.findIndex(({ id }) => id === action.payload.id)
      if (index === -1) {
        console.log("Tried to remove unknown index")
        state.error = "Unknown index"
      } else state.entries.splice(index, 1)
      return state
  }
}
