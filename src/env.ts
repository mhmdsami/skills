import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
  SKILLS_TOKEN?: string;
  BETTER_AUTH_SECRET?: string;
  BETTER_AUTH_URL?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  ADMIN_EMAILS?: string;
  LOCAL_PREVIEW?: string;
}

export function env(): Env {
  return getCloudflareContext().env as unknown as Env;
}
