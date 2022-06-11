import { styled } from "@mui/system"
import { observer } from "mobx-react-lite"
import { Meta } from "src/modules/core/components/Meta"
import { ScheduleItemBlurb } from "src/modules/schedule/components/ScheduleItemBlurb"
import { ScheduleItemSummary } from "src/modules/schedule/components/ScheduleItemSummary"
import { useStores } from "src/modules/state/manager"
import { LiveVideoPlayer } from "src/modules/video/components/LiveVideoPlayer"
import { NextPageContext } from "next"
import React from "react"
import { BulletinFrontpage } from "../modules/bulletins/BulletinFrontpage"

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

const NowPlaying = styled(ScheduleItemBlurb)`
  margin-top: 16px;
`

const NextTitle = styled("h3")`
  margin-top: 32px;
  font-size: 1.5em;
`

const Schedule = styled("div")`
  margin-top: 16px;
`

function Index() {
  const { scheduleStore } = useStores()
  const [now, ...later] = scheduleStore.upcoming

  const renderSchedule = () => {
    if (!now) return null

    return (
      <>
        <NowPlaying entry={now} />
        <NextTitle>Senere</NextTitle>
        <Schedule>
          {later.map((x) => (
            <ScheduleItemSummary key={x.startsAt} entry={x} />
          ))}
        </Schedule>
      </>
    )
  }

  return (
    <Container>
      <Meta
        meta={{
          title: "Direkte",
          description: "Frikanalen er sivilsamfunnets videoplatform",
          type: "website",
        }}
      />
      <Main>
        <LiveVideoPlayer width={1280} height={720} src="/stream/program.m3u8" />
        {renderSchedule()}
      </Main>
      <Sidebar>
        <BulletinFrontpage />
      </Sidebar>
    </Container>
  )
}

Index.getInitialProps = async (context: NextPageContext) => {
  const { scheduleStore } = context.manager.stores
  await scheduleStore.fetchLatest()

  // Needs to return non empty object to silence error
  return { _: "" }
}

export default observer(Index)
