import { createStoreFactory, Store } from "modules/state/classes/Store"

export type ConfigData = {
  servers: {
    media: string
  }
}

let config: ConfigData | undefined

export class ConfigStore extends Store {
  public async init() {
    const { networkStore } = this.manager.stores
    const { api } = networkStore

    if (config) return

    const response = await api.get<ConfigData>("/config")
    config = response.data
  }

  public get config() {
    return config!
  }

  public get media() {
    return this.config.servers.media
  }

  public serialize() {
    return config
  }

  public hydrate(data: ConfigData) {
    config = data
  }
}

export const configStore = createStoreFactory(ConfigStore)
