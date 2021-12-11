import { ObservableForm } from "modules/form/classes/ObservableForm";
import { string } from "modules/form/fields/string";
import { Manager } from "modules/state/types";

export const createNewOrganizationForm = (manager: Manager) => {
  return new ObservableForm(
    {
      brregNumber: string().min(9).max(9).required(),
      name: string().required().min(3),
      postalAddress: string().required(),
      streetAddress: string().required(),
      homepage: string().required().url(),
    },
    manager
  );
};

export type NewOrganizationForm = ReturnType<typeof createNewOrganizationForm>;
