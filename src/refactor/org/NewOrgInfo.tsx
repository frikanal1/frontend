import { ExternalLink } from "../../modules/ui/components/ExternalLink"
import React from "react"

export const NewOrgInfo = () => (
  <div className={"max-w-prose"}>
    <h2>Opprett medlemskap</h2>
    <p>Her kan du opprette en ny organisasjon i vår database.</p>
    <p>
      Du vil umiddelbart kunne laste opp innhold, men for at organisasjonens innhold skal være synlig for andre eller
      sendes på sendeplanen, må betalt kontingent være registrert, og en redaktørerklæring være mottatt.
    </p>
    <p>
      Privatpersoner kan også melde seg inn i Frikanalen og sende innhold som en organisasjon, men de vil likevel måtte
      inkludere besøks- og postadresse i henhold til{" "}
      <ExternalLink href="https://lovdata.no/lov/1992-12-04-127/§2-16">Kringkastingsloven §2-16</ExternalLink>, og vil
      ikke ha medlemsrettigheter i Frikanalen, som blant annet stemmerett.
    </p>
    <p>
      En mal for redaktørerklæring vil være tilgjengelig for nedlasting på organisasjonens side. Utelat i så fall
      organisasjonsnummer, sett organisasjonsnavn til ditt fulle navn.
    </p>
  </div>
)
