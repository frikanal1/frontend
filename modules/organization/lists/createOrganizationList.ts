import { ApiCollection } from "modules/network/types"
import { List } from "modules/state/classes/List"
import { ListFactory } from "modules/state/types"
import { OrganizationData } from "../resources/Organization"

export type Params = {
  editor: number
}

export type Data = {
  path: string
  params: Partial<Params>
}

export const createOrganizationList: ListFactory<Data, Params> = (data, manager) => {
  const { path, params } = data
  const { organizationStore, networkStore } = manager.stores

  return new List<number, Params>({
    fetch: async (options) => {
      const { api } = networkStore
      const { params, limit, offset } = options

      const result = await api.get<ApiCollection<OrganizationData>>(path, {
        params: {
          ...params,
          limit,
          offset,
        },
      })

      const { rows, count } = result.data
      const mappedIds = rows.map((r) => organizationStore.add(r))
      const newOffset = offset + rows.length

      return {
        newItems: mappedIds,
        newOffset,
        hasMore: count > newOffset,
      }
    },
    initialParams: params,
  })
}
