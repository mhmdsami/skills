"use client";

import { useState } from "react";
import type { Recommendation } from "@/lib/types";
import { ConfirmAction } from "@/components/confirm-action";
import { DashboardEmpty } from "@/components/dashboard-empty";
import { DashboardRow } from "@/components/dashboard-row";
import { SectionHeader } from "@/components/section-header";
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
    <SectionHeader
      as="h2"
      title="Recommendations"
      description="Shown in the catalog's Recommended section."
      action={<button type="button" onClick={() => edit("new")} className="button-secondary">New recommendation</button>}
    />
    <ul className="mt-5 border-t border-border">
      {recommendations.length ? recommendations.map((row) => <DashboardRow key={row.id} title={row.name} description={row.description || row.source} descriptionClassName="mt-0.5 truncate text-[12px] text-muted">
        <code className="hidden shrink-0 text-[11px] text-muted sm:block">{row.source}</code>
        <button type="button" onClick={() => edit(row)} className="row-action">Edit</button>
        <ConfirmAction action={deleteRecommendationAction} hidden={{ id: row.id }} title={`Delete ${row.name}?`} body="Removes it from the catalog's Recommended list." />
      </DashboardRow>) : (
        <DashboardEmpty
          title="No recommendations yet."
          description="Add one to share a skill you use."
          action={<button type="button" onClick={() => edit("new")} className="button-secondary mt-4 text-[11px]">New recommendation</button>}
        />
      )}
    </ul>
    <Modal open={open} onOpenChange={setOpen} onClosed={() => setEditing(null)} title={editing === "new" ? "New recommendation" : "Edit recommendation"}>
      <RecommendationForm key={item?.id ?? "new"} item={item} />
    </Modal>
  </section>;
}
