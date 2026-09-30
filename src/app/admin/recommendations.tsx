"use client";

import { useState } from "react";
import type { Recommendation } from "@/lib/types";
import { deleteRecommendationAction, saveRecommendationAction } from "./actions";

export function RecommendationsPanel({ recommendations }: { recommendations: Recommendation[] }) {
  const [editing, setEditing] = useState<Recommendation | "new" | null>(null);
  const isNew = editing === "new";
  const item = editing && editing !== "new" ? editing : null;

  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <h1 className="text-lg font-medium tracking-tight">Recommendations</h1>
          <p className="mt-1 text-[11px] text-muted">Shown in the catalog&apos;s Recommended section.</p>
        </div>
        <button onClick={() => setEditing("new")} className="rounded-md border border-border px-3 py-1.5 text-[11px] text-muted hover:text-foreground">
          New recommendation
        </button>
      </div>

      <ul className="mt-5 border-t border-border">
        {recommendations.length ? recommendations.map((row) => (
          <li key={row.id} className="flex items-center gap-4 border-b border-border py-3">
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] text-foreground">{row.name}</div>
              <div className="mt-0.5 truncate text-[11px] text-muted">{row.description || row.source}</div>
            </div>
            <code className="hidden shrink-0 text-[11px] text-muted sm:block">{row.source}</code>
            <button onClick={() => setEditing(row)} className="shrink-0 text-[11px] text-muted hover:text-foreground">Edit</button>
            <form action={deleteRecommendationAction}>
              <input type="hidden" name="id" value={row.id} />
              <button className="shrink-0 text-[11px] text-muted hover:text-red-300">Delete</button>
            </form>
          </li>
        )) : <li className="border-b border-border py-4 text-[11px] text-muted">No recommendations yet.</li>}
      </ul>

      {editing && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/65 p-4"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setEditing(null); }}
        >
          <form action={saveRecommendationAction} className="w-full max-w-md rounded-md border border-border bg-panel p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">{isNew ? "New recommendation" : "Edit recommendation"}</h2>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close" className="text-[15px] text-muted hover:text-foreground">×</button>
            </div>

            {!isNew && <input type="hidden" name="id" value={item?.id} />}

            <label className="mt-5 block text-[11px] uppercase tracking-[0.13em] text-muted">
              Name
              <input name="name" defaultValue={item?.name ?? ""} autoFocus placeholder="ax" className="mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-[13px] text-foreground outline-none placeholder:text-muted focus:border-white/25" />
            </label>
            <label className="mt-4 block text-[11px] uppercase tracking-[0.13em] text-muted">
              Source
              <input name="source" defaultValue={item?.source ?? ""} placeholder="yusukebe/ax" className="mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-[13px] text-foreground outline-none placeholder:text-muted focus:border-white/25" />
            </label>
            <label className="mt-4 block text-[11px] uppercase tracking-[0.13em] text-muted">
              Description
              <input name="description" defaultValue={item?.description ?? ""} placeholder="What it does." className="mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-[13px] text-foreground outline-none placeholder:text-muted focus:border-white/25" />
            </label>

            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} className="rounded-md border border-border px-3 py-2 text-[12px] text-muted hover:text-foreground">Cancel</button>
              <button className="rounded-md bg-accent px-3.5 py-2 text-[12px] font-medium text-[#171a14] hover:brightness-110">Save</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
