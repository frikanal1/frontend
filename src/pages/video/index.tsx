import { SearchFunction } from "./searchFunction"

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
