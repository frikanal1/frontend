import dynamic from "next/dynamic"
import React, { Suspense } from "react"
import { Meta } from "src/modules/core/components/Meta"
import { FrontpageBulletins } from "../modules/bulletins/FrontpageBulletins"
import { FrontpageScheduleView } from "../modules/schedule/components/FrontpageScheduleView"

const LiveVideoPlayer = dynamic(() => import("src/modules/video/components/LiveVideoPlayer"), {
  suspense: true,
})

export const Frontpage = () => (
  <div className="flex flex-col gap-4 xl:flex-row xl:gap-6 pt-0">
    <Meta
      meta={{
        title: "Direkte",
        description: "Frikanalen er sivilsamfunnets videoplatform",
        type: "website",
      }}
    />
    <div className="xl:grow  drop-shadow-2xl border-t-[#E88840] border-t-4 ">
      <Suspense>
        <LiveVideoPlayer className="aspect-video w-full" src="https://beta.frikanalen.no/stream/program.m3u8" />
      </Suspense>
      <Suspense>
        <div className={"bg-gradient-to-b from-green-700 to-green-900"}>
          <FrontpageScheduleView />
        </div>
      </Suspense>
    </div>
    <div className={"xl:basis-1/3 shrink-0"}>
      <FrontpageBulletins />
    </div>
  </div>
)

export default Frontpage
