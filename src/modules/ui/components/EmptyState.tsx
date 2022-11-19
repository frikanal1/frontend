import { IconType } from "../types"
import { SVGIcon } from "./SVGIcon"

export type EmptyStateProps = {
  icon: IconType
  title: string
  subtitle?: string
}

export function EmptyState(props: EmptyStateProps) {
  const { icon, title, subtitle } = props

  return (
    <div className={"flex flex-col items-center my-4"}>
      <SVGIcon className={"fill-orange-400 w-16 h-16 mb-8"} name={icon} />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  )
}
