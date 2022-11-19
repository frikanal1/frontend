import Nope from "nope-validator"

export const RegisterFormSchema = Nope.object().shape({
  email: Nope.string().required("Du må oppgi en e-post addresse"),
  password: Nope.string()
    .required("Du må oppgi et passord")
    .min(6, "Passord må være minst 6 tegn")
    .max(64, "Imponerende, men ditt passord må være maksimalt 64 tegn"),
})

export const LoginSchema = Nope.object().shape({
  email: Nope.string().required(),
  password: Nope.string()
    .required()
    .min(6, "Passord må være minst 6 tegn")
    .max(64, "Passord må være maksimalt 64 tegn"),
})
