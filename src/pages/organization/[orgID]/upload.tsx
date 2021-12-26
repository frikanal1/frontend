import React from "react"
import styled from "@emotion/styled"
import { Organization } from "src/modules/organization/resources/Organization"
import { createResourcePageWrapper } from "src/modules/state/helpers/createResourcePageWrapper"
import { useStores } from "src/modules/state/manager"
import { observer } from "mobx-react-lite"
import { FileInput } from "src/modules/input/components/FileInput"
import {
  getInitialRequireAuthenticationProps,
  RequireAuthentication,
} from "src/modules/auth/components/RequireAuthentication"
import { useObserver } from "src/modules/state/hooks/useObserver"
import { VideoUploadView } from "src/modules/video/components/VideoUploadView"

const Container = styled.div``

const Title = styled.h1`
  margin-bottom: 16px;
`

export type UploadProps = {
  organization: Organization
}

const Upload = observer((props: UploadProps) => {
  const { organization } = props
  const { videoUploadStore } = useStores()

  const upload = useObserver(() => videoUploadStore.uploads.find((u) => u.organization === organization.data.id))

  const handleFile = (files: File[]) => {
    videoUploadStore.add(organization.data.id, files[0])
  }

  const renderContent = () => {
    if (!upload) {
      return <FileInput label="Klikk for å laste opp" onChange={handleFile} />
    }

    return <VideoUploadView upload={upload} />
  }

  return (
    <Container>
      <Title>Last opp video for {organization.data.name}</Title>
      {renderContent()}
    </Container>
  )
})

const UploadPage = createResourcePageWrapper<Organization>({
  getFetcher: (query, manager) => {
    const { organizationStore } = manager.stores
    const { orgID } = query

    const safeOrgId = Number(orgID) ?? 0
    return organizationStore.fetchById(safeOrgId)
  },
  renderContent: (o) => (
    <RequireAuthentication>
      <Upload organization={o} />
    </RequireAuthentication>
  ),
  getInitialProps: async (_, context) => {
    await getInitialRequireAuthenticationProps(context)
  },
})

export default UploadPage
