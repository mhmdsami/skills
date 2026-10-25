"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import type { PrivateSkillVersion } from "@/lib/private-skills";
import { MutationForm, SubmitButton } from "@/components/mutation-form";
import { ConfirmDelete } from "@/components/confirm-delete";
import { restorePrivateSkillAction, savePrivateSkillAction } from "@/app/admin/actions";

export function SkillEditor({ slug, initialContent, versions }: { slug: string; initialContent: string; versions: PrivateSkillVersion[] }) {
  const isNew = slug === "new";
  const [content, setContent] = useState(initialContent);
  const [savedContent, setSavedContent] = useState(initialContent);
  const dirty = content !== savedContent;
  useEffect(() => {
    if (!dirty) return;
    function beforeUnload(event: BeforeUnloadEvent) { event.preventDefault(); event.returnValue = ""; }
    function beforeNavigate(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href);
      if (url.pathname === location.pathname && url.search === location.search) return;
      if (!window.confirm("Discard your unsaved skill changes?")) { event.preventDefault(); event.stopPropagation(); }
    }
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", beforeNavigate, true);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      document.removeEventListener("click", beforeNavigate, true);
    };
  }, [dirty]);
  return <div className="space-y-10">
    <div className="flex items-center justify-between gap-4"><h1 className="text-lg font-medium tracking-tight">{isNew ? "New private skill" : slug}</h1><Link href="/admin" className="row-action"><ArrowLeft className="size-3" /> Back</Link></div>
    <MutationForm action={savePrivateSkillAction} onSuccess={() => setSavedContent(content)} className="space-y-4">
      {(_state, pending) => <>
        {!isNew && <input type="hidden" name="slug" value={slug} />}
        <textarea name="content" aria-label="SKILL.md" required value={content} onChange={(event) => setContent(event.target.value)} disabled={pending} spellCheck={false} placeholder={"---\nname: My skill\ndescription: What it does.\ninternal: true\n---\n\n# My skill\n"} className="min-h-[460px] w-full resize-y rounded-lg border border-border bg-[#0e0f0d] p-4 text-[13px] leading-[1.75] text-[#d7d8d2] outline-none transition-colors disabled:opacity-60" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-[11px] text-muted">{pending ? "Saving your changes..." : dirty ? "Unsaved changes" : isNew ? "The frontmatter name determines the URL." : "All changes saved"}</p>
          <SubmitButton pending={pending} pendingLabel="Saving..." disabled={!dirty || !content.trim()}>Save</SubmitButton>
        </div>
      </>}
    </MutationForm>
    {!isNew && versions.length > 0 && <section>
      <h2 className="text-sm font-medium">History</h2><p className="mt-1 text-[12px] text-muted">Every save is kept. Restoring one writes a new version.</p>
      <ul className="mt-4 border-t border-border">{versions.map((version) => <li key={version.id} className="dashboard-row flex flex-wrap items-center gap-4 border-b px-3 border-border py-3">
        <time className="flex-1 text-[12px]" dateTime={new Date(version.createdAt).toISOString()}>{new Date(version.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</time>
        <span className="hidden text-[11px] text-muted sm:block">{version.author || "api"}</span>
        <ConfirmDelete action={restorePrivateSkillAction} hidden={{ slug, id: version.id }} title="Restore this version?" body={dirty ? "Restoring replaces the current skill and discards your unsaved edits. The saved history is kept." : "Restoring replaces the current skill and keeps the saved history."} trigger="Restore" pendingLabel="Restoring..." />
      </li>)}</ul>
      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-muted"><RotateCcw className="size-3" /> You can restore any saved version.</p>
    </section>}
  </div>;
}
