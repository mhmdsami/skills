import { readAudit } from "@/lib/audit";
import { formatDate } from "@/lib/format";
import { DashboardEmpty } from "@/components/dashboard-empty";
import { DashboardRow } from "@/components/dashboard-row";
import { SectionHeader } from "@/components/section-header";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  const audit = await readAudit();

  return (
    <div>
      <SectionHeader
        title="Logs"
        description="Key usage and admin changes, newest first."
        descriptionClassName="mt-1 text-[11px] text-muted"
      />
      <ul className="mt-5 border-t border-border">
        {audit.length ? audit.map((entry) => (
          <DashboardRow key={entry.id} className="items-baseline py-2.5">
            <span className="shrink-0 text-[11px] text-muted">{formatDate(entry.createdAt)}</span>
            <span className="min-w-0 flex-1 truncate text-[12px] text-foreground">
              {entry.action} {entry.target && <span className="text-muted">· {entry.target}</span>}
            </span>
            <span className="hidden shrink-0 text-[11px] text-muted sm:block">{entry.actor}</span>
          </DashboardRow>
        )) : (
          <DashboardEmpty title="Nothing recorded yet." description="Key usage and admin changes appear here." />
        )}
      </ul>
    </div>
  );
}
