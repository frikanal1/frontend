import { VideoAsset } from "../../generated/graphql"
import getConfig from "next/config"
const {
  publicRuntimeConfig: { FK_MEDIA },
} = getConfig()

// Given a list of assets and a type string, returns URI
export const getAssetURI = (assets: VideoAsset[], assetType: string) => {
  const path = assets.find(({ type }) => type === assetType)?.path
  return `${FK_MEDIA}/${path}`
}
