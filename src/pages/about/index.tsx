import { Meta } from "src/modules/core/components/Meta"
import Link from "next/link"
import { AboutLinkBar } from "./aboutLinkBar"

const Sitat = () => (
  <div className={"lg:basis-1/3 "}>
    <div className={"bg-gradient-to-b from-orange-300 to-orange-400 italic-semi text-right text-gray-800 p-8 "}>
      <div className={"font-extrabold text-xl italic-semi"}>
        «&nbsp;Målet med Frikanalen er å styrke ytringsfrihet og deltakerdemokratiet ved å gi flere mulighet til å ytre
        seg i TV-mediet.&nbsp;»
      </div>
      <div className={"text-right pt-2 pr-2"}>
        <Link
          href={"/about/statutes"}
          passHref
          className={"text-orange-900 text-xl hover:text-orange-100 no-underline"}
        >
          Frikanalens formålsparagraf
        </Link>
      </div>
    </div>
  </div>
)

export const About = () => (
  <div className={"w-full"}>
    <Meta
      meta={{
        title: "Om",
        description: "Informasjon om Frikanalen og hvordan du kan bli medlem",
      }}
    />
    <AboutLinkBar />
    <div className={"space-y-4 lg:pr-12 lg:pb-24"}>
      <div className={"flex gap-4"}>
        <Sitat />
        <div className={"space-y-2"}>
          <h2 className={"text-3xl text-gray-800 font-bold "}>Frikanalen er sivilsamfunnets videoplatform</h2>

          <div className={"max-w-prose space-y-2"}>
            <p>
              I samarbeid med våre medlemsorganisasjoner vil vi styrke norsk samfunnsliv og frivillighet med en ideellt
              drevet videoplattform av og for medlemmer.
            </p>
            <p>
              Vi tilbyr alle våre medlemmer adgang til en riksdekkende TV-kanal tilgjengelig for alle på nett og
              kabel-TV.
            </p>
          </div>
        </div>
      </div>{" "}
    </div>
  </div>
)

export default About
