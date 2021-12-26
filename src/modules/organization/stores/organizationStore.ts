import { ResourceFetcher } from "src/modules/state/classes/ResourceFetcher"
import { ResourceStore, SerializedResourceStore } from "src/modules/state/classes/ResourceStore"
import { createStoreFactory, Store } from "src/modules/state/classes/Store"
import { createOrganization, OrganizationData } from "../resources/Organization"

export class OrganizationStore extends Store<SerializedResourceStore<OrganizationData>> {
  private store = new ResourceStore({
    manager: this.manager,
    getId: (d: OrganizationData) => d.id,
    createFetcher: (manager, fetch) => new ResourceFetcher({ createResource: createOrganization, fetch, manager }),
    createCanonicalFetchData: (id) => async () => {
      const { networkStore } = this.manager.stores
      const { api } = networkStore

      const { data } = await api.get<OrganizationData>(`/organizations/${id}`)
      return data
    },
  })

  public fetchById(id: number) {
    const { networkStore } = this.manager.stores
    const { api } = networkStore

    return this.store.getOrCreateById(id, async () => {
      const { data } = await api.get<OrganizationData>(`/organizations/${id}`)
      return data
    })
  }

  public serialize() {
    return this.store.serialize()
  }

  public hydrate(data: SerializedResourceStore<OrganizationData>) {
    this.store.hydrate(data)
  }

  public get getResourceById() {
    return this.store.getResourceById.bind(this.store)
  }

  public get add() {
    return this.store.add.bind(this.store)
  }
}

export const organizationStore = createStoreFactory(OrganizationStore)
