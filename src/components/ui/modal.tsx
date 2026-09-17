import * as React from "react"
import { X } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

type ModalResponsive = "desktop" | "mobile"

type ModalProps = Omit<React.ComponentProps<"section">, "title"> & {
  /** Текст заголовка диалога. */
  title: React.ReactNode
  /** Поясняющий текст под заголовком. */
  description?: React.ReactNode
  /** Содержимое между описанием и действиями. */
  children?: React.ReactNode
  /** Группа действий в нижней части диалога. */
  actions?: React.ReactNode
  /** Показывает кнопку закрытия в desktop-версии. */
  closeButton?: boolean
  /** Вызывается при нажатии на кнопку закрытия. */
  onClose?: () => void
  /** Адаптация поверхности диалога. */
  responsive?: ModalResponsive
}

/**
 * Поверхность модального диалога по Figma-компоненту `modal`.
 * Backdrop, открытие и фокус-менеджмент остаются ответственностью родительского слоя.
 */
function Modal({
  actions,
  children,
  className,
  closeButton = true,
  description,
  onClose,
  responsive = "desktop",
  title,
  ...props
}: ModalProps) {
  const titleId = React.useId()
  const isMobile = responsive === "mobile"

  const content = (
    <div className="flex w-full flex-col">
      <header className="flex items-start px-0 pb-[var(--rh-sizing-base-module-1)] pt-[var(--rh-sizing-base-module-2)]">
        <h2
          className="w-full py-[6px] text-center text-[20px] font-medium leading-[1.28] text-[var(--rh-theme-text-neutral-primary)]"
          id={titleId}
        >
          {title}
        </h2>
      </header>

      {description && (
        <div className="flex items-center justify-center px-0 pb-[var(--rh-sizing-base-module-2)]">
          <p className="text-center text-base font-normal leading-6 tracking-[0.15px] text-[var(--rh-theme-text-neutral-primary)]">
            {description}
          </p>
        </div>
      )}

      {children}

      {actions && (
        <footer
          className={cn(
            "flex items-center justify-center gap-[10px] px-0 py-[var(--rh-sizing-base-module-2)]",
            isMobile && "flex-col [&>:first-child]:order-2 [&>:last-child]:order-1 [&>_*]:w-full",
          )}
        >
          {actions}
        </footer>
      )}
    </div>
  )

  return (
    <section
      aria-labelledby={titleId}
      aria-modal="true"
      className={cn(
        "relative",
        isMobile
          ? "flex w-full min-w-[375px] max-w-[767px] flex-col gap-[var(--rh-sizing-modal-grabber-bottom-margin)]"
          : "w-[478px] rounded-[var(--rh-sizing-border-radius-modal)] bg-[var(--rh-theme-surface-bg)] px-[var(--rh-sizing-layout-container)] py-[var(--rh-sizing-modal-py)]",
        className,
      )}
      role="dialog"
      {...props}
    >
      {isMobile && (
        <div className="flex w-full justify-center px-[10px] py-[var(--rh-sizing-base-module-0-5)]">
          <span aria-hidden="true" className="h-[5px] w-[64px] rounded-full bg-white" />
        </div>
      )}

      <div
        className={cn(
          isMobile && "w-full rounded-t-[var(--rh-sizing-border-radius-modal)] bg-[var(--rh-theme-surface-bg)] px-[var(--rh-sizing-base-module-1-5)] py-[var(--rh-sizing-modal-py)]",
        )}
      >
        {content}
      </div>

      {!isMobile && closeButton && (
        <IconButton
          aria-label="Закрыть модальное окно"
          appearance="ghost"
          className="absolute right-0 top-0"
          icon={<X aria-hidden="true" strokeWidth={2} />}
          onClick={onClose}
        />
      )}
    </section>
  )
}

export { Modal }
export type { ModalProps, ModalResponsive }
