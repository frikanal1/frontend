import { ApiCollection } from "src/modules/network/types"
import { List } from "src/modules/state/classes/List"
import { ListFactory } from "src/modules/state/types"
import { VideoData } from "../types"

export type Params = {
  q: string
  organization: number
}

export type Data = {
  path: string
  params: Partial<Params>
}

export const createVideoList: ListFactory<Data, Params> = (data, manager) => {
  const { path, params } = data
  const { videoStore, networkStore } = manager.stores

  return new List<number, Params>({
    fetch: async (options) => {
      const { api } = networkStore
      const { params, limit, offset } = options

      const result = await api.get<ApiCollection<VideoData>>(path, {
        params: {
          ...params,
          limit,
          offset,
        },
      })

      const { rows, count } = result.data
      const mappedIds = rows.map((r) => videoStore.add(r))
      const newOffset = offset + rows.length

      return {
        newItems: mappedIds,
        newOffset: offset + rows.length,
        hasMore: count > newOffset,
      }
    },
    initialParams: params,
  })
}

export type VideoList = ReturnType<typeof createVideoList>
