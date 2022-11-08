import { AboutLinkBar } from "./index"

export const VolunteerPage = () => {
  return (
    <div>
      <AboutLinkBar />
      <div className={"flex gap-4"}>
        <div className={"lg:basis-1/4"}>
          <div className={"bg-gradient-to-b from-green-300 to-green-400 italic-semi text-green-900 p-5 "}>
            placeholder
          </div>
        </div>
        <section className={"prose"}>
          <h5>...som frivillig</h5>
          <p>
            Frikanalen er drevet for frivilligheten av frivillige. Vi ønsker derfor alle velkomne som kunne være
            interessert i å bidra til utvikling og drift.
          </p>
          <p>Vi har et API i Koa/Node og Next.JS-klient. Ta kontakt med teknisk leder om du ønsker å bidra.</p>
        </section>
      </div>
    </div>
  )
}

export default VolunteerPage
