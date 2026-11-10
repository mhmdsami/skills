"use client";

import type { FormAction } from "@/lib/form-state";
import { Modal, ModalCancel } from "./modal";
import { MutationForm, SubmitButton } from "./mutation-form";

export function ConfirmAction({ action, hidden, title, body, trigger = "Delete", pendingLabel = "Deleting...", destructive = true }: {
  action: FormAction;
  hidden: Record<string, string>;
  title: string;
  body?: string;
  trigger?: string;
  pendingLabel?: string;
  destructive?: boolean;
}) {
  return <Modal title={title} description={body} destructive={destructive} trigger={<button type="button" className={`row-action ${destructive ? "hover:text-red-300" : ""}`}>{trigger}</button>}>
    <MutationForm action={action}>
      {(_state, pending) => <>
        {Object.entries(hidden).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}
        <div className="mt-6 flex justify-end gap-2">
          <ModalCancel pending={pending} />
          <SubmitButton pending={pending} pendingLabel={pendingLabel} className={destructive ? "button-danger" : "button-primary"}>{trigger}</SubmitButton>
        </div>
      </>}
    </MutationForm>
  </Modal>;
}
