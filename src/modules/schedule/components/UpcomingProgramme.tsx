import Link from "next/link"
import { humanizeScheduleItemDate } from "../helpers/humanizeScheduleItemDate"
import { ProgramFragment } from "../../../generated/graphql"
import cx from "classnames"

export interface UpcomingProgrammeProps {
  className?: string
  entry?: ProgramFragment
}

export function UpcomingProgramme({ className, entry }: UpcomingProgrammeProps) {
  return (
    <div className={cx("flex w-full flex-col xl:flex-row pb-2", className)}>
      <div className={"grow flex flex-col"}>
        <Link href={entry?.video.url || ""} passHref className={"font-bold truncate w-full"}>
          {entry?.video.title}
        </Link>
        <Link href={`/organization/${entry?.video.organization.id}`} passHref className={""}>
          {entry?.video.organization.name}
        </Link>
      </div>
      <span className={"font-condensed text-green-400 shrink-0 font-bold"}>
        {entry && humanizeScheduleItemDate(new Date(entry?.start))}
      </span>
    </div>
  )
}
