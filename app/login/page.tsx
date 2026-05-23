"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

function getRedirectTarget() {
  const params = new URLSearchParams(window.location.search);
  const from = params.get("from");

  if (!from || !from.startsWith("/") || from.startsWith("//")) {
    return "/";
  }

  return from;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.message ?? "Connexion refusee.");
        return;
      }

      window.location.assign(getRedirectTarget());
    } catch {
      setError("Connexion impossible.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="lc-login-page">
      <form className="lc-login-panel" onSubmit={handleSubmit}>
        <Image
          src="/logo.png"
          alt="Casse-Croûte Courteau"
          width={200}
          height={83}
          priority
          className="lc-login-logo"
        />

        <div className="lc-login-head">
          <span className="lc-login-kicker">ACCES INTERNE</span>
          <h1>Recettes cuisine</h1>
        </div>

        <label className="lc-login-field">
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            autoFocus
            required
          />
        </label>

        <label className="lc-login-field">
          <span>Mot de passe</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <div className="lc-login-error">{error}</div>}

        <button className="lc-login-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Connexion..." : "Entrer"}
        </button>
      </form>
    </main>
  );
}
