import { Logo } from "@/components/logo";
import { GoogleSignIn } from "./google-signin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-lg border border-border bg-panel p-8 shadow-[0_18px_50px_-30px_rgb(0_0_0/0.9)]">
        <div className="flex items-center gap-2">
          <Logo showWord={false} />
          <h1 className="text-xl font-semibold tracking-[-0.04em]">skills</h1>
        </div>
        <p className="mt-1 text-xs text-muted">Installable skills for coding agents.</p>
        <h2 className="mt-7 text-base font-medium">Sign in</h2>
        <div className="mt-6">
          <GoogleSignIn next={next} />
        </div>
      </div>
    </main>
  );
}
