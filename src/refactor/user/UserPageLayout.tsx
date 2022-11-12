import userContext from "../UserContext"
import { RoleType } from "../../generated/graphql"
import { USER_MENU, UserMenuMeta } from "../UserMenu"
import React, { useContext } from "react"
import { AboutLink } from "../../pages/about"

const OrgSelector = () => {
  const { activeOrganization, setActiveOrganization, session } = useContext(userContext)
  return (
    <div className={"p-8"}>
      <h2 className={"text-3xl py-2"}>Velg aktiv organisasjon</h2>
      <div className={"flex flex-wrap"}>
        {session?.user?.roles.map((x, idx) => (
          <div
            key={idx}
            onClick={() => setActiveOrganization(x.organization)}
            className={
              "p-1 px-4 rounded-lg w-48 m-2 border-2 border-black " +
              (activeOrganization?.id == x.organization.id ? "bg-black text-green-200 border-green-300" : "")
            }
          >
            {x.organization.name}
          </div>
        ))}
      </div>
    </div>
  )
}
const OrgMenu = () => {
  const { session } = useContext(userContext)

  return (
    <div className="bg-gradient-to-b from-green-100 to-green-200">
      <h3 className="text-3xl bg-gradient-to-b from-green-800 to-green-900 font-bold text-green-100 px-8 py-5">
        Organisasjoner
      </h3>
      {(session?.user?.roles?.filter((x) => x.role === RoleType.Editor)?.length || 0) > 1 && <OrgSelector />}
    </div>
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

// Base component for pages under the /user layout.
export const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <UserTopMenu />
      <div className={"flex w-full pt-4 gap-8"}>
        <UserMenuMeta />
        <div className={"basis-1/5 shrink-0"}>
          <div className={"bg-gradient-to-t from-orange-500 to-orange-300 p-4 drop-shadow-xl"}>asdf</div>
        </div>
        <div className={"grow"}>{children}</div>
      </div>
    </div>
  )
}
