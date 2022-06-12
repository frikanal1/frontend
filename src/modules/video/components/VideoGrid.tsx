import { styled } from "@mui/system"
import { EmptyState } from "src/modules/ui/components/EmptyState"
import { VideoGridItem } from "./VideoGridItem"
import { VideoData } from "../types"

const Grid = styled("ul")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 32px;
`

export type VideoGridProps = {
  videos?: VideoData[]
}

export function VideoGrid({ videos }: VideoGridProps) {
  if (!videos) return null
  if (!videos.length) return <EmptyState title="Ingen videoer enda" icon="film" />

  return (
    <Grid>
      {videos.map((v) => (
        <VideoGridItem key={v.id} videoId={v.id} />
      ))}
    </Grid>
  )
}
