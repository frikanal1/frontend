import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import LoginForm from "src/refactor/forms/LoginForm"
import userContext from "../refactor/UserContext"
import Link from "next/link"

export const LoginPage = () => {
  const router = useRouter()
  const { session } = useContext(userContext)

  useEffect(() => {
    if (session?.user) router.push("/user")
  }, [session, router])

  return (
    <div className={"p-8 grow flex flex-col items-center justify-center text-green-900"}>
      <div className={"flex justify-center"}>
        <div className={"p-8 lg:p-14 bg-gradient-to-t from-green-400 to-green-300 border-2 border-green-900"}>
          <LoginForm onSuccess={() => router.push("/user")} />
          <div className={"text-right py-2"}>
            ...eller{" "}
            <Link className="font-bold underline" href={"/register"}>
              registrer ny bruker
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
