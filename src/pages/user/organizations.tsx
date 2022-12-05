import { UserPageLayout } from "../../refactor/user/UserPageLayout"
import CreateOrganizationJourney from "../../modules/organization/components/CreateOrganizationJourney"

export const OrganizationPage = () => (
  <UserPageLayout>
    <CreateOrganizationJourney />
  </UserPageLayout>
)

export default OrganizationPage
