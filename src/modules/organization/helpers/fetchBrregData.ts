type BrregAddress = {
  adresse: string[]
  kommune: string
  postnummer: string
  poststed: string
}

type BrregData = {
  navn: string
  postadresse: BrregAddress
  forretningsadresse: BrregAddress
  hjemmeside: string
}

export type OrgdataFromBrreg = {
  brregId: string
  name: string
  homepage: string
  postalAddress?: string
  streetAddress?: string
}

const formatAddress = (address: BrregAddress) => {
  return address.adresse.join("\n") + "\n" + `${address.postnummer} ${address.poststed}`
}

export const fetchBrregData = async (brregId: string): Promise<OrgdataFromBrreg> => {
  const res = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${brregId}`)
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Organisasjonsnummer ${brregId} finnes ikke i Enhetsregisteret`)
    }
    throw new Error(`${res.status} ${await res.text()}`)
  }

  const data = (await res.json()) as BrregData

  if (!data || !brregId) throw new Error("Failed to get brreg data")

  const { navn: name, hjemmeside: homepage } = data
  const postalAddress = data.postadresse && formatAddress(data.postadresse)
  const streetAddress = data.forretningsadresse && formatAddress(data.forretningsadresse)
  return { brregId, name, homepage, postalAddress, streetAddress }
}
