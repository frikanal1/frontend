import React from "react"
import Link from "next/link"

export const NewOrgInfo = () => (
  <div className={"prose max-w-5xl"}>
    <h2>Opprett medlemsorganisasjon</h2>
    <p>Her kan du opprette en ny organisasjon i vår database.</p>
    <p>
      Du vil umiddelbart kunne laste opp innhold, men for at organisasjonens innhold skal være synlig for andre eller
      sendes på sendeplanen, må betalt kontingent være registrert, og en redaktørerklæring være mottatt. En mal for
      redaktørerklæring vil være tilgjengelig for nedlasting på organisasjonens side.
    </p>
    <p>
      Privatpersoner kan også melde seg inn i Frikanalen og sende innhold som en organisasjon, men de vil likevel måtte
      inkludere besøks- og postadresse i henhold til{" "}
      <Link href="https://lovdata.no/lov/1992-12-04-127/§2-16">Kringkastingsloven §2-16</Link>, og vil ikke ha
      medlemsrettigheter i Frikanalen, som blant annet stemmerett. Dette er imidlertidig ikke støttet av denne
      veiviseren enda, og vi ber deg ta kontakt med <a href={"post@frikanalen.no"}>Frikanalens styreleder</a>.
    </p>
  </div>
)
