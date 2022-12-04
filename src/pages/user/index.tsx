import React, { useContext } from "react"
import UploadVideoDialog from "../../modules/videoNew/UploadVideoDialog"
import userContext from "../../refactor/UserContext"
import { UserPageLayout } from "../../refactor/user/UserPageLayout"

const Index = () => {
  const { activeOrganization } = useContext(userContext)

  return <UserPageLayout>{activeOrganization && <UploadVideoDialog orgId={activeOrganization.id} />}</UserPageLayout>
}

export default Index
