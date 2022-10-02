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
import { AdminFieldSet } from "../../../modules/core/components/AdminFieldSet"
import { useMutation, useQuery } from "@apollo/client"
import { GetBulletinDocument, UpdateBulletinDocument } from "../../../generated/graphql"
import { SaveButton } from "../../../modules/core/components/SaveButton"
import { RequireAuthentication } from "../../../modules/core/components/RequireAuthentication"

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

  const { data } = useQuery(GetBulletinDocument, {
    variables: { bulletinId },
    onCompleted: (data) => {
      setTitle(data.bulletin.title)
      setText(data.bulletin.text)
    },
  })
  const [mutate, { loading }] = useMutation(UpdateBulletinDocument)

  const bulletin = data?.bulletin

  if (!bulletin) return null

  const saveBulletin = async () => mutate({ variables: { bulletin: { id: bulletinId, text, title } } })

  return (
    <RequireAuthentication>
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
        <SaveButton isSaving={loading} onSave={saveBulletin} />
      </AdminFieldSet>
    </RequireAuthentication>
  )
}

export const getServerSideProps: GetServerSideProps<BulletinDetailProps> = async (ctx) => {
  const { bulletinId } = ctx.params as BulletinDetailParams

  return { props: { bulletinId } }
}

export default BulletinDetail
