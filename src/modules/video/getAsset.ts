import { VideoAsset, VideoData } from "./types"

import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

export const getAsset = (video: VideoData, type: VideoAsset["type"]) => {
  const asset = video.media.assets.find((a) => a.type === type)
  if (!publicRuntimeConfig.FK_MEDIA) {
    throw new Error("FK_MEDIA not set!")
  }

  if (!asset) {
    console.error(`Asset ${type} is missing!`)
    return undefined
  }

  return publicRuntimeConfig.FK_MEDIA + asset.url
}
