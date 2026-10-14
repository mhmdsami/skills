"use client";

import { useActionState, useEffect, useEffectEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import type { FormAction, FormState } from "@/lib/form-state";
import { useModal } from "./modal";
import { useFeedback } from "./feedback";

export function MutationForm({ action, children, onSuccess, className }: {
  action: FormAction;
  children: (state: FormState, pending: boolean) => ReactNode;
  onSuccess?: (state: FormState) => void;
  className?: string;
}) {
  const notify = useFeedback();
  const [state, dispatch, pending] = useActionState(async (_previous: FormState, data: FormData): Promise<FormState> => {
    try {
      const result = await action(data);
      // Revalidation can remove the submitting row before its completion effect runs.
      if (result.success && result.message) notify(result.message);
      return result;
    }
    catch { return { error: "Could not complete the request. Check your connection and try again." }; }
  }, {});
  const modal = useModal();
  const router = useRouter();
  const completed = useEffectEvent((result: FormState) => {
    if (onSuccess) onSuccess(result);
    else modal?.close();
    if (result.redirectTo) router.push(result.redirectTo);
  });
  const setBusy = modal?.setBusy;
  useEffect(() => {
    setBusy?.(pending);
    return () => setBusy?.(false);
  }, [pending, setBusy]);
  useEffect(() => { if (state.success && !pending) completed(state); }, [state, pending]);
  return <form action={dispatch} className={className} aria-busy={pending}>
    {children(state, pending)}
    {state.error && <p role="alert" className="notice-enter mt-3 rounded-md border border-red-400/20 bg-red-400/5 px-3 py-2 text-[12px] leading-5 text-red-300">{state.error}</p>}
  </form>;
}

export function SubmitButton({ pending, children, pendingLabel, className = "button-primary", disabled = false }: {
  pending: boolean;
  children: ReactNode;
  pendingLabel: string;
  className?: string;
  disabled?: boolean;
}) {
  return <button type="submit" disabled={pending || disabled} className={className}>
    {pending && <LoaderCircle className="size-3.5 animate-spin" aria-hidden />}
    <span>{pending ? pendingLabel : children}</span>
  </button>;
}
