import InputBase from "@mui/material/InputBase/InputBase"

import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react"
const SearchFunction = ({ className }: { className?: string }) => {
  const [query] = useState<string>()

  return (
    <div className={className}>
      <div
        className={
          "bg-gradient-to-b from-green-600 to-green-800 p-2 flex font-bold text-2xl text-white/95 items-center"
        }
      >
        <div className={"px-5 ml-5 py-3"}>Søk</div>
        <div className={"bg-white/80 rounded-lg m-1 grow text-black"}>
          <span className={"mx-2"}>
            <SearchIcon />
          </span>
          <InputBase value={query} placeholder="Søk" />
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
