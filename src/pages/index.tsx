import { styled } from "@mui/system"
import { Meta } from "src/modules/core/components/Meta"
import { LiveVideoPlayer } from "src/modules/video/components/LiveVideoPlayer"
import React from "react"
import { BulletinFrontpage } from "../modules/bulletins/BulletinFrontpage"
import { ScheduleFrontpageWidget } from "../modules/schedule/components/ScheduleFrontpageWidget"

const breakpoint = 880

const Container = styled("div")`
  display: flex;
  width: 100%;

  @media (max-width: ${breakpoint}px) {
    flex-direction: column;
  }
`

const Sidebar = styled("div")`
  flex-basis: 300px;
  margin-left: 32px;

  @media (max-width: ${breakpoint}px) {
    margin-top: 32px;
    margin-left: 0px;
  }
`

const LiveVideo = styled("div")`
  flex-grow: 1;
`

export const IndexPage = () => (
  <Container>
    <Meta
      meta={{
        title: "Direkte",
        description: "Frikanalen er sivilsamfunnets videoplatform",
        type: "website",
      }}
    />
    <LiveVideo>
      <h3>Direkte</h3>
      <LiveVideoPlayer width={1280} height={720} src="https://beta.frikanalen.no/stream/program.m3u8" />
      <ScheduleFrontpageWidget />
    </LiveVideo>
    <Sidebar>
      <BulletinFrontpage />
    </Sidebar>
  </Container>
)

export default IndexPage
