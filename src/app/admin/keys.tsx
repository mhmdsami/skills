"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { AccessKeyView } from "@/lib/types";
import { MultiSelect } from "@/components/multi-select";
import { CopyButton } from "@/components/copy-button";
import { ConfirmAction } from "@/components/confirm-action";
import { DashboardEmpty } from "@/components/dashboard-empty";
import { DashboardRow } from "@/components/dashboard-row";
import { SectionHeader } from "@/components/section-header";
import { Modal, ModalCancel } from "@/components/modal";
import { MutationForm, SubmitButton } from "@/components/mutation-form";
import { createKeyAction, revokeKeyAction } from "./actions";

export function CopyableToken({ token }: { token: string }) {
  return <div className="notice-enter mt-5 rounded-lg border border-accent/25 bg-accent/5 p-3">
    <p className="text-[12px] text-accent">New key, shown once. Copy it now.</p>
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <code tabIndex={0} className="min-w-0 flex-1 select-all overflow-x-auto whitespace-nowrap rounded-md border border-border bg-background px-3 py-2 text-[11px]">{token}</code>
      <CopyButton value={token} />
    </div>
  </div>;
}

function CreateKeyForm({ slugs }: { slugs: string[] }) {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("30");
  const [date, setDate] = useState("");
  return <MutationForm action={createKeyAction} onSuccess={() => {}}>
    {(state, pending) => state.token ? <>
      <CopyableToken token={state.token} />
      <p className="mt-3 text-[11px] leading-5 text-muted">You cannot view this key again after closing.</p>
      <div className="mt-5 flex justify-end"><ModalCancel pending={false}>Done</ModalCancel></div>
    </> : <>
      <fieldset disabled={pending} className="mt-4 space-y-3 disabled:opacity-60">
        <label className="field-label">Name<input data-modal-input name="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="sami-laptop" className="field-input" /></label>
        <div><span className="field-label">Scopes</span><MultiSelect name="slugs" options={slugs.map((slug) => ({ value: slug, label: slug }))} disabled={pending} /></div>
        <label className="field-label">Expiry
          <div className="relative mt-2">
            <select name="ttl" value={expiry} onChange={(event) => setExpiry(event.target.value)} className="field-input mt-0 appearance-none pr-9">
              <option value="7">7 days</option><option value="30">30 days</option><option value="90">90 days</option><option value="expires">On date (UTC)</option><option value="0">No expiry</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
          </div>
        </label>
        {expiry === "expires" && <label className="field-label notice-enter">Expires on (end of day, UTC)<input name="expiresOn" type="date" required value={date} onChange={(event) => setDate(event.target.value)} className="field-input" /></label>}
      </fieldset>
      <div className="mt-5 flex justify-end gap-2"><ModalCancel pending={pending} /><SubmitButton pending={pending} pendingLabel="Creating...">Create key</SubmitButton></div>
    </>}
  </MutationForm>;
}

export function KeysPanel({ keys, slugs }: { keys: AccessKeyView[]; slugs: string[] }) {
  return <section className="space-y-5">
    <SectionHeader
      title="Access keys"
      description="Control which private skills a key can download and when it expires."
      action={<Modal title="New access key" trigger={<button type="button" className="button-secondary">New key</button>}><CreateKeyForm slugs={slugs} /></Modal>}
    />
    <ul className="border-t border-border">
      {keys.length ? keys.map((row) => <DashboardRow key={row.id} title={row.name} descriptionClassName="mt-1 text-[11px] leading-5 text-muted" description={<>
          {row.slugs.length ? row.slugs.join(", ") : "All skills"}
          {row.expiresAt ? ` · expires ${new Date(row.expiresAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}` : " · no expiry"}
          {row.lastUsedAt ? ` · last used ${new Date(row.lastUsedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}` : " · never used"}
        </>}>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${row.status === "active" ? "border-accent/40 bg-accent/10 text-accent" : row.status === "revoked" ? "border-red-400/40 bg-red-400/10 text-red-300" : "border-border text-muted"}`}>{row.status}</span>
        {row.status === "active" && <ConfirmAction action={revokeKeyAction} hidden={{ id: row.id }} title={`Revoke ${row.name}?`} body="This key will immediately stop granting access to private skills." trigger="Revoke" pendingLabel="Revoking..." />}
      </DashboardRow>) : (
        <DashboardEmpty title="No keys yet." description="Create a key to download private skills." />
      )}
    </ul>
  </section>;
}
