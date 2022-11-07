import { Meta } from "src/modules/core/components/Meta"
import { ExternalLink } from "src/modules/ui/components/ExternalLink"
import { styled } from "@mui/system"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"

const TutorialList = styled("ul")`
  li {
    list-style-type: disc;
    margin: 0.5em;
    margin-left: 2em;
  }
`

const AboutLink = ({ to, children }: { to: string; children: ReactNode }) => {
  const router = useRouter()

  const isActive = router.pathname.toString() == to

  return (
    <Link href={to} passHref>
      <a
        className={
          "hover:text-black transition-color duration-200 ease-in-out font-extrabold " +
          (isActive ? "text-green-500" : "")
        }
      >
        {children}
      </a>
    </Link>
  )
}

export const AboutLinkBar = () => (
  <div className={"space-x-3 text-3xl pb-6 font-bold text-gray-500"}>
    <AboutLink to={"/about"}>Om oss</AboutLink>
    <AboutLink to={"/about/statutes"}>Vedtekter</AboutLink>
  </div>
)

export default function About() {
  return (
    <div className={"w-full"}>
      <Meta
        meta={{
          title: "Om",
          description: "Informasjon om Frikanalen og hvordan du kan bli medlem",
        }}
      />
      <AboutLinkBar />
      <div className={"flex flex-col lg:flex-row"}>
        <div className={"lg:basis-1/4"}>
          <div className={"bg-emerald-700 italic-semi text-white p-5 m-2"}>
            <div className={"font-extrabold text-2xl italic-semi"}>
              « Målet med Frikanalen er å styrke ytringsfrihet og deltakerdemokratiet ved å gi flere mulighet til å ytre
              seg i TV-mediet. »
            </div>
            <div className={"text-right pt-2 pr-2"}>
              <Link href={"/about/statutes"} passHref>
                <a className={"text-emerald-200 text-xl hover:text-emerald-100 no-underline"}>
                  Frikanalens formålsparagraf
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className={"font-serif text-justify p-5 pt-1"}>
          <h2 className={"text-4xl"}>Frikanalen er sivilsamfunnets videoplatform</h2>
          <div className={"prose-xl max-w-prose "}>
            <p>
              I samarbeid med våre medlemsorganisasjoner vil vi styrke norsk samfunnsliv og frivillighet med en
              ukommersiell videoplattform uten forhåndssensur.
            </p>
            <p>
              Vi tilbyr alle våre medlemmer adgang til en riksdekkende TV-kanal tilgjengelig på nett og mange
              kabel-TV-bokser. Vi er nå på RiksTV og Telenor (Te-We), og i forhandlinger med Telia.
            </p>
            <p>
              Det pågår også et arbeid med å tilrettelegge for brukerstyrte direktesendinger rett ut til vår TV-kanal. I
              tillegg til dette er vi i full gang med å utvikle en god løsning for spredning av video på nett. Så følg
              med!
            </p>

            <h4>Bli med</h4>
            <section>
              <h5>...som medlem</h5>
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
              Leder Ola Tellesbø kan nås på{" "}
              <ExternalLink href="mailto:post@frikanalen.no">post@frikanalen.no</ExternalLink>
            </p>
            <p>
              Teknisk leder Tore Sinding Bekkedal kan nås på{" "}
              <ExternalLink href="mailto:toresbe@protonmail.com">toresbe@protonmail.com</ExternalLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
