import { env } from "@/env";
import { listPrivateSkills, putPrivateSkill } from "@/lib/private-skills";
import { authorized, validSlug } from "@/lib/token";

export const dynamic = "force-dynamic";

const maxContentLength = 200_000;

export async function GET(request: Request) {
  if (!authorized(request, env().SKILLS_TOKEN)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ skills: await listPrivateSkills(env()) });
}

export async function POST(request: Request) {
  if (!authorized(request, env().SKILLS_TOKEN)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body: { slug?: unknown; content?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  const content = typeof body.content === "string" ? body.content : "";
  if (!validSlug(slug)) return Response.json({ error: "Use a lowercase, hyphenated slug." }, { status: 400 });
  if (!content) return Response.json({ error: "Skill content is required." }, { status: 400 });
  if (content.length > maxContentLength) return Response.json({ error: "Skill content must be under 200 KB." }, { status: 413 });

  const meta = await putPrivateSkill(env(), slug, content);
  return Response.json({ skill: meta });
}
