import { User } from "modules/user/schemas";

export type RolePermission = "ATEM_CONTROL";

export type AuthUser = User & {
  permissions: RolePermission[];
};
