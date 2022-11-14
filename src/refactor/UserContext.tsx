import React, { useState, createContext } from "react"
import { useQuery } from "@apollo/client"
import { GetSessionDocument, Maybe, RoleType, UserSessionFragment } from "../generated/graphql"

// TODO: This should be a reducer of some sort
type UserContextType = {
  session?: Maybe<UserSessionFragment>

  activeOrganization: Maybe<activeOrg>
  setActiveOrganization: (activeOrganization: activeOrg) => void
}

interface activeOrg {
  id: string
  name: string
}

const UserContext = createContext<UserContextType>({
  activeOrganization: null,
  setActiveOrganization: () => {},
})

export const UserProvider = ({ children }: { children?: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<Maybe<UserSessionFragment> | undefined>()
  const [activeOrganization, setActiveOrganization] = useState<Maybe<activeOrg>>(null)

  // Ensures that the active organization is correct for the user, defaults to the first
  // organization (which will be the only organization for most users)
  const refreshActiveOrganization = (session: UserSessionFragment) => {
    if (!session?.user?.roles?.length) {
      setActiveOrganization(null)
    } else {
      if (
        !activeOrganization ||
        !session.user.roles.filter(({ organization: { id } }) => id === activeOrganization.id).length
      ) {
        const firstAndBestOrganization =
          session.user.roles.find(({ role }) => role === RoleType.Editor)?.organization || null

        if (firstAndBestOrganization) {
          setActiveOrganization(firstAndBestOrganization)
        } else {
          setActiveOrganization(null)
        }
      }
    }
  }

  useQuery(GetSessionDocument, {
    onCompleted: ({ session }) => {
      setCurrentUser(session)
      refreshActiveOrganization(session)
    },
    onError: () => setCurrentUser(null),
  })

  return (
    <UserContext.Provider value={{ session: currentUser, activeOrganization, setActiveOrganization }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
