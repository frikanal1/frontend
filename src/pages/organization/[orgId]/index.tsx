import { Meta } from "src/modules/core/components/Meta"
import { Section } from "src/modules/ui/components/Section"
import React from "react"
import { GetServerSideProps, NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import { GetOrganizationDocument, GetOrganizationQuery } from "../../../generated/graphql"
import { useQuery } from "@apollo/client"
import { LatestVideosGrid } from "../../../modules/organization/components/latestVideosGrid"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

const LegalInfo = ({ organization: { editor, postalAddress, streetAddress } }: GetOrganizationQuery) => (
  <div className={"flex w-full whitespace-pre-wrap leading-6 gap-4"}>
    <Section icon="pencil" title="Redaktør">
      {editor.name}
      <br />
      <Link href={`mailto:${editor.email}`}>{editor.email}</Link>
    </Section>
    <Section icon="mail" title="Postadresse">
      {postalAddress}
    </Section>
    <Section icon="home" title="Besøksadresse">
      {streetAddress}
    </Section>
  </div>
)

interface OrganizationPageProps {
  orgId: string
}

export interface OrganizationPageParams extends ParsedUrlQuery {
  orgId: string
}

export const OrganizationPage: NextPage<OrganizationPageProps> = ({ orgId }) => {
  const { data } = useQuery(GetOrganizationDocument, { variables: { orgId } })

  if (!data?.organization) return null

  const { organization } = data

  const { name, description, latestVideos } = organization

  return (
    <div className={"pt-4"}>
      <Meta
        meta={{
          title: name,
          description: description || "",
        }}
      />
      <h2 className={"text-5xl text-green-800 font-black "}>{name}</h2>
      <div className={"description py-3"}>
        <ReactMarkdown>{description || ""}</ReactMarkdown>
      </div>
      <LatestVideosGrid latestVideos={latestVideos} />
      <LegalInfo organization={organization} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<OrganizationPageProps> = async (ctx) => {
  const { orgId } = ctx.params as OrganizationPageParams

  return { props: { orgId } }
}

export default OrganizationPage
