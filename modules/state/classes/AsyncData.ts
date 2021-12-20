import { makeObservable, observable } from "mobx"

export type AsyncDataStatus = "idle" | "fetching" | "failed"

export type SerializedAsyncData<D> = {
  status: AsyncDataStatus
  data?: D
}

export class AsyncData<D> {
  public status: AsyncDataStatus = "idle"
  public data?: D

  private constructor() {
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

      return this as FetchedAsyncData<D>
    } catch (e) {
      this.status = "failed"
      throw e
    }
  }

  public static from<D>(promise: Promise<D>) {
    const instance = new AsyncData<D>()

    instance.handleData(promise)

    return instance
  }

  public serialize(): SerializedAsyncData<D> {
    const { status, data } = this
    return { status, data }
  }

  public hydrate(data: SerializedAsyncData<D>) {
    this.status = data.status
    this.data = data.data
  }
}

export type FetchedAsyncData<D> = AsyncData<D> & { data: D }
