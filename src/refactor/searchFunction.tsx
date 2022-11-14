import Link from "next/link"
import { useRef, useState } from "react"
import { VideoSearchDocument, VideoSearchResultFragment } from "../generated/graphql"
import SearchIcon from "@mui/icons-material/Search"
import { useQuery } from "@apollo/client"
import { InputBase } from "@mui/material"
import { useDebounce, useOnClickOutside } from "usehooks-ts"

const SearchResults = ({ results, show }: { results?: VideoSearchResultFragment[]; show?: boolean }) => {
  if (!results?.length) return null
  if (!show) return null
  return (
    <div
      className={
        "bg-gradient-to-b from-green-100 to-green-300 rounded-b-lg top-full left-0 w-full absolute flex flex-col"
      }
    >
      {results?.map((foo) => (
        <SearchResult key={foo.id} result={foo} />
      ))}
    </div>
  )
}
const SearchResult = ({ result }: { result: VideoSearchResultFragment }) => (
  <div className={" pl-2 pr-5 pb-[5px] text-black/80 hover:text-green-900 hover:bg-green-200"}>
    <Link href={`/video/${result.id}`}>
      <div className={"flex gap-2 items-center text-lg"}>
        <img className={"w-16 aspect-video block"} alt={""} src={result.images.thumbSmall} />
        <div className={"text-black/60"}>{result.organization.name}</div>
        <div className={""}>{result.title}</div>
      </div>
    </Link>
  </div>
)
export const SearchFunction = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState<string>("")
  // Every time the query changes, a half-second timeout before we search,
  // so a user typing will not trigger as many searches as keypresses.
  const debouncedQuery = useDebounce<string>(query, 500)
  const { data } = useQuery(VideoSearchDocument, { variables: { query: debouncedQuery } })

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
        <div className={"px-5 ml-5 py-3"}>Søk</div>
        <div className={"bg-green-100 rounded-lg m-1 grow text-black " + (items?.length ? "rounded-b-none" : "")}>
          <div className={"relative"}>
            <form role={"search"} onSubmit={(e) => e.preventDefault()}>
              <SearchResults show={showResults} results={items} />
              <span className={"mx-2"}>
                <SearchIcon />
              </span>
              <InputBase
                onClick={() => setShowResults(true)}
                value={query}
                placeholder="Søk"
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
