"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Logo } from "@/components/logo";
import type { CatalogPageProps } from "@/lib/types";

const site = "https://skills.sam1.space";
const repoUrl = "https://github.com/mhmdsami/skills";

export function CatalogPage({ skills, recommendations }: CatalogPageProps) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [copied, setCopied] = useState("");

  const tags = useMemo(() => [...new Set(skills.flatMap((skill) => skill.tags))].sort(), [skills]);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return skills.filter((skill) => {
      if (tag && !skill.tags.includes(tag)) return false;
      if (!search) return true;
      return `${skill.name} ${skill.description} ${skill.tags.join(" ")}`.toLowerCase().includes(search);
    });
  }, [skills, query, tag]);

  async function copy(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(""), 1400);
    } catch {
      setCopied("unavailable");
    }
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-3xl px-5 pb-16 sm:px-10">
      <header className="flex h-16 items-center justify-between border-b border-border">
        <a href="/" aria-label="skills home"><Logo /></a>
        <a href={repoUrl} className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-foreground">GitHub <ArrowUpRight className="size-3" /></a>
      </header>

      <section className="py-12 sm:py-16">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted">mhmdsami/skills</p>
        <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">Skills for coding agents</h1>
        <p className="mt-3 max-w-xl text-[12px] leading-6 text-muted">
          Small, installable instruction sets. Search, filter by tag, and install with the Skills CLI.
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex h-9 flex-1 items-center gap-2 rounded-md border border-border bg-panel px-3 text-muted focus-within:border-white/25">
          <Search className="size-3.5 shrink-0" aria-hidden />
          <input
            aria-label="Search skills"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills..."
            className="min-w-0 flex-1 bg-transparent text-[12px] text-foreground outline-none placeholder:text-muted"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="shrink-0 text-muted hover:text-foreground"><X className="size-3.5" /></button>
          )}
        </label>
        <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-muted">{filtered.length} of {skills.length}</span>
      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            onClick={() => setTag(null)}
            aria-pressed={tag === null}
            className={`rounded-full border px-2.5 py-1 text-[10px] transition ${tag === null ? "border-white/25 text-foreground" : "border-border text-muted hover:text-foreground"}`}
          >
            All
          </button>
          {tags.map((name) => (
            <button
              key={name}
              onClick={() => setTag(tag === name ? null : name)}
              aria-pressed={tag === name}
              className={`rounded-full border px-2.5 py-1 text-[10px] transition ${tag === name ? "border-white/25 text-foreground" : "border-border text-muted hover:text-foreground"}`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      <section aria-label="Skills" className="mt-6 border-y border-border">
        {filtered.length ? filtered.map((skill) => {
          const install = `npx skills add ${site}/skills/${skill.slug}`;
          return (
            <article key={skill.slug} className="border-b border-border py-5 last:border-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-sm font-medium">{skill.name}</h2>
                <a className="inline-flex items-center gap-1 text-[10px] text-muted hover:text-foreground" href={`${repoUrl}/blob/main/skills/${skill.slug}/SKILL.md`}>Source <ArrowUpRight className="size-3" /></a>
              </div>
              <p className="mt-1 text-[11px] leading-5 text-muted">{skill.description}</p>
              {skill.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {skill.tags.map((name) => (
                    <button key={name} onClick={() => setTag(name)} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted hover:border-white/25 hover:text-foreground">
                      {name}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-3 flex items-stretch gap-2">
                <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-md border border-border bg-panel px-3 py-2.5 text-[11px]">{install}</code>
                <button onClick={() => copy(skill.slug, install)} className="shrink-0 rounded-md border border-border px-3 text-[10px] text-muted hover:text-foreground">
                  {copied === skill.slug ? "Copied" : "Copy"}
                </button>
              </div>
            </article>
          );
        }) : <p className="py-10 text-[11px] text-muted">{skills.length ? "No skills match your search." : "No skills published yet."}</p>}
      </section>

      <section aria-label="Recommended" className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-sm font-medium">Recommended</h2>
          <span className="text-[10px] uppercase tracking-[0.14em] text-muted">{recommendations.length} skills</span>
        </div>
        <p className="mt-1 text-[11px] leading-5 text-muted">Skills from other authors that I install on most setups.</p>

        <ul className="mt-5 border-t border-border">
          {recommendations.map((skill) => (
            <li key={skill.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border py-3">
              <span className="text-[12px] text-foreground">{skill.name}</span>
              <span className="min-w-0 flex-1 truncate text-[11px] text-muted">{skill.description}</span>
              <a className="inline-flex items-center gap-1 text-[10px] text-muted hover:text-foreground" href={`https://github.com/${skill.source}`}>{skill.source} <ArrowUpRight className="size-3" /></a>
            </li>
          ))}
          {recommendations.length === 0 && <li className="border-b border-border py-4 text-[11px] text-muted">Nothing here yet.</li>}
        </ul>
      </section>

      <footer className="mt-14 border-t border-border pt-4 text-[10px] text-muted">
        Install with <a className="underline decoration-white/20 underline-offset-4 hover:text-foreground" href="https://github.com/vercel-labs/skills">the Skills CLI</a>.
      </footer>
    </main>
  );
}
