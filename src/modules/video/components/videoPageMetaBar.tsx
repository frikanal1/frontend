import { BasicVideoMetadataFragment } from "../../../generated/graphql"
import Link from "next/link"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import React from "react"

export const VideoPageMetaBar = ({
  className,
  video: { organization, createdAt, description },
}: {
  video: BasicVideoMetadataFragment
  className?: string
}) => {
  return (
    <div className={"text-slate-200 p-7 pt-4 " + className || ""}>
      <div className={"py-2"}>
        <span className={"text-slate-400 font-bold"}>
          lastet opp {format(new Date(createdAt), "d. MMM yyyy", { locale: nb })} av
        </span>
        <h3 className={" text-2xl font-bold"}>
          <Link href={`/organization/${organization.id}`} passHref>
            <a>{organization.name}</a>
          </Link>
        </h3>
      </div>

      <p className={"whitespace-pre-wrap break-words p-2 prose-invert prose-slate lg:prose-xl"}>{description}</p>
    </div>
  )
}
