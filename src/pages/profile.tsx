import React, { useContext, useState } from "react"
import { RequireAuthentication } from "src/modules/core/components/RequireAuthentication"
import { Meta } from "src/modules/core/components/Meta"
import UploadPage from "./organization/[orgId]/upload"
import { UserMenu, UserMenuSelector, UserMenuState } from "../refactor/UserMenu"
import { ModuleHeading } from "src/refactor/ModuleHeading"
import userContext from "../refactor/UserContext"

const OrgSelector = () => {
  const { activeOrganization, setActiveOrganization, session } = useContext(userContext)
  return (
    <div>
      <h2 className={"text-3xl py-2"}>Velg aktiv organisasjon</h2>
      <p className={"text-3xl py-2"}>Placeholder, skal bli bedre!</p>
      <div>
        {session?.user?.roles.map((x, idx) => (
          <div
            key={idx}
            onClick={() => setActiveOrganization(x.organization.id)}
            className={activeOrganization == x.organization.id ? "bg-black text-red-400" : ""}
          >
            {x.role} {x.organization.name}
          </div>
        ))}
      </div>
    </div>
  )
}

function Profile() {
  const { activeOrganization } = useContext(userContext)

  const [currentMenu, setCurrentMenu] = useState<UserMenuState>("newVideo")

  const buildMenu = (): UserMenu => ({
    newVideo: {
      title: "Ny video",
      menu: <UploadPage orgId={activeOrganization || ""} />,
    },
    organizations: { title: "Organisasjoner", menu: <OrgSelector /> },
    profile: { title: "Profil", menu: <div>Profile</div> },
  })

  const userMenu = buildMenu()

  return (
    <div className={"w-full"}>
      <ModuleHeading>Meny</ModuleHeading>
      <div className={"flex w-full"}>
        <Meta
          meta={{
            title: "Brukermeny",
            description: "",
          }}
        />
        <UserMenuSelector className={"basis-1/3"} onSelect={setCurrentMenu} menu={userMenu} />
        <div className={"grow"}>{userMenu[currentMenu].menu}</div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <RequireAuthentication>
      <Profile />
    </RequireAuthentication>
  )
}
