import styled from "@emotion/styled"

import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js"
import "video.js/dist/video-js.css"
import { useEffect, useRef } from "react"

interface VideoJSProps {
  options: VideoJsPlayerOptions
  onReady?: (player: any) => void
}

export const VideoJS = ({ options, onReady }: VideoJSProps) => {
  const videoRef = useRef(null)
  const playerRef = useRef<VideoJsPlayer | null>(null)

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current

      if (!videoElement) return

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready")

        player.tech().on("usage", (e) => {
          console.log(e.name)
        })
        onReady && onReady(player)
        //player.play()
      }))

      // You can update player in the `else` block here, for example:
    } else {
      playerRef.current.autoplay(true)
    }
  }, [options, videoRef, onReady])

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return <video ref={videoRef} className="video-js vjs-big-play-centered" />
}

const Container = styled.div`
  position: relative;

  > div {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }

  border-radius: 4px;
  overflow: hidden;

  height: 100%;
  width: 100%;

  box-shadow: 2px 2px 11px 2px rgba(0, 0, 0, 0.1);
`

export type LiveVideoPlayerProp = {
  src: string
}
import * as AspectRatio from "@radix-ui/react-aspect-ratio"

export function LiveVideoPlayer(props: LiveVideoPlayerProp) {
  const { src } = props

  return (
    <AspectRatio.Root ratio={1.777}>
      <Container>
        <VideoJS
          options={{
            fluid: true,
            html5: { hls: { overrideNative: true } },
            controls: true,
            sources: [{ src, type: "application/x-mpegURL" }],
          }}
        />
      </Container>
    </AspectRatio.Root>
  )
}

export default LiveVideoPlayer
