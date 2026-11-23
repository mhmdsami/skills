import type { ReactNode } from "react";

export function SectionHeader({
  as: Heading = "h1",
  title,
  description,
  action,
  headingClassName = "text-lg",
  descriptionClassName = "mt-1 text-[12px] text-muted",
}: {
  as?: "h1" | "h2";
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  headingClassName?: string;
  descriptionClassName?: string;
}) {
  return <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-3">
    <div>
      <Heading className={`font-medium tracking-tight ${headingClassName}`}>{title}</Heading>
      {description !== undefined && <p className={descriptionClassName}>{description}</p>}
    </div>
    {action}
  </div>;
}
