import InputBase from "@mui/material/InputBase/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { VideoSearchDocument, VideoSearchResultFragment } from "../../generated/graphql"

import * as Popover from "@radix-ui/react-popover"
import Link from "next/link"

const SearchResults = ({ results }: { results?: VideoSearchResultFragment[] }) => {
  return (
    <Popover.Root open={!!results?.length}>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content side={"bottom"} align={"start"}>
          <div className={"bg-green-100 p-1 pb-3 pt-0"}>
            {results?.map((foo) => (
              <SearchResult key={foo.id} result={foo} />
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

const SearchResult = ({ result }: { result: VideoSearchResultFragment }) => (
  <div className={" pl-2 pr-5 pb-[5px] text-black/80 hover:text-green-900 hover:bg-green-200"}>
    <Link href={`/video/${result.id}`}>
      <div className={"flex items-center"}>
        <img className={"pr-2"} alt={""} src={result.images.thumbSmall} />
        {result.organization.name}: {result.title}
      </div>
    </Link>
  </div>
)

const SearchFunction = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState<string>("")
  const { data } = useQuery(VideoSearchDocument, { variables: { query } })

  const items = data?.video.search.items

  return (
    <div className={className}>
      <div
        className={
          "bg-gradient-to-b from-green-600 to-green-800 p-2 flex font-bold text-2xl text-white/95 items-center"
        }
      >
        <div className={"px-5 ml-5 py-3"}>Søk</div>
        <div className={"bg-green-100 rounded-lg m-1 grow text-black " + (items?.length ? "rounded-bl-none" : "")}>
          <span className={"mx-2"}>
            <SearchIcon />
          </span>
          <InputBase value={query} placeholder="Søk" onChange={(e) => setQuery(e.target.value)} />
          <SearchResults results={items} />
        </div>
      </div>
    </div>
  )
}

const FeaturedVideo = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className={"flex p-4 h-full bg-gradient-to-bl from-transparent to-black/60 w-full"}>
        <div className={"text-3xl font-bold text-white/95"}>Nyeste videoer</div>
      </div>
    </div>
  )
}

export const ArchiveIndex = () => {
  return (
    <div>
      <SearchFunction className={"drop-shadow-xl"} />
      <div className={" min-h-[500px] py-3 gap-8 flex flex-row"}>
        <FeaturedVideo className={"drop-shadow-xl grow bg-orange-700"} />
      </div>
    </div>
  )
}

export default ArchiveIndex
