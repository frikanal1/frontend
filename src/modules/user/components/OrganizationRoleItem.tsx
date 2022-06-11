import { styled } from "@mui/system"
import { Organization } from "src/modules/organization/resources/Organization"
import { InternalLink } from "src/modules/ui/components/InternalLink"
import Link from "next/link"
import React from "react"

const Container = styled("li")`
  & + & {
    margin-top: 24px;
  }
`

const Name = styled("h1")`
  font-size: 1.1em;
`

const RoleText = styled("h2")`
  font-size: 1em;
  font-weight: 400;
`

const Options = styled("div")`
  margin-top: 8px;
  display: flex;

  > a {
    margin-right: 12px;
  }
`

export type OrganizationRoleItemProps = {
  organization: Organization
  editor?: boolean
}

export function OrganizationRoleItem(props: OrganizationRoleItemProps) {
  const { organization, editor } = props

  const roleText = editor ? "Redaktør" : "Medlem"

  return (
    <Container>
      <Name>
        <Link href={`/organization/${organization.data.id}`} passHref>
          <a>{organization.data.name}</a>
        </Link>
      </Name>
      <RoleText>{roleText}</RoleText>
      <Options>
        <InternalLink href={`/organization/${organization.data.id}/upload`}>Last opp video</InternalLink>
      </Options>
    </Container>
  )
}
