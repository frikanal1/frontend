import { OrganizationData } from "modules/organization/resources/Organization"

export type VideoAsset = {
  type: `thumbnail-${"small" | "medium" | "large"}` | "broadcastable" | "theora" | "webm"
  url: string
}

export type VideoData = {
  id: number
  title: string
  description: string
  duration: number

  createdAt: string
  updatedAt: string

  organization: OrganizationData
  assets: VideoAsset[]
}

export type VideoCategoryData = {
  id: number
  name: string
  desc: string
  videocount: number
}

export type VideoUploadTokenData = {
  uploadToken: string
  uploadUrl: string
}
