import { Button, InputLabel, TextField } from "@mui/material"
import React, { useRef } from "react"
import { useOnClickOutside } from "usehooks-ts"
import { useMutation } from "@apollo/client"
import { LoginDocument } from "../generated/graphql"
import Nope from "nope-validator"
import { FieldValues, useForm } from "react-hook-form"
import { nopeResolver } from "@hookform/resolvers/nope"
import { ErrorMessage } from "@hookform/error-message"

const LoginSchema = Nope.object().shape({
  email: Nope.string().required(),
  password: Nope.string()
    .required()
    .min(6, "Passord må være minst 6 tegn")
    .max(64, "Imponerende, men ditt passord må være maksimalt 64 tegn"),
})

export const Login = ({ onCancel, onSuccess }: { onCancel?: () => void; onSuccess: () => void }) => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(LoginSchema) })

  const [mutate] = useMutation(LoginDocument, {
    refetchQueries: ["GetSession"],
    onError: (e) => setError("backend", { type: "custom", message: e.toString() }),
    onCompleted: () => onSuccess(),
  })

  const onSubmit = async ({ email, password }: FieldValues) => await mutate({ variables: { email, password } })

  const ref = useRef(null)

  useOnClickOutside(ref, () => onCancel && onCancel())

  return (
    <div
      ref={ref}
      className={
        "max-w-[700px] w-full p-4 lg:p-24 bg-gradient-to-t from-green-300 to-green-200 flex flex-col gap-14 border-2 border-green-900"
      }
    >
      <h4 className={"text-2xl lg:text-4xl font-bold"}>Logg inn</h4>
      <form className={"flex flex-col gap-2"}>
        <InputLabel className="text-xl" htmlFor={"login-email"}>
          Epost
        </InputLabel>
        <TextField className={"bg-white"} {...register("email")} autoFocus autoComplete={"email"} id={"login-email"} />
        <ErrorMessage errors={errors} name={"email"} />

        <InputLabel className="text-xl" htmlFor={"login-password"}>
          Passord
        </InputLabel>
        <TextField
          {...register("password")}
          className={"bg-white"}
          type={"password"}
          autoComplete={"current-password"}
          id={"login-password"}
        />
        <ErrorMessage errors={errors} name={"password"} />
      </form>
      <ErrorMessage errors={errors} name={"backend"} />
      <div className={"flex gap-8"}>
        {onCancel && (
          <Button className="grow text-xl bg-white" variant="outlined" onClick={onCancel}>
            Avbryt
          </Button>
        )}
        <Button className="grow text-xl bg-white" variant="contained" onClick={handleSubmit(onSubmit)}>
          Logg inn
        </Button>
      </div>
    </div>
  )
}

export default Login
