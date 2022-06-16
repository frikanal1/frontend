import { MDEditorProps } from "@uiw/react-md-editor"
import dynamic from "next/dynamic"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import React, { useState } from "react"
import { Save } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { NewBulletinForm } from "../../../modules/bulletins/types"
import { useManager } from "../../../modules/state/manager"
import Link from "next/link"
import { styled } from "@mui/system"
import { Meta } from "../../../modules/core/components/Meta"

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
})

const FieldSet = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`

export const NewBulletin = () => {
  const [text, setText] = useState<string>()
  const [title, setTitle] = useState<string>()
  const { api } = useManager().stores.networkStore

  const saveBulletin = async () => {
    // FIXME: No error handling
    await api.post<NewBulletinForm>("/bulletins", { title, text })
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
      <FieldSet>
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
        <Button variant="contained" endIcon={<Save />} onClick={saveBulletin}>
          Publiser
        </Button>
      </FieldSet>
    </div>
  )
}

export default NewBulletin
