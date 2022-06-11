import { styled } from "@mui/system"
import { Card, CardContent, CardHeader } from "@mui/material"
import useSWR from "swr"
import { BulletinData } from "../../../modules/bulletins/types"
import { AddBox } from "@mui/icons-material"
import Link from "next/link"
import { format } from "date-fns"
import { nb } from "date-fns/locale"

const Container = styled("div")`
  min-height: 90%;
`

const CardDeck = styled("div")`
  gap: 1em;
  display: flex;
  flex-wrap: wrap;
  > div {
    height: 250px;
    flex-basis: 200px;
    flex-shrink: 0;
  }
`

const BulletinCard = ({ bulletin }: { bulletin: BulletinData }) => {
  const { title, text, createdAt } = bulletin

  return (
    <Card>
      <CardHeader title={title} subheader={format(new Date(createdAt), "d. MMM yyyy", { locale: nb })} />
      <CardContent>{text}</CardContent>
    </Card>
  )
}

const HoverableCard = styled(Card)`
  :hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    transition: all 0.1s ease-in;
  }
`

const NewBulletinCard = () => (
  <Link href={"bulletins/new"} passHref>
    <HoverableCard>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <AddBox sx={{ fontSize: 72, display: "block", marginBottom: ".5em" }} />
        Ny bulletin
      </CardContent>
    </HoverableCard>
  </Link>
)

export const BulletinAdminPage = () => {
  const { data: bulletins } = useSWR<{ rows: BulletinData[] }>("/bulletins?limit=50")

  return (
    <Container>
      <h1>Administratorfunksjoner</h1>
      <h2>Bulletins</h2>
      <CardDeck>
        <NewBulletinCard />
        {bulletins && bulletins.rows.map((bulletin) => <BulletinCard key={bulletin.id} bulletin={bulletin} />)}
      </CardDeck>
    </Container>
  )
}

export default BulletinAdminPage
