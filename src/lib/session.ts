import { headers as nextHeaders } from "next/headers";
import { auth } from "@/lib/auth-server";
import { isLocalPreview } from "@/lib/local-preview";
import { env } from "@/env";
import { isAllowed, parseList } from "@/lib/allowlist";

export interface Viewer {
  id: string;
  email: string;
  name: string;
}

export async function getViewer(requestHeaders?: Headers): Promise<Viewer | null> {
  if (isLocalPreview()) {
    return { id: "dev-local", email: "dev@localhost", name: "Local" };
  }
  const headers = requestHeaders ?? (await nextHeaders());
  const session = await auth().api.getSession({ headers });
  if (!session?.user) return null;
  // Re-check the allowlist at session time so removing an email from
  // ADMIN_EMAILS revokes existing users too, not only new sign-ups.
  if (!isAllowed(session.user.email, parseList(env().ADMIN_EMAILS))) return null;
  return { id: session.user.id, email: session.user.email, name: session.user.name ?? "" };
}

export async function requireViewer(): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer) throw new Error("Unauthorized");
  return viewer;
}
