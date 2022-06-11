import { styled } from "@mui/system"
import React from "react"
import { mainContentStyle } from "../styles/mainContentStyle"

export const Container = styled("main")`
  display: flex;
  justify-content: center;

  flex-grow: 1;
  margin-top: 32px;
  margin-bottom: auto;
`

const Content = styled("main")`
  ${mainContentStyle}
`

export function Body(props: React.PropsWithChildren<{}>) {
  const { children } = props

  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  )
}
