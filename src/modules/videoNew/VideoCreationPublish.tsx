import { useMutation } from "@apollo/client"
import { Button } from "@mui/material"
import Link from "next/link"
import { PublishVideoDocument } from "../../generated/graphql"

interface VideoCreationPublishProps {
  videoId: string
}

export const VideoCreationPublish = ({ videoId }: VideoCreationPublishProps) => {
  const [mutate] = useMutation(PublishVideoDocument, { variables: { videoId: videoId } })

  return (
    <div className={"flex flex-col gap-3 w-full text-xl"}>
      <div>Gratulerer! Videoen din er nå lastet opp.</div>
      <div>
        Du kan se en forhåndsvisning på{" "}
        <Link href={`/video/${videoId}`} passHref className={"font-bold"}>
          videosiden
        </Link>
        .
      </div>
      <div>Inntil du publiserer, er den kun synlig for deg.</div>
      <div className={"ml-auto"}>
        <Button
          className="bg-green-200 hover:bg-green-100"
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
