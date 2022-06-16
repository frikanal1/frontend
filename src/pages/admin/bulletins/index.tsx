import { styled } from "@mui/system"
import { Card, CardContent, CardHeader } from "@mui/material"
import useSWR from "swr"
import { BulletinData } from "../../../modules/bulletins/types"
import { AddBox } from "@mui/icons-material"
import Link from "next/link"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import ReactMarkdown from "react-markdown"
import { Meta } from "../../../modules/core/components/Meta"
import React from "react"

const Container = styled("div")``

const CardDeck = styled("div")`
  gap: 1em;
  display: flex;
  flex-wrap: wrap;
`

const StyledBulletinCard = styled(Card)`
  height: 250px;
  flex-basis: 200px;
  flex-shrink: 0;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    transition: all 0.1s ease-in;
  }
`

const BulletinCard = ({ bulletin }: { bulletin: BulletinData }) => {
  const { id, title, text, createdAt } = bulletin

  return (
    <Link href={`bulletins/${id}`} passHref>
      <StyledBulletinCard>
        <CardHeader title={title} subheader={format(new Date(createdAt), "d. MMM yyyy", { locale: nb })} />
        <CardContent>
          <ReactMarkdown>{text}</ReactMarkdown>
        </CardContent>
      </StyledBulletinCard>
    </Link>
  )
}

const NewBulletinCard = () => (
  <Link href={"bulletins/new"} passHref>
    <StyledBulletinCard>
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
    </StyledBulletinCard>
  </Link>
)

export const BulletinAdminPage = () => {
  const { data: bulletins } = useSWR<{ rows: BulletinData[] }>("/bulletins?limit=50")

  return (
    <Container>
      <Meta meta={{ title: "Administrer bulletins" }} />
      <Link href={"/admin"} passHref>
        <a>
          <h1>Administratorfunksjoner</h1>
        </a>
      </Link>
      <h2>Bulletins</h2>
      <CardDeck>
        <NewBulletinCard />
        {bulletins && bulletins.rows.map((bulletin) => <BulletinCard key={bulletin.id} bulletin={bulletin} />)}
      </CardDeck>
    </Container>
  )
}

export default BulletinAdminPage
