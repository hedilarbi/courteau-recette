export const AUTH_COOKIE_NAME = "courteau_recipes_auth";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 12;

type AuthCredentials = {
  username: string;
  password: string;
};

export function getAuthCredentials(): AuthCredentials {
  return {
    username: process.env.RECIPES_AUTH_USERNAME ?? "",
    password: process.env.RECIPES_AUTH_PASSWORD ?? "",
  };
}

export function isAuthConfigured() {
  const { username, password } = getAuthCredentials();
  return Boolean(username && password);
}

export async function getExpectedAuthToken() {
  const { username, password } = getAuthCredentials();
  if (!username || !password) return null;

  return sha256(`${username}:${password}`);
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
