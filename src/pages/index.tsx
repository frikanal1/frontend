import dynamic from "next/dynamic"
import React, { Suspense } from "react"
import { Meta } from "src/modules/core/components/Meta"
import { FrontpageBulletins } from "../modules/bulletins/FrontpageBulletins"
import { FrontpageScheduleView } from "../modules/schedule/components/FrontpageScheduleView"
import { ModuleHeading } from "../refactor/moduleHeading"

const LiveVideoPlayer = dynamic(() => import("src/modules/video/components/LiveVideoPlayer"), {
  suspense: true,
})

const FrontpageLiveVideo = () => (
  <div className="bg-slate-800">
    <Suspense>
      <LiveVideoPlayer src="https://beta.frikanalen.no/stream/program.m3u8" />
    </Suspense>
    <FrontpageScheduleView />
  </div>
)

export const IndexPage = () => (
  <div className="flex grow flex-col lg:flex-row gap-2 lg:gap-4">
    <Meta
      meta={{
        title: "Direkte",
        description: "Frikanalen er sivilsamfunnets videoplatform",
        type: "website",
      }}
    />
    <div className={"lg:grow"}>
      <ModuleHeading>Direkte</ModuleHeading>
      <FrontpageLiveVideo />
    </div>
    <div className={"lg:w-1/3"}>
      <ModuleHeading>Nyheter</ModuleHeading>
      <FrontpageBulletins />
    </div>
  </div>
)

export default IndexPage
