import { ArchivePage } from "./index"

import { ParsedUrlQuery } from "querystring"
import { GetServerSideProps } from "next"
import { VideoSearchDocument, VideoSearchResultFragment } from "../../generated/graphql"
import { useQuery } from "@apollo/client"
import { CircularProgress } from "@mui/material"

interface SearchPageProps {
  query: string
}

interface SearchPageParams extends ParsedUrlQuery {
  q: string
}

const VideoSearchResult = ({ video }: { video: VideoSearchResultFragment }) => (
  <div className={"flex"}>
    <div className={"basis-1/6"}>
      <img alt="" src={video.images.thumbMedium} />
    </div>
    <div className={"p-2"}>
      <div className={"text-lg"}>{video.title}</div>
      <div className={"text-md"}>{video.organization.name}</div>
    </div>
  </div>
)

export const Search = ({ query }: SearchPageProps) => {
  const { data, loading, error } = useQuery(VideoSearchDocument, { variables: { query } })

  const results = data?.video.search.items

  return (
    <ArchivePage>
      <div className={"basis-1/6"}>
        <div className={"w-full border-2 border-dashed border-green-600 p-4"}>Søkealternativer</div>
      </div>
      <div className={"flex flex-col gap-4"}>
        {error ? (
          <div>Beklager, en feil oppstod</div>
        ) : loading ? (
          <CircularProgress />
        ) : results?.length ? (
          results.map((video) => <VideoSearchResult key={video.id} video={video} />)
        ) : (
          <div>Ingen videoer</div>
        )}
      </div>
    </ArchivePage>
  )
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (ctx) => {
  const { q } = ctx.query as SearchPageParams

  if (!q.length) throw new Error("query must be string")

  return { props: { query: q } }
}

export default Search
