import useSWR from "swr"
import Link from "next/link"
import { styled } from "@mui/system"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { VideoData } from "../../../modules/video/types"
import { format } from "date-fns"
import { nb } from "date-fns/locale"
import { Meta } from "../../../modules/core/components/Meta"
import React from "react"
import { Edit } from "@mui/icons-material"

const Container = styled("div")``

export const VideoAdminList = () => {
  const { data: videos } = useSWR<{ rows: VideoData[] }>("/videos?limit=50")

  const columns: GridColDef[] = [
    {
      field: "edit",
      headerName: "",
      width: 1,
      renderCell: ({ row }) => (
        <Link href={`/admin/videos/${row.id}`} passHref>
          <a><Edit/></a>
        </Link>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      width: 10,
      align: "right",
      headerAlign: "right",
    },
    { field: "title", headerName: "Tittel", width: 400 },
    {
      field: "organizationName",
      headerName: "Organisasjon",
      width: 400,
      valueGetter: ({ row }) => row.organization.name,
    },
    {
      field: "createdAt",
      headerName: "Lastet opp",
      width: 400,
      valueGetter: ({ row }) => format(new Date(row.createdAt), "d. MMM Y", { locale: nb }),
    },
  ]

  return (
    <Container>
      <Meta meta={{ title: "Videoer" }} />
      <Link href={"/admin"} passHref>
        <a>
          <h1>Administratorfunksjoner</h1>
        </a>
      </Link>
      <h2>Videoer</h2>
      <DataGrid disableSelectionOnClick autoHeight rows={videos?.rows ?? []} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </Container>
  )
}

export default VideoAdminList
