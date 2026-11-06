import * as React from "react"

import { Button } from "@/components/ui/button"
import { Modal, ModalContainer } from "@/components/ui/modal"

type ConfirmProps = {
  backdrop?: boolean
  cancelLabel?: string
  confirmLabel?: string
  description?: React.ReactNode
  onCancel?: () => void
  onConfirm?: () => void
  onOpenChange?: (open: boolean) => void
  open: boolean
  title: React.ReactNode
}

function Confirm({
  backdrop = true,
  cancelLabel = "Отмена",
  confirmLabel = "Подтвердить",
  description,
  onCancel,
  onConfirm,
  onOpenChange,
  open,
  title,
}: ConfirmProps) {
  if (!open) return null

  const dialog = (
    <Modal
        footer={
          <>
            <Button appearance="default" endIcon={false} onClick={() => { onCancel?.(); onOpenChange?.(false) }} size="md" startIcon={false}>
              {cancelLabel}
            </Button>
            <Button appearance="default" endIcon={false} onClick={() => { onConfirm?.(); onOpenChange?.(false) }} size="md" startIcon={false}>
              {confirmLabel}
            </Button>
          </>
        }
        maxWidth={420}
        onOpenChange={onOpenChange}
        open={open}
        title={title}
      >
        {description && <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-primary)]">{description}</p>}
    </Modal>
  )

  return backdrop ? (
    <ModalContainer className="fixed inset-0 z-[70]">{dialog}</ModalContainer>
  ) : dialog
}

export { Confirm }
export type { ConfirmProps }
