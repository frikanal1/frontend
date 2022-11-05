import ReactMarkdown from "react-markdown"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import { GetBulletinsDocument } from "../../generated/graphql"
import { useQuery } from "@apollo/client"

export const FrontpageBulletins = () => {
  const query = useQuery(GetBulletinsDocument, { variables: { perPage: 2 }, onError: console.log })

  const bulletins = query.data?.bulletins.items

  if (!bulletins) return null

  return (
    <div className="space-y-4">
      {bulletins.map(({ id, title, createdAt, text }) => (
        <div key={id} className={"drop-shadow-md"}>
          <div className={"bg-slate-800 text-slate-200 p-2 "}>
            <h4 className={"lg:text-xl font-bold tracking-wide"}>{title}</h4>
            <div className={"text-slate-300 text-sm"}>{format(new Date(createdAt), "d. MMM Y", { locale: nb })}</div>
          </div>
          <div className={"bg-slate-200 p-2 prose prose-sm lg:prose-md prose-heading:font-sans min-w-full"}>
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  )
}
