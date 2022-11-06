import { ReactNode, useState } from "react"
import { ModuleHeading } from "./ModuleHeading"

export type UserMenuState = "newVideo" | "organizations" | "profile"

interface UserMenuSelectorProps {
  onSelect: (newState: UserMenuState) => void
  className?: string
  menu: UserMenu
}

export type UserMenu = Record<UserMenuState, { title: string; menu: ReactNode }>

export const UserMenuSelector = ({ onSelect, className = "", menu }: UserMenuSelectorProps) => {
  const menuStyle = (active: boolean) =>
    "p-4 my-4 cursor-pointer font-extrabold font-wide border-b-4" +
    (active
      ? " border-b-gray-700 bg-gradient-to-tl from-orange-700 to-orange-600 text-orange-100 hover:text-white"
      : " border-b-gray-400 hover:text-orange-700 ")

  const [activeItem, setActiveItem] = useState<UserMenuState>("newVideo")
  const onClick = (menuEntry: UserMenuState) => {
    setActiveItem(menuEntry)
    onSelect(menuEntry)
  }

  return (
    <div className={className}>
      <div className={"min-h-[500px] "}>
        <div className={"bg-gradient-to-t from-orange-800 via-orange-700 to-orange-700 "}>
          <ModuleHeading className={"text-gray-100 p-4 mb-4"}>Brukermeny</ModuleHeading>
        </div>
        <div className={"text-3xl font-bold "}>
          {Object.entries(menu).map(([key, { title }]) => (
            <div key={key} className={menuStyle(key === activeItem)} onClick={() => onClick(key as UserMenuState)}>
              {title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
