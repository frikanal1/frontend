import useSWR from "swr"
import Link from "next/link"
import { styled } from "@mui/system"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { VideoData } from "../../../modules/video/types"

const Container = styled("div")``

export const VideoAdminPage = () => {
  const { data: videos } = useSWR<{ rows: VideoData[] }>("/videos?limit=50")

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 10, align: "right", headerAlign: "right" },
    { field: "title", headerName: "Tittel", width: 400 },
    {
      field: "organizationName",
      headerName: "Organisasjon",
      width: 400,
      valueGetter: ({ row }) => row.organization.name,
    },
  ]

  console.log(videos?.rows)
  return (
    <Container>
      <Link href={"/admin"} passHref>
        <a>
          <h1>Administratorfunksjoner</h1>
        </a>
      </Link>
      <h2>Videoer</h2>
      <DataGrid autoHeight rows={videos?.rows ?? []} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </Container>
  )
}

export default VideoAdminPage
