import { ObservableForm } from "src/modules/form/classes/ObservableForm"
import { string } from "src/modules/form/fields/string"
import { Manager } from "src/modules/state/types"

export const createTextSlideForm = (manager: Manager) => {
  return new ObservableForm(
    {
      heading: string(),
      text: string(),
    },
    manager
  )
}

export type TextSlideForm = ReturnType<typeof createTextSlideForm>
