// Headline of major page components
export const ModuleHeading = ({ children, className }: { children: string; className?: string }) => (
  <h3 className={"text-2xl lg:text-4xl text-gray-800 py-3 font-sans font-bold " + className ?? ""}>{children}</h3>
)
