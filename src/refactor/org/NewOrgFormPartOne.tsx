import { fetchBrregData, OrgdataFromBrreg } from "../../modules/organization/helpers/fetchBrregData"
import { Button } from "../../modules/ui/components/Button"
import Nope from "nope-validator"
import { useForm } from "react-hook-form"
import { nopeResolver } from "@hookform/resolvers/nope"
import { TextField } from "@mui/material"
import { ErrorMessage } from "@hookform/error-message"

const NewOrgBrregSchema = Nope.object().shape({
  brregId: Nope.string()
    .regex(/^\d{9}$/, "Må være ni siffer")
    .required(),
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
