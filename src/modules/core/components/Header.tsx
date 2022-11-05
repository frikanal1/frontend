import React from "react"
import { Logo } from "./Logo"
import { HeaderAuthBar } from "./HeaderAuthBar"
import { NavLinks } from "./NavLinks"
import Link from "next/link"

export function Header() {
  return (
    <header className={`py-5 lg:py-16`}>
      <div>
        <Link href={"/"} passHref>
          <div>
            <Logo className={"w-72 lg:w-96 cursor-pointer"} />
          </div>
        </Link>
        <div className={"flex items-center py-2"}>
          <nav className="flex align-center">
            <NavLinks />
          </nav>
          <HeaderAuthBar />
        </div>
      </div>
    </header>
  )
}
