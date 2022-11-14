import Link from "next/link"
import { useRouter } from "next/router"
import React, { ReactNode, useContext } from "react"
import UserContext from "../../../refactor/UserContext"

// FIXME: Resolve duplication here between AboutLink and this
export const NavLink = ({ children, href, className }: { children: ReactNode; href: string; className?: string }) => {
  const router = useRouter()
  const active = (href?: string) => router.pathname.split("/")[1] == href?.slice(1)

  const baseStyle = "font-black transition border-b-4 leading-8  "
  const linkStyle = active(href)
    ? "text-[#E88840] " + (href !== "/" ? "hover:border-b-[#E88840]/50 border-b-[#E88840] " : " border-b-transparent ")
    : "border-b-transparent text-gray-600 hover:text-gray-800 "

  const mergedStyle = [baseStyle, linkStyle, className].join(" ")

  return (
    <Link href={href} className={mergedStyle}>
      {children}
    </Link>
  )
}

export const UserLinkOrLoginButton = ({ className = "" }: { className?: string }) => {
  const { session } = useContext(UserContext)

  switch (session) {
    case undefined:
      return null
    case null:
      return (
        <NavLink className={className} href={"/login"}>
          Logg inn
        </NavLink>
      )
    default:
      return (
        <NavLink className={className} href={"/user"}>
          Brukermeny
        </NavLink>
      )
  }
}

export const MAIN_MENU: Record<string, string> = {
  "/": "Direkte",
  "/video": "Arkiv",
  "/schedule": "Sendeplan",
  "/about": "Om oss",
}

export function NavLinks({ className }: { className?: string }) {
  return (
    <nav className={className}>
      {Object.entries(MAIN_MENU).map(([href, title]) => (
        <NavLink key={href} href={href}>
          {title}
        </NavLink>
      ))}
      <UserLinkOrLoginButton />
    </nav>
  )
}
