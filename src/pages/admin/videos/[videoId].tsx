import { styled } from "@mui/system"
import { useRouter } from "next/router"
import useSWR from "swr"
import { VideoData } from "../../../modules/video/types"
import { TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Meta } from "../../../modules/core/components/Meta"
import Link from "next/link"

const Container = styled("div")``
export const VideoAdminDetail = () => {
  const { videoId } = useRouter().query
  const { data: video } = useSWR<VideoData>(`/videos/${videoId}`)

  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    if (!video) return

    setTitle(video.title)
  }, [video])

  return (
    <Container>
      <Meta meta={{ title: "Administrer video" }} />
      <Link href={"/admin"} passHref>
        <a>
          <h1>Administratorfunksjoner</h1>
        </a>
      </Link>
      <Link href={"/admin/videos"} passHref>
        <a>
          <h2>Videoer</h2>
        </a>
      </Link>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Tittel"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </Container>
  )
}

export default VideoAdminDetail
