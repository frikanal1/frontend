import { SearchFunction } from "../../refactor/searchFunction"

const FeaturedVideo = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className={"flex p-4 h-full bg-gradient-to-bl from-transparent to-black/60 w-full"}>
        <div className={"text-3xl font-bold text-white/95"}>Nyeste videoer</div>
      </div>
    </div>
  )
}

export const ArchiveHome = () => {
  return (
    <div className={"z-0"}>
      <SearchFunction className={"drop-shadow-xl relative z-10"} />
      <div className={"-z-50 min-h-[500px] py-3 gap-8 flex flex-row"}>
        <FeaturedVideo className={"drop-shadow-xl grow bg-orange-700"} />
      </div>
    </div>
  )
}

export default ArchiveHome
