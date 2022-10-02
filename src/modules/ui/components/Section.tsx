import { styled } from "@mui/system"
import { PropsWithChildren } from "react"
import { IconType } from "../types"
import { SVGIcon } from "./SVGIcon"

const Container = styled("section")`
  > header {
    margin: 1em 0;

    * {
      border: 0px solid black;
    }

    > h1 {
      font-size: 1em;
      font-weight: 500;

      > svg {
        width: 1.5em;
        margin-right: 8px;
        vertical-align: middle;
      }
    }
  }
`

export type SectionProps = PropsWithChildren<{
  className?: string
  title: string
  icon?: IconType
}>

export function Section({ className, title, icon, children }: SectionProps) {
  return (
    <Container className={className}>
      <header>
        <h1>
          {icon && <SVGIcon name={icon} />}
          {title}
        </h1>
      </header>
      {children}
    </Container>
  )
}
