import { Reducer } from "react"

export type ScheduleStateVideo = {
  id: string
  title: string
}

type ScheduleReducerAction = { type: "add"; payload: ScheduleStateEntry } | { type: "remove" }

export type ScheduleStateEntry = {
  start: Date
  source: "jukebox"
  video: ScheduleStateVideo
}

type ScheduleState = {
  entries: ScheduleStateEntry[]
}

export const scheduleReducer: Reducer<ScheduleState, ScheduleReducerAction> = (state, action) => {
  switch (action.type) {
    case "add":
      state.entries.splice(0, 0, action.payload)
      return state
    case "remove":
      return state
  }
}
