import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";
import { GoogleSignIn } from "./google-signin";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-md border border-border bg-panel p-8">
        <Logo />
        <h1 className="mt-3 text-lg font-medium tracking-tight">Sign in</h1>
        <p className="mt-1 text-[12px] leading-5 text-muted">Access is limited to approved accounts.</p>
        <div className="mt-6">
          <GoogleSignIn next={next} />
        </div>
        <a href="/" className="mt-5 inline-flex items-center gap-1 text-[11px] text-muted hover:text-foreground"><ArrowLeft className="size-3" /> Back to catalog</a>
      </div>
    </main>
  );
}
