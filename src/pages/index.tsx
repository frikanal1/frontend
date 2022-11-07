import dynamic from "next/dynamic"
import React, { Suspense } from "react"
import { Meta } from "src/modules/core/components/Meta"
import { FrontpageBulletins } from "../modules/bulletins/FrontpageBulletins"
import { FrontpageScheduleView } from "../modules/schedule/components/FrontpageScheduleView"

const LiveVideoPlayer = dynamic(() => import("src/modules/video/components/LiveVideoPlayer"), {
  suspense: true,
})

export const Frontpage = () => (
  <div className="flex grow flex-col gap-4 xl:flex-row xl:gap-8">
    <Meta
      meta={{
        title: "Direkte",
        description: "Frikanalen er sivilsamfunnets videoplatform",
        type: "website",
      }}
    />
    <div className="xl:grow bg-gradient-to-b from-green-400 to-green-900 drop-shadow-2xl">
      <Suspense>
        <LiveVideoPlayer src="https://beta.frikanalen.no/stream/program.m3u8" />
      </Suspense>
      <FrontpageScheduleView />
    </div>
    <div className={"xl:basis-1/3"}>
      <FrontpageBulletins />
    </div>
  </div>
)

export default Frontpage
