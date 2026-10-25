"use client";

import { createContext, useContext, useMemo, useRef, useState, type ReactElement, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

const ModalContext = createContext<{ close: () => void; setBusy: (busy: boolean) => void } | null>(null);
export const useModal = () => useContext(ModalContext);

export function Modal({ title, description, trigger, children, open, onOpenChange, onClosed, destructive = false }: {
  title: string;
  description?: string;
  trigger?: ReactElement;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClosed?: () => void;
  destructive?: boolean;
}) {
  const [localOpen, setLocalOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const popup = useRef<HTMLDivElement>(null);
  const changeOpen = onOpenChange ?? setLocalOpen;
  const context = useMemo(() => ({ close: () => changeOpen(false), setBusy }), [changeOpen]);
  return <Dialog.Root open={open ?? localOpen} onOpenChange={(next, details) => {
    if (busy) { details.cancel(); return; }
    changeOpen(next);
  }} onOpenChangeComplete={(next) => { if (!next) onClosed?.(); }} disablePointerDismissal={busy}>
    {trigger && <Dialog.Trigger render={trigger} />}
    <Dialog.Portal>
      <Dialog.Backdrop className="modal-backdrop fixed inset-0 z-40 bg-black/70 backdrop-blur-[3px]" />
      <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
        <Dialog.Popup ref={popup} className={`modal-popup relative w-full ${destructive ? "max-w-sm" : "max-w-md"} max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl border border-white/15 bg-panel p-5 shadow-2xl`} initialFocus={() => popup.current?.querySelector<HTMLElement>(destructive ? "[data-modal-cancel]" : "[data-modal-input]") ?? true}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-sm font-medium">{title}</Dialog.Title>
              {description && <Dialog.Description className="mt-2 text-[12px] leading-5 text-muted">{description}</Dialog.Description>}
            </div>
            <Dialog.Close disabled={busy} aria-label="Close dialog" className="-mr-1 -mt-1 rounded-md p-1.5 text-muted hover:bg-white/5 hover:text-foreground disabled:opacity-40"><X className="size-4" /></Dialog.Close>
          </div>
          <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  </Dialog.Root>;
}

export function ModalCancel({ pending, children = "Cancel" }: { pending: boolean; children?: ReactNode }) {
  return <Dialog.Close data-modal-cancel disabled={pending} className="button-secondary">{children}</Dialog.Close>;
}
