import React from "react"
import { Header } from "src/modules/core/components/Header"
import { Footer } from "src/modules/core/components/Footer"
import { ThemeContext } from "src/modules/styling/components/ThemeContext"
import { ApolloClient, ApolloProvider } from "@apollo/client"
import { UserProvider } from "src/refactor/UserContext"
import { AppProps } from "next/app"
import { client } from "../modules/apollo/client"
import "../modules/styling/global.css"
import "@fontsource/roboto-flex"
import "@fontsource/roboto-mono"
import "@fontsource/roboto-serif"

type FKAppProps = AppProps & {
  apolloClient?: ApolloClient<object>
}

const CustomApp = ({ Component, pageProps, apolloClient = client }: FKAppProps) => (
  <ApolloProvider client={apolloClient}>
    <UserProvider>
      <ThemeContext>
        <div className="flex flex-col max-w-[1500px] min-h-full grow mr-auto ml-auto w-full px-3 ">
          <Header />
          <main className="grow flex w-full">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ThemeContext>
    </UserProvider>
  </ApolloProvider>
)

export default CustomApp
