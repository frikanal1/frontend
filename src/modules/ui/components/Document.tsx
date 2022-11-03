import { ReactNode } from "react"

export const Document = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <div className={"max-w-prose prose  lg:prose-xl prose-p:m-0 prose-p:ml-3 [&_section]:ml-2 " + className}>
    {children}
  </div>
)
