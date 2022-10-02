import React, { useRef } from "react"
import { Button } from "@mui/material"

export type FileInputProps = {
  label: string
  accept?: string
  multiple?: boolean
  onChange?: (files: File[]) => void
}

export function FileInput(props: FileInputProps) {
  const { label, accept, multiple, onChange } = props
  const ref = useRef<HTMLInputElement>(null)

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget
    if (!files || !onChange) return

    onChange([...files])
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    const { current: input } = ref
    if (!input) return

    input.value = ""
    input.click()
  }

  return (
    <>
      <Button onClick={handleClick}>{label}</Button>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        ref={ref}
        hidden
        style={{ display: "none" }}
        onChange={handleFiles}
      />
    </>
  )
}
