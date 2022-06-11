import useSWR from "swr"
import { BulletinData } from "./types"
import { styled } from "@mui/system"

import ReactMarkdown from "react-markdown"
import { format } from "date-fns"
import { nb } from "date-fns/locale"

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

const BulletinAbstract = ({ bulletin: { text, title, createdAt } }: { bulletin: BulletinData }) => (
  <BulletinDiv>
    <h3>{title}</h3>
    <span>{format(new Date(createdAt), "d. MMM Y", { locale: nb })}</span>
    <div>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  </BulletinDiv>
)

export const BulletinFrontpage = () => {
  const { data: bulletins } = useSWR<{ rows: BulletinData[] }>("/bulletins?limit=2")
  if (!bulletins) return null

  return (
    <div>
      <h2>Nyheter</h2>
      {bulletins.rows.map((bulletin) => (
        <BulletinAbstract key={bulletin.id} bulletin={bulletin} />
      ))}
    </div>
  )
}
