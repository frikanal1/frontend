import Link from "next/link"
import { useRef, useState } from "react"
import { VideoSearchDocument, VideoSearchResultFragment } from "../generated/graphql"
import SearchIcon from "@mui/icons-material/Search"
import { useQuery } from "@apollo/client"
import CircularProgress from "@mui/material/CircularProgress"
import InputBase from "@mui/material/InputBase"
import { useDebounce, useOnClickOutside } from "usehooks-ts"

const SearchResults = ({
  results,
  show,
  loading,
}: {
  results?: VideoSearchResultFragment[]
  show?: boolean
  loading?: boolean
}) => {
  const className =
    "bg-gradient-to-b from-green-100 to-green-300 rounded-b-lg  top-full left-0 w-full absolute flex flex-col"

  if (!show) return null

  if (!results?.length) {
    return (
      <div className={className}>
        <span className={"h-[5px]"}>&nbsp;</span>
      </div>
    )
  }
  if (loading)
    return (
      <div className={className}>
        <CircularProgress />
      </div>
    )

  return (
    <div className={className}>
      {results?.map((foo) => (
        <SearchResult key={foo.id} result={foo} />
      ))}
    </div>
  )
}
const SearchResult = ({ result }: { result: VideoSearchResultFragment }) => (
  <div className={"pl-2 pr-5 pb-[5px] text-black/80 hover:text-green-900 hover:bg-green-200"}>
    <Link href={`/video/${result.id}`}>
      <div className={"flex gap-2 lg:items-center text-sm lg:text-lg"}>
        <img
          className={"lg:basis-8 md:w-16 lg:w-32 grow-0 aspect-video block hidden md:block"}
          alt={""}
          src={result.images.thumbSmall}
        />
        <div className={"basis-1/7 lg:block"}>{result.organization.name}</div>
        <div className={"grow"}>{result.title}</div>
      </div>
    </Link>
  </div>
)
export const SearchFunction = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState<string>("")
  // Every time the query changes, a half-second timeout before we search,
  // so a user typing will not trigger as many searches as keypresses.
  const debouncedQuery = useDebounce<string>(query, 500)
  const { data, loading } = useQuery(VideoSearchDocument, { variables: { query: debouncedQuery } })

  const [showResults, setShowResults] = useState<boolean>()
  const ref = useRef(null)

  useOnClickOutside(ref, () => setShowResults(false))
  const items = data?.video.search.items

  return (
    <div ref={ref} className={className}>
      <div
        className={
          "z-50 bg-gradient-to-b from-green-600 to-green-800 p-2 flex font-bold text-2xl text-white/95 items-center"
        }
      >
        <div className={"px-5 ml-5 py-3 hidden lg:block"}>Søk</div>
        <div className={"bg-green-100 rounded-lg m-1 grow text-black " + (showResults ? "rounded-b-none" : "")}>
          <div className={"relative "}>
            <form role={"search"} className={"flex"} action={"/video/search"}>
              <SearchResults show={showResults} results={items} loading={loading} />
              <span className={"mx-2"}>
                <SearchIcon />
              </span>
              <InputBase
                onClick={() => setShowResults(true)}
                value={query}
                placeholder="Søk"
                fullWidth
                name={"q"}
                className={""}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
