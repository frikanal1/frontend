import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { LogoutDocument } from "../generated/graphql"

export const Logout = ({ errors }: { errors?: string[] }) => {
  const router = useRouter()
  const [mutate, { error }] = useMutation(LogoutDocument, {
    refetchQueries: ["GetSession"],
    awaitRefetchQueries: true,
    onCompleted: () => router.push("/"),
    onError: () => {},
  })

  mutate()

  if (error)
    return (
      <div>
        Det oppstod en feil i forsøk på å logge deg ut
        <pre>{errors?.map((e) => e)}</pre>
      </div>
    )

  return <div>Bye!</div>
}

export default Logout
