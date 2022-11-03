import { useContext } from "react"
import { OrganizationDataFragment } from "../generated/graphql"
import UserContext from "./UserContext"

export interface RequireUserIsEditorOfProps {
  organization: OrganizationDataFragment
  children: React.ReactNode
}

// Returns its children elements if the user is the editor of the organization.
// If user is not, show an error message.
export const RequireUserIsEditor: React.FC<RequireUserIsEditorOfProps> = ({ organization, children }) => {
  const { session } = useContext(UserContext)

  if (organization?.editor?.id !== session?.user?.id)
    return <div>Kun redaktøren for denne organisasjonen har adgang til å publisere videoer.</div>
  else return <>{children}</>
}
