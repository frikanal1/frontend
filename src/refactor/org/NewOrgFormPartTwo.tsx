import { FieldValues, useForm } from "react-hook-form"
import { nopeResolver } from "@hookform/resolvers/nope"
import { Button, TextField } from "@mui/material"
import React from "react"
import Nope from "nope-validator"
import { NewOrgInfo } from "./NewOrgInfo"
import { ErrorMessage } from "@hookform/error-message"
import { MutateOrganizationDocument } from "../../generated/graphql"
import { useMutation } from "@apollo/client"

const NewOrgBrregSchema = Nope.object().shape({
  brregId: Nope.string()
    .regex(/^\d{9}$/, "Må være ni siffer")
    .required(),
})

const NewOrgDetailSchema = Nope.object().shape({
  name: Nope.string().required().min(3),
  postalAddress: Nope.string().required(),
  streetAddress: Nope.string().required(),
  homepage: Nope.string().required().url(),
})

export const NewOrgFormPartOne = ({ onSubmit }: { onSubmit: (brregId: string) => void }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(NewOrgBrregSchema) })

  return (
    <div>
      <NewOrgInfo />
      <form onSubmit={handleSubmit(({ brregId }) => onSubmit(brregId))}>
        <TextField
          {...register("brregId")}
          error={!isValid}
          helperText={<ErrorMessage errors={errors} name="brregId" />}
          label="Organisasjonsnummer"
          placeholder="9 siffer"
        />

        <Button type={"submit"}>Opprett</Button>
      </form>
    </div>
  )
}

export const NewOrgFormPartTwo = ({
  brregId,
  onCreated,
}: {
  brregId?: string
  onCreated: (newOrgId: string) => Promise<any>
}) => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(NewOrgDetailSchema) })

  const [mutate] = useMutation(MutateOrganizationDocument, {
    variables: { organization: { brregId } },
    onError: (e) => setError("backend", { type: "custom", message: "Serverfeil. Rapport:\n" + e.toString() }),
    onCompleted: (data) => onCreated(data.organization.id),
  })

  const onSubmit = async (newOrg: FieldValues) => await mutate({ variables: { organization: newOrg } })

  return (
    <div>
      <div>Før inn ytterligere informasjon</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register("name")} label="Organisasjonsnavn" />
        <ErrorMessage errors={errors} name={"name"} />
        <TextField {...register("homepage")} label="Hjemmeside" placeholder="https://webside.no" />
        <ErrorMessage errors={errors} name={"homepage"} />
        <TextField {...register("postalAddress")} label="Postadresse" />
        <ErrorMessage errors={errors} name={"postalAddress"} />
        <TextField {...register("streetAddress")} label="Besøksadresse" />
        <ErrorMessage errors={errors} name={"streetAddress"} />
        <Button type={"submit"}>Opprett</Button>
        <ErrorMessage
          errors={errors}
          name={"backend"}
          render={({ message }) => <code className={"backendError"}>{message}</code>}
        />
      </form>
    </div>
  )
}
