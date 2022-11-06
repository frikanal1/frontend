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
    <div className={"pb-10 " + className || ""}>
      <div className={"bg-gradient-to-b from-green-900 to-green-800 p-8"}>
        <span className={"text-white opacity-60 text-xl bold font-condensed"}>
          publisert <span className={"font-bold"}>{format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</span> av
        </span>
        <h3 className={"lg:text-4xl text-white opacity-80 font-bold p-2"}>
          <Link href={`/organization/${organization.id}`} passHref>
            <a>{organization.name}</a>
          </Link>
        </h3>
      </div>
      <div className={"px-8"}>
        <div className={"text-white opacity-60 text-xl bold font-condensed"}>beskrivelse</div>
        <div className={"whitespace-pre-wrap break-words p-2 prose-invert prose opacity-90 lg:prose-xl"}>
          {description}
        </div>
      </div>
    </div>
  )
}
