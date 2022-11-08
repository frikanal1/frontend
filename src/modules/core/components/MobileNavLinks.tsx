import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import MenuIcon from "@mui/icons-material/Menu"
import { NavLink, NewUserThingie } from "./NavLinks"
import { ReactNode } from "react"

const MobileNavLink = ({ children, href, className }: { children: ReactNode; href?: string; className?: string }) => (
  <DropdownMenu.Item>
    <NavLink className={"text-right my-0 md:px-3 block " + (className || "")} href={href}>
      {children}
    </NavLink>
  </DropdownMenu.Item>
)

export const MobileNavLinks = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className={"bg-gradient-to-tl from-red-300 to-red-200 p-2 rounded-[50%] leading-5"}>
            <MenuIcon />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <div className={"bg-green-100 p-4 mr-3 rounded-lg border-2 border-green-600/50"}>
              <MobileNavLink href={"/"}>Direkte</MobileNavLink>
              <MobileNavLink href={"/schedule"}>Sendeplan</MobileNavLink>
              <MobileNavLink href={"/about"}>Om oss</MobileNavLink>
              <MobileNavLink>
                <NewUserThingie />
              </MobileNavLink>
              <DropdownMenu.Arrow />
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

export default MobileNavLinks
