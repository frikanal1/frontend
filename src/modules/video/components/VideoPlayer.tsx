import React from "react"
import { Video } from "../../../generated/graphql"
import { getAssetURI } from "../getAssetURI"

export type VideoPlayerProps = {
  className?: string
  video: Pick<Video, "assets" | "images">
}

export function VideoPlayer({ className, video }: VideoPlayerProps) {
  const src = getAssetURI(video.assets, "webm")

  if (!video) return null

  return (
    <div className={className}>
      <video className={"aspect-video w-full"} controls poster={video.images.thumbLarge}>
        <source src={src} />
      </video>
    </div>
  )
}
