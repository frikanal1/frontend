import React from "react"
import { Video } from "../../../generated/graphql"
import { getAssetURI } from "../getAssetURI"
import { VideoJS } from "../../frontpage/LiveVideoPlayer"
import videojs from "video.js"
import SourceObject = videojs.Tech.SourceObject

export type VideoPlayerProps = {
  className?: string
  video: Pick<Video, "assets" | "images" | "duration">
}

export function VideoPlayer({ className, video }: VideoPlayerProps) {
  const formats = [
    { assetType: "webm", mimeType: "video/webm" },
    { assetType: "theora", mimeType: "video/ogg" },
  ]

  const sources: SourceObject[] = formats
    .map(({ assetType, mimeType }) => {
      const src = getAssetURI(video.assets, assetType)!

      return {
        src,
        mimeType,
      }
    })
    .filter(({ src }) => !!src)

  if (!video) return null

  return (
    <div className={className}>
      <div className={"aspect-video w-full bg-black/75"}>
        <VideoJS
          options={{
            fluid: true,
            html5: { vhs: { overrideNative: true } },
            controls: true,
            poster: video.images.thumbLarge,
            liveui: false,
            sources,
          }}
        />
      </div>
    </div>
  )
}
