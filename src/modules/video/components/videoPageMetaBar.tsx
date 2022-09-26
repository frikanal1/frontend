import { BasicVideoMetadataFragment } from "../../../generated/graphql"
import Link from "next/link"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import React from "react"
import { styled } from "@mui/system"

const PrimaryInfo = styled("div")`
  margin-top: 16px;
`
const Title = styled("h1")`
  font-size: 1.5em;
  margin-bottom: 2px;
`
const Organization = styled("h3")`
  font-size: 1.1em;
  font-weight: 400;

  margin-bottom: 12px;
`
const Description = styled("p")`
  white-space: pre-wrap;
  word-break: break-word;
`
const UploadedDate = styled("span")`
  font-size: 1em;
  color: ${(props) => props.theme.palette.text.secondary};
`
export const VideoPageMetaBar = ({ title, organization, createdAt, description }: BasicVideoMetadataFragment) => {
  return (
    <div>
      <PrimaryInfo>
        <Title>{title}</Title>
        <Organization>
          <Link href={`/organization/${organization.id}`} passHref>
            <a>{organization.name}</a>
          </Link>
        </Organization>
      </PrimaryInfo>
      <Description>{description}</Description>
      <UploadedDate>lastet opp {format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</UploadedDate>
    </div>
  )
}
