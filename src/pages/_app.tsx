import React from "react"
import type { AppProps } from "next/app"
import { Header } from "src/modules/core/components/Header"
import { global } from "src/modules/styling/global"
import { Main } from "src/modules/core/components/Main"
import { Footer } from "src/modules/core/components/Footer"
import { ThemeContext } from "src/modules/styling/components/ThemeContext"
import { GlobalStyles } from "@mui/material"
import { client } from "../modules/apollo/client"
import { ApolloProvider } from "@apollo/client"
import { UserProvider } from "src/refactor/UserContext"

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <UserProvider>
      <ThemeContext>
        <GlobalStyles styles={global} />
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </ThemeContext>
    </UserProvider>
  </ApolloProvider>
)

export default CustomApp
