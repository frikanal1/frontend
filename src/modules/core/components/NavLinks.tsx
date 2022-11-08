import Link from "next/link"
import { useRouter } from "next/router"
import React, { ReactNode, useContext, useRef, useState } from "react"
import { Login } from "src/refactor/Login"
import UserContext from "../../../refactor/UserContext"
import { Popover } from "@mui/material"

// FIXME: Resolve duplication here between AboutLink and this
export const NavLink = ({ children, href, className }: { children: ReactNode; href?: string; className?: string }) => {
  const router = useRouter()
  const linkRef = useRef<HTMLAnchorElement>(null)

  const active = router.pathname.split("/")[1] == href?.slice(1)

  const baseStyle = "font-black transition border-b-4 leading-8  "
  const linkStyle = active
    ? "text-[#E88840] " + (href !== "/" ? "hover:border-b-[#E88840]/50 border-b-[#E88840] " : " border-b-transparent ")
    : "border-b-transparent text-gray-600 hover:text-gray-800 "

  return (
    <a ref={linkRef} href={href} className={baseStyle + linkStyle + className}>
      {children}
    </a>
  )
}

export const UserLinkOrLoginButton = () => {
  const { session } = useContext(UserContext)
  const [loginOpen, setLoginOpen] = useState<boolean>(false)

  return session?.user ? (
    <Link href={"/user"} passHref legacyBehavior>
      <NavLink>Brukermeny</NavLink>
    </Link>
  ) : (
    <div onClick={() => setLoginOpen(true)}>
      <Popover open={loginOpen}>
        <Login onCancel={() => setLoginOpen(false)} onSuccess={() => setLoginOpen(false)} />
      </Popover>
      <NavLink>Logg inn</NavLink>
    </div>
  );
}

export function NavLinks({ className }: { className?: string }) {
  return (
    <nav className={className}>
      <Link href={"/"} passHref legacyBehavior>
        <NavLink>Direkte</NavLink>
      </Link>
      <Link href={"/video"} passHref legacyBehavior>
        <NavLink>Arkiv</NavLink>
      </Link>
      <Link href={"/schedule"} passHref legacyBehavior>
        <NavLink>Sendeplan</NavLink>
      </Link>
      <Link href={"/about"} passHref legacyBehavior>
        <NavLink>Om oss</NavLink>
      </Link>
      <UserLinkOrLoginButton />
    </nav>
  );
}
