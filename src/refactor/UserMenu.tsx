import Link from "next/link"
import { useRouter } from "next/router"
import { Meta } from "../modules/core/components/Meta"

export type UserMenuState = "/user" | "/user/organizations" | "/user/profile" | "/logout" | "/user/schedule"

export type UserMenu = Record<UserMenuState, string>

export const USER_MENU: UserMenu = {
  "/user": "Ny video",
  "/user/organizations": "Organisasjoner",
  "/user/profile": "Profil",
  "/user/schedule": "Sendeplan",
  "/logout": "Logg ut",
}

export const UserPageMeta = () => {
  const router = useRouter()

  return (
    <Meta
      meta={{
        title: `Brukermeny - ${USER_MENU[router.pathname as UserMenuState]}`,
        description: "",
      }}
    />
  )
}

export const UserMenuNavbox = ({ className = "" }: { className?: string }) => {
  const menuStyle = (active: boolean) =>
    "transition-all duration-100 hover:text-orange-700 drop-shadow-lg hover:shadow-md " +
    "p-2 md:p-3 xl:p-2 xl:pl-4 cursor-pointer font-extrabold font-wide border-b-4 " +
    (active
      ? " border-b-gray-700 bg-gradient-to-tl from-orange-400 to-orange-300 text-gray-900"
      : "border-b-gray-500 text-gray-700")

  const router = useRouter()

  return (
    <div className={["xl:text-xl font-bold min-h-[500px]", className].join(" ")}>
      {Object.entries(USER_MENU).map(([href, title]) => (
        <Link key={href} href={href}>
          <div key={href} className={menuStyle(router.pathname === href)}>
            {title}
          </div>
        </Link>
      ))}
    </div>
  )
}
