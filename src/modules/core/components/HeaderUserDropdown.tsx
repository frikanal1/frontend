import { css } from "@emotion/react"
import { styled } from "@mui/system"

import { SVGIcon, SVGIconWithProps } from "src/modules/ui/components/SVGIcon"
import { useRef, useState } from "react"
import { HeaderUserPopover } from "./HeaderUserPopover"
import { Maybe, UserSessionFragment } from "../../../generated/graphql"
import { GENERAL_BREAKPOINT } from "../constants"

const Container = styled("div")`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.secondary};

  cursor: pointer;
  transition: 200ms ease color;

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

const Name = styled("span")`
  font-size: 1.2em;
  font-weight: 600;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  max-width: 300px;

  @media (max-width: ${GENERAL_BREAKPOINT}) {
    max-width: 170px;
  }
  @media (max-width: 700px) {
    display: none;
  }
`

const Icon = styled(SVGIcon as SVGIconWithProps<{ flipped: boolean }>)`
  width: 24px;
  height: 24px;

  margin-left: 8px;
  transition: 200ms ease transform;

  ${(props) =>
    props.flipped
      ? css`
          transform: rotate(180deg);
        `
      : null}
`

export type HeaderUserDropdownProps = {
  session?: Maybe<UserSessionFragment>
}

export const HeaderUserDropdown = ({ session }: HeaderUserDropdownProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const user = session?.user

  if (!user) return null

  const { email, firstName } = user

  return (
    <Container onClick={() => setMenuOpen(true)} ref={ref}>
      <Name>Hei, {firstName || email}!</Name>
      <Icon flipped={menuOpen} name="chevronDown" />
      <HeaderUserPopover anchorEl={ref.current} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </Container>
  )
}
