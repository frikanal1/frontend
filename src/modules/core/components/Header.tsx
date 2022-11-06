import React from "react"
import { Logo } from "./Logo"
import { HeaderAuthBar } from "./HeaderAuthBar"
import { NavLinks } from "./NavLinks"
import Link from "next/link"

export function Header() {
  return (
    <header className={`py-5 lg:py-2 lg:pt-24`}>
      <div>
        <Link href={"/"} passHref>
          <div>
            <Logo className={"w-72 lg:w-[500px] cursor-pointer"} />
          </div>
        </Link>
        <div className={"flex items-end py-10"}>
          <nav className="flex align-center text-2xl">
            <NavLinks />
          </nav>
          <HeaderAuthBar />
        </div>
      </div>
    </header>
  )
}
