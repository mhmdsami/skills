"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Copy } from "lucide-react";
import type { AccessKeyView } from "@/lib/types";
import { MultiSelect } from "@/components/multi-select";
import { createKeyAction, revokeKeyAction } from "./actions";
import type { KeyFormState } from "./actions";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        } catch {
          setCopied(false);
        }
      }}
      className="inline-flex items-center gap-1 shrink-0 text-[11px] text-muted hover:text-foreground"
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function CopyableToken({ token }: { token: string }) {
  return (
    <div className="mt-5 rounded-md border border-border bg-[#0e0f0d] p-3">
      <p className="text-[11px] text-muted">New key, shown once. Copy it now.</p>
      <div className="mt-2 flex items-center gap-2">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-md border border-border bg-background px-3 py-2 text-[11px]">{token}</code>
        <CopyButton value={token} />
      </div>
    </div>
  );
}

const inputClass = "mt-2 block h-10 w-full rounded-md border border-border bg-background px-3 text-[13px] text-foreground outline-none focus:border-white/25";

function CreateKeyForm({ slugs, onDone }: { slugs: string[]; onDone: () => void }) {
  const [state, action, pending] = useActionState<KeyFormState, FormData>(createKeyAction, {});
  const [expiry, setExpiry] = useState("30");
  const router = useRouter();

  useEffect(() => {
    if (state.token) router.refresh();
  }, [state.token, router]);

  return (
    <form action={action}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">New access key</h2>
        <button type="button" aria-label="Close" onClick={onDone} className="px-1 text-base text-muted hover:text-foreground">×</button>
      </div>

      <div className="space-y-4">
        <label className="mt-5 block text-[11px] uppercase tracking-[0.13em] text-muted">
          Name
          <input name="name" required autoFocus placeholder="sami-laptop" className={`${inputClass} placeholder:text-muted`} />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.13em] text-muted">
          Scopes
          <MultiSelect name="slugs" options={slugs.map((slug) => ({ value: slug, label: slug }))} />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.13em] text-muted">
          Expiry
          <div className="relative mt-2 w-full max-w-md">
            <select name="ttl" value={expiry} onChange={(event) => setExpiry(event.target.value)} className={`${inputClass} mt-0 appearance-none pr-9`}>
              <option value="0">no expiry</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="expires">on date</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
          </div>
        </label>
        {expiry === "expires" && (
          <label className="block text-[11px] uppercase tracking-[0.13em] text-muted">
            Expires on
            <input name="expiresOn" type="date" required className={`${inputClass} placeholder:text-muted`} />
          </label>
        )}
      </div>

      {state.error && <p className="mt-3 text-[11px] text-red-300">{state.error}</p>}

      <div className="mt-5 flex justify-end gap-2">
        <button type="button" onClick={onDone} className="rounded-md border border-border px-3 py-2 text-[12px] text-muted hover:text-foreground">Cancel</button>
        <button disabled={pending} className="rounded-md bg-accent px-3.5 py-2 text-[12px] font-medium text-[#171a14] hover:brightness-110 disabled:opacity-50">
          {pending ? "Creating..." : "Create key"}
        </button>
      </div>

      {state.token && <CopyableToken token={state.token} />}
    </form>
  );
}

export function KeysPanel({ keys, slugs }: { keys: AccessKeyView[]; slugs: string[] }) {
  const [creating, setCreating] = useState(false);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <h1 className="text-lg font-medium tracking-tight">Access keys</h1>
          <p className="mt-1 text-[11px] text-muted">Gate /internal/{"<slug>"} downloads. A key carries its own scope and expiry.</p>
        </div>
        <button onClick={() => setCreating(true)} className="rounded-md border border-border px-3 py-1.5 text-[11px] text-muted hover:text-foreground">
          New key
        </button>
      </div>

      <ul className="border-t border-border">
        {keys.length ? keys.map((row) => (
          <li key={row.id} className="flex items-center gap-4 border-b border-border py-3">
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] text-foreground">{row.name}</div>
              <div className="mt-0.5 truncate text-[11px] text-muted">
                {row.slugs.length ? row.slugs.join(", ") : "all skills"}
                {row.expiresAt ? ` · expires ${new Date(row.expiresAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}` : " · no expiry"}
                {row.lastUsedAt ? ` · last used ${new Date(row.lastUsedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}` : " · never used"}
              </div>
            </div>
            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${row.status === "active" ? "border-accent/40 bg-accent/10 text-accent" : row.status === "revoked" ? "border-red-400/40 bg-red-400/10 text-red-300" : "border-border text-muted"}`}>
              {row.status}
            </span>
            {row.status === "active" && (
              <form action={revokeKeyAction}>
                <input type="hidden" name="id" value={row.id} />
                <button className="shrink-0 text-[11px] text-muted hover:text-red-300">Revoke</button>
              </form>
            )}
          </li>
        )) : <li className="border-b border-border py-4 text-[11px] text-muted">No keys yet.</li>}
      </ul>

      {creating && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/65 p-4"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setCreating(false); }}
        >
          <div className="w-full max-w-md rounded-md border border-border bg-panel p-5">
            <CreateKeyForm slugs={slugs} onDone={() => setCreating(false)} />
          </div>
        </div>
      )}
    </section>
  );
}
