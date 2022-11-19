import { Meta } from "src/modules/core/components/Meta"
import { SVGIcon } from "src/modules/ui/components/SVGIcon"
import React, { useContext } from "react"
import UserContext from "../../../refactor/UserContext"

// TODO: Generate 401 somehow
export const RequireAuthentication = ({ children }: { children: React.ReactNode }) => {
  const { session } = useContext(UserContext)

  if (session?.authenticated) return <>{children}</>

  return (
    <div>
      <Meta
        meta={{
          title: "Logg inn",
          description: "Denne siden krever innlogging",
        }}
      />
      <SVGIcon name="lock" />
      <h1>Hvem der?</h1>
      <h2>Du må være logget inn for å kunne bruke denne siden.</h2>
    </div>
  )
}
