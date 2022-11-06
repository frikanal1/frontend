import Link from "next/link"
import { FrontpageScheduleFragment } from "../../../generated/graphql"

export type ScheduleItemBlurbProps = {
  entry?: FrontpageScheduleFragment
}

export const CurrentProgramme = ({ entry }: ScheduleItemBlurbProps) => (
  <div className={""}>
    <h4 className={"text-xl lg:text-3xl font-bold py-2 opacity-90 mix-blend-luminosity text-gray-200 hover:text-white"}>
      <Link href={`/video/${entry?.video.id}`} passHref>
        <a>{entry?.video?.title}</a>
      </Link>
    </h4>
    <h5 className="text-xl opacity-80 mix-blend-luminosity text-gray-200 hover:text-white font-semibold pb-1">
      <Link href={`/organization/${entry?.video.organization.id}`} passHref>
        <a>av {entry?.video?.organization.name}</a>
      </Link>
    </h5>
    <p className="whitespace-pre-wrap break-words prose prose-invert prose-md lg:prose-lg lg:p-4">
      {entry?.video?.description}
    </p>
  </div>
)
