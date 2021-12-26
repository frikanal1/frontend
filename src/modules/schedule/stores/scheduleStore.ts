import { startOfDay } from "date-fns"
import { computed, makeObservable, observable } from "mobx"
import { ARTIFICIAL_DELAY } from "src/modules/core/constants"
import { wait } from "src/modules/lang/async"
import { AsyncState, SerializedAsyncState } from "src/modules/state/classes/AsyncState"
import { createStoreFactory, Store } from "src/modules/state/classes/Store"
import { ScheduleEntry } from "../types"

export type SerializedScheduleStore = {
  latestItems: SerializedAsyncState<ScheduleEntry[]>
  itemsByDate: Record<string, SerializedAsyncState<ScheduleEntry[]>>
}

export class ScheduleStore extends Store<SerializedScheduleStore> {
  public make() {
    makeObservable(this, {
      selectedDate: observable,
      itemsByDate: observable,
      latestItems: observable,
      selectedDateItems: computed,
      upcoming: computed,
    })
  }

  public selectedDate = startOfDay(new Date())
  public itemsByDate: Record<string, AsyncState<ScheduleEntry[]>> = {}
  public latestItems = new AsyncState<ScheduleEntry[]>([])

  private async fetch(from?: Date) {
    const { networkStore, videoStore } = this.manager.stores
    const { api } = networkStore

    const [response] = await Promise.all([
      await api.get<ScheduleEntry[]>("/scheduling/entries", {
        params: {
          from: from ? from.toISOString() : undefined,
        },
      }),
      wait(ARTIFICIAL_DELAY),
    ])

    const entries = response.data
    entries.map((e) => videoStore.add(e.video))

    return entries
  }

  public async fetchLatest() {
    if (!this.latestItems.data) return
    return this.latestItems.handleData(this.fetch())
  }

  public async fetchByDate(date: Date) {
    const existingList = this.itemsByDate[date.toISOString()]
    if (existingList) return existingList

    const state = (this.itemsByDate[date.toISOString()] = new AsyncState<ScheduleEntry[]>([]))
    return state.handleData(this.fetch(date))
  }

  public serialize() {
    return {
      latestItems: this.latestItems,
      itemsByDate: this.itemsByDate,
    }
  }

  public hydrate(data: SerializedScheduleStore) {
    this.latestItems.hydrate(data.latestItems)

    for (const [key, value] of Object.entries(data.itemsByDate)) {
      this.itemsByDate[key] = AsyncState.from(value)
    }
  }

  public get selectedDateItems() {
    return this.itemsByDate[this.selectedDate.toISOString()] ?? new AsyncState([])
  }

  public get upcoming() {
    return this.latestItems.data!.filter((x) => new Date() < new Date(x.endsAt)).slice(0, 4)
  }
}

export const scheduleStore = createStoreFactory(ScheduleStore)
