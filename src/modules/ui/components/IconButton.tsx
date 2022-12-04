import { IconType } from "../types"
import { Button, ButtonProps } from "./Button"
import { SVGIcon } from "./SVGIcon"
import cx from "classnames"

export type IconButtonProps = ButtonProps & {
  icon: IconType
}

export function IconButton(props: IconButtonProps) {
  const { className, icon, ...rest } = props

  return (
    <Button {...rest}>
      <SVGIcon className={cx("w-4 h-4", className)} name={icon} />
    </Button>
  )
}
