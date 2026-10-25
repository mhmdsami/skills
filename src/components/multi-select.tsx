"use client";

import { useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { ChevronDown, X } from "lucide-react";

export function MultiSelect({ name, options, disabled = false }: {
  name: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const current = picked;
  function toggle(value: string) {
    setPicked((values) => values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }
  return <div className="mt-2">
    {current.length ? current.map((value) => <input key={value} type="hidden" name={name} value={value} />) : <input type="hidden" name={name} value="*" />}
    <Popover.Root open={open && !disabled} onOpenChange={setOpen}>
      <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5 focus-within:border-accent/50">
        {current.length > 0 && <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">{current.map((value) => <span key={value} className="notice-enter inline-flex items-center gap-1 rounded-full border border-border bg-panel py-0.5 pl-2.5 pr-1 text-[11px] normal-case tracking-normal text-foreground">
          {options.find((option) => option.value === value)?.label ?? value}
          <button type="button" disabled={disabled} aria-label={`Remove ${value}`} onClick={() => toggle(value)} className="rounded-full p-1 text-muted hover:text-foreground"><X className="size-3" /></button>
        </span>)}</div>}
        <Popover.Trigger disabled={disabled} aria-label="Choose skill scopes" className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded px-1 py-1 text-left text-[13px] normal-case tracking-normal text-muted">
          <span>{current.length ? "Add scope" : "All skills"}</span><ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </Popover.Trigger>
      </div>
      <Popover.Portal>
        <Popover.Positioner sideOffset={6} align="start" className="z-[55]">
          <Popover.Popup className="scope-popup w-[var(--anchor-width)] min-w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-white/15 bg-panel p-2 shadow-xl" aria-label="Skill scopes">
            <Popover.Title className="sr-only">Skill scopes</Popover.Title>
            <Popover.Description className="px-2 py-1 text-[11px] text-muted">Choose specific skills or allow all skills.</Popover.Description>
            <button type="button" disabled={disabled} onClick={() => { setPicked([]); setOpen(false); }} aria-pressed={current.length === 0} className="w-full rounded-md px-2 py-2 text-left text-[12px] text-foreground hover:bg-white/5">All skills (no scope limit)</button>
            <div className="max-h-52 overflow-y-auto">{options.map((option) => <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-[12px] text-foreground hover:bg-white/5">
              <input type="checkbox" disabled={disabled} checked={current.includes(option.value)} onChange={() => toggle(option.value)} className="size-3.5 accent-accent" />{option.label}
            </label>)}</div>
            {options.length === 0 && <p className="px-2 py-2 text-[11px] text-muted">Create a private skill to choose individual scopes.</p>}
            <Popover.Close disabled={disabled} className="button-secondary mt-2 w-full">Done</Popover.Close>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  </div>;
}
