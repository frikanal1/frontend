import { styled } from "@mui/system"
import { Meta } from "src/modules/core/components/Meta"
import { ExternalLink } from "src/modules/ui/components/ExternalLink"
import { Section } from "src/modules/ui/components/Section"
import { VideoGrid } from "src/modules/video/components/VideoGrid"
import React from "react"
import { useRouter } from "next/router"
import { useOrganization } from "../../../modules/swr/useOrganization"
import { useLatestVideos } from "../../../modules/swr/useLatestVideos"

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

export const OrganizationPage = () => {
  // TODO: Implement SSG here
  const router = useRouter()
  const { organizationId } = router.query
  const { organization } = useOrganization(organizationId)
  const { videos } = useLatestVideos(organizationId)

  if (!organization) return null

  const { name, description, postalAddress, streetAddress, editor } = organization ?? {}

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

export default OrganizationPage
