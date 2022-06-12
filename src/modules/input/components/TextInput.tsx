import React, { useState } from "react"
import { css } from "@emotion/react"
import { Theme } from "@mui/system"

import { FIELDSET_HEIGHT } from "../constants"
import styled from "../../styling/transientStyled"

export type TextInputProps = {
  name?: string
  value?: string
  placeholder?: string
  onFocus?: (event: React.FocusEvent) => void
  onBlur?: (event: React.FocusEvent) => void
  onChange?: (event: React.ChangeEvent<any>) => void
  $invalid?: boolean
  multiline?: boolean
  autoFocus?: boolean
  className?: string
}

const baseStyle = (props: any) => css`
  flex: 1;

  font-size: 0.9em;
  font-family: "Roboto", sans-serif;

  color: ${props.theme.palette.text.primary};
  padding: 11px 12px;

  outline: none;

  ::placeholder {
    font-family: "Roboto", sans-serif;
    font-weight: 400;

    color: ${props.theme.palette.text.secondary};
    opacity: 1;
  }
`

export type StateProps = { $invalid?: boolean; $focused?: boolean }

const stateStyle = ({ $invalid, $focused, theme }: StateProps & { theme: Theme }) => {
  if ($invalid)
    return css`
      & {
        border-color: ${theme.palette.success.light};
      }
    `

  if ($focused) {
    return css`
      border-color: ${theme.palette.primary.main};
    `
  }
}

const Container = styled("div")<StateProps>`
  display: flex;
  align-items: center;

  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.palette.divider};

  transition: 200ms ease border-color;

  ${stateStyle}
`

const Input = styled("input")`
  height: ${FIELDSET_HEIGHT};
  ${baseStyle}
`

const MultilineInput = styled("textarea")`
  min-height: calc(${FIELDSET_HEIGHT} * 2);
  white-space: pre-line;
  resize: vertical;
  ${baseStyle}
`

export function TextInput(props: TextInputProps) {
  const { multiline, className, ...rest } = props
  const [focused, setFocused] = useState(false)

  const focusProps = {
    onFocus: (e: React.FocusEvent) => {
      setFocused(true)
      rest.onFocus?.(e)
    },
    onBlur: (e: React.FocusEvent) => {
      setFocused(false)
      rest.onBlur?.(e)
    },
  }

  if (multiline) {
    return (
      <Container className={className} $focused={focused}>
        <MultilineInput {...rest} {...focusProps} />
      </Container>
    )
  }

  return (
    <Container className={className} $focused={focused}>
      <Input {...rest} {...focusProps} />
    </Container>
  )
}
