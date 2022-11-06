import { ReactNode } from "react"

export const Document = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <div className={"" + className}>{children}</div>
)
