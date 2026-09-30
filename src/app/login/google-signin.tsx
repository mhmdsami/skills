"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export function GoogleSignIn({ next }: { next?: string }) {
  const [busy, setBusy] = useState(false);

  async function signIn() {
    setBusy(true);
    await authClient.signIn.social({ provider: "google", callbackURL: next || "/admin" });
  }

  return (
    <button
      onClick={signIn}
      disabled={busy}
      className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border text-[12px] text-foreground transition hover:border-white/25 disabled:opacity-50"
    >
      {busy ? (
        "Redirecting..."
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
            <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.3h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.2-2.1 3.7-5.1 3.7-8.8z" />
            <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.7-2.9c-1.1.7-2.5 1.2-4.2 1.2-3.2 0-6-2.2-7-5.1L1.2 17.2C3.1 21.1 7.2 24 12 24z" />
            <path fill="#FBBC05" d="M5 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.2 6.8C.4 8.4 0 10.2 0 12s.4 3.6 1.2 5.2L5 14.3z" />
            <path fill="#EA4335" d="M12 4.7c2.3 0 3.8 1 4.7 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.2 0 3.1 2.9 1.2 6.8L5 9.7c1-2.9 3.8-5 7-5z" />
          </svg>
          Continue with Google
        </>
      )}
    </button>
  );
}
