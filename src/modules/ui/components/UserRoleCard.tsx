import Link from "next/link"
import React from "react"
import { RoleType, UserRolesFragment } from "../../../generated/graphql"
import { Button, Card, CardActions, CardHeader } from "@mui/material"

export type OrganizationRoleItemProps = {
  role: UserRolesFragment
}

const RoleName: Record<RoleType, string> = { EDITOR: "Redaktør", MEMBER: "Medlem" }

export const UserRoleCard = ({ role }: OrganizationRoleItemProps) => (
  <Card variant={"outlined"} sx={{ width: "100%;" }}>
    <CardHeader
      title={
        <Link href={`/organization/${role.organization.id}`} passHref>
          {role.organization.name}
        </Link>
      }
      subheader={RoleName[role.role]}
    />

    <CardActions>
      <Button size={"small"}>
        <Link href={`/organization/${role.organization.id}/upload`}>Ny video</Link>
      </Button>
    </CardActions>
  </Card>
)
