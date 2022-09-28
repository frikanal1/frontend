import React from "react"
import { styled } from "@mui/system"
import { useManager, useStores } from "src/modules/state/manager"
import { FileInput } from "src/modules/input/components/FileInput"
import { useObserver } from "src/modules/state/hooks/useObserver"
import { VideoUploadView } from "src/modules/video/components/VideoUploadView"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { GetOrganizationDocument } from "../../../generated/graphql"

const Container = styled("div")``

const Title = styled("h1")`
  margin-bottom: 16px;
`

export type UploadProps = {
  orgId: string
  fallback?: { [k: string]: any }
}

export const UploadPage: NextPage<UploadProps> = () => {
  const manager = useManager()
  const user = manager.stores.authStore.user!

  const router = useRouter()
  const { orgId } = router.query

  const orgQuery = useQuery(GetOrganizationDocument, { variables: { orgId: orgId as string }, skip: !orgId })
  const organization = orgQuery.data?.organization

  const { videoUploadStore } = useStores()

  const upload = useObserver(() => videoUploadStore.uploads.find((u) => u.organization.toString() === orgId))

  if (organization?.editor.id !== user.id.toString())
    return <Container>Du må være redaktør for denne organisasjonen for å laste opp video.</Container>

  if (!organization) return null

  const handleFile = (files: File[]) => {
    videoUploadStore.add(parseInt(organization.id), files[0])
  }

  const renderContent = () =>
    upload ? <VideoUploadView upload={upload} /> : <FileInput label="Klikk for å laste opp" onChange={handleFile} />

  return (
    <Container>
      <Title>Last opp video for {organization.name}</Title>
      {renderContent()}
    </Container>
  )
}

export default UploadPage
