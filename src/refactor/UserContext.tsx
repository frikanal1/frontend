import React, { useState, createContext } from "react"
import { useQuery } from "@apollo/client"
import { GetSessionDocument, Maybe, UserSessionFragment } from "../generated/graphql"

const UserContext = createContext<{ session?: Maybe<UserSessionFragment> }>({})

export const UserProvider = ({ children }: { children?: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<Maybe<UserSessionFragment> | undefined>()

  useQuery(GetSessionDocument, {
    onCompleted: (data) => setCurrentUser(data.session),
    onError: () => setCurrentUser(null),
  })

  return <UserContext.Provider value={{ session: currentUser }}>{children}</UserContext.Provider>
}

export default UserContext
