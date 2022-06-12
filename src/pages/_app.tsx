import { config } from "dotenv"

/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react"
import type { AppContext, AppProps } from "next/app"
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
import { Header } from "src/modules/core/components/Header"
import { global } from "src/modules/styling/global"
import { Body } from "src/modules/core/components/Body"
import { getManager, ManagerContext } from "src/modules/state/manager"
import App from "next/app"
import { ModalOverlay } from "src/modules/modal/components/ModalOverlay"
import { ScrollLock } from "src/modules/ui/components/ScrollLock"
import { PopoverOverlay } from "src/modules/popover/components/PopoverOverlay"
import { IS_SERVER } from "src/modules/core/constants"
import { Footer } from "src/modules/core/components/Footer"
import { enableStaticRendering, observer } from "mobx-react-lite"
import { ThemeContext } from "src/modules/styling/components/ThemeContext"
import { SWRConfig } from "swr"

// Not a React hook.
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(IS_SERVER)

/*Sentry.init({
  dsn: "https://41ab0b4801094dfd8ecd84eafc947380@o310671.ingest.sentry.io/5701229",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});*/
import getConfig from "next/config"
import { GlobalStyles } from "@mui/material"
const { publicRuntimeConfig } = getConfig()

export type CustomAppProps = AppProps & { serialized: any }

function CustomApp(props: CustomAppProps) {
  const { Component, pageProps, serialized } = props

  const [manager] = useState(() => getManager(serialized))
  const locked = manager.stores.modalStore.hasItems

  return (
    <ManagerContext.Provider value={manager}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(publicRuntimeConfig.FK_API + resource, init).then((res) => res.json()),
        }}
      >
        <ThemeContext>
          <ScrollLock locked={locked}>
            {(style) => (
              <div style={style}>
                <GlobalStyles styles={global} />
                <Header />
                <Body>
                  <Component {...pageProps} />
                </Body>
                <Footer />
                <ModalOverlay />
                <PopoverOverlay />
              </div>
            )}
          </ScrollLock>
        </ThemeContext>
      </SWRConfig>
    </ManagerContext.Provider>
  )
}

const INCOMING_HEADERS = ["Cookie", "X-Forwarded-For", "X-Forwarded-Proto"].map((x) => x.toLowerCase())

CustomApp.getInitialProps = async (appContext: AppContext): Promise<any> => {
  const manager = getManager()

  const { authStore, networkStore } = manager.stores
  const { req, res } = appContext.ctx

  // Set up network configuration
  if (IS_SERVER && req && res) {
    config()

    for (const key of INCOMING_HEADERS) {
      const value = req.headers[key] as any
      if (!value) continue

      networkStore.incomingHeaders[key] = value
    }

    const { FK_API } = process.env

    if (!FK_API) throw new Error("Missing FK_API!")

    networkStore.setHTTPObjects(res, req)
    networkStore.setConfig({
      api: FK_API,
    })
  }

  if (!manager.didInit) {
    await manager.init()
    await authStore.authenticate()
  }

  appContext.ctx.manager = manager

  const appProps = await App.getInitialProps(appContext)
  const serialized = manager.serialize()

  return { ...appProps, serialized }
}

export default observer(CustomApp)
