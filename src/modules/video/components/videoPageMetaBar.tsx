import { BasicVideoMetadataFragment } from "../../../generated/graphql"
import Link from "next/link"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import React from "react"
import ReactMarkdown from "react-markdown"

export const VideoPageMetaBar = ({
  className,
  video: { organization, createdAt, description, title },
}: {
  video: BasicVideoMetadataFragment
  className?: string
}) => {
  return (
    <div className={className}>
      <div className={"p-4 lg:p-12 bg-gradient-to-tr from-gray-800/80 to-gray-500/80 mix-blend-luminosity "}>
        <h2 className={"lg:text-3xl lg:pb-1 text-white font-bold mix-blend-luminosity opacity-80"}>{title}</h2>
        <div className={"py-1 lg:pt-2"}>
          <span className={"text-white opacity-60 lg:text-xl font-condensed"}>
            publisert{" "}
            <span className={"font-semibold"}>{format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</span> av
          </span>
          <h3 className={"inline lg:block lg:text-4xl text-gray-300 hover:text-white opacity-90 font-semibold py-2"}>
            <Link href={`/organization/${organization.id}`} passHref>
              {" "}
              {organization.name}
            </Link>
          </h3>
          <div>
            <div className={"text-white opacity-60 lg:text-xl bold font-condensed hidden lg:hidden-0"}>beskrivelse</div>
            <div className={"whitespace-pre-wrap break-words lg:py-2 prose-invert prose opacity-90 lg:prose-xl"}>
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
