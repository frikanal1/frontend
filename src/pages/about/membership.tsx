import styled from "../../modules/styling/transientStyled"
import { AboutLinkBar } from "./index"

const TutorialList = styled("ul")`
  li {
    list-style-type: disc;
    margin: 0.5em;
    margin-left: 2em;
  }
`

export const MembershipPage = () => {
  return (
    <div>
      <AboutLinkBar />

      <div className={"flex gap-4"}>
        <div className={"lg:basis-1/4"}>
          <div className={"bg-gradient-to-b from-green-300 to-green-400 italic-semi text-green-900 p-5 "}>
            Bli med som medlem!
          </div>
        </div>
        <section className={"prose"}>
          <p>
            Alle individer og ikke-kommersielle organisasjoner kan tegne medlemskap i Frikanalen og få sitt innhold
            sendt på riksdekkende fjernsyn.
          </p>
          <p>Slik går du frem:</p>
          <TutorialList>
            <li>
              Opprett en bruker på denne nettsiden, ved å trykke på «Logg inn» oppe til høyre, og så «Registrer ny
              konto?»
            </li>
            <li>Fra din brukerprofil, opprett en ny organisasjon</li>
            <li>For informasjon om kontingent og innmelding, se «Kontakt oss» lenger nede på denne siden</li>
          </TutorialList>
        </section>
      </div>
    </div>
  )
}

export default MembershipPage
