import { TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Meta } from "../../../modules/core/components/Meta"
import Link from "next/link"
import { useMutation, useQuery } from "@apollo/client"
import { DeleteVideoDocument, GetVideoDocument, GetVideosDocument } from "../../../generated/graphql"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"

const VideoDeleteButton = ({ videoId }: { videoId: string }) => {
  const router = useRouter()
  const [mutate] = useMutation(DeleteVideoDocument, { variables: { videoId } })
  return (
    <button
      className={"bg-red-700 text-white p-3 font-bold m-2 rounded-xl w-32"}
      onClick={async () => {
        await mutate({
          onCompleted: () => {
            router.push("/admin/videos")
          },
          refetchQueries: [GetVideosDocument],
        })
      }}
    >
      Slett
    </button>
  )
}

interface VideoAdminDetailProps {
  videoId: string
}

interface VideoAdminDetailParams extends ParsedUrlQuery {
  videoId: string
}

export const VideoAdminDetail = ({ videoId }: VideoAdminDetailProps) => {
  const { data } = useQuery(GetVideoDocument, { variables: { videoId: videoId } })
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    if (!data?.video) return

    setTitle(data.video.title)
  }, [data])

  if (!data?.video) return null

  return (
    <div className={"w-full"}>
      <Meta meta={{ title: "Administrer video" }} />
      <Link href={"/admin"} passHref>
        <a>
          <h1 className={"text-4xl font-bold p-2"}>Administratorfunksjoner</h1>
        </a>
      </Link>
      <Link href={"/admin/videos"} passHref>
        <a>
          <h2 className={"text-2xl font-bold p-2"}>Videoer</h2>
        </a>
      </Link>
      <div className={"p-2"}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Tittel"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <VideoDeleteButton videoId={videoId} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<VideoAdminDetailProps> = async (ctx) => {
  const { videoId } = ctx.params as VideoAdminDetailParams

  return { props: { videoId } }
}
export default VideoAdminDetail
