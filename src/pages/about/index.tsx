import { Meta } from "src/modules/core/components/Meta"
import { Document } from "src/modules/ui/components/Document"
import { ExternalLink } from "src/modules/ui/components/ExternalLink"
import { styled } from "@mui/system"
import Link from "next/link"

const TutorialList = styled("ul")`
  li {
    list-style-type: disc;
    margin: 0.5em;
    margin-left: 2em;
  }
`

export const AboutLinkBar = () => (
  <div className={"space-x-3"}>
    <Link href="/about" passHref>
      <a>Om oss</a>
    </Link>
    <Link href="/about/statutes" passHref>
      <a>Vedtekter</a>
    </Link>
  </div>
)

export default function About() {
  return (
    <Document>
      <Meta
        meta={{
          title: "Om",
          description: "Informasjon om Frikanalen og hvordan du kan bli medlem",
        }}
      />
      <h2 className={"pt-5"}>Sivilsamfunnets videoplatform</h2>
      <AboutLinkBar />
      <div className={"bg-emerald-900 text-white p-5"}>
        <div className={"font-extrabold text-right"}>
          «Målet med Frikanalen er å styrke ytringsfrihet og deltakerdemokratiet ved å gi flere mulighet til å ytre seg
          i TV-mediet»
        </div>
        <Link href={"/about/statutes"} passHref>
          <a className={"text-emerald-300 hover:text-emerald-200 no-underline"}>Frikanalens formålsparagraf</a>
        </Link>
      </div>
      <p>
        Vi ønsker i samarbeid med våre medlemsorganisasjoner å styrke norsk samfunnsliv og frivillighet med en
        ukommersiell videoplattform uten forhåndssensur.
      </p>
      <p>
        Vi tilbyr alle våre medlemmer adgang til en riksdekkende TV-kanal tilgjengelig på nett og mange kabel-TV-bokser.
        Vi er nå på RiksTV og Telenor (Te-We), og i forhandlinger med Telia.
      </p>
      <p>
        Det pågår også et arbeid med å tilrettelegge for brukerstyrte direktesendinger rett ut til vår TV-kanal. I
        tillegg til dette er vi i full gang med å utvikle en god løsning for spredning av video på nett. Så følg med!
      </p>

      <h4>Bli med</h4>
      <section>
        <h5>...som medlem</h5>
        <p>
          Alle individer og ikke-kommersielle organisasjoner kan tegne medlemskap i Frikanalen og få sitt innhold sendt
          på riksdekkende fjernsyn.
        </p>
        <p>Slik går du frem:</p>
        <TutorialList>
          <li>
            Opprett en bruker på denne nettsiden, ved å trykke på «Logg inn» oppe til høyre, og så «Registrer ny konto?»
          </li>
          <li>Fra din brukerprofil, opprett en ny organisasjon</li>
          <li>For informasjon om kontingent og innmelding, se «Kontakt oss» lenger nede på denne siden</li>
        </TutorialList>
      </section>
      <section>
        <h5>...som frivillig</h5>
        <p>
          Frikanalen er drevet for frivilligheten av frivillige. Vi ønsker derfor alle velkomne som kunne være
          interessert i å bidra til utvikling og drift.
        </p>
        <p>Vi har et API i Koa/Node og Next.JS-klient. Ta kontakt med teknisk leder om du ønsker å bidra.</p>
      </section>
      <h4>Kontakt aktive</h4>

      <p>
        Leder Ola Tellesbø kan nås på <ExternalLink href="mailto:post@frikanalen.no">post@frikanalen.no</ExternalLink>
      </p>
      <p>
        Teknisk leder Tore Sinding Bekkedal kan nås på{" "}
        <ExternalLink href="mailto:toresbe@protonmail.com">toresbe@protonmail.com</ExternalLink>
      </p>
    </Document>
  )
}
