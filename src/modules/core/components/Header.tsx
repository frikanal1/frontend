import React from "react"
import { styled } from "@mui/system"
import { Logo } from "./Logo"
import { HeaderAuthBar } from "./HeaderAuthBar"
import { mainContentStyle } from "../styles/mainContentStyle"
import { GENERAL_BREAKPOINT } from "../constants"
import { NavLinks } from "./NavLinks"
import Link from "next/link"

const Outer = styled("header")`
  margin: 3em 0;
  @media (max-width: ${GENERAL_BREAKPOINT}) {
    margin: 1em 0;
  }
  width: 100%;

  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled("div")`
  ${mainContentStyle}
`

const HeaderNavRow = styled("div")`
  display: flex;
  align-items: center;
  margin-top: 3em;
  margin-bottom: 1em;
`

const Nav = styled("nav")`
  display: flex;
  align-items: center;

  @media (max-width: ${GENERAL_BREAKPOINT}) {
  }
`

const LogoContainer = styled("div")`
  display: flex;
  cursor: pointer;

  @media (max-width: ${GENERAL_BREAKPOINT}) {
    justify-content: center;
  }
`

const SizedLogo = styled(Logo)`
  width: 400px;

  @media (max-width: 800px) {
    width: 60vw;
    min-width: 250px;
    max-width: 400px;

    margin-bottom: 24px;
  }
`

export function Header() {
  return (
    <Outer>
      <Container>
        <Link href={"/"} passHref>
          <LogoContainer>
            <SizedLogo />
          </LogoContainer>
        </Link>
        <HeaderNavRow>
          <Nav>
            <NavLinks />
          </Nav>
          <HeaderAuthBar />
        </HeaderNavRow>
      </Container>
    </Outer>
  )
}
