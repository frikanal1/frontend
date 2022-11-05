// Headline of major page components
export const ModuleHeading = ({ children, className }: { children: string; className?: string }) => (
  <h3
    className={"text-2xl font-wide lg:text-4xl text-gray-800 pb-5 font-sans font-bold tracking-wide " + className ?? ""}
  >
    {children}
  </h3>
)
