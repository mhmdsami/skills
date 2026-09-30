export function Logo({ showWord = true }: { showWord?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="size-4" aria-hidden="true">
        <path
          d="M16 3.5 18.9 13.1 28.5 16 18.9 18.9 16 28.5 13.1 18.9 3.5 16 13.1 13.1Z"
          fill="#c1e6a4"
        />
      </svg>
      {showWord && <span className="text-[13px] font-semibold tracking-[-0.04em]">skills</span>}
    </span>
  );
}
