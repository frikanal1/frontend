import Nope from "nope-validator"

export const RegisterFormSchema = Nope.object().shape({
  firstName: Nope.string().required("Du må oppgi et fornavn"),
  lastName: Nope.string().required("Du må oppgi et etternavn"),
  email: Nope.string().required("Du må oppgi en e-post addresse"),
  password: Nope.string()
    .required("Du må oppgi et passord")
    .min(6, "Passord må være minst 6 tegn")
    .max(64, "Imponerende, men ditt passord må være maksimalt 64 tegn"),
})
