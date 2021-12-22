import { createStoreFactory, Store } from "modules/state/classes/Store"
import { action, makeObservable, observable } from "mobx"
import { VideoUpload } from "../classes/VideoUpload"

export type SerializedVideoUploadStore = {
  organizationId: number
}

export class VideoUploadStore extends Store<SerializedVideoUploadStore> {
  public uploads: VideoUpload[] = []

  public make() {
    makeObservable(this, {
      uploads: observable,

      add: action,
      remove: action,
    })
  }

  public add(organization: number, file: File) {
    this.uploads.push(new VideoUpload(file, organization, this.manager))
  }

  public remove(id: number) {
    this.uploads = this.uploads.filter((u) => u.id !== id)
  }

  public get categories() {
    const { configStore } = this.manager.stores
    return configStore.config.categories
  }
}

export const videoUploadStore = createStoreFactory(VideoUploadStore)
