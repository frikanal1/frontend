// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  const cookie = request.cookies.get("fk-session")

  if (cookie) return NextResponse.next()
  return NextResponse.redirect(new URL(request.url).origin + "/login")
}

export const config = {
  matcher: "/profile",
}
