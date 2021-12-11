import { createOrganizationList } from "modules/organization/lists/createOrganizationList";
import { createVideoList } from "modules/video/lists/createVideoList";

export const lists = {
  video: createVideoList,
  organization: createOrganizationList,
};

export type ListType = keyof typeof lists;
