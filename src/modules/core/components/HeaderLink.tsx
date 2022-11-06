import { css } from "@emotion/react"
import { styled } from "@mui/system"
import Link from "next/link"
import { useRouter } from "next/router"
import { MOBILE_MENU_THRESHOLD } from "../constants"

type Accent = "primary" | "secondary"

const Anchor = styled("a")<{ active: string; accent: Accent }>`
  font-weight: 900;
  font-size: 1.4em;

  margin-right: 24px;
  color: ${(props) => props.theme.palette.text.secondary};

  transition: 200ms ease color;
  position: relative;

  &:after {
    content: "";
    display: block;

    position: absolute;
    left: 0px;
    right: 0px;
    bottom: -2px;

    height: 3px;
    background: transparent;
    border-radius: 3px;

    transition: 200ms ease all;
    transform-origin: 0 0;
    transform: scaleX(0);
  }

  @media (max-width: ${MOBILE_MENU_THRESHOLD}px) {
    min-width: 200px;

    margin-right: 12px;
    padding: 12px 24px;

    font-size: 1.2em;

    &:after {
      height: 100%;
      width: 3px;

      right: 0px;
      left: revert;
      bottom: revert;
      top: 0px;
    }
  }

  ${(props) => {
    if (props.active === "true") {
      const accent = props.theme.palette[props.accent].main

      return css`
        color: ${accent};

        &:hover {
          color: ${accent};
        }

        &:after {
          background: ${accent};
          transform: scaleX(1);
        }
      `
    } else {
      return css`
        &:hover {
          color: ${props.theme.palette.text.primary};
        }
      `
    }
  }}
`

export type HeaderLinkProps = {
  to: string
  label: string
  accent: Accent
}

export function HeaderLink({ to, label, accent }: HeaderLinkProps) {
  const router = useRouter()
  const active = router.pathname == to

  return (
    <Link href={to} passHref>
      <Anchor accent={accent} active={active.toString()}>
        {label}
      </Anchor>
    </Link>
  )
}
