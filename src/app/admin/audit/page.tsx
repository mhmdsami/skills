import { readAudit } from "@/lib/audit";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  const audit = await readAudit();

  return (
    <div>
      <h1 className="text-lg font-medium tracking-tight">Logs</h1>
      <p className="mt-1 text-[11px] text-muted">Key usage and admin changes, newest first.</p>
      <ul className="mt-5 border-t border-border">
        {audit.length ? audit.map((entry) => (
          <li key={entry.id} className="flex items-baseline gap-4 border-b border-border py-2.5">
            <span className="shrink-0 text-[11px] text-muted">{formatDate(entry.createdAt)}</span>
            <span className="min-w-0 flex-1 truncate text-[12px] text-foreground">
              {entry.action} {entry.target && <span className="text-muted">· {entry.target}</span>}
            </span>
            <span className="hidden shrink-0 text-[11px] text-muted sm:block">{entry.actor}</span>
          </li>
        )) : <li className="border-b border-border py-4 text-[11px] text-muted">Nothing recorded yet.</li>}
      </ul>
    </div>
  );
}
