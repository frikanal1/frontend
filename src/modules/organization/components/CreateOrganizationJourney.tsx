import { Meta } from "src/modules/core/components/Meta"
import React, { useState } from "react"
import { NewOrgFormPartTwo } from "../../../refactor/org/NewOrgFormPartTwo"
import { useRouter } from "next/router"
import { OrgdataFromBrreg } from "../helpers/fetchBrregData"
import { NewOrgInfo } from "../../../refactor/org/NewOrgInfo"
import { NewOrgFormPartOne } from "../../../refactor/org/NewOrgFormPartOne"

export const CreateOrganizationJourney = () => {
  const [brregData, setBrregData] = useState<OrgdataFromBrreg | undefined>()
  const router = useRouter()
  const redirectToNewOrg = async (newOrgId: string) => router.push(`/organization/${newOrgId}`)

  return (
    <div className={"bg-gradient-to-b from-green-100 to-green-200"}>
      <h3 className="text-3xl bg-gradient-to-b from-green-800 to-green-900 font-bold text-green-100 px-8 py-5">
        Ny organisasjon - del {brregData ? "2" : "1"}
      </h3>
      <Meta
        meta={{
          title: "Opprett medlemskap",
          description: "",
        }}
      />
      <div className={"p-8"}>
        {!brregData ? (
          <div className={"space-y-4"}>
            <NewOrgInfo />
            <NewOrgFormPartOne onSubmit={setBrregData} />
          </div>
        ) : (
          <NewOrgFormPartTwo brregData={brregData} onCreated={redirectToNewOrg} />
        )}
      </div>
    </div>
  )
}

export default CreateOrganizationJourney
