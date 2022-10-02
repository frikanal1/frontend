import { styled } from "@mui/system"
import { PropsWithChildren } from "react"
import { ExternalLink } from "./ExternalLink"

const Container = styled("figure")`
  margin: 24px auto;
  max-width: 800px;
`

const Block = styled("blockquote")`
  font-size: 1.2em;
  font-style: italic;

  color: ${(props) => props.theme.palette.text.secondary};
`

const Caption = styled("figcaption")`
  text-align: right;
`

export type QuoteProps = PropsWithChildren<{
  className?: string
  citation: {
    name: string
    href: string
  }
}>

export function Quote(props: QuoteProps) {
  const { className, children, citation } = props

  return (
    <Container className={className}>
      <Block cite={citation.href}>«{children}»</Block>
      <Caption>
        — <ExternalLink href={citation.href}>{citation.name}</ExternalLink>
      </Caption>
    </Container>
  )
}
