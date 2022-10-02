import React from "react"
import { styled } from "@mui/system"
import { RequireAuthentication } from "src/modules/auth/components/RequireAuthentication"
import { Meta } from "src/modules/core/components/Meta"
import { GetProfileDocument } from "../generated/graphql"
import { useQuery } from "@apollo/client"
import { UserProfileForm } from "../refactor/UserProfileForm"
import { UserRoleList } from "../refactor/UserRoleList"
import { USER_PROFILE_BREAKPOINT } from "../modules/core/constants"

const Container = styled("div")`
  width: 100%;
  > div {
    display: flex;

    @media (max-width: ${USER_PROFILE_BREAKPOINT}px) {
      flex-direction: column;
    }
  }
`

function Profile() {
  const query = useQuery(GetProfileDocument)
  const user = query.data?.session.user

  return (
    <Container>
      <h1>Din profil</h1>
      <Meta
        meta={{
          title: "Din profil",
          description: "",
        }}
      />
      <div>
        <UserProfileForm />
        <UserRoleList roles={user?.roles} />
      </div>
    </Container>
  )
}

export default function Page() {
  return (
    <RequireAuthentication>
      <Profile />
    </RequireAuthentication>
  )
}
