import { styled } from "@mui/system"
import { ReactNode } from "react"

const DocumentComponent = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <div className={"max-w-500px prose lg:prose-xl prose-p:m-0 " + className}>{children}</div>
)

export const Document = styled(DocumentComponent)`
  section {
    margin-left: 1.5rem;

    > p {
      margin-left: 1.5rem;
    }
  }
`
