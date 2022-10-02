import { MixEffectsBusInput } from "../types"
import { Button, ButtonGroup } from "@mui/material"

export type ATEMControlsProps = {
  inputs: MixEffectsBusInput[]
  index: number
  onChange: (index: number) => void
}

export function ATEMControls(props: ATEMControlsProps) {
  const { inputs, index, onChange } = props

  return (
    <ButtonGroup>
      {inputs.map((input) => (
        <Button
          key={input.index}
          variant={index === input.index ? "contained" : "outlined"}
          onClick={() => onChange(input.index)}
        >
          {input.name}
        </Button>
      ))}
    </ButtonGroup>
  )
}
