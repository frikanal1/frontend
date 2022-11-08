import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import Login from "src/refactor/Login"
import userContext from "../refactor/UserContext"

export const LoginPage = () => {
  const router = useRouter()
  const { session } = useContext(userContext)

  useEffect(() => {
    router.push("/profile")
  }, [session, router])

  return (
    <div className={"flex mt-5 px-5 py-10 justify-center"}>
      <Login onSuccess={() => router.push("/profile")} />
    </div>
  )
}

export default LoginPage
