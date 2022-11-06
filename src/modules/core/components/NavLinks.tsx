import Link from "next/link"
import { useRouter } from "next/router"
import React, { useContext, useRef, useState } from "react"
import { Login } from "src/refactor/Login"
import UserContext from "../../../refactor/UserContext"

// FIXME: Resolve duplication here between AboutLink and this
const NavLink = ({ children, href, className }: { children: string; href?: string; className?: string }) => {
  const router = useRouter()
  const linkRef = useRef<HTMLAnchorElement>(null)

  const active = router.pathname == href

  const baseStyle = "min-w-fit font-black text-4xl mr-5 underline-offset-8 transition "
  const linkStyle = active ? "text-[#E88840] underline decoration-4 " : "text-gray-600 hover:text-gray-800 "

  return (
    <a ref={linkRef} href={href} className={baseStyle + linkStyle + className}>
      {children}
    </a>
  )
}

const NewUserThingie = () => {
  const { session } = useContext(UserContext)
  const [loginOpen, setLoginOpen] = useState<boolean>(false)

  if (session === undefined) return null

  return session?.user ? (
    <Link href={"/profile"} passHref>
      <NavLink>Brukermeny</NavLink>
    </Link>
  ) : (
    <div onClick={() => setLoginOpen(true)}>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
      <NavLink>Login</NavLink>
    </div>
  )
}

export function NavLinks() {
  return (
    <nav className="flex align-center text-2xl mt-10 mb-2 py-4">
      <Link href={"/"} passHref>
        <NavLink>Direkte</NavLink>
      </Link>
      <Link href={"/schedule"} passHref>
        <NavLink>Sendeplan</NavLink>
      </Link>
      <Link href={"/about"} passHref>
        <NavLink>Om oss</NavLink>
      </Link>
      <NewUserThingie />
    </nav>
  )
}
