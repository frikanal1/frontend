import { styled } from "@mui/system"
import { Meta } from "src/modules/core/components/Meta"
import { ExternalLink } from "src/modules/ui/components/ExternalLink"
import { Section } from "src/modules/ui/components/Section"
import { VideoGrid } from "src/modules/video/components/VideoGrid"
import React from "react"
import { useOrganization } from "../../../modules/swr/useOrganization"
import { useLatestVideos } from "../../../modules/swr/useLatestVideos"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { VideoData } from "../../../modules/video/types"
import axios from "axios"
import { ParsedUrlQuery } from "querystring"
import getConfig from "next/config"
import { OrganizationData } from "../../../modules/organization/resources/Organization"
const { publicRuntimeConfig } = getConfig()

const breakpoint = 1250

const Container = styled("div")``

const Header = styled("div")`
  display: flex;

  @media (max-width: ${breakpoint}px) {
    flex-direction: column;
  }
`

const PrimaryInfo = styled("div")`
  flex: 1;
`

const Title = styled("h1")``

const Description = styled("div")`
  margin-top: 16px;

  white-space: pre-wrap;
  word-break: break-word;
`

const SecondaryInfo = styled("div")`
  white-space: pre-wrap;
  word-break: break-word;

  display: flex;

  @media (max-width: ${breakpoint}px) {
    flex-direction: column;
  }
`

const InfoSection = styled(Section)`
  margin-left: 32px;
  min-width: 200px;
  white-space: pre-wrap;
  line-height: 1.4;
  @media (max-width: ${breakpoint}px) {
    margin-left: 0px;
    margin-top: 32px;
  }
`

const Content = styled("div")`
  margin-top: 16px;
`

const LatestVideosHeading = styled("h2")`
  margin-bottom: 16px;
`

interface OrganizationPageProps {
  organizationId: string
  fallback: { [k: string]: any }
}

interface OrganizationPageParams extends ParsedUrlQuery {
  organizationId: string
}
export const OrganizationPage: NextPage<OrganizationPageProps> = ({ organizationId, fallback }) => {
  const { organization } = useOrganization(organizationId, fallback)
  const { videos } = useLatestVideos(organizationId, fallback)

  if (!organization) return null

  const { name, description, postalAddress, streetAddress, editor } = organization

  return (
    <Container>
      <Meta
        meta={{
          title: name,
          description,
        }}
      />
      <Header>
        <PrimaryInfo>
          <Title>{name}</Title>
          <Description>{description}</Description>
        </PrimaryInfo>
        <SecondaryInfo>
          <InfoSection icon="pencil" title="Redaktør">
            {editor.firstName} {editor.lastName}
            <br />
            <ExternalLink href={`mailto:${editor.email}`}>{editor.email}</ExternalLink>
          </InfoSection>
          <InfoSection icon="mail" title="Postadresse">
            {postalAddress}
          </InfoSection>
          <InfoSection icon="home" title="Besøksadresse">
            {streetAddress}
          </InfoSection>
        </SecondaryInfo>
      </Header>
      <Content>
        <LatestVideosHeading>Nyeste videoer</LatestVideosHeading>
        <VideoGrid videos={videos} />
      </Content>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<OrganizationPageProps> = async (ctx) => {
  const { organizationId } = ctx.params as OrganizationPageParams

  if (!organizationId) console.error(`no organizationId arrived for org page getstaticprops!`)

  const organizationURL = `/organizations/${organizationId}`

  const { data: organization } = await axios.get<VideoData>(publicRuntimeConfig.FK_API + organizationURL)

  return { props: { organizationId: organizationId, fallback: { [organizationURL]: organization } } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Complete this recursive function once we have more than 50 orgs to test with :)
  const getAllOrganizations = async (offset = 0, _loadedOrganizations: OrganizationData[] = []) => {
    if (!publicRuntimeConfig.FK_API) throw new Error("FK_API is not set!")

    const { data } = await axios.get<{ rows: OrganizationData[]; offset: number; limit: number; count: number }>(
      publicRuntimeConfig.FK_API + `/organizations?offset=${offset}&limit=50`
    )

    return data.rows
  }

  const paths = (await getAllOrganizations()).map((o) => ({
    params: {
      organizationId: o.id.toString(),
    },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export default OrganizationPage
