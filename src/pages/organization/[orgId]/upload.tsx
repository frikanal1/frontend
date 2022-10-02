import React, { useContext } from "react"
import { styled } from "@mui/system"
import { FileInput } from "src/modules/input/components/FileInput"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { GetOrganizationDocument } from "../../../generated/graphql"
import UserContext from "../../../refactor/UserContext"

const Container = styled("div")``

export const UploadPage = () => {
  const { session } = useContext(UserContext)
  const { orgId } = useRouter().query

  const orgQuery = useQuery(GetOrganizationDocument, { variables: { orgId: orgId as string }, skip: !orgId })

  const organization = orgQuery.data?.organization

  if (organization?.editor.id !== session?.user?.id)
    return <Container>Du må være redaktør for denne organisasjonen for å laste opp video.</Container>

  if (!organization) return null

  const handleFile = () => {}

  return (
    <Container>
      <h3>Last opp video for {organization.name}</h3>
      <FileInput label="Klikk for å laste opp" onChange={handleFile} />
    </Container>
  )
}
//{upload ? <VideoUploadView upload={upload} /> :

export default UploadPage
