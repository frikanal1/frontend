import { styled } from "@mui/system"
import { EmptyState } from "src/modules/ui/components/EmptyState"
import { LatestVideosFragment } from "../../../generated/graphql"
import { AspectContainer } from "../../core/components/AspectContainer"
import Link from "next/link"
import { format } from "date-fns"
import { nb } from "date-fns/locale"

const Grid = styled("ul")`
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 32px;
`

export type VideoGridProps = {
  videos?: LatestVideosFragment["latestVideos"]
}

export function VideoGrid({ videos }: VideoGridProps) {
  if (!videos) return null
  if (!videos.length) return <EmptyState title="Ingen videoer enda" icon="film" />

  return (
    <Grid>
      {videos.map(({ id, title, createdAt, images }) => (
        <div key={id}>
          <div>
            <AspectContainer width={1280} height={720}>
              <Link href={`/video/${id}`} passHref>
                <a>
                  <img alt={"thumbnail"} src={images.thumbLarge} />
                </a>
              </Link>
            </AspectContainer>
          </div>
          <div>
            <div>
              <Link href={`/video/${id}`} passHref>
                <a>{title}</a>
              </Link>
            </div>
          </div>
          <div>lastet opp {format(new Date(createdAt), "d. MMM yyyy", { locale: nb })}</div>
        </div>
      ))}
    </Grid>
  )
}
