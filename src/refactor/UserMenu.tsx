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
    "transition-all duration-100 hover:text-orange-700 drop-shadow-lg hover:shadow-md p-4 pl-5 my-4 cursor-pointer font-extrabold font-wide border-b-4 " +
    (active
      ? " border-b-gray-700 bg-gradient-to-tl from-orange-400 to-orange-300 text-gray-900"
      : "border-b-gray-500 text-gray-700")

  const [activeItem, setActiveItem] = useState<UserMenuState>("newVideo")
  const onClick = (menuEntry: UserMenuState) => {
    setActiveItem(menuEntry)
    onSelect(menuEntry)
  }

  return (
    <div className={className}>
      <div className={"min-h-[500px] "}>
        <div className={"bg-gradient-to-tr from-red-700 via-red-800 to-red-900 drop-shadow-lg"}>
          <ModuleHeading className={"text-gray-100 p-5 mb-4 pt-28 "}>Brukermeny</ModuleHeading>
        </div>
        <div className={"text-3xl font-bold "}>
          {Object.entries(menu).map(([key, { title }]) => (
            <div key={key} className={menuStyle(key === activeItem)} onMouseDown={() => onClick(key as UserMenuState)}>
              {title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
