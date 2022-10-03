import dynamic from "next/dynamic"
import Nope from "nope-validator"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { Bulletin, UpdateBulletinDocument, UpdateBulletinMutation } from "../generated/graphql"
import { AdminFieldSet } from "../modules/core/components/AdminFieldSet"
import { SaveButton } from "../modules/core/components/SaveButton"
import { MDEditorProps } from "@uiw/react-md-editor"
import { useMutation } from "@apollo/client"
import { nopeResolver } from "@hookform/resolvers/nope"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { TextField } from "@mui/material"

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
})

export const BulletinInputSchema = Nope.object().shape({
  title: Nope.string().required(),
  text: Nope.string().required(),
})

interface BulletinEditorProps {
  value?: Partial<Bulletin>
  onSave: (bulletin: UpdateBulletinMutation) => any
}

export const BulletinEditor = ({ value, onSave }: BulletinEditorProps) => {
  const {
    register,
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(BulletinInputSchema), defaultValues: { ...value, backend: null } })

  const [mutate, { loading }] = useMutation(UpdateBulletinDocument)

  const saveBulletin = async ({ id, text, title }: FieldValues) =>
    mutate({
      variables: {
        bulletin: {
          id,
          text,
          title,
        },
      },
      onCompleted: onSave,
      onError: (e) => setError("backend", { type: "custom", message: "Serverfeil:\n" + e.toString() }),
    })

  return (
    <AdminFieldSet>
      <TextField fullWidth label="Tittel" variant="outlined" {...register("title")} />
      <ErrorMessage errors={errors} name={"title"} />
      <p>Venstre: Markdown-kode, høyre: Forhåndsvisning</p>
      <Controller
        control={control}
        name="text"
        render={({ field: { onChange, onBlur, value } }) => (
          <MDEditor value={value} onChange={onChange} onBlur={onBlur} />
        )}
      />
      <ErrorMessage errors={errors} name={"text"} />
      <SaveButton isSaving={loading} onSave={handleSubmit(saveBulletin)} />
      <ErrorMessage
        errors={errors}
        name={"backend"}
        render={({ message }) => <code className={"backendError"}>{message}</code>}
      />
    </AdminFieldSet>
  )
}
