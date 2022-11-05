import { ReactNode, useState } from "react"

export type UserMenuState = "newVideo" | "organizations" | "profile"

interface UserMenuSelectorProps {
  onSelect: (newState: UserMenuState) => void
  className?: string
  menu: UserMenu
}

export type UserMenu = Record<UserMenuState, { title: string; menu: ReactNode }>

export const UserMenuSelector = ({ onSelect, className = "", menu }: UserMenuSelectorProps) => {
  const menuStyle = (active: boolean) =>
    active
      ? "bg-gradient-to-tl from-green-900 to-green-600 text-green-100 p-4"
      : "hover:text-green-700 p-4 bg-green-100"

  const [activeItem, setActiveItem] = useState<UserMenuState>("newVideo")
  const onClick = (menuEntry: UserMenuState) => {
    setActiveItem(menuEntry)
    onSelect(menuEntry)
  }

  return (
    <div className={"pr-10 " + className}>
      <div className={"min-h-[400px] w-full"}>
        <div className={"text-3xl font-bold space-y-4 w-full"}>
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
