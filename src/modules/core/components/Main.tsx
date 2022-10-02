import { styled } from "@mui/system"
import React from "react"
import { mainContentStyle } from "../styles/mainContentStyle"

export const Container = styled("main")`
  display: flex;
  justify-content: center;

  flex-grow: 1;
  margin-bottom: auto;
  ${mainContentStyle}
`

export function Main(props: React.PropsWithChildren<{}>) {
  const { children } = props

  return <Container>{children}</Container>
}
