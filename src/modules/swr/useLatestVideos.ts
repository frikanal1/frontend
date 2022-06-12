import useSWR from "swr"
import { VideoData } from "../video/types"

export const useLatestVideos = (organizationId?: string | string[], fallback?: { [p: string]: any }) => {
  if (!organizationId) return {}
  if (typeof organizationId !== "string") throw new Error("useOrganization expected organizationId to be string")

  const { data } = useSWR<{ rows: VideoData[] }>(`/videos?organization=${organizationId}`, fallback && { fallback })

  return { videos: data?.rows }
}
