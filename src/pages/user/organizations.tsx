import { UserPageLayout } from "../../refactor/user/UserPageLayout"
import { NewOrgInfo } from "../../refactor/org/NewOrgInfo"

export const OrganizationPage = () => (
  <UserPageLayout>
    <div className={"bg-gradient-to-b from-green-600 to-green-800 p-8 font-bold text-green-100 drop-shadow-xl"}>
      <NewOrgInfo />
    </div>
  </UserPageLayout>
)

export default OrganizationPage
