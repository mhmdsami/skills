"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, LoaderCircle } from "lucide-react";

export function CopyButton({ value, className = "row-action min-w-20", label = "Copy" }: { value: string; className?: string; label?: string }) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const request = useRef(0);
  useEffect(() => {
    setStatus("idle");
    return () => { request.current += 1; };
  }, [value]);
  useEffect(() => {
    if (status !== "copied" && status !== "error") return;
    const timer = window.setTimeout(() => setStatus("idle"), status === "error" ? 5000 : 1800);
    return () => window.clearTimeout(timer);
  }, [status]);
  async function copy() {
    const current = ++request.current;
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(value);
      if (request.current === current) setStatus("copied");
    } catch {
      if (request.current === current) setStatus("error");
    }
  }
  const text = status === "copied" ? "Copied" : status === "copying" ? "Copying..." : status === "error" ? "Retry copy" : label;
  return <span className="relative inline-flex shrink-0 flex-col justify-center">
    <button type="button" onClick={copy} disabled={status === "copying"} className={className} aria-label={status === "error" ? "Copy failed. Select the text and copy it manually, or retry." : undefined}>
      <span className="relative inline-flex items-center justify-center">
        <span aria-hidden className="invisible inline-flex items-center gap-1.5">
          <LoaderCircle className="size-3" />
          <span>Retry copy</span>
        </span>
        <span className="absolute inset-0 inline-flex items-center justify-center gap-1.5">
          {status === "copying" ? <LoaderCircle className="size-3 animate-spin" aria-hidden /> : status === "copied" ? <Check className="size-3 text-accent" aria-hidden /> : <Copy className="size-3" aria-hidden />}
          {text}
        </span>
      </span>
    </button>
    {status === "error" && <span role="status" className="absolute top-full left-0 z-10 mt-1 w-max max-w-48 rounded-md border border-red-400/30 bg-panel px-2 py-1 text-[10px] text-red-300">Copy failed. Select and copy manually.</span>}
    <span role="status" className="sr-only">{status === "copied" ? "Copied to clipboard." : status === "error" ? "Copy failed. Select and copy the text manually." : ""}</span>
  </span>;
}
