import { InputLabel, TextField } from "@mui/material"
import React from "react"
import Nope from "nope-validator"
import { nopeResolver } from "@hookform/resolvers/nope"
import { FieldValues, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useMutation } from "@apollo/client"
import { EditProfileDocument } from "../../generated/graphql"
import { Button } from "../ui/components/Button"

const EditUserSchema = Nope.object().shape({
  name: Nope.string(),
})

export const UserProfileForm = () => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(EditUserSchema) })

  const [mutate] = useMutation(EditProfileDocument, {
    onError: (e) => setError("backend", { type: "custom", message: e.toString() }),
  })

  return (
    <form
      className={"text-black p-4 space-y-3"}
      onSubmit={handleSubmit(({ name }: FieldValues) => mutate({ variables: { input: { name } } }))}
    >
      <h2 className={"text-2xl"}>Rediger profil</h2>
      <div className={"flex"}>
        <div>
          <InputLabel htmlFor={"profile-name"}>Navn</InputLabel>
          <TextField {...register("name")} id="profile-name" />
          <ErrorMessage errors={errors} name={"name"} />
        </div>
      </div>
      <div className={"text-red-800"}>
        <ErrorMessage errors={errors} name={"backend"} />
      </div>
      <div>
        <Button type="submit">Lagre</Button>
      </div>
    </form>
  )
}
