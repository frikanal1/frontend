import { createOrganizationList } from "src/modules/organization/lists/createOrganizationList"
import { createVideoList } from "src/modules/video/lists/createVideoList"

export const lists = {
  video: createVideoList,
  organization: createOrganizationList,
}

export type ListType = keyof typeof lists
