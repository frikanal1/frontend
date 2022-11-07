import { ExternalLink } from "src/modules/ui/components/ExternalLink"

export function Footer() {
  return (
    <div className={`space-x-10 text-slate-800 mx-auto flex my-4`}>
      <span className={"grow"}>© 2009 - {new Date().getFullYear()} Foreningen Frikanalen</span>
      <nav className={"space-x-4"}>
        <ExternalLink href="https://github.com/Frikanalen/frikanalen">GitHub</ExternalLink>
        <ExternalLink href="https://frikanalen.no/api/">API</ExternalLink>
        <ExternalLink href="https://frikanalen.no/xmltv/">XMLTV</ExternalLink>
      </nav>
    </div>
  )
}
