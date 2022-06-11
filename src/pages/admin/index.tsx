import { styled } from "@mui/system"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import Link from "next/link"

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

export const AdminPage = () => {
  return (
    <div>
      <h1>Administratorfunksjoner</h1>
      <FunctionBoxContainer>
        <Link href={"/admin/bulletins"} passHref>
          <FunctionBox>
            <NewspaperIcon sx={{ fontSize: 72 }} />
            Nyheter
          </FunctionBox>
        </Link>
      </FunctionBoxContainer>
    </div>
  )
}

export default AdminPage
