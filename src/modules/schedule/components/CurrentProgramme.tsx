import Link from "next/link"
import { FrontpageScheduleFragment } from "../../../generated/graphql"

export type ScheduleItemBlurbProps = {
  entry: FrontpageScheduleFragment
}

export const CurrentProgramme = ({ entry: { video } }: ScheduleItemBlurbProps) => (
  <div className={""}>
    <h4 className={"text-xl lg:text-3xl font-bold py-2 text-slate-100 hover:text-white"}>
      <Link href={`/video/${video.id}`} passHref>
        <a>{video.title}</a>
      </Link>
    </h4>
    <h5 className="text-lg font-semibold pb-1">
      <Link href={`/organization/${video.organization.id}`} passHref>
        <a>Av {video.organization.name}</a>
      </Link>
    </h5>
    <p className="whitespace-pre-wrap break-words prose prose-invert prose-md lg:prose-lg lg:p-4">
      {video.description}
    </p>
  </div>
)
