import Link from "next/link"
import React from "react"
import { Section } from "../modules/ui/components/Section"
import { UserRolesFragment } from "../generated/graphql"
import { Button } from "@mui/material"
import { styled } from "@mui/system"
import { UserRoleCard } from "../modules/ui/components/UserRoleCard"

interface UserRoleListProps {
  roles?: Array<UserRolesFragment>
}

const OrganizationList = styled(Section)`
  width: 350px;
  > * {
    margin-top: 1em;
  }
  > div > button {
    width: 100%;
  }
`

export const UserRoleList = ({ roles }: UserRoleListProps) => (
  <OrganizationList icon="officeBuilding" title="Organisasjoner du er medlem av">
    {roles?.map((r, idx) => (
      <UserRoleCard key={idx} role={r} />
    ))}
    <div>
      <Button variant={"outlined"}>
        <Link href={"/organization/new"} passHref>
          Ny organisasjon
        </Link>
      </Button>
    </div>
  </OrganizationList>
)
