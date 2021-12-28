import { Resource, ResourceFactory } from "src/modules/state/classes/Resource"
import { Manager } from "src/modules/state/types"
import { VideoAsset, VideoData } from "../types"

export class Video extends Resource<VideoData> {
  constructor(data: VideoData, manager: Manager) {
    super(data, manager)

    const { organization } = this.data
    const { organizationStore } = this.manager.stores

    organizationStore.add(organization)
  }

  public get organization() {
    const { organizationStore } = this.manager.stores
    return organizationStore.getResourceById(this.data.organization.id)
  }

  // TODO: This should perhaps be moved to the Organization resource in the future
  public get latestVideosByOrganization() {
    const { id } = this.organization.data
    const { listStore } = this.manager.stores

    return listStore.ensure(`latest-videos-organization-${id}`, "video", {
      path: "/videos",
      params: {
        organization: id,
      },
    })
  }

  public getAsset(type: VideoAsset["type"]) {
    const asset = this.data.media.assets.find((a) => a.type === type)

    if (!asset) {
      throw new Error(`Asset ${type} is missing!`)
    }

    return asset
  }
}

export const createVideo: ResourceFactory<Video> = (data, manager) => new Video(data, manager)
