"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin", label: "Skills" },
  { href: "/admin/keys", label: "Keys" },
  { href: "/admin/audit", label: "Logs" },
];

function NavLabel({ label }: { label: string }) {
  return <span>{label}</span>;
}

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="flex items-center gap-0.5 rounded-lg border border-border bg-panel p-0.5">
      {tabs.map((tab) => {
        const active = tab.href === "/admin" ? pathname === "/admin" || pathname.startsWith("/admin/skills/") : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.06em] transition-colors ${active ? "bg-accent text-[#171a14]" : "text-muted hover:bg-white/5 hover:text-foreground"}`}
          >
            <NavLabel label={tab.label} />
          </Link>
        );
      })}
    </nav>
  );
}
