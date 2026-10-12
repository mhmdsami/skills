"use client";

import { useRef, useState } from "react";

export function ConfirmDelete({
  action,
  hidden,
  title,
  body,
  trigger = "Delete",
}: {
  action: (formData: FormData) => void | Promise<void>;
  hidden: Record<string, string>;
  title: string;
  body?: string;
  trigger?: string;
}) {
  const form = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <form ref={form} action={action} className="contents">
        {Object.entries(hidden).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
      </form>
      <button type="button" onClick={() => setOpen(true)} className="shrink-0 text-[11px] text-muted hover:text-red-300">
        {trigger}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/65 p-4"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-sm rounded-md border border-border bg-panel p-5">
            <h2 className="text-sm font-medium">{title}</h2>
            {body && <p className="mt-2 text-[12px] leading-5 text-muted">{body}</p>}
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="rounded-md border border-border px-3 py-2 text-[12px] text-muted hover:text-foreground">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => { form.current?.requestSubmit(); }}
                className="rounded-md border border-red-400/40 bg-red-400/10 px-3.5 py-2 text-[12px] font-medium text-red-300 hover:bg-red-400/15"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
