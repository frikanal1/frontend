import React from "react"
import { styled } from "@mui/system"
import { OrganizationData } from "src/modules/organization/resources/Organization"
import { useManager, useStores } from "src/modules/state/manager"
import { FileInput } from "src/modules/input/components/FileInput"
import { useObserver } from "src/modules/state/hooks/useObserver"
import { VideoUploadView } from "src/modules/video/components/VideoUploadView"
import useSWR from "swr"
import { NextPage } from "next"
import { useRouter } from "next/router"

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
  const { organizationId } = router.query
  const { data: organization } = useSWR<OrganizationData>(`/organizations/${organizationId}`)

  const { videoUploadStore } = useStores()

  const upload = useObserver(() => videoUploadStore.uploads.find((u) => u.organization.toString() === organizationId))

  if (organization?.editor.id !== user.id)
    return <Container>Du må være redaktør for denne organisasjonen for å laste opp video.</Container>

  if (!organization) return null

  const handleFile = (files: File[]) => {
    videoUploadStore.add(organization.id, files[0])
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
