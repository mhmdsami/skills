import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { env } from "@/env";
import { getPrivateSkill, listVersions } from "@/lib/private-skills";
import { restorePrivateSkillAction, savePrivateSkillAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function formatDate(value: number): string {
  return new Date(value).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default async function PrivateSkillPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const { slug } = await params;
  const { ok, error } = await searchParams;
  const isNew = slug === "new";
  const content = isNew ? "" : (await getPrivateSkill(env(), slug)) ?? "";
  if (!isNew && !content) {
    return <p className="text-[13px] text-muted">Skill not found. <Link href="/admin" className="underline decoration-white/20 underline-offset-4 hover:text-foreground">Back</Link></p>;
  }
  const versions = isNew ? [] : await listVersions(env(), slug);

  return (
    <div className="space-y-12">
      <form action={savePrivateSkillAction} className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium tracking-tight">{isNew ? "New private skill" : slug}</h1>
          <Link href="/admin" className="inline-flex items-center gap-1 text-[12px] text-muted hover:text-foreground"><ArrowLeft className="size-3" /> Back</Link>
        </div>

        {!isNew && <input type="hidden" name="slug" value={slug} />}

        <textarea
          name="content"
          aria-label="SKILL.md"
          defaultValue={content}
          spellCheck={false}
          placeholder={"---\nname: My skill\ndescription: What it does.\ninternal: true\n---\n\n# My skill\n"}
          className="min-h-[460px] w-full resize-y rounded-md border border-border bg-[#0e0f0d] p-4 text-[13px] leading-[1.75] text-[#d7d8d2] outline-none focus:border-white/20"
        />

        <div className="flex items-center justify-between">
          <p className="text-[11px] text-muted">
            {ok === "saved" ? "Saved." : ok === "restored" ? "Version restored." : error ? "Could not save." : "The slug and listing come from the frontmatter name and description."}
          </p>
          <button className="rounded-md bg-accent px-3.5 py-2 text-[12px] font-medium text-[#171a14] hover:brightness-110">Save</button>
        </div>
      </form>

      {!isNew && versions.length > 0 && (
        <section>
          <h2 className="text-sm font-medium">History</h2>
          <p className="mt-1 text-[11px] text-muted">Every save is kept. Restoring one writes a new version.</p>
          <ul className="mt-4 border-t border-border">
            {versions.map((version) => (
              <li key={version.id} className="flex items-center gap-4 border-b border-border py-2.5">
                <span className="flex-1 text-[12px] text-foreground">{formatDate(version.createdAt)}</span>
                <span className="hidden text-[11px] text-muted sm:block">{version.author || "api"}</span>
                <form action={restorePrivateSkillAction}>
                  <input type="hidden" name="slug" value={slug} />
                  <input type="hidden" name="id" value={version.id} />
                  <button className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-foreground"><RotateCcw className="size-3" /> Restore</button>
                </form>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
