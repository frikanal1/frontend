import { css } from "@emotion/react"
import { Theme } from "@mui/system"

export const linkStyle = (props: { theme: Theme }) => css`
  color: ${props.theme.palette.primary};

  &:hover {
    text-decoration: underline;
  }
`
