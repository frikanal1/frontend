import { Button, InputLabel, Popover, TextField } from "@mui/material"
import { styled } from "@mui/system"
import React, { useRef } from "react"
import { useOnClickOutside } from "usehooks-ts"
import { useMutation } from "@apollo/client"
import { LoginDocument } from "../generated/graphql"
import Nope from "nope-validator"
import { FieldValues, useForm } from "react-hook-form"
import { nopeResolver } from "@hookform/resolvers/nope"
import { ErrorMessage } from "@hookform/error-message"

const LoginBox = styled("div")`
  border-radius: 5px;
  padding: 1.5rem;

  form {
    display: flex;
    flex-direction: column;

    > * {
      margin: 0.5em 0;
    }
    button {
      margin-top: 1em;
    }
  }
`

const LoginSchema = Nope.object().shape({
  email: Nope.string().required(),
  password: Nope.string()
    .required()
    .min(6, "Passord må være minst 6 tegn")
    .max(64, "Imponerende, men ditt passord må være maksimalt 64 tegn"),
})

export const Login = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: nopeResolver(LoginSchema) })

  const [mutate] = useMutation(LoginDocument, {
    refetchQueries: ["GetSession"],
    onError: (e) => setError("backend", { type: "custom", message: e.toString() }),
    onCompleted: () => onClose(),
  })

  const onSubmit = async ({ email, password }: FieldValues) => await mutate({ variables: { email, password } })

  const ref = useRef(null)
  useOnClickOutside(ref, () => onClose())

  return (
    <Popover
      open={open}
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
      transformOrigin={{ vertical: "center", horizontal: "center" }}
    >
      <LoginBox ref={ref}>
        <h4>Logg inn</h4>
        <form>
          <InputLabel htmlFor={"login-email"}>Epostadresse</InputLabel>
          <TextField {...register("email")} autoFocus autoComplete={"email"} id={"login-email"} />
          <ErrorMessage errors={errors} name={"email"} />

          <InputLabel htmlFor={"login-password"}>Passord</InputLabel>
          <TextField
            {...register("password")}
            type={"password"}
            autoComplete={"current-password"}
            id={"login-password"}
          />
          <ErrorMessage errors={errors} name={"password"} />

          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Logg inn
          </Button>
          <ErrorMessage errors={errors} name={"backend"} />
          <Button variant="outlined" onClick={onClose}>
            Avbryt
          </Button>
        </form>
      </LoginBox>
    </Popover>
  )
}

export default Login
