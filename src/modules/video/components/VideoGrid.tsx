import { styled } from "@mui/system"
import { EmptyState } from "src/modules/ui/components/EmptyState"
import { Video } from "../resources/Video"
import { VideoGridItem } from "./VideoGridItem"

const Grid = styled("ul")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 32px;
`

export type VideoGridProps = {
  videos: Video[]
}

export function VideoGrid(props: VideoGridProps) {
  const { videos } = props

  if (!videos.length) return <EmptyState title="Ingen videoer enda" icon="film" />

  return (
    <Grid>
      {videos.map((v) => (
        <VideoGridItem key={v.data.id} videoId={v.data.id} />
      ))}
    </Grid>
  )
}
