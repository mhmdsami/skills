import { env } from "@/env";

export function parseList(value?: string | null): string[] {
  return (value ?? "")
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowed(email: string | null | undefined, allowed: string[]): boolean {
  return !!email && allowed.includes(email.trim().toLowerCase());
}

/** Session-time gate so removing an email from the allowlist revokes existing users too. */
export async function allowedAccounts(): Promise<string[]> {
  return parseList(env().ADMIN_EMAILS);
}
