import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import MenuIcon from "@mui/icons-material/Menu"
import { MAIN_MENU, NavLink, UserLinkOrLoginButton } from "./NavLinks"
import { ReactNode } from "react"

const MobileNavLink = ({
  children,
  href,
  className = "",
}: {
  children: ReactNode
  href: string
  className?: string
}) => (
  <DropdownMenu.Item>
    <div className={"text-right w-32"}>
      <NavLink className={className} href={href}>
        {children}
      </NavLink>
    </div>
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
            <DropdownMenu.Arrow className={"fill-green-600"} />

            <div className={"bg-green-100 p-4 mr-3 rounded-lg border-2 border-green-600/50"}>
              {Object.entries(MAIN_MENU).map(([href, title]) => (
                <MobileNavLink key={href} href={href}>
                  {title}
                </MobileNavLink>
              ))}
              <DropdownMenu.Item>
                <div className={"text-right w-32"}>
                  <UserLinkOrLoginButton />
                </div>
              </DropdownMenu.Item>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

export default MobileNavLinks
