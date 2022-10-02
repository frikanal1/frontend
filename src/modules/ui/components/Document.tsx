import { styled } from "@mui/system"
import { GENERAL_BREAKPOINT } from "../../core/constants"

export const Document = styled("div")`
  @media (max-width: ${GENERAL_BREAKPOINT}) {
    max-width: 100%;
    width: 100%;
  }

  section {
    margin-left: 1.5rem;

    > p {
      margin-left: 1.5rem;
    }
  }
`
