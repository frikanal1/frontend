import { css } from "@emotion/react"
import { GENERAL_BREAKPOINT, MAX_PAGE_WIDTH } from "../constants"

export const mainContentStyle = css`
  max-width: ${MAX_PAGE_WIDTH};
  width: 100%;

  @media (max-width: ${GENERAL_BREAKPOINT}) {
    max-width: 100%;
    width: 100%;
  }
`
