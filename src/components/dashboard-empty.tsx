import type { ReactNode } from "react";

export function DashboardEmpty({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <li className="border-b border-border">
    <div className="flex flex-col items-center py-12 text-center">
      <p className="text-[13px] text-foreground">{title}</p>
      <p className="mt-1 text-[11px] leading-5 text-muted">{description}</p>
      {action}
    </div>
  </li>;
}
