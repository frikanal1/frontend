import { styled } from "@mui/system"
import React from "react"
import { Button, Dialog, TextField } from "@mui/material"
import Nope from "nope-validator"
import { nopeResolver } from "@hookform/resolvers/nope"
import { useForm, FieldValues } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import * as AspectRatio from "@radix-ui/react-aspect-ratio"

const Container = styled("div")`
  width: 650px;
  padding: 1em;
  .MuiTextField-root {
    display: block;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 1em;
    padding: 1em;
    padding-right: 0;
    justify-content: flex-end;
  }
`

const Preview = styled("div")`
  width: 100%;
  height: 100%;
  background-color: grey;
  background-size: cover;
`

export type TextSlideModalProps = {
  open: boolean
  onClose: () => any
}

const TextSlideFormSchema = Nope.object().shape({
  heading: Nope.string().min(1, "Må ha overskrift"),
  text: Nope.string(),
})

export const TextSlideEditorDialog = ({ open, onClose }: { open: boolean; onClose: () => any }) => {
  const {
    register,
    setError,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(TextSlideFormSchema) })

  const onSubmit = async (data: FieldValues) => {
    const serialized = JSON.stringify(data)
    try {
      await fetch("/playout/atem/poster/upload", { method: "post", body: serialized, credentials: "include" })
    } catch (e: any) {
      setError("backend", { type: "custom", message: "Serverfeil. Rapport:\n" + e.toString() })
    }
  }

  const previewURL = `/api/playout/atem/poster/preview?text=${encodeURIComponent(
    watch("text")
  )}&heading=${encodeURIComponent(watch("heading"))}`

  return (
    <Dialog open={open}>
      <Container>
        <h4>Sendingsplakat</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField margin={"normal"} autoFocus fullWidth label={"Overskrift"} {...register("heading")} />
          <ErrorMessage errors={errors} name={"heading"} />

          <TextField margin={"normal"} multiline fullWidth label={"Tekst"} {...register("text")} />
          <ErrorMessage errors={errors} name={"text"} />
          <AspectRatio.Root ratio={1.777}>
            <Preview style={{ backgroundImage: `url(${previewURL})` }} />
          </AspectRatio.Root>
          <div className={"buttons"}>
            <Button variant="contained" type={"submit"}>
              Lagre
            </Button>
            <Button variant="outlined" onClick={() => onClose()}>
              Lukk
            </Button>
          </div>
          <ErrorMessage errors={errors} name={"backend"} />
        </form>
      </Container>
    </Dialog>
  )
}
