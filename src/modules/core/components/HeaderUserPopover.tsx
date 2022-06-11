import { styled } from "@mui/system"
import { PrimaryPopover } from "src/modules/popover/components/PrimaryPopover"
import { usePopoverContext } from "src/modules/popover/hooks/usePopoverContext"
import { useStores } from "src/modules/state/manager"
import { SVGIcon } from "src/modules/ui/components/SVGIcon"
import Link from "next/link"
import { useRouter } from "next/router"

const Container = styled(PrimaryPopover)`
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

export function HeaderUserPopover() {
  const router = useRouter()
  const { authStore } = useStores()
  const popover = usePopoverContext()

  const handleLogout = async () => {
    await authStore.logout()
    popover.dismiss()
  }

  const handleGoToPlayout = () => {
    router.push("/playout")
    popover.dismiss()
  }

  const renderPlayoutOption = () => {
    if (!authStore.user?.permissions.includes("ATEM_CONTROL")) return null

    return (
      <Option onClick={handleGoToPlayout}>
        <Icon name="film" />
        <Label>Playout</Label>
      </Option>
    )
  }

  return (
    <Container>
      <Link href="/profile" passHref>
        <Option onClick={popover.dismiss}>
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
  )
}
