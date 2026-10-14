export default function AdminLoading() {
  return <div role="status" aria-label="Loading dashboard" aria-busy="true" className="space-y-6">
    <div className="skeleton h-6 w-40 rounded" />
    <div className="skeleton h-3 w-64 max-w-full rounded" />
    <div className="space-y-4 border-t border-border pt-5">{Array.from({ length: 4 }, (_, index) => <div key={index} className="flex items-center justify-between gap-4"><div className="space-y-2"><div className="skeleton h-4 w-32 rounded" /><div className="skeleton h-3 w-56 max-w-full rounded" /></div><div className="skeleton h-7 w-16 rounded" /></div>)}</div>
    <span className="sr-only">Loading dashboard...</span>
  </div>;
}
