import LoadingButton from "@mui/lab/LoadingButton"
import { Save } from "@mui/icons-material"
import React from "react"

interface SaveButtonProps {
  isSaving?: boolean
  onSave: () => void
}

export const SaveButton = ({ isSaving, onSave }: SaveButtonProps) => (
  <LoadingButton loading={isSaving} loadingPosition="end" variant="contained" endIcon={<Save />} onClick={onSave}>
    Lagre
  </LoadingButton>
)
