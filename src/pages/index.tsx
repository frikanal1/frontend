import { styled } from "@mui/system"
import { Meta } from "src/modules/core/components/Meta"
import { LiveVideoPlayer } from "src/modules/video/components/LiveVideoPlayer"
import React from "react"
import { BulletinFrontpage } from "../modules/bulletins/BulletinFrontpage"
import { ScheduleFrontpageWidget } from "../modules/schedule/components/ScheduleFrontpageWidget"

const breakpoint = 880

const Container = styled("div")`
  display: flex;

  @media (max-width: ${breakpoint}px) {
    flex-direction: column;
  }
`

const Main = styled("div")`
  width: 60%;

  @media (max-width: ${breakpoint}px) {
    width: 100%;
  }
`

const Sidebar = styled("div")`
  flex: 1;
  margin-left: 32px;

  @media (max-width: ${breakpoint}px) {
    margin-top: 32px;
    margin-left: 0px;
  }
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
    <Main>
      <LiveVideoPlayer width={1280} height={720} src="https://beta.frikanalen.no/stream/program.m3u8" />
      <ScheduleFrontpageWidget />
    </Main>
    <Sidebar>
      <BulletinFrontpage />
    </Sidebar>
  </Container>
)

export default IndexPage
