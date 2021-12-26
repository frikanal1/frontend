import { action, computed, makeObservable, observable, when } from "mobx"
import { getUniqueId } from "src/modules/state/helpers/getUniqueId"
import { Manager } from "src/modules/state/types"
import { createNewVideoForm, NewVideoForm } from "../forms/createNewVideoForm"
import { VideoData } from "../types"

export class VideoUpload {
  public submitting = false
  public id = getUniqueId()

  public form: NewVideoForm
  public video?: number

  constructor(file: File, public organization: number, private manager: Manager) {
    this.form = createNewVideoForm(manager)

    this.form.fields.mediaId.setValue(file)
    this.form.fields.title.setValue(file.name.split(".")[0])

    makeObservable(this, {
      submitting: observable,
      video: observable,
      submit: action,
      progress: computed,
      status: computed,
    })
  }

  public async submit() {
    const { networkStore, videoStore } = this.manager.stores
    const { api } = networkStore

    const valid = await this.form.ensureValidity()

    if (valid) {
      this.submitting = true
      await when(() => this.form.ready)

      const response = await api.post<VideoData>(`/organizations/${this.organization}/videos`, this.form.serialized)

      videoStore.add(response.data)
      this.video = response.data.id
    }
  }

  public cancel() {
    const { videoUploadStore } = this.manager.stores

    this.form.destroy()
    videoUploadStore.remove(this.id)
  }

  public get progress() {
    return this.form.fields.mediaId.progress
  }

  public get status() {
    return this.form.fields.mediaId.status
  }
}
