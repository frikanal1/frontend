export type BrregAddress = {
  adresse: string[]
  kommune: string
  postnummer: string
  poststed: string
}

export type BrregData = {
  navn: string
  postadresse: BrregAddress
  forretningsadresse: BrregAddress
  hjemmeside: string
}

export const fetchBrregData = async (organization: string) => {
  try {
    const res = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${organization}`)
    return (await res.json()) as BrregData
  } catch {
    return
  }
}
