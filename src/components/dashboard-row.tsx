import type { ReactNode } from "react";

export function DashboardRow({
  title,
  description,
  descriptionClassName = "mt-0.5 truncate text-[11px] text-muted",
  className = "",
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  descriptionClassName?: string;
  className?: string;
  children?: ReactNode;
}) {
  return <li className={`dashboard-row ${className}`.trim()}>
    {title !== undefined && <div className="min-w-0 flex-1">
      <div className="truncate text-[13px] text-foreground">{title}</div>
      {description !== undefined && <div className={descriptionClassName}>{description}</div>}
    </div>}
    {children}
  </li>;
}
