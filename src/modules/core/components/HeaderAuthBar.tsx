import { styled } from "@mui/system"

import React, { useContext, useState } from "react"
import { HeaderUserDropdown } from "./HeaderUserDropdown"
import UserContext from "../../../refactor/UserContext"
import { Login } from "../../../refactor/Login"
import { Button } from "@mui/material"

const Container = styled("div")`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  flex-shrink: 1;
`

export const HeaderAuthBar = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const { session } = useContext(UserContext)

  if (session === undefined) return null

  if (session !== null) {
    return (
      <Container>
        <HeaderUserDropdown session={session} />
      </Container>
    )
  } else {
    return (
      <Container>
        <Login open={showLogin} onClose={() => setShowLogin(false)} />
        <Button variant="outlined" onClick={() => setShowLogin(true)}>
          Logg inn
        </Button>
      </Container>
    )
  }
}
