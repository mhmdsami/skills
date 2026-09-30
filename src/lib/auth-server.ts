import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "@/db/schema";
import type { Env } from "@/env";
import { isAllowed, parseList } from "@/lib/allowlist";

export function auth() {
  const { env } = getCloudflareContext();
  const e = env as unknown as Env;
  const admins = parseList(e.ADMIN_EMAILS);
  const database = drizzle(e.DB, { schema });

  return betterAuth({
    baseURL: e.BETTER_AUTH_URL,
    secret: e.BETTER_AUTH_SECRET,
    database: drizzleAdapter(database, { provider: "sqlite", schema }),
    socialProviders:
      e.GOOGLE_CLIENT_ID && e.GOOGLE_CLIENT_SECRET
        ? {
            google: {
              clientId: e.GOOGLE_CLIENT_ID,
              clientSecret: e.GOOGLE_CLIENT_SECRET,
              scope: ["openid", "email", "profile"],
            },
          }
        : undefined,
    databaseHooks: {
      user: {
        create: {
          before: async (newUser) => {
            if (!isAllowed(newUser.email, admins)) {
              throw new APIError("FORBIDDEN", { message: "This account is not allowed to sign in." });
            }
            return { data: newUser };
          },
        },
      },
    },
  });
}
