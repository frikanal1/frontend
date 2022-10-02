// if (!process.env.FK_GRAPHQL) throw new Error("Missing FK_GRAPHQL!")
// if (!FK_API) throw new Error("Missing FK_API!")
import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

import { ApolloClient, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
  uri: publicRuntimeConfig.FK_GRAPHQL,
  cache: new InMemoryCache(),
  credentials: "include",
})
