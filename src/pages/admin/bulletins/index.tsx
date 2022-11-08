import { styled } from "@mui/system"
import { Card, CardContent, CardHeader } from "@mui/material"
import { AddBox } from "@mui/icons-material"
import Link from "next/link"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import ReactMarkdown from "react-markdown"
import { Meta } from "../../../modules/core/components/Meta"
import React from "react"
import { useQuery } from "@apollo/client"
import { Bulletin, GetBulletinsDocument } from "../../../generated/graphql"
import { RequireAuthentication } from "../../../modules/core/components/RequireAuthentication"

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

const BulletinCard = ({ bulletin }: { bulletin: Bulletin }) => {
  const { id, title, text, createdAt } = bulletin

  return (
    <Link href={`bulletins/${id}`} passHref legacyBehavior>
      <StyledBulletinCard>
        <CardHeader title={title} subheader={format(new Date(createdAt), "d. MMM yyyy", { locale: nb })} />
        <CardContent>
          <ReactMarkdown>{text}</ReactMarkdown>
        </CardContent>
      </StyledBulletinCard>
    </Link>
  );
}

const NewBulletinCard = () => (
  <Link href={"bulletins/new"} passHref legacyBehavior>
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
  const query = useQuery(GetBulletinsDocument, { variables: { perPage: 50 } })
  const bulletins = query.data?.bulletins.items

  return (
    <RequireAuthentication>
      <Container>
        <Meta meta={{ title: "Administrer bulletins" }} />
        <Link href={"/admin"} passHref>

          <h1>Administratorfunksjoner</h1>

        </Link>
        <h2>Bulletins</h2>
        <CardDeck>
          <NewBulletinCard />
          {bulletins?.map((bulletin) => (
            <BulletinCard key={bulletin.id} bulletin={bulletin} />
          ))}
        </CardDeck>
      </Container>
    </RequireAuthentication>
  );
}

export default BulletinAdminPage
