import { Resource, ResourceFactory } from "src/modules/state/classes/Resource"
import { User } from "src/modules/user/schemas"

export type OrganizationData = {
  id: number
  name: string
  description: string
  postalAddress: string
  streetAddress: string

  editor: User
}

export class Organization extends Resource<OrganizationData> {
  public get videos() {
    const { id } = this.data
    const { listStore } = this.manager.stores

    return listStore.ensure(`videos-organization-${id}`, "video", {
      path: "/videos",
      params: {
        organization: id,
      },
    })
  }
}

export const createOrganization: ResourceFactory<Organization> = (data, manager) => new Organization(data, manager)
