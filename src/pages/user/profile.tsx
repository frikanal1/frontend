import { UserPageLayout } from "../../refactor/user/UserPageLayout"
import { UserProfileForm } from "../../modules/forms/UserProfileForm"

export const ProfilePage = () => (
  <UserPageLayout>
    <div className={"bg-gradient-to-b from-green-600 to-green-800 p-8 font-bold text-green-100 drop-shadow-xl"}>
      <div className={"bg-green-100"}>
        <UserProfileForm />
      </div>
    </div>
  </UserPageLayout>
)

export default ProfilePage
