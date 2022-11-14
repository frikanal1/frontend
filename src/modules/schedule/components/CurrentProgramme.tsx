import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { FrontpageScheduleFragment } from "../../../generated/graphql"

export type ScheduleItemBlurbProps = {
  entry?: FrontpageScheduleFragment
}

export const CurrentProgramme = ({ entry }: ScheduleItemBlurbProps) => (
  <div className={"lg:pb-8"}>
    <h4 className={"lg:text-3xl font-bold py-2 opacity-90 mix-blend-luminosity text-white hover:opacity-100"}>
      <Link href={`/video/${entry?.video.id}`} passHref>
        {entry?.video?.title}
      </Link>
    </h4>
    <h5 className="text-xl lg:text-2xl opacity-80 mix-blend-luminosity text-gray-100 hover:opacity-100 font-semibold pb-1">
      av{" "}
      <Link href={`/organization/${entry?.video.organization.id}`} passHref>
        {entry?.video?.organization.name}
      </Link>
    </h5>
    <div className="break-words prose prose-invert prose-md lg:prose-xl text-green-100 lg:py-1">
      <ReactMarkdown>{entry?.video?.description || ""}</ReactMarkdown>
    </div>
  </div>
)
