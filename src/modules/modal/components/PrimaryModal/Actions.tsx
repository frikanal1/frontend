import { ButtonGroup } from "@mui/material"
import { styled } from "@mui/system"
import { PropsWithChildren } from "react"

export const Container = styled(ButtonGroup)`
  justify-content: flex-end;
`

export function Actions(props: PropsWithChildren<{}>) {
  return <Container>{props.children}</Container>
}
