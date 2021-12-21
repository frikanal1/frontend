import { ObservableFormField, ObservableFormFieldOptions } from "../classes/ObservableFormField"
import { FileUpload } from "../../network/classes/FileUpload"
import { action, computed, makeObservable, observable } from "mobx"

export type FileFieldValue = File | undefined

export type ObservableFileFieldOptions = ObservableFormFieldOptions<FileFieldValue> & {
  path: string
}

export type SerializedFileFieldValue = null | number | undefined

export class ObservableFileField extends ObservableFormField<FileFieldValue, SerializedFileFieldValue> {
  public removed = false
  public file?: FileUpload

  protected path: string

  public constructor(options: ObservableFileFieldOptions) {
    super(options)

    this.path = options.path

    makeObservable(this, {
      removed: observable,
      file: observable,

      setValue: action,
      remove: action,
      destroy: action,

      status: computed,
      progress: computed,
      uploaded: computed,
      size: computed,
      ready: computed,
      name: computed,
      serializedValue: computed,
      uploadError: computed,

      // @ts-ignore
      upload: action,
    })
  }

  public setValue(v: FileFieldValue) {
    if (v) {
      super.setValue(v)
      this.upload(v)
      this.removed = false
    }
  }

  private upload(v: File) {
    if (this.file) {
      this.file.stop()
      this.file = undefined
    }

    this.file = new FileUpload(
      {
        destination: this.path,
        file: v,
        metadata: {
          filename: v.name,
        },
      },
      this.manager
    )

    this.file.start()
  }

  public remove() {
    super.setValue(undefined)

    this.removed = true
    this.file?.stop()
    this.file = undefined
  }

  public destroy() {
    this.file?.stop()
  }

  public get status() {
    return this.file?.status ?? "idle"
  }

  public get progress() {
    return this.file?.progress ?? 0
  }

  public get uploaded() {
    return this.file?.uploaded ?? 0
  }

  public get size() {
    return this.file?.size ?? 0
  }

  public get ready() {
    if (!this.file) return true
    return typeof this.serializedValue === "number"
  }

  public get name() {
    return this.file?.name
  }

  public get serializedValue() {
    if (this.removed) return null
    return this.file?.mediaId ?? undefined
  }

  public get uploadError() {
    return this.file?.error
  }
}

const defaultOptions: ObservableFileFieldOptions = {
  value: undefined,
  path: "/",
}

export const file = (options = defaultOptions) => {
  return new ObservableFileField(options)
}
