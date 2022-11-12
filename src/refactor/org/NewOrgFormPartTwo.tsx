import { FieldValues, useForm } from "react-hook-form"
import { nopeResolver } from "@hookform/resolvers/nope"
import { Button, TextField } from "@mui/material"
import React from "react"
import Nope from "nope-validator"
import { styled } from "@mui/system"
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

const NewOrgDivThing = styled("div")<{ horizontal?: boolean }>`
  display: flex;
  width: 100%;

  flex-direction: ${(props) => (props.horizontal ? "row" : "column")};
  align-items: ${(props) => (props.horizontal ? "flex-start" : "flex-end")};

  animation: 0.3s alternate slidein;

  @keyframes slidein {
    from {
      opacity: 0;
    }

    to {
      opacity: 100;
    }
  }

  > div {
    flex-grow: 1;
  }

  form {
    flex-grow: 0;
  }
`

const NewOrgFormThing = styled("form")`
  display: flex;
  flex-direction: column;

  gap: 1em;
  width: 400px;

  > * {
    background-color: white;
  }

  input {
  }

  button {
    border-radius: 5px;
  }

  .backendError {
    white-space: "pre-wrap";
  }
`

export const NewOrgFormPartOne = ({ onSubmit }: { onSubmit: (brregId: string) => void }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(NewOrgBrregSchema) })

  return (
    <NewOrgDivThing>
      <NewOrgInfo />
      <NewOrgFormThing onSubmit={handleSubmit(({ brregId }) => onSubmit(brregId))}>
        <TextField
          {...register("brregId")}
          error={!isValid}
          helperText={<ErrorMessage errors={errors} name="brregId" />}
          label="Organisasjonsnummer"
          placeholder="9 siffer"
        />

        <Button type={"submit"}>Opprett</Button>
      </NewOrgFormThing>
    </NewOrgDivThing>
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
    <NewOrgDivThing horizontal>
      <div>Før inn ytterligere informasjon</div>
      <NewOrgFormThing onSubmit={handleSubmit(onSubmit)}>
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
      </NewOrgFormThing>
    </NewOrgDivThing>
  )
}
