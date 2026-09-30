import Link from "next/link";
import { redirect } from "next/navigation";
import { getViewer } from "@/lib/session";
import { Logo } from "@/components/logo";
import { SignOutButton } from "@/components/sign-out-button";
import { AdminNav } from "./admin-nav";
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const viewer = await getViewer();
  if (!viewer) redirect("/login?next=/admin");

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 sm:px-10">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border">
        <Link href="/admin" aria-label="admin home"><Logo /></Link>
        <div className="flex items-center gap-4 text-[11px] text-muted">
          <AdminNav />
          <span className="hidden sm:inline">{viewer.email}</span>
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 py-10">{children}</main>
    </div>
  );
}
