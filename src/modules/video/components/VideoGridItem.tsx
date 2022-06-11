import { styled } from "@mui/system"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import { AspectContainer } from "src/modules/core/components/AspectContainer"
import Link from "next/link"
import React from "react"
import { getAsset } from "../getAsset"
import useSWR from "swr"
import { VideoData } from "../types"

const Container = styled("li")``

const ThumbnailContainer = styled("div")`
  flex: 1;
`

const Thumbnail = styled("img")`
  width: 100%;
  height: 100%;

  border-radius: 4px;
  overflow: hidden;

  height: 100%;
  width: 100%;

  box-shadow: 2px 2px 11px 2px rgba(0, 0, 0, 0.1);
`

const PrimaryInfo = styled("div")`
  margin-top: 16px;
`

const Title = styled("h1")`
  font-size: 1.2em;
`

const UploadedDate = styled("span")`
  display: block;
  margin-top: 2px;

  font-size: 1em;
  color: ${(props) => props.theme.palette.text.secondary};
`

export type VideoGridItemProps = {
  videoId: number
}

export function VideoGridItem({ videoId }: VideoGridItemProps) {
  const { data: video } = useSWR<VideoData>(`/videos/${videoId}`)

  if (!video) return null

  const { id, title, createdAt } = video

  const thumbnail = getAsset(video, "thumbnail-large")

  return (
    <Container>
      <ThumbnailContainer>
        <AspectContainer width={1280} height={720}>
          <Link href={`/video/${id}`} passHref>
            <a>
              <Thumbnail src={thumbnail} />
            </a>
          </Link>
        </AspectContainer>
      </ThumbnailContainer>
      <PrimaryInfo>
        <Title>
          <Link href={`/video/${id}`} passHref>
            <a>{title}</a>
          </Link>
        </Title>
      </PrimaryInfo>
      <UploadedDate>lastet opp {format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</UploadedDate>
    </Container>
  )
}
