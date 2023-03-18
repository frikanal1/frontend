import userContext from "../UserContext"
import { RoleType } from "../../generated/graphql"
import { USER_MENU, UserPageMeta } from "../UserMenu"
import React, { useContext, useMemo } from "react"
import { MenuItem, Select } from "@mui/material"
import { AboutLink } from "../../modules/core/components/aboutLinkBar"

const OrgSelector = () => {
  const { activeOrganization, setActiveOrganization, session } = useContext(userContext)

  const orgNames = useMemo<Record<string, string>>(() => {
    const roles = session?.user?.roles
    if (!roles) return {}
    return roles.map(({ organization: { id, name } }) => ({ [id]: name }))
  }, [session])

  return (
    <>
      <Select
        className={"bg-white"}
        fullWidth
        defaultValue={activeOrganization?.id}
        onChange={(e) => {
          const id = e.target.value
          const name = orgNames[id]

          setActiveOrganization({ id, name })
        }}
      >
        {session?.user?.roles.map((x, idx) => (
          <MenuItem key={idx} value={x.organization.id} data-name={x.organization.name}>
            {x.organization.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
export const OrgMenu = () => {
  const { session } = useContext(userContext)

  return (
    <form>{(session?.user?.roles?.filter((x) => x.role === RoleType.Editor)?.length || 0) > 0 && <OrgSelector />}</form>
  )
}

const UserTopMenu = () => {
  return (
    <div className={"text-xl lg:text-2xl flex py-2 pb-3 mt-1 gap-4"}>
      {Object.entries(USER_MENU).map(([href, string]) => (
        <AboutLink key={href} to={href}>
          {string}
        </AboutLink>
      ))}
    </div>
  )
}

function UserPageSidebar() {
  const { session } = useContext(userContext)

  return (
    <div className={"basis-1/4 shrink-0"}>
      <div className={"bg-gradient-to-t from-orange-500 to-orange-300 p-4 drop-shadow-xl"}>
        <div>Aktiv organisasjon:</div>
        <div>
          {session?.user?.roles.length ? <OrgMenu /> : <span className={"italic-semi"}>ingen organisasjon</span>}
        </div>
      </div>
    </div>
  )
}

// Base component for pages under the /user layout.
export const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserPageMeta />
      <UserTopMenu />
      <div className={"flex flex-col lg:flex-row w-full pt-0 lg:pt-2 gap-4 lg:gap-8"}>
        <div className={"grow"}>{children}</div>
        <UserPageSidebar />
      </div>
    </>
  )
}
