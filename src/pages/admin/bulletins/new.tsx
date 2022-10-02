import { MDEditorProps } from "@uiw/react-md-editor"
import dynamic from "next/dynamic"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import React from "react"
import { Save } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"

import Link from "next/link"
import { Meta } from "../../../modules/core/components/Meta"
import { AdminFieldSet } from "../../../modules/form/components/AdminFieldSet"
import { useRouter } from "next/router"
import { ErrorMessage } from "@hookform/error-message"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { nopeResolver } from "@hookform/resolvers/nope"
import { useMutation } from "@apollo/client"
import { MutateOrganizationDocument } from "../../../generated/graphql"
import Nope from "nope-validator"

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
})

const NewBulletinSchema = Nope.object().shape({
  title: Nope.string(),
  text: Nope.string(),
})

export const NewBulletin = () => {
  const router = useRouter()

  const {
    register,
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(NewBulletinSchema) })

  const [mutate] = useMutation(MutateOrganizationDocument, {
    onError: (e) => setError("backend", { type: "custom", message: "Serverfeil. Rapport:\n" + e.toString() }),
    onCompleted: (data) => router.push(`/admin/bulletins/${data.organization.id}`),
  })

  const onSubmit = async (newOrg: FieldValues) => await mutate({ variables: { organization: newOrg } })

  return (
    <div>
      <Meta meta={{ title: "Ny bulletin" }} />
      <Link href={"/admin"} passHref>
        <a>
          <h1>Administratorfunksjoner</h1>
        </a>
      </Link>
      <h2>Ny bulletin</h2>
      <AdminFieldSet>
        <TextField fullWidth id="outlined-basic" label="Tittel" variant="outlined" {...register("title")} />
        <div style={{ width: "100%" }}>
          <p>Venstre: Markdown-kode, høyre: Forhåndsvisning</p>
          <Controller
            control={control}
            name="test"
            render={({ field: { onChange, onBlur, value } }) => (
              <MDEditor value={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name={"backend"}
          render={({ message }) => <code className={"backendError"}>{message}</code>}
        />
        <Button variant="contained" endIcon={<Save />} onClick={handleSubmit(onSubmit)}>
          Publiser
        </Button>
      </AdminFieldSet>
    </div>
  )
}

export default NewBulletin
