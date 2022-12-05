import { FieldValues, useForm } from "react-hook-form"
import { nopeResolver } from "@hookform/resolvers/nope"
import { TextField } from "@mui/material"
import React from "react"
import Nope from "nope-validator"
import { ErrorMessage } from "@hookform/error-message"
import { MutateOrganizationDocument } from "../../generated/graphql"
import { useMutation } from "@apollo/client"
import { OrgdataFromBrreg, fetchBrregData } from "../../modules/organization/helpers/fetchBrregData"
import { Button } from "src/modules/ui/components/Button"

const NewOrgBrregSchema = Nope.object().shape({
  brregId: Nope.string()
    .regex(/^\d{9}$/, "Må være ni siffer")
    .required(),
})

const NewOrgDetailSchema = Nope.object().shape({
  name: Nope.string().required().min(3),
  postalAddress: Nope.string().required(),
  streetAddress: Nope.string().required(),
  homepage: Nope.string().url(),
})

export const NewOrgFormPartOne = ({ onSubmit }: { onSubmit: (brregData: OrgdataFromBrreg) => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({ resolver: nopeResolver(NewOrgBrregSchema) })

  return (
    <div>
      <form
        onSubmit={handleSubmit(async ({ brregId }) => {
          try {
            onSubmit(await fetchBrregData(brregId))
          } catch (e: any) {
            setError("backend", { type: "custom", message: e.message })
          }
        })}
      >
        <div className={"bg-green-50 p-4 w-fit rounded-lg"}>
          <div className={"flex gap-4 items-center "}>
            <TextField
              {...register("brregId")}
              name="brreg-id"
              helperText={<ErrorMessage errors={errors} name="brregId" />}
              label="Brønnøysund-nummer"
              inputProps={{ form: { "data-lp-ignore": true, autoComplete: "off" } }}
            />
            <div>
              <Button className={"w-20"} type={"submit"}>
                Opprett
              </Button>
            </div>
          </div>
          <div>
            <ErrorMessage
              errors={errors}
              name={"backend"}
              render={({ message }) => <code className={"text-red-800"}>Feil: {message}</code>}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export const NewOrgFormPartTwo = ({
  brregData,
  onCreated,
}: {
  brregData: OrgdataFromBrreg
  onCreated: (newOrgId: string) => Promise<any>
}) => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(NewOrgDetailSchema), defaultValues: { ...brregData, backend: undefined } })

  const [mutate] = useMutation(MutateOrganizationDocument, {
    variables: { organization: { brregId: brregData.brregId } },
    onError: (e) => setError("backend", { type: "custom", message: "Serverfeil:" + e.message }),
    onCompleted: (data) => onCreated(data.organization.id),
  })

  const onSubmit = async (newOrg: FieldValues) => await mutate({ variables: { organization: newOrg } })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-4"}>
      <div>Sjekk informasjon og opprett organisasjon</div>
      <div>
        <TextField {...register("name")} fullWidth label="Organisasjonsnavn" />
        <ErrorMessage errors={errors} name={"name"} />
      </div>
      <div>
        <TextField {...register("homepage")} fullWidth label="Hjemmeside" />
        <ErrorMessage errors={errors} name={"homepage"} />
      </div>
      <div className={"flex gap-4"}>
        <div className={"grow"}>
          <TextField fullWidth multiline minRows={4} {...register("postalAddress")} label="Postadresse" />
          <ErrorMessage errors={errors} name={"postalAddress"} />
        </div>
        <div className={"grow"}>
          <TextField fullWidth multiline minRows={4} {...register("streetAddress")} label="Besøksadresse" />
          <ErrorMessage errors={errors} name={"streetAddress"} />
        </div>
      </div>
      <Button type={"submit"}>Opprett</Button>
      <ErrorMessage
        errors={errors}
        name={"backend"}
        render={({ message }) => <code className={"backendError"}>{message}</code>}
      />
    </form>
  )
}
