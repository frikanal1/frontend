import { PrimaryPopover } from "src/modules/popover/components/PrimaryPopover"
import { usePopover } from "src/modules/popover/hooks/usePopover"
import { usePopoverContext } from "src/modules/popover/hooks/usePopoverContext"
import { Button, ButtonWithProps } from "src/modules/ui/components/Button"
import { SVGIcon } from "src/modules/ui/components/SVGIcon"
import { Router } from "next/router"
import { useEffect, useRef } from "react"
import { MOBILE_MENU_THRESHOLD } from "../constants"
import { NavLinks } from "./NavLinks"
import { styled } from "@mui/system"

const Container = styled("div")`
  display: none;

  @media (max-width: ${MOBILE_MENU_THRESHOLD}px) {
    display: block;
  }
`

const Menu = styled(Button as ButtonWithProps<{ active: string }>)`
  padding: 8px;

  border: solid 2px ${({ theme }) => theme.palette.divider};
  border-radius: 4px;

  color: ${({ theme }) => theme.palette.text.primary};
  transition: 200ms ease all;

  border-color: ${({ active, theme }) => (active === "true" ? theme.palette.primary.main : "default")};
`

const Hamburger = styled(SVGIcon)`
  width: 24px;
  height: 24px;
`

const PopoverContainer = styled(PrimaryPopover)`
  margin: 16px 0px;
  padding: 16px 0px;

  display: flex;
  flex-direction: column;
`

export function Popover() {
  const popover = usePopoverContext()

  useEffect(() => {
    const handleChange = async () => {
      popover.dismiss()
    }

    Router.events.on("routeChangeComplete", handleChange)
    return () => Router.events.off("routeChangeComplete", handleChange)
  })

  return (
    <PopoverContainer>
      <NavLinks />
    </PopoverContainer>
  )
}

export function MobileNav() {
  const ref = useRef<HTMLButtonElement>(null)

  const { toggle, active } = usePopover({
    ref,
    render: () => <Popover />,
    placement: "bottom-start",
  })

  return (
    <Container>
      <Menu active={active.toString()} onClick={toggle} ref={ref}>
        <Hamburger name="menu" />
      </Menu>
    </Container>
  )
}
