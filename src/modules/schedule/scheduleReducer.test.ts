import { test } from "@jest/globals"
import { scheduleReducer, ScheduleStateEntry, ScheduleStateVideo } from "./scheduleReducer"

const testVideo: ScheduleStateVideo = {
  id: "1337",
  title: "Test video",
}

const makeTestScheduleEntry = (start: Date, video: ScheduleStateVideo = testVideo): ScheduleStateEntry => ({
  start,
  source: "jukebox",
  video,
})

test("Adds to empty schedule", () => {
  const payload = makeTestScheduleEntry(new Date())
  const newState = scheduleReducer({ entries: [] }, { type: "add", payload })
  expect(newState).toEqual({ entries: [payload] })
})
