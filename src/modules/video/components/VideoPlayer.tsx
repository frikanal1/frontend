import { styled } from "@mui/system"
import { AspectContainer } from "src/modules/core/components/AspectContainer"
import React from "react"
import { VideoAssetsFragment } from "../../../generated/graphql"
import { getAssetURI } from "../getAssetURI"

const Container = styled("video")`
  width: 100%;
  height: 100%;

  border-radius: 4px;
  overflow: hidden;

  height: 100%;
  width: 100%;

  box-shadow: 2px 2px 11px 2px rgba(0, 0, 0, 0.1);
`

export type VideoPlayerProps = {
  video: VideoAssetsFragment
  width: number
  height: number
}

export function VideoPlayer({ width, height, video }: VideoPlayerProps) {
  const thumbnail = getAssetURI(video.assets, "thumbnail-large")
  const src = getAssetURI(video.assets, "webm")

  return (
    <AspectContainer width={width} height={height}>
      <Container controls poster={thumbnail}>
        <source src={src} />
      </Container>
    </AspectContainer>
  )
}
