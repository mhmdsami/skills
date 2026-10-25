"use client";

import { useState } from "react";
import type { Recommendation } from "@/lib/types";
import { ConfirmDelete } from "@/components/confirm-delete";
import { Modal, ModalCancel } from "@/components/modal";
import { MutationForm, SubmitButton } from "@/components/mutation-form";
import { deleteRecommendationAction, saveRecommendationAction } from "./actions";

function RecommendationForm({ item }: { item: Recommendation | null }) {
  const [name, setName] = useState(item?.name ?? "");
  const [source, setSource] = useState(item?.source ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  return <MutationForm action={saveRecommendationAction}>
    {(_state, pending) => <>
      {item && <input type="hidden" name="id" value={item.id} />}
      <fieldset disabled={pending} className="mt-4 space-y-3 disabled:opacity-60">
        <label className="field-label">Name<input data-modal-input name="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="ax" className="field-input" /></label>
        <label className="field-label">Source<input name="source" required value={source} onChange={(event) => setSource(event.target.value)} placeholder="yusukebe/ax" className="field-input" /></label>
        <label className="field-label">Description<input name="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What it does." className="field-input" /></label>
      </fieldset>
      <div className="mt-5 flex justify-end gap-2">
        <ModalCancel pending={pending} />
        <SubmitButton pending={pending} pendingLabel="Saving...">Save</SubmitButton>
      </div>
    </>}
  </MutationForm>;
}

export function RecommendationsPanel({ recommendations }: { recommendations: Recommendation[] }) {
  const [editing, setEditing] = useState<Recommendation | "new" | null>(null);
  const [open, setOpen] = useState(false);
  function edit(item: Recommendation | "new") { setEditing(item); setOpen(true); }
  const item = editing && editing !== "new" ? editing : null;
  return <section>
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <div><h2 className="text-lg font-medium tracking-tight">Recommendations</h2><p className="mt-1 text-[12px] text-muted">Shown in the catalog&apos;s Recommended section.</p></div>
      <button type="button" onClick={() => edit("new")} className="button-secondary">New recommendation</button>
    </div>
    <ul className="mt-5 border-t border-border">
      {recommendations.length ? recommendations.map((row) => <li key={row.id} className="dashboard-row flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-3 border-border py-3">
        <div className="min-w-0 flex-1"><div className="truncate text-[13px] text-foreground">{row.name}</div><div className="mt-0.5 truncate text-[12px] text-muted">{row.description || row.source}</div></div>
        <code className="hidden shrink-0 text-[11px] text-muted sm:block">{row.source}</code>
        <button type="button" onClick={() => edit(row)} className="row-action">Edit</button>
        <ConfirmDelete action={deleteRecommendationAction} hidden={{ id: row.id }} title={`Delete ${row.name}?`} body="Removes it from the catalog's Recommended list." />
      </li>) : (
        <li className="border-b border-border">
          <div className="flex flex-col items-center py-12 text-center">
            <p className="text-[13px] text-foreground">No recommendations yet.</p>
            <p className="mt-1 text-[11px] leading-5 text-muted">Add one to share a skill you use.</p>
            <button type="button" onClick={() => edit("new")} className="button-secondary mt-4 text-[11px]">New recommendation</button>
          </div>
        </li>
      )}
    </ul>
    <Modal open={open} onOpenChange={setOpen} onClosed={() => setEditing(null)} title={editing === "new" ? "New recommendation" : "Edit recommendation"}>
      <RecommendationForm key={item?.id ?? "new"} item={item} />
    </Modal>
  </section>;
}
