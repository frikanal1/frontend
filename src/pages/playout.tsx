import { useEffect, useState } from "react"
import { styled } from "@mui/system"
import { ATEMControls } from "src/modules/playout/components/ATEMControls"
import { MonitoringStream } from "src/modules/playout/components/MonitoringStream"
import { ATEM_INPUTS } from "src/modules/playout/constants"
import { Section } from "src/modules/ui/components/Section"
import { Meta } from "src/modules/core/components/Meta"
import { Button } from "@mui/material"
import { TextSlideEditorDialog } from "../modules/playout/components/TextSlideEditorDialog"

const breakpoint = 830

const Container = styled("div")``

const Content = styled("div")`
  margin-top: 16px;
  padding: 24px;
  border: solid 2px ${(props) => props.theme.palette.divider};
  border-radius: 4px;

  @media (max-width: ${breakpoint}px) {
    padding: 0px;
  }
`

const Controls = styled("div")`
  margin: 0px -24px;
  border-top: solid 2px ${(props) => props.theme.palette.divider};

  padding: 0px 24px;

  margin-top: 24px;
  display: flex;

  > * {
    margin-right: 32px;
  }

  @media (max-width: ${breakpoint}px) {
    margin: 0px;

    flex-direction: column;

    > * {
      margin-right: 0px;
      margin-bottom: 32px;
    }
  }
`

export type PlayoutProps = {
  initialIndex: number
}

const TextSlide = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Rediger sendingsplakat
      </Button>
      <TextSlideEditorDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default function Playout() {
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    fetch("/playout/atem/program")
      .then((res) => res.json())
      .then((data) => setIndex(data.InputIndex))
  }, [])

  const setProgram = async (index: number) => {
    await fetch("/playout/atem/program", { method: "post", body: JSON.stringify({ inputIndex: index }) })
    setIndex(index)
  }

  return (
    <Container>
      <Meta
        meta={{
          title: "Playout",
          description: "",
        }}
      />
      <h1>Playout</h1>
      <Content>
        <MonitoringStream />
        <Controls>
          <Section icon="lightbulb" title="Handlinger">
            <TextSlide />
          </Section>
          <Section icon="camera" title="Programutgang">
            <ATEMControls inputs={ATEM_INPUTS} index={index} onChange={setProgram} />
          </Section>
        </Controls>
      </Content>
    </Container>
  )
}
