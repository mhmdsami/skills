"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Check, X } from "lucide-react";

const FeedbackContext = createContext<(message: string) => void>(() => {});
export const useFeedback = () => useContext(FeedbackContext);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<{ message: string } | null>(null);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timer);
  }, [notice]);
  return <FeedbackContext.Provider value={(message) => setNotice({ message })}>
    {children}
    <div className="pointer-events-none fixed inset-x-4 bottom-5 z-[60] flex justify-center" role="status" aria-live="polite" aria-atomic="true">
      {notice && <div className="notice-enter pointer-events-auto flex max-w-lg items-center gap-3 rounded-lg border border-accent/25 bg-panel px-4 py-3 text-[12px] shadow-xl">
        <Check className="size-4 shrink-0 text-accent" aria-hidden />{notice.message}
        <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss notification" className="ml-2 rounded-md p-1 text-muted hover:text-foreground"><X className="size-3.5" /></button>
      </div>}
    </div>
  </FeedbackContext.Provider>;
}
