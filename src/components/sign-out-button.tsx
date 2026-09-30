"use client";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  return (
    <button
      onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } })}
      className="text-[11px] text-muted hover:text-foreground"
    >
      Sign out
    </button>
  );
}
