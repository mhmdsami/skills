import { env } from "@/env";
import { deletePrivateSkill } from "@/lib/private-skills";
import { authorized, validSlug } from "@/lib/token";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request) {
  if (!authorized(request, env().SKILLS_TOKEN)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const slug = decodeURIComponent(new URL(request.url).pathname.split("/").filter(Boolean).at(-1) ?? "");
  if (!validSlug(slug)) return Response.json({ error: "Invalid slug." }, { status: 400 });
  await deletePrivateSkill(env(), slug);
  return Response.json({ deleted: slug });
}
