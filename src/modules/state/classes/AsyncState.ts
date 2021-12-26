import { makeObservable, observable } from "mobx"

export type AsyncStateStatus = "idle" | "fetching" | "failed"

export type SerializedAsyncState<D> = {
  status: AsyncStateStatus
  data?: D
}

export class AsyncState<D> {
  public status: AsyncStateStatus = "idle"
  public data?: D

  public constructor(defaultValue?: D) {
    this.data = defaultValue

    makeObservable(this, {
      status: observable,
      data: observable,
    })
  }

  public async handleData(promise: Promise<D>) {
    try {
      this.status = "fetching"
      this.data = await promise
      this.status = "idle"

      return this as FetchedAsyncState<D>
    } catch (e) {
      this.status = "failed"
      throw e
    }
  }

  public static from<D>(data: SerializedAsyncState<D>) {
    const state = new AsyncState<D>()

    state.data = data.data
    state.status = data.status

    return state as FetchedAsyncState<D>
  }

  public serialize(): SerializedAsyncState<D> {
    const { status, data } = this
    return { status, data }
  }

  public hydrate(data: SerializedAsyncState<D>) {
    this.status = data.status
    this.data = data.data
  }
}

export type FetchedAsyncState<D> = AsyncState<D> & { data: D }
