import { publicSkillFiles } from "@/lib/public-skills.generated";
import { validSlug } from "@/lib/token";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(publicSkillFiles).map((slug) => ({ slug }));
}

export async function GET(request: Request) {
  const slug = new URL(request.url).pathname.split("/").at(-1) ?? "";
  if (!validSlug(slug)) return new Response("Not found", { status: 404 });

  const body = publicSkillFiles[slug];
  if (!body) return new Response("Not found", { status: 404 });

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'inline; filename="SKILL.md"',
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
