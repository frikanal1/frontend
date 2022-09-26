import { styled } from "@mui/system"
import ReactMarkdown from "react-markdown"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import { Bulletin, GetBulletinsDocument } from "../../generated/graphql"
import { useQuery } from "@apollo/client"

const BulletinDiv = styled("div")`
  border-left: 1px solid black;
  padding-left: 0.5em;
  margin-top: 0.5em;
  > span {
    color: ${({ theme }) => theme.palette.text.secondary};
    font-style: italic;
  }
  > h3 {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`

const BulletinAbstract = ({
  bulletin: { text, title, createdAt },
}: {
  bulletin: Pick<Bulletin, "text" | "title" | "createdAt">
}) => (
  <BulletinDiv>
    <h3>{title}</h3>
    <span>{format(new Date(createdAt), "d. MMM Y", { locale: nb })}</span>
    <div>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  </BulletinDiv>
)

export const BulletinFrontpage = () => {
  const query = useQuery(GetBulletinsDocument, { variables: { perPage: 2 } })

  const bulletins = query.data?.bulletins?.items

  if (!bulletins) return null

  return (
    <div>
      <h2>Nyheter</h2>
      {bulletins.map((bulletin) => (
        <BulletinAbstract key={bulletin.id} bulletin={bulletin} />
      ))}
    </div>
  )
}
