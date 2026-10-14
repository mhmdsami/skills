"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const mounted = useRef(false);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  async function signOut() {
    if (busy) return;
    setBusy(true);
    setError(false);
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error("Sign out failed");
      window.location.assign("/");
    } catch {
      if (mounted.current) { setError(true); setBusy(false); }
    }
  }
  return <div className="relative">
    <button type="button" onClick={signOut} disabled={busy} className="row-action whitespace-nowrap">{busy && <LoaderCircle className="size-3 animate-spin" aria-hidden />}{busy ? "Signing out..." : "Sign out"}</button>
    {error && <p role="alert" className="absolute right-0 top-full z-10 mt-2 w-48 rounded-md border border-red-400/25 bg-panel p-2 text-[11px] text-red-300">Could not sign out. Try again.</p>}
  </div>;
}
