import Link from "next/link"

export const Footer = ({ className }: { className?: string }) => (
  <div className={"flex " + (className || "")}>
    <span className={"grow"}>© 2009 - {new Date().getFullYear()} Foreningen Frikanalen</span>
    <nav className={"space-x-4"}>
      <Link href="https://github.com/Frikanalen/frikanalen">GitHub</Link>
      <Link href="https://beta.frikanalen.no/about/technical">API</Link>
    </nav>
  </div>
)
