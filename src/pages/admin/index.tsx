import NewspaperIcon from "@mui/icons-material/Newspaper"
import Link from "next/link"
import React, { ReactNode } from "react"
import { VideoLibrary } from "@mui/icons-material"
import { Meta } from "../../modules/core/components/Meta"

interface LinkBoxProps {
  icon: any
  children: ReactNode
  href: string
}

const LinkBox = ({ icon: Icon, children, href }: LinkBoxProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <div
        className={
          "border-2 border-gray-700 rounded-md aspect-square w-40 flex flex-col items-center justify-center " +
          "bg-gray-200 hover:bg-white hover:border-orange-400"
        }
      >
        <Icon className={"text-[72pt]"} />
        {children}
      </div>
    </Link>
  )
}

export const AdminPage = () => {
  return (
    <div>
      <Meta meta={{ title: "Administratorfunksjoner" }} />
      <h1 className={"text-xl font-bold"}>Administratorfunksjoner</h1>
      <div className={"flex gap-4"}>
        <LinkBox href={"/admin/bulletins"} icon={NewspaperIcon}>
          Nyheter
        </LinkBox>
        <LinkBox href={"/admin/videos"} icon={VideoLibrary}>
          Videoer
        </LinkBox>
      </div>
    </div>
  )
}

export default AdminPage
