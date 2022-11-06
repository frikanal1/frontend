import React from "react"
import { Logo } from "./Logo"
import { NavLinks } from "./NavLinks"
import Link from "next/link"
//lg:ml-[-113px] lg:mb-[-55px]
export function Header() {
  return (
    <header className={`py-5 lg:pb-4 lg:pt-24`}>
      <Link href={"/"} passHref>
        <a>
          <Logo className={"w-72 lg:w-[500px] cursor-pointer lg:mb-[-55px]"} />
        </a>
      </Link>
      <NavLinks />
    </header>
  )
}
