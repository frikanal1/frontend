import { styled } from "@mui/system"
import { ButtonList } from "src/modules/ui/components/ButtonList"
import { PropsWithChildren } from "react"

export const Container = styled(ButtonList)`
  justify-content: flex-end;
`

export function Actions(props: PropsWithChildren<{}>) {
  return <Container horizontal>{props.children}</Container>
}
