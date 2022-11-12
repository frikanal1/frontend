import { UserPageLayout } from "../../refactor/user/UserPageLayout"

export const ProfilePage = () => (
  <UserPageLayout>
    <div className={"bg-gradient-to-b from-green-600 to-green-800 p-8 font-bold h-48 text-green-100 drop-shadow-xl"}>
      Her kommer et skjema for å redigere/vise brukerprofilen din.
    </div>
  </UserPageLayout>
)

export default ProfilePage
