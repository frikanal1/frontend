import { useMutation } from "@apollo/client"
import { Button } from "@mui/material"
import Link from "next/link"
import { PublishVideoDocument } from "../generated/graphql"

interface VideoCreationPublishProps {
  videoId: string
}

export const VideoCreationPublish = ({ videoId }: VideoCreationPublishProps) => {
  const [mutate] = useMutation(PublishVideoDocument, { variables: { videoId: videoId } })

  return (
    <div className={"flex flex-col gap-3 w-full"}>
      Gratulerer! Videoen din er nå lastet opp. Du kan se en forhåndsvisning på{" "}
      <Link href={`/video/${videoId}`} passHref>
        <a>videosiden</a>
      </Link>
      Inntil du publiserer, er den kun synlig for deg.
      <div className={"ml-auto"}>
        <Button
          className="bg-teal-200 hover:bg-teal-100"
          variant="contained"
          onClick={async () => {
            await mutate()
          }}
        >
          Publiser
        </Button>
      </div>
    </div>
  )
}
