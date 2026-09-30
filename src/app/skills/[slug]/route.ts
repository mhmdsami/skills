import { readFile } from "node:fs/promises";
import path from "node:path";
import { listSkills } from "@/lib/catalog";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listSkills()).map(({ slug }) => ({ slug }));
}

export async function GET(request: Request) {
  const slug = new URL(request.url).pathname.split("/").at(-1) ?? "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return new Response("Not found", { status: 404 });

  try {
    const body = await readFile(path.join(process.cwd(), "skills", slug, "SKILL.md"), "utf8");
    return new Response(body, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": 'inline; filename="SKILL.md"',
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
