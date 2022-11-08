import { TextField } from "@mui/material"
import React from "react"
import { Meta } from "../../../modules/core/components/Meta"
import Link from "next/link"
import { useMutation, useQuery } from "@apollo/client"
import {
  DeleteVideoDocument,
  GetVideoDocument,
  GetVideoQuery,
  GetVideosDocument,
  UpdateVideoDocument,
} from "../../../generated/graphql"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { FieldValues, useForm } from "react-hook-form"
import { nopeResolver } from "@hookform/resolvers/nope"
import { ErrorMessage } from "@hookform/error-message"
import Nope from "nope-validator"
import { SaveButton } from "../../../modules/core/components/SaveButton"

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

export const AdminVideoEditSchema = Nope.object().shape({
  title: Nope.string().required(),
  description: Nope.string().required(),
})

interface VideoAdminDetailProps {
  videoId: string
}

interface VideoAdminDetailParams extends ParsedUrlQuery {
  videoId: string
}

export const VideoEditForm = ({ video }: { video: GetVideoQuery["video"] }) => {
  const [mutate, { loading }] = useMutation(UpdateVideoDocument)

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(AdminVideoEditSchema), defaultValues: { ...video, backend: null } })

  const saveVideo = async ({ id, description, title }: FieldValues) => {
    await mutate({
      variables: {
        id,
        title,
        description,
      },
      onError: (e) => setError("backend", { type: "custom", message: "Serverfeil:\n" + e.toString() }),
      refetchQueries: [GetVideoDocument],
    })
  }

  return (
    <>
      <div className={"p-2 space-y-4"}>
        <TextField fullWidth id="outlined-basic" label="Tittel" variant="outlined" {...register("title")} />
        <ErrorMessage errors={errors} name={"title"} />
        <TextField
          minRows={5}
          multiline
          fullWidth
          id="outlined-basic"
          label="Tittel"
          variant="outlined"
          {...register("description")}
        />
        <ErrorMessage errors={errors} name={"description"} />
      </div>
      <ErrorMessage errors={errors} name={"backend"} />
      <SaveButton isSaving={loading} onSave={handleSubmit(saveVideo)} />
    </>
  )
}

export const VideoAdminDetail = ({ videoId }: VideoAdminDetailProps) => {
  const { data } = useQuery(GetVideoDocument, { variables: { videoId } })

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
      {data?.video && <VideoEditForm video={data?.video} />}
      <VideoDeleteButton videoId={videoId} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<VideoAdminDetailProps> = async (ctx) => {
  const { videoId } = ctx.params as VideoAdminDetailParams

  return { props: { videoId } }
}
export default VideoAdminDetail
