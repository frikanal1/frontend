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
      <div className={"p-4 lg:p-6 bg-gradient-to-tr from-gray-800/80 to-gray-500/80 mix-blend-luminosity "}>
        <h2 className={"lg:text-3xl text-white font-bold mix-blend-luminosity opacity-80"}>{title}</h2>
        <h3 className={"inline lg:block lg:text-2xl text-gray-300 hover:text-white opacity-90 font-semibold"}>
          <Link href={`/organization/${organization.id}`} passHref>
            {organization.name}
          </Link>
        </h3>
        <div className={"text-white opacity-60 lg:text-xl"}>
          publisert{" "}
          <span className={"font-semibold"}>{format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</span>
        </div>
        <div className={"whitespace-pre-wrap break-words lg:pt-4 !leading-7 prose-invert prose opacity-80 lg:prose-lg"}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
