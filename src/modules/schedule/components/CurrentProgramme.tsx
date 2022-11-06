import Link from "next/link"
import { FrontpageScheduleFragment } from "../../../generated/graphql"

export type ScheduleItemBlurbProps = {
  entry: FrontpageScheduleFragment
}

export const CurrentProgramme = ({ entry: { video } }: ScheduleItemBlurbProps) => (
  <div className={""}>
    <h4 className={"text-xl lg:text-3xl font-bold py-2 opacity-80 mix-blend-luminosity text-white hover:text-white"}>
      <Link href={`/video/${video.id}`} passHref>
        <a>{video.title}</a>
      </Link>
    </h4>
    <h5 className="text-xl opacity-60 mix-blend-luminosity text-gray-200 hover:text-white font-semibold pb-1">
      <Link href={`/organization/${video.organization.id}`} passHref>
        <a>av {video.organization.name}</a>
      </Link>
    </h5>
    <p className="whitespace-pre-wrap break-words prose prose-invert prose-md lg:prose-lg lg:p-4">
      {video.description}
    </p>
  </div>
)
