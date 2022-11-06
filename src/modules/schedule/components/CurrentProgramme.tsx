import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { FrontpageScheduleFragment } from "../../../generated/graphql"

export type ScheduleItemBlurbProps = {
  entry?: FrontpageScheduleFragment
}

export const CurrentProgramme = ({ entry }: ScheduleItemBlurbProps) => (
  <div className={""}>
    <h4 className={"text-xl lg:text-3xl font-bold py-2 opacity-90 mix-blend-luminosity text-white hover:opacity-100"}>
      <Link href={`/video/${entry?.video.id}`} passHref>
        <a>{entry?.video?.title}</a>
      </Link>
    </h4>
    <h5 className="text-xl opacity-80 mix-blend-luminosity text-gray-100 hover:opacity-100 font-semibold pb-1">
      <Link href={`/organization/${entry?.video.organization.id}`} passHref>
        <a>av {entry?.video?.organization.name}</a>
      </Link>
    </h5>
    <div className="whitespace-pre-wrap break-words prose prose-invert prose-md lg:prose-lg lg:p-4">
      <ReactMarkdown>{entry?.video?.description || ""}</ReactMarkdown>
    </div>
  </div>
)
