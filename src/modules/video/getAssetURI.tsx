import { VideoAsset } from "../../generated/graphql"

// Given a list of assets and a type string, returns URI
export const getAssetURI = (assets: VideoAsset[], assetType: string) =>
  assets.find(({ type }) => type === assetType)?.path
