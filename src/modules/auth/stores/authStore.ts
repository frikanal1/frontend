import { AxiosError } from "axios"
import { computed, observable, makeObservable } from "mobx"
import { createStoreFactory, Store } from "src/modules/state/classes/Store"
import { AuthUser } from "../types"

export type SerializedAuthStore = {
  user?: AuthUser
}

export class AuthStore extends Store<SerializedAuthStore> {
  public user?: AuthUser

  public make() {
    makeObservable(this, {
      user: observable,
      isAuthenticated: computed,
    })
  }

  public serialize() {
    return { user: this.user }
  }

  public hydrate(data: SerializedAuthStore) {
    this.user = data.user
  }

  public async authenticate() {
    const { networkStore } = this.manager.stores
    const { api } = networkStore

    if (this.isAuthenticated) return

    try {
      const response = await api.get<{ user: AuthUser }>("/auth/user")

      this.user = response.data.user
    } catch (error) {
      const { response } = error as AxiosError

      // Not logged in
      if (response?.status === 401) {
        return
      }
    }
  }

  public async logout() {
    const { networkStore } = this.manager.stores
    const { api } = networkStore

    try {
      await api.post("/auth/logout")
      this.user = undefined
    } catch (e) {}
  }

  public get isAuthenticated() {
    return !!this.user
  }
}

export const authStore = createStoreFactory(AuthStore)
