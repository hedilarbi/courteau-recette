import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, getExpectedAuthToken } from "./lib/auth";

const PUBLIC_FILE = /\.(?:avif|gif|ico|jpg|jpeg|png|svg|webp)$/i;
const PUBLIC_PATHS = new Set(["/login", "/api/login", "/api/logout"]);

function isPublicPath(pathname: string) {
  return (
    PUBLIC_PATHS.has(pathname) ||
    pathname.startsWith("/_next/") ||
    PUBLIC_FILE.test(pathname)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const expectedToken = await getExpectedAuthToken();
  const currentToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (expectedToken && currentToken === expectedToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", `${pathname}${search}`);

  if (!expectedToken) {
    loginUrl.searchParams.set("error", "missing-config");
  }

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
