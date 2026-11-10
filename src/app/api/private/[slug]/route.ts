import { env } from "@/env";
import { archivePrivateSkill, deletePrivateSkill, unarchivePrivateSkill } from "@/lib/private-skills";
import { authorized, validSlug } from "@/lib/token";

export const dynamic = "force-dynamic";

function slugFrom(request: Request): string {
  return decodeURIComponent(new URL(request.url).pathname.split("/").filter(Boolean).at(-1) ?? "");
}

export async function PATCH(request: Request) {
  if (!authorized(request, env().SKILLS_TOKEN)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const slug = slugFrom(request);
  if (!validSlug(slug)) return Response.json({ error: "Invalid slug." }, { status: 400 });

  let body: { archived?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body.archived !== "boolean") {
    return Response.json({ error: "Pass { \"archived\": true } or { \"archived\": false }." }, { status: 400 });
  }

  if (body.archived) await archivePrivateSkill(env(), slug);
  else await unarchivePrivateSkill(env(), slug);
  return Response.json({ slug, archived: body.archived });
}

export async function DELETE(request: Request) {
  if (!authorized(request, env().SKILLS_TOKEN)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const slug = slugFrom(request);
  if (!validSlug(slug)) return Response.json({ error: "Invalid slug." }, { status: 400 });
  await deletePrivateSkill(env(), slug);
  return Response.json({ deleted: slug });
}
