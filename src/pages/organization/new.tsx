import { Meta } from "src/modules/core/components/Meta"
import React, { useState } from "react"
import { NewOrgFormPartTwo, NewOrgFormPartOne } from "../../refactor/org/NewOrgFormPartTwo"
import { useRouter } from "next/router"

export const NewOrganizationPage = () => {
  // useEffect(() => {
  //   const doFetch = async () => {
  //     setStatus("loading", "Henter data fra registeret...")
  //
  //     const data = await fetchBrregData(organizationNumber)
  //
  //     if (!data) {
  //       setStatus("error", "Kunne ikke hente data fra register, er organisasjonsnummer riktig?")
  //       return
  //     }
  //
  //     const safeName = toTitleCase(data.navn)
  //     const { name, postalAddress, streetAddress, homepage } = form.fields
  //
  //     name.setValue(safeName)
  //     postalAddress.setValue(`${safeName}\n${formatAddress(data.postadresse)}`)
  //     streetAddress.setValue(`${safeName}\n${formatAddress(data.forretningsadresse)}`)
  //     homepage.setValue(data.hjemmeside)
  //   }
  //
  //   if (organizationNumber.length === 9 && Number.isInteger(Number(organizationNumber))) {
  //     doFetch()
  //   }
  // }, [organizationNumber, form, setStatus])

  const [brregId, setBrregId] = useState<string | undefined>()
  const router = useRouter()
  const redirectToNewOrg = async (newOrgId: string) => router.push(`/organization/${newOrgId}`)

  return (
    <div>
      <Meta
        meta={{
          title: "Opprett medlemskap",
          description: "",
        }}
      />

      {!brregId ? (
        <NewOrgFormPartOne onSubmit={setBrregId} />
      ) : (
        <NewOrgFormPartTwo brregId={brregId} onCreated={redirectToNewOrg} />
      )}
    </div>
  )
}

export default NewOrganizationPage
