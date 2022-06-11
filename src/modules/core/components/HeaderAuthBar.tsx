import { styled } from "@mui/system"
import { observer } from "mobx-react-lite"
import { spawnLoginModal } from "src/modules/auth/helpers/spawnLoginModal"
import { useManager } from "src/modules/state/manager"
import { GenericButton } from "src/modules/ui/components/GenericButton"
import React from "react"
import { HeaderUserDropdown } from "./HeaderUserDropdown"

const Container = styled("div")`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`

export const HeaderAuthBar = observer(() => {
  const manager = useManager()

  const { authStore } = manager.stores
  const { isAuthenticated } = authStore

  const renderUnauthenticated = () => {
    return <GenericButton variant="primary" onClick={() => spawnLoginModal(manager)} label="Logg inn" />
  }

  const renderAuthenticated = () => {
    const user = authStore.user!

    return <HeaderUserDropdown user={user} />
  }

  return <Container>{isAuthenticated ? renderAuthenticated() : renderUnauthenticated()}</Container>
})
