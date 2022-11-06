import { ReactNode } from "react"

export const Document = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <div
    className={
      "max-w-[800px] prose lg:prose-xl prose-slate prose-p:m-0 prose-p:ml-4 prose-h5:font-sans prose-h5:font-bold prose-li:ml-4 prose-li:font-serif prose-p:font-serif [&_section]:ml-4 " +
      className
    }
  >
    {children}
  </div>
)
