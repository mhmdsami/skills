"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin", label: "Skills" },
  { href: "/admin/keys", label: "Keys" },
  { href: "/admin/audit", label: "Logs" },
];

function NavLabel({ label }: { label: string }) {
  const { pending } = useLinkStatus();
  return <span className="relative">
    {label}
    {pending && <span role="status" aria-label={`Loading ${label.toLowerCase()}`} className="absolute -bottom-1 inset-x-0 h-0.5 animate-pulse rounded-full bg-current" />}
  </span>;
}

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="flex items-center gap-0.5 rounded-full border border-border p-0.5">
      {tabs.map((tab) => {
        const active = tab.href === "/admin" ? pathname === "/admin" || pathname.startsWith("/admin/skills/") : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-2 text-[10px] uppercase tracking-wide transition-all duration-200 active:scale-95 ${active ? "bg-accent text-background shadow-[0_0_12px_rgb(193_230_164_/_8%)]" : "text-muted hover:bg-white/5 hover:text-foreground"}`}
          >
            <NavLabel label={tab.label} />
          </Link>
        );
      })}
    </nav>
  );
}
