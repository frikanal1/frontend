import { styled } from "@mui/system"
import { SVGIcon } from "src/modules/ui/components/SVGIcon"
import Link from "next/link"
import { useRouter } from "next/router"
import { Popover } from "@mui/material"
import { useOnClickOutside } from "usehooks-ts"
import { useMutation } from "@apollo/client"
import { LogoutDocument } from "../../../generated/graphql"
import { RefObject } from "react"

const Container = styled("div")`
  margin: 16px 0px;
  padding: 8px 0px;
`

const Option = styled("a")`
  display: flex;
  align-items: center;

  min-width: 180px;

  padding: 12px 24px;
  cursor: pointer;

  color: ${(props) => props.theme.palette.text.secondary};
  transition: 200ms ease color;

  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
`

const Label = styled("span")`
  margin-left: 16px;
`

const Icon = styled(SVGIcon)`
  width: 24px;
  height: 24px;
`

export function HeaderUserPopover({
  open,
  onClose,
  anchorEl,
}: {
  open: boolean
  onClose: () => void
  anchorEl: RefObject<HTMLDivElement>
}) {
  const router = useRouter()
  const [mutate] = useMutation(LogoutDocument, { refetchQueries: ["GetSession"] })
  useOnClickOutside(anchorEl, onClose)

  const handleLogout = async () => {
    await mutate()
    onClose()
  }

  const renderPlayoutOption = () => {
    //if (!authStore.user?.permissions.includes("ATEM_CONTROL")) return null

    return (
      <Option onClick={() => router.push("/playout")}>
        <Icon name="film" />
        <Label>Playout</Label>
      </Option>
    )
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl.current}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Container>
        <Link href="/profile" passHref>
          <Option onClick={onClose}>
            <Icon name="user" />
            <Label>Profil</Label>
          </Option>
        </Link>
        {renderPlayoutOption()}
        <Option onClick={handleLogout}>
          <Icon name="logout" />
          <Label>Logg ut</Label>
        </Option>
      </Container>
    </Popover>
  )
}
