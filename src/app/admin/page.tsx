import Link from "next/link";
import { env } from "@/env";
import { listPrivateSkills } from "@/lib/private-skills";
import { listRecommendations } from "@/lib/recommendations";
import { deletePrivateSkillAction } from "./actions";
import { RecommendationsPanel } from "./recommendations";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [skills, recommendations] = await Promise.all([listPrivateSkills(env()), listRecommendations()]);

  return (
    <div className="space-y-12">
      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div>
            <h1 className="text-lg font-medium tracking-tight">Private skills</h1>
            <p className="mt-1 text-[11px] text-muted">Stored in R2 + D1, served unlisted at /internal/{"<slug>"}.</p>
          </div>
          <Link href="/admin/skills/new" className="rounded-md border border-border px-3 py-1.5 text-[11px] text-muted hover:text-foreground">New skill</Link>
        </div>
        <ul className="mt-5 border-t border-border">
          {skills.length ? skills.map((skill) => (
            <li key={skill.slug} className="flex items-center gap-4 border-b border-border py-3">
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] text-foreground">{skill.name}</div>
                <div className="mt-0.5 truncate text-[11px] text-muted">{skill.description || "No description"}</div>
              </div>
              <code className="hidden shrink-0 text-[11px] text-muted sm:block">/internal/{skill.slug}</code>
              <Link href={`/admin/skills/${skill.slug}`} className="shrink-0 text-[11px] text-muted hover:text-foreground">Edit</Link>
              <form action={deletePrivateSkillAction}>
                <input type="hidden" name="slug" value={skill.slug} />
                <button className="shrink-0 text-[11px] text-muted hover:text-red-300">Delete</button>
              </form>
            </li>
          )) : <li className="border-b border-border py-4 text-[11px] text-muted">No private skills yet.</li>}
        </ul>
      </section>

      <RecommendationsPanel recommendations={recommendations} />
    </div>
  );
}
