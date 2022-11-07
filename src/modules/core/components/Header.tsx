import React from "react"
import { Logo } from "./Logo"
import { NavLinks } from "./NavLinks"
import Link from "next/link"

// margins to "crop" logo to text: lg:ml-[-113px] lg:mb-[-55px]
export const Header = () => (
  <header className={``}>
    <Link href={"/"} passHref>
      <a>
        <Logo className={"w-72 xl:w-[500px] cursor-pointer"} />
      </a>
    </Link>
    <NavLinks className={"flex align-center text-xl xl:text-3xl  pt-4"} />
  </header>
)
