import React from "react"
import { Logo } from "./Logo"
import { NavLinks } from "./NavLinks"
import Link from "next/link"

// margins to "crop" logo to text: lg:ml-[-113px] lg:mb-[-55px]
export const Header = () => (
  <header className={`py-5 lg:pb-4 lg:pt-24`}>
    <Link href={"/"} passHref>
      <a>
        <Logo className={"w-72 lg:w-[500px] cursor-pointer"} />
      </a>
    </Link>
    <NavLinks className={"flex align-center text-2xl pt-10 py-3"} />
  </header>
)
