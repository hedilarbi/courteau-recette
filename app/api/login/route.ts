import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  getAuthCredentials,
  getExpectedAuthToken,
  isAuthConfigured,
} from "../../../lib/auth";

type LoginBody = {
  username?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { message: "Login non configure sur le serveur." },
      { status: 500 }
    );
  }

  let body: LoginBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Requete de login invalide." },
      { status: 400 }
    );
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";
  const credentials = getAuthCredentials();

  if (username !== credentials.username || password !== credentials.password) {
    return NextResponse.json(
      { message: "Identifiants invalides." },
      { status: 401 }
    );
  }

  const token = await getExpectedAuthToken();
  if (!token) {
    return NextResponse.json(
      { message: "Login non configure sur le serveur." },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: AUTH_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
