import { env } from "@/env";
import { getPrivateSkill } from "@/lib/private-skills";
import { authorizeSlug } from "@/lib/access-keys";
import { validSlug } from "@/lib/token";
import { writeAudit } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const slug = decodeURIComponent(new URL(request.url).pathname.split("/").filter(Boolean).at(-1) ?? "");
  if (!validSlug(slug)) return new Response("Not found", { status: 404 });

  // Key-gated: a revoked, expired, or out-of-scope key is indistinguishable from a missing slug.
  const keyId = await authorizeSlug(request, slug);
  if (!keyId) return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });

  const body = await getPrivateSkill(env(), slug);
  if (!body) return new Response("Not found", { status: 404 });

  await writeAudit(`key:${keyId.slice(0, 8)}`, "key.use", slug);

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'inline; filename="SKILL.md"',
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store",
    },
  });
}
