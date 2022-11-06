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
        player.tech().on("usage", (e) => {
          console.log(e.name)
        })
        onReady && onReady(player)
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

export type LiveVideoPlayerProp = {
  src: string
}
import * as AspectRatio from "@radix-ui/react-aspect-ratio"

export function LiveVideoPlayer(props: LiveVideoPlayerProp) {
  const { src } = props

  return (
    <AspectRatio.Root ratio={16 / 9}>
      <VideoJS
        options={{
          autoplay: true,
          muted: true,
          fluid: true,
          html5: { hls: { overrideNative: true } },
          controls: true,
          sources: [{ src, type: "application/x-mpegURL" }],
        }}
      />
    </AspectRatio.Root>
  )
}

export default LiveVideoPlayer
