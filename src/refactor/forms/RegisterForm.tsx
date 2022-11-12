import { Button, InputLabel, TextField } from "@mui/material"
import React from "react"
import { useMutation } from "@apollo/client"
import { MutationStatus, RegisterDocument } from "../../generated/graphql"
import { FieldValues, useForm } from "react-hook-form"
import { nopeResolver } from "@hookform/resolvers/nope"
import { RegisterFormSchema } from "./schemas"
import { ErrorMessage } from "@hookform/error-message"

export const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(RegisterFormSchema) })

  const [mutate] = useMutation(RegisterDocument, {
    refetchQueries: ["GetSession"],
    onError: (e) => setError("backend", { type: "custom", message: e.toString() }),
    onCompleted: ({ user }) => {
      if (user.register.status === MutationStatus.Success) onSuccess()
      else setError("backend", { type: "custom", message: "Ukjent feil" })
    },
  })

  const onSubmit = async ({ email, password }: FieldValues) =>
    await mutate({ variables: { input: { email, password } } })

  return (
    <div>
      <h4 className={"py-4 text-2xl lg:text-4xl font-bold"}>Ny bruker</h4>
      <form className={"py-4 space-y-3"}>
        <div className={"space-y-2"}>
          <InputLabel className="text-xl" htmlFor={"register-email"}>
            Epost
          </InputLabel>
          <TextField
            className={"block bg-green-100"}
            {...register("email")}
            autoFocus
            autoComplete={"email"}
            id={"register-email"}
          />
          <ErrorMessage errors={errors} name={"email"} />
        </div>
        <div className={"space-y-2"}>
          <InputLabel className="text-xl" htmlFor={"register-password"}>
            Passord
          </InputLabel>
          <TextField
            {...register("password")}
            className={"block bg-green-100"}
            type={"password"}
            autoComplete={"new-password"}
            id={"register-password"}
          />
          <ErrorMessage errors={errors} name={"password"} />
        </div>
      </form>
      <div className={"py-1"}>
        <ErrorMessage errors={errors} name={"backend"} />
      </div>
      <div className={"py-4"}>
        <Button
          className="p-2 w-full text-xl bg-green-100 text-green-900"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Opprett bruker
        </Button>
      </div>
    </div>
  )
}
