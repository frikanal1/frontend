import React, { ComponentPropsWithoutRef } from "react"

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  stretch?: boolean
}

function _Button(props: ButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const { stretch, className = "", children, type = "button", ...rest } = props

  const buttonStyle = "inline-block" + stretch ? " w-full" : ""
  const buttonContentStyleBase = "flex w-full select-none"
  const buttonContentStyle = [className, buttonContentStyleBase].join(" ")

  return (
    <button className={buttonStyle} ref={ref} type={type} {...rest}>
      <span className={buttonContentStyle}>{children}</span>
    </button>
  )
}

export const Button = React.forwardRef(_Button)

export type ButtonWithProps<T extends object> = (
  props: ButtonProps & { ref?: React.Ref<HTMLButtonElement> } & T
) => JSX.Element
