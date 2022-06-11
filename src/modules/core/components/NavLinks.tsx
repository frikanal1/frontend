import React from "react"
import { HeaderLink } from "./HeaderLink"

export function NavLinks() {
  return (
    <>
      <HeaderLink accent="primary" to="/" label="Direkte" />
      <HeaderLink accent="primary" to="/schedule" label="Sendeplan" />
      <HeaderLink accent="primary" to="/about" label="Om oss" />
    </>
  )
}
