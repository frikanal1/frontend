import { ObservableForm } from "src/modules/form/classes/ObservableForm"
import { string } from "src/modules/form/fields/string"
import { Manager } from "src/modules/state/types"
import { User } from "../schemas"

export const createProfileForm = (user: User, manager: Manager) => {
  return new ObservableForm(
    {
      firstName: string({
        value: user.firstName,
      }),
      lastName: string({
        value: user.lastName,
      }),
    },
    manager
  )
}

export type ProfileForm = ReturnType<typeof createProfileForm>
