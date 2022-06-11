import { styled } from "@mui/system"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import { VideoPlayer } from "src/modules/video/components/VideoPlayer"
import Link from "next/link"
import React from "react"
import { RecentVideoItem } from "../../modules/video/components/RecentVideoItem"
import { Meta } from "src/modules/core/components/Meta"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import useSWR from "swr"
import { VideoData } from "../../modules/video/types"
import getConfig from "next/config"
import axios from "axios"
import { ParsedUrlQuery } from "querystring"
import { getAsset } from "../../modules/video/getAsset"

const { publicRuntimeConfig } = getConfig()

const breakpoint = 900

const Container = styled("div")`
  display: flex;

  @media (max-width: ${breakpoint}px) {
    flex-direction: column;
  }
`

const Content = styled("div")`
  flex: 1;
`

const PrimaryInfo = styled("div")`
  margin-top: 16px;
`

const Title = styled("h1")`
  font-size: 1.5em;
  margin-bottom: 2px;
`

const Organization = styled("h3")`
  font-size: 1.1em;
  font-weight: 400;

  margin-bottom: 12px;
`

const Description = styled("p")`
  white-space: pre-wrap;
  word-break: break-word;
`

const UploadedDate = styled("span")`
  font-size: 1em;
  color: ${(props) => props.theme.palette.text.secondary};
`

const Sidebar = styled("div")`
  width: 380px;
  margin-left: 32px;

  @media (max-width: ${breakpoint}px) {
    width: 100%;

    margin-left: 0px;
    margin-top: 32px;
  }
`

const SidebarTitle = styled("h5")`
  font-size: 1.2em;
  font-weight: 500;

  margin-bottom: 16px;
`

export type VideoPageProps = {
  videoId: string
  fallback: { [k: string]: any }
}

interface VideoPageParams extends ParsedUrlQuery {
  videoId: string
}

export const VideoPage: NextPage<VideoPageProps> = ({ videoId, fallback }) => {
  const { data: video } = useSWR<VideoData>(`/videos/${videoId}`, { fallback })
  const { data: latestVideos } = useSWR<{ rows: VideoData[] }>(
    () => `/videos/?organization=${video!.organization.id}`,
    {
      fallback,
    }
  )

  if (!video) return null

  const { id, title, description, organization, createdAt } = video

  const thumbnail = getAsset(video, "thumbnail-large")
  const stream = getAsset(video, "webm")

  return (
    <Container>
      <Meta
        meta={{
          title,
          description,
          author: organization.name,
        }}
      />
      <Content>
        <VideoPlayer key={id} width={1280} height={720} src={stream ?? ""} thumbnail={thumbnail ?? ""} />
        <PrimaryInfo>
          <Title>{title}</Title>
          <Organization>
            <Link href={`/organization/${organization.id}`} passHref>
              <a>{organization.name}</a>
            </Link>
          </Organization>
        </PrimaryInfo>
        <Description>{description}</Description>
        <UploadedDate>lastet opp {format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</UploadedDate>
      </Content>
      <Sidebar>
        <SidebarTitle>Nyeste videoer fra {video.organization.name}</SidebarTitle>
        {latestVideos && latestVideos.rows.map((x) => <RecentVideoItem key={x.id} videoId={x.id} />)}
      </Sidebar>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<VideoPageProps> = async (ctx) => {
  const { videoId } = ctx.params as VideoPageParams

  if (!videoId) console.error(`no videoId arrived for video page getstaticprops!`)

  const videoURL = `/videos/${videoId}`

  const { data: video } = await axios.get<VideoData>(publicRuntimeConfig.FK_API + videoURL)

  const latestVideosURL = `/videos/?organization=${video.organization.id}`

  const { data: latestVideos } = await axios.get<{ rows: VideoData[] }>(publicRuntimeConfig.FK_API + latestVideosURL)

  return { props: { videoId, fallback: { videoURL: video, latestVideosURL: latestVideos } } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const getAllVideos = async (offset = 0, _loadedVideos: VideoData[] = []) => {
    const { data } = await axios.get<{ rows: VideoData[]; offset: number; limit: number; count: number }>(
      publicRuntimeConfig.FK_API + `/videos?offset=${offset}&limit=50`
    )

    return data.rows
  }

  try {
    const videos = await getAllVideos()

    if (!videos) throw new Error("no videos from backend!")

    return {
      paths: videos.map((v) => ({
        params: {
          videoId: v.id.toString(),
        },
      })),
      fallback: true,
    }
  } catch (e) {
    console.error("Could not build static paths for videos!")
    return {
      paths: [],
      fallback: "blocking",
    }
  }
}

export default VideoPage
