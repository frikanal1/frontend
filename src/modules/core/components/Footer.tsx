import { styled } from "@mui/system"
import { ExternalLink } from "src/modules/ui/components/ExternalLink"
import { mainContentStyle } from "../styles/mainContentStyle"

export const Container = styled("footer")`
  ${mainContentStyle}

  display: flex;
  > span {
    flex: 1;
    color: ${(props) => props.theme.palette.text.secondary};
  }
`

const Link = styled(ExternalLink)`
  margin-left: 16px;
`

export function Footer() {
  return (
    <Container>
      <span>© 2009 - {new Date().getFullYear()} Foreningen Frikanalen</span>
      <nav>
        <Link href="https://github.com/Frikanalen/frikanalen">GitHub</Link>
        <Link href="https://frikanalen.no/api/">API</Link>
        <Link href="https://frikanalen.no/xmltv/">XMLTV</Link>
      </nav>
    </Container>
  )
}
