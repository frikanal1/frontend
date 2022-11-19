import { PropsWithChildren } from "react"
import { IconType } from "../types"
import { SVGIcon } from "./SVGIcon"

export type SectionProps = PropsWithChildren<{
  className?: string
  title: string
  icon?: IconType
}>

export function Section({ className, title, icon, children }: SectionProps) {
  return (
    <section className={className}>
      <header className={"my-4"}>
        <h1 className={"text-lg font-semibold"}>
          {icon && <SVGIcon className={"w-8"} name={icon} />}
          {title}
        </h1>
      </header>
      {children}
    </section>
  )
}
