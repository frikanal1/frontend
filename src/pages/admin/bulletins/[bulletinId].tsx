import { ParsedUrlQuery } from "querystring"
import { GetServerSideProps } from "next"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import { MDEditorProps } from "@uiw/react-md-editor"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { TextField } from "@mui/material"
import Link from "next/link"
import { Meta } from "../../../modules/core/components/Meta"
import { AdminFieldSet } from "../../../modules/form/components/AdminFieldSet"
import { useMutation, useQuery } from "@apollo/client"
import { GetBulletinDocument, UpdateBulletinDocument } from "../../../generated/graphql"
import { SaveButton } from "../../../modules/form/components/SaveButton"

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
})

interface BulletinDetailParams extends ParsedUrlQuery {
  bulletinId: string
}

interface BulletinDetailProps {
  bulletinId: string
}

export const BulletinDetail = ({ bulletinId }: BulletinDetailProps) => {
  const [text, setText] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const { data } = useQuery(GetBulletinDocument, {
    variables: { bulletinId },
    onCompleted: (data) => {
      setTitle(data.bulletin.title)
      setText(data.bulletin.text)
    },
  })
  const [mutate] = useMutation(UpdateBulletinDocument)

  const bulletin = data?.bulletin

  if (!bulletin) return null

  const saveBulletin = async () => {
    setIsSaving(true)

    await mutate({ variables: { bulletin: { text, title }, bulletinId } })

    setIsSaving(false)
  }

  return (
    <div>
      <Meta meta={{ title: "Rediger bulletin" }} />
      <Link href={"/admin"} passHref>
        <a>
          <h1>Administratorfunksjoner</h1>
        </a>
      </Link>
      <h2>Rediger bulletin</h2>
      <AdminFieldSet>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Tittel"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <p>Venstre: Markdown-kode, høyre: Forhåndsvisning</p>
        <MDEditor value={text} onChange={setText} />
        <SaveButton isSaving={isSaving} onSave={saveBulletin} />
      </AdminFieldSet>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<BulletinDetailProps> = async (ctx) => {
  const { bulletinId } = ctx.params as BulletinDetailParams

  return { props: { bulletinId } }
}

export default BulletinDetail
