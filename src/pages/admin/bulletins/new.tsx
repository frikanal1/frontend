import { MDEditorProps } from "@uiw/react-md-editor"
import dynamic from "next/dynamic"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import React, { useState } from "react"
import { Save } from "@mui/icons-material"
import { Alert, Button, TextField } from "@mui/material"
import { BulletinData } from "../../../modules/bulletins/types"
import { useManager } from "../../../modules/state/manager"
import Link from "next/link"
import { Meta } from "../../../modules/core/components/Meta"
import { AdminFieldSet } from "../../../modules/form/components/AdminFieldSet"
import { useRouter } from "next/router"

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
})

export const NewBulletin = () => {
  const [text, setText] = useState<string>()
  const [title, setTitle] = useState<string>("")
  const { api } = useManager().stores.networkStore
  const [error, setError] = useState<string>()
  const router = useRouter()

  const saveBulletin = async () => {
    try {
      const { data } = await api.post<BulletinData>("/bulletins", { title, text: text ?? "" })
      await router.push(`${data.id}`)
    } catch (e: any) {
      setError(e.toString() + ":\n" + e.response.data.message)
      return
    }
  }

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
        <TextField
          fullWidth
          id="outlined-basic"
          label="Tittel"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={{ width: "100%" }}>
          <p>Venstre: Markdown-kode, høyre: Forhåndsvisning</p>
          <MDEditor value={text} onChange={setText} />
        </div>
        {error && (
          <Alert severity="error" sx={{ whiteSpace: "pre-wrap" }}>
            {error}
          </Alert>
        )}
        <Button variant="contained" endIcon={<Save />} onClick={saveBulletin}>
          Publiser
        </Button>
      </AdminFieldSet>
    </div>
  )
}

export default NewBulletin
