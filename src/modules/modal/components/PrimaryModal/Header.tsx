import { styled } from "@mui/system"

const Container = styled("header")`
  height: 72px;

  display: flex;
  align-items: center;

  padding: 0px 24px;
  border-bottom: solid 2px ${(props) => props.theme.palette.primary.main};
`

const Title = styled("h1")`
  font-weight: 600;
  font-size: 1.5em;

  margin-bottom: 0px;
`

export type HeaderProps = {
  title: string
}

export function Header(props: HeaderProps) {
  return (
    <Container>
      <Title>{props.title}</Title>
    </Container>
  )
}
