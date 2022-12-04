import { CreateVideoDocument } from "../../generated/graphql"
import Nope from "nope-validator"
import { nopeResolver } from "@hookform/resolvers/nope"
import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { InputLabel, TextField, Button } from "@mui/material"
import { ErrorMessage } from "@hookform/error-message"

interface VideoCreationFormProps {
  mediaId?: string
  onCreated: (videoId: string) => void
  organizationId: string
}

const CreateVideoSchema = Nope.object().shape({
  title: Nope.string().required("Videoen må ha et navn"),
  description: Nope.string().required("Videoen må ha en beskrivelse"),
})

export const VideoCreationForm = ({ mediaId, organizationId, onCreated }: VideoCreationFormProps) => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(CreateVideoSchema) })

  const [mutate] = useMutation(CreateVideoDocument, {
    onError: (e) => setError("backend", { type: "custom", message: e.toString() }),
    onCompleted: (data) => {
      const videoId = data.video.create.video?.id
      videoId && onCreated(videoId)
    },
  })

  if (!mediaId) return null

  const onSubmit = async ({ title, description }: FieldValues) =>
    await mutate({ variables: { title, description, mediaId, organizationId } })

  return (
    <form>
      <div className={"flex flex-col gap-5 pt-2 pb-4"}>
        <div className={"space-y-1"}>
          <InputLabel htmlFor={"video-title"}>
            <div className={"text-xl font-bold text-black py-1"}>Tittel</div>
          </InputLabel>
          <TextField {...register("title")} className={"bg-white rounded-md"} fullWidth autoFocus id={"video-title"} />
          <div>
            <ErrorMessage errors={errors} name={"title"} />
          </div>
        </div>
        <div className={"space-y-1"}>
          <InputLabel htmlFor={"video-description"}>
            <div className={"text-xl font-bold text-black"}>Beskrivelse</div>
          </InputLabel>
          <TextField
            className={"bg-white rounded-md"}
            multiline
            fullWidth
            minRows={4}
            {...register("description")}
            type={"description"}
            id={"video-description"}
          />
          <div>
            <ErrorMessage errors={errors} name={"description"} />
          </div>
        </div>
        <div className="ml-auto">
          <Button
            className="flex gap-2 bg-green-200 hover:bg-green-100"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Fortsett
          </Button>
          <div>
            <ErrorMessage errors={errors} name={"backend"} />
          </div>
        </div>
      </div>
    </form>
  )
}
