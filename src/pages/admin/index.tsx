import { styled } from "@mui/system"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import Link from "next/link"
import React, { ReactNode } from "react"
import { VideoLibrary } from "@mui/icons-material"
import { Meta } from "../../modules/core/components/Meta"

const FunctionBox = styled("div")`
  border: 2px solid #333;
  padding: 1em;
  margin: 1em;
  border-radius: 5px;
  background-color: #f3f3f3;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  :hover {
    background-color: white;
    border-color: #11e;
  }
`

const FunctionBoxContainer = styled("div")`
  display: flex;
`

interface LinkBoxProps {
  icon: any
  children: ReactNode
  href: string
}

const LinkBox = ({ icon: Icon, children, href }: LinkBoxProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <FunctionBox>
        <Icon sx={{ fontSize: 72 }} />
        {children}
      </FunctionBox>
    </Link>
  );
}

export const AdminPage = () => {
  return (
    <div>
      <Meta meta={{ title: "Administratorfunksjoner" }} />
      <h1>Administratorfunksjoner</h1>
      <FunctionBoxContainer>
        <LinkBox href={"/admin/bulletins"} icon={NewspaperIcon}>
          Nyheter
        </LinkBox>
        <LinkBox href={"/admin/videos"} icon={VideoLibrary}>
          Videoer
        </LinkBox>
      </FunctionBoxContainer>
    </div>
  )
}

export default AdminPage
