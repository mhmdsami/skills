"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

export function MultiSelect({
  name,
  options,
}: {
  name: string;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    // Close on any pointer press outside the whole control; never eat the click.
    function onPointerDown(event: PointerEvent) {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggle(value: string) {
    setPicked((values) => (values.includes(value) ? values.filter((item) => item !== value) : [...values, value]));
  }

  const allSkills = picked.includes("*") || picked.length === 0;

  return (
    <div ref={root} className="relative mt-2 w-full max-w-md">
      {allSkills && <input type="hidden" name={name} value="*" />}
      {picked.filter((value) => value !== "*").map((value) => (
        <input key={value} type="hidden" name={name} value={value} />
      ))}

      <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5">
        {allSkills ? (
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="listbox" className="min-w-0 flex-1 text-left text-[13px] text-muted">
            all skills
          </button>
        ) : (
          <>
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {picked.map((value) => (
                <span key={value} className="inline-flex items-center gap-1 rounded-full border border-border bg-panel py-0.5 pl-2.5 pr-1 text-[11px] text-foreground">
                  {value}
                  <button
                    type="button"
                    aria-label={`Remove ${value}`}
                    onClick={() => toggle(value)}
                    className="rounded-full p-0.5 text-muted hover:text-foreground"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="listbox"
              onClick={() => setOpen((value) => !value)}
              className="shrink-0 p-1 text-muted hover:text-foreground"
            >
              <ChevronDown className="size-3.5" />
            </button>
          </>
        )}
      </div>

      {open && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-border bg-panel p-1 shadow-xl"
        >
          <li>
            <button
              type="button"
              role="option"
              aria-selected={allSkills}
              onClick={() => { setPicked([]); setOpen(false); }}
              className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-[13px] text-foreground transition-colors hover:bg-white/[0.05]"
            >
              All skills (no scope limit)
              {allSkills && <Check className="size-3.5 text-accent" />}
            </button>
          </li>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={picked.includes(option.value)}
                onClick={() => toggle(option.value)}
                className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-[13px] text-foreground transition-colors hover:bg-white/[0.05]"
              >
                {option.label}
                {picked.includes(option.value) && <Check className="size-3.5 text-accent" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
