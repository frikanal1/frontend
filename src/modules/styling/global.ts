import { css } from "@emotion/react"
import { Theme } from "@mui/system"

import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/900.css"
import { MAIN_CONTENT_WIDTH, GENERAL_BREAKPOINT } from "../core/constants"

export const global = (theme: Theme) => css`
  * {
    box-sizing: border-box;
  }

  /** Remove this when bootstrap is removed **/
  html {
    scroll-behavior: revert !important;
  }

  body,
  html {
    margin: 0;
    padding: 0;

    font-family: "Roboto Flex", sans-serif;
    color: ${theme.palette.text.primary};
  }

  body {
    background: ${theme.palette.background.default};

    #__next {
      min-height: 100vh;
      display: flex;
      margin: 1em;
      @media (max-width: ${GENERAL_BREAKPOINT}) {
        margin: 1em;
      }

      align-items: center;

      flex-direction: column;

      > main {
        > div {
          max-width: ${MAIN_CONTENT_WIDTH};
          width: 100%;
          margin-right: auto;
        }
        width: 100%;
      }
    }
  }

  main {
    width: 100%;
    max-width: 1000px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  video {
    @media (max-width: ${GENERAL_BREAKPOINT}) {
      padding-left: 0.5em;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  figure,
  figcaption,
  li,
  ul,
  ol,
  blockquote {
    list-style: none;
    line-height: initial;
    font-family: "Roboto Serif", sans-serif !important;
  }

  h2 {
    margin: 0;
    font-weight: 300;
    font-size: 3.75rem;
    line-height: 1.2;
  }

  h3 {
    margin: 0;
    font-weight: 400;
    font-size: 3rem;
    line-height: 1.167;
  }

  h4 {
    margin: 0;
    font-weight: 400;
    font-size: 2.125rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
  }

  h5 {
    margin: 0;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.334;
    letter-spacing: 0em;
  }
`
