import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Dev-only auth bypass. Honored only when LOCAL_PREVIEW=1 is set in .dev.vars
 * AND the auth base URL is localhost, so it can never activate in production
 * (where BETTER_AUTH_URL is https://skills.sam1.space).
 */
export function isLocalPreview(): boolean {
  try {
    const env = getCloudflareContext().env as Record<string, string | undefined>;
    if (env.LOCAL_PREVIEW !== "1") return false;
    return !!env.BETTER_AUTH_URL?.startsWith("http://localhost");
  } catch {
    return false;
  }
}
