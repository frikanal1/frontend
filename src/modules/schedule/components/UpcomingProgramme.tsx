import Link from "next/link"
import { humanizeScheduleItemDate } from "../helpers/humanizeScheduleItemDate"
import { FrontpageScheduleFragment } from "../../../generated/graphql"

export interface UpcomingProgrammeProps {
  className?: string
  entry?: FrontpageScheduleFragment
}

export function UpcomingProgramme({ className, entry }: UpcomingProgrammeProps) {
  return (
    <div className={"flex w-full flex-col xl:flex-row " + className}>
      <div className={"grow flex flex-col"}>
        <Link
          href={`/video/${entry?.video.id}`}
          passHref
          className={"whitespace-nowrap font-bold overflow-hidden text-ellipsis"}>
          {entry?.video.title}
        </Link>
        <Link
          href={`/organization/${entry?.video.organization.id}`}
          passHref
          className={""}>
          {entry?.video.organization.name}
        </Link>
      </div>
      <span className={"font-mono font-condensed text-green-400 font-bold"}>
        {entry && humanizeScheduleItemDate(new Date(entry?.startsAt))}
      </span>
    </div>
  );
}
