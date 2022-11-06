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
          <div className={"bg-gradient-to-b from-orange-800 to-orange-900 text-orange-200 p-2 "}>
            <h4 className={"lg:text-3xl font-bold tracking-wide"}>{title}</h4>
            <div className={"text-orange-300 text-lg"}>{format(new Date(createdAt), "d. MMM Y", { locale: nb })}</div>
          </div>
          <div
            className={
              "bg-gradient-to-bl from-orange-100 to-orange-200 p-2 prose prose-sm lg:prose-lg prose-heading:font-sans min-w-full"
            }
          >
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  )
}
