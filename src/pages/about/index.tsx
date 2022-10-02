import { Meta } from "src/modules/core/components/Meta"
import { Document } from "src/modules/ui/components/Document"
import { ExternalLink } from "src/modules/ui/components/ExternalLink"
import { Quote } from "src/modules/ui/components/Quote"
import { Typography } from "@mui/material"
import { styled } from "@mui/system"
import Link from "next/link"

const TutorialList = styled("ul")`
  li {
    list-style-type: disc;
    margin: 0.5em;
    margin-left: 2em;
  }
`

const AboutLinkBarDiv = styled("div")`
  display: flex;
  a {
    text-decoration: underline;
    font-weight: bold;

    color: #a6415c;
    &: hover {
      color: #f24949;
    }
  }
`

export const AboutLinkBar = () => (
  <AboutLinkBarDiv>
    <Typography variant={"h4"}>
      <Link href="/about/statutes" passHref>
        <a>Vedtekter</a>
      </Link>
    </Typography>
  </AboutLinkBarDiv>
)

export default function About() {
  return (
    <Document>
      <div>
        <Meta
          meta={{
            title: "Om",
            description: "Informasjon om Frikanalen og hvordan du kan bli medlem",
          }}
        />
        <h2>Frikanalen er sivilsamfunnets videoplatform</h2>
        <Quote
          citation={{
            name: "Frikanalens formålsparagraf",
            href: "/about/statutes",
          }}
        >
          Målet med Frikanalen er å styrke ytringsfrihet og deltakerdemokratiet ved å gi flere mulighet til å ytre seg i
          TV-mediet
        </Quote>
        <AboutLinkBar />
        <p>
          Vi ønsker i samarbeid med våre medlemsorganisasjoner å styrke norsk samfunnsliv og frivillighet med en
          ukommersiell videoplattform uten forhåndssensur.
        </p>
        <p>
          Vi tilbyr alle våre medlemmer adgang til en riksdekkende TV-kanal tilgjengelig på nett og mange
          kabel-TV-bokser. Vi er nå på RiksTV og Telenor (Te-We), og i forhandlinger med Telia.
        </p>
        <p>
          Det pågår også et arbeid med å tilrettelegge for brukerstyrte direktesendinger rett ut til vår TV-kanal. I
          tillegg til dette er vi i full gang med å utvikle en god løsning for spredning av video på nett. Så følg med!
        </p>

        <h4>Bli med</h4>
        <section>
          <h5>...som medlem</h5>
          <p>
            Alle individer og ikke-kommersielle organisasjoner kan tegne medlemskap i Frikanalen og få sitt innhold
            sendt på riksdekkende fjernsyn.
          </p>
          <p>
            Slik går du frem:
            <TutorialList>
              <li>
                Opprett en bruker på denne nettsiden, ved å trykke på «Logg inn» oppe til høyre, og så «Registrer ny
                konto?»
              </li>
              <li>Fra din brukerprofil, opprett en ny organisasjon</li>
              <li>For informasjon om kontingent og innmelding, se «Kontakt oss» lenger nede på denne siden</li>
            </TutorialList>
          </p>
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
      </div>
    </Document>
  )
}
