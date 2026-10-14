"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return <div role="alert" className="notice-enter rounded-xl border border-red-400/20 bg-red-400/5 p-6">
    <h1 className="text-sm font-medium">Could not load this page</h1>
    <p className="mt-2 text-[12px] leading-5 text-muted">Try loading it again. If this continues, check your connection and sign-in session.</p>
    <button type="button" onClick={reset} className="button-secondary mt-4">Try again</button>
  </div>;
}
