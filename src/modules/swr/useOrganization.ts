import useSWR from "swr"
import { OrganizationData } from "../organization/resources/Organization"

export const useOrganization = (organizationId?: string | string[], fallback?: { [p: string]: any }) => {
  if (!organizationId) return {}
  if (typeof organizationId !== "string") throw new Error("useOrganization expected organizationId to be string")

  const { data } = useSWR<OrganizationData>(`/organizations/${organizationId}`, fallback && { fallback })

  return { organization: data }
}
