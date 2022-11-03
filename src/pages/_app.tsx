import React from "react"
import { Header } from "src/modules/core/components/Header"
import { global } from "src/modules/styling/global"
import { Main } from "src/modules/core/components/Main"
import { Footer } from "src/modules/core/components/Footer"
import { ThemeContext } from "src/modules/styling/components/ThemeContext"
import { GlobalStyles } from "@mui/material"
import { ApolloClient, ApolloProvider } from "@apollo/client"
import { UserProvider } from "src/refactor/UserContext"
import { AppProps } from "next/app"
import { client } from "../modules/apollo/client"
import "../modules/styling/global.css"

type FKAppProps = AppProps & {
  apolloClient?: ApolloClient<object>
}

const CustomApp = ({ Component, pageProps, apolloClient = client }: FKAppProps) => (
  <ApolloProvider client={apolloClient}>
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
