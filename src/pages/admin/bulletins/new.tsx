import { MDEditorProps } from "@uiw/react-md-editor"
import { bold, italic } from "@uiw/react-md-editor/lib/commands"
import dynamic from "next/dynamic"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useState } from "react"
import { Save } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { NewBulletinForm } from "../../../modules/bulletins/types"
import { useManager } from "../../../modules/state/manager"
const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
})

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
      <h1>Administratorfunksjoner</h1>
      <h2>Bulletins</h2>
      <h3>Ny bulletin</h3>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Tittel"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MDEditor value={text} onChange={setText} commands={[bold, italic]} />
      <Button variant="contained" endIcon={<Save />} onClick={saveBulletin}>
        Publiser
      </Button>
    </div>
  )
}

export default NewBulletin
