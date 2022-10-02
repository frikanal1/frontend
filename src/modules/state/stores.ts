import { configStore, ConfigStore } from "src/modules/core/stores/configStore"
import { ModalStore, modalStore } from "src/modules/modal/stores/modalStore"
import { NetworkStore, networkStore } from "src/modules/network/stores/networkStore"
import { organizationStore, OrganizationStore } from "src/modules/organization/stores/organizationStore"
import { PopoverStore, popoverStore } from "src/modules/popover/stores/popoverStore"
import { ScheduleStore, scheduleStore } from "src/modules/schedule/stores/scheduleStore"
import { VideoStore, videoStore } from "src/modules/video/stores/videoStore"
import { CookieStore, cookieStore } from "./stores/cookieStore"
import { listStore, ListStore } from "./stores/listStore"
import { StoreFactories } from "./types"

export type Stores = {
  listStore: ListStore
  videoStore: VideoStore
  modalStore: ModalStore
  cookieStore: CookieStore
  configStore: ConfigStore
  networkStore: NetworkStore
  popoverStore: PopoverStore
  scheduleStore: ScheduleStore
  organizationStore: OrganizationStore
}

export const stores: StoreFactories = {
  listStore,
  videoStore,
  modalStore,
  configStore,
  cookieStore,
  popoverStore,
  networkStore,
  scheduleStore,
  organizationStore,
}
