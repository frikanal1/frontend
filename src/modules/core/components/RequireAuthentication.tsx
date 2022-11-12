import { styled } from "@mui/system"
import { Meta } from "src/modules/core/components/Meta"
import { SVGIcon } from "src/modules/ui/components/SVGIcon"
import React, { useContext } from "react"
import UserContext from "../../../refactor/UserContext"

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 64px;

  > h1 {
    font-size: 1.4em;
    font-weight: 600;
  }
  > h2 {
    font-size: 1.1em;
    font-weight: 500;

    margin-bottom: 32px;
  }

  > svg {
    color: orange;
    width: 64px;
    height: 64px;

    margin-bottom: 32px;
  }
`

// TODO: Generate 401 somehow
export const RequireAuthentication = ({ children }: { children: React.ReactNode }) => {
  const { session } = useContext(UserContext)

  if (session?.authenticated) return <>{children}</>

  return (
    <Container>
      <Meta
        meta={{
          title: "Logg inn",
          description: "Denne siden krever innlogging",
        }}
      />
      <SVGIcon name="lock" />
      <h1>Hvem der?</h1>
      <h2>Du må være logget inn for å kunne bruke denne siden.</h2>
    </Container>
  )
}
