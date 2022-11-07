import React from "react"
import { Header } from "src/modules/core/components/Header"
import { Footer } from "src/modules/core/components/Footer"
import { ThemeContext } from "src/modules/styling/components/ThemeContext"
import { ApolloClient, ApolloProvider } from "@apollo/client"
import { UserProvider } from "src/refactor/UserContext"
import { AppProps } from "next/app"
import { client } from "../modules/apollo/client"
import "../modules/styling/global.css"
import "@fontsource/roboto-flex/variable-full.css"
import "@fontsource/roboto-mono"
import "@fontsource/roboto-serif"

type FKAppProps = AppProps & {
  apolloClient?: ApolloClient<object>
}

const CustomApp = ({ Component, pageProps, apolloClient = client }: FKAppProps) => (
  <ApolloProvider client={apolloClient}>
    <UserProvider>
      <ThemeContext>
        <div className={"max-w-[1500px] min-h-screen mx-auto w-full px-3 flex flex-col justify-between pt-5 xl:pt-24"}>
          <div>
            <Header />
            <main className="w-full mb-auto">
              <Component {...pageProps} />
            </main>
          </div>
          <Footer />
        </div>
      </ThemeContext>
    </UserProvider>
  </ApolloProvider>
)

export default CustomApp
