import React, { useContext, useState } from "react"
import { Meta } from "src/modules/core/components/Meta"
import UploadVideoDialog from "../refactor/UploadVideoDialog"
import { UserMenu, UserMenuSelector, UserMenuState } from "../refactor/UserMenu"
import userContext from "../refactor/UserContext"
import { RoleType } from "../generated/graphql"

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

function Profile() {
  const { activeOrganization } = useContext(userContext)

  const [currentMenu, setCurrentMenu] = useState<UserMenuState>("newVideo")

  const buildMenu = (): UserMenu => ({
    newVideo: {
      title: "Ny video",
      menu: <UploadVideoDialog orgId={activeOrganization?.id || ""} />,
    },
    organizations: { title: "Organisasjoner", menu: <OrgMenu /> },
    profile: { title: "Profil", menu: <div>Profile</div> },
  })

  const userMenu = buildMenu()

  return (
    <div className={"w-full pt-4"}>
      <div className={"flex w-full gap-8"}>
        <Meta
          meta={{
            title: "Brukermeny",
            description: "",
          }}
        />
        <UserMenuSelector className={"basis-1/4 shrink-0"} onSelect={setCurrentMenu} menu={userMenu} />
        <div className={"grow"}>{userMenu[currentMenu].menu}</div>
      </div>
    </div>
  )
}

export default Profile
