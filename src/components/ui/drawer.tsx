import * as React from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

type DrawerProps = React.ComponentProps<"aside"> & {
  /** Content shown in the fixed action area at the bottom of the drawer. */
  actions?: React.ReactNode
  /** Displays the close control in the default header. */
  closeButton?: boolean
  /** Replaces the default header with custom content. */
  header?: React.ReactNode
  /** Called after the user presses the close control. */
  onClose?: () => void
  /** Title used by the default header. */
  title?: React.ReactNode
}

function Drawer({
  actions,
  children,
  className,
  closeButton = true,
  header,
  onClose,
  title = "Modal Header",
  ...props
}: DrawerProps) {
  const defaultHeader = (
    <div className="flex shrink-0 items-start gap-[var(--rh-sizing-base-module-1)] bg-[var(--rh-theme-surface-bg)] px-[var(--rh-sizing-layout-container)] py-[var(--rh-sizing-base-module-1)]">
      <p className="min-w-0 flex-1 text-[length:var(--rh-sizing-typography-font-size-md)] font-medium leading-[var(--rh-sizing-typography-line-height-md)] tracking-[var(--rh-sizing-typography-letter-spacing-md)] text-[var(--rh-theme-text-neutral-primary)]">
        {title}
      </p>
      {closeButton && (
        <IconButton
          appearance="inherit"
          aria-label="Закрыть"
          className="-mr-[var(--rh-sizing-base-module-1)] -mt-[var(--rh-sizing-base-module-1)] text-[var(--rh-theme-icon-neutral-primary)]"
          icon={<X aria-hidden="true" strokeWidth={2} />}
          onClick={onClose}
          size="md"
        />
      )}
    </div>
  )

  const defaultActions = (
    <>
      <Button appearance="default" className="min-w-0 flex-1" endIcon={false} startIcon={false}>
        Button
      </Button>
      <Button appearance="default" className="min-w-0 flex-1" endIcon={false} startIcon={false}>
        Button
      </Button>
    </>
  )

  return (
    <aside
      aria-label="Боковая панель"
      className={cn(
        "flex h-[778px] w-[386px] items-start px-[var(--rh-sizing-modal-margin-x)] pb-[var(--rh-sizing-modal-margin-bottom)] pt-[var(--rh-sizing-modal-margin-top)]",
        className,
      )}
      {...props}
    >
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto rounded-[var(--rh-sizing-border-radius-modal)] bg-[var(--rh-theme-surface-bg)] shadow-[0px_25px_50px_-12px_rgb(0_0_0_/_0.26)]">
        {header ?? defaultHeader}
        <div className="min-h-0 flex-1">{children}</div>
        <div className="flex shrink-0 items-start gap-[var(--rh-sizing-base-module-1)] overflow-hidden bg-[var(--rh-theme-surface-bg)] px-[var(--rh-sizing-layout-container)] py-[var(--rh-sizing-modal-py)]">
          {actions ?? defaultActions}
        </div>
      </div>
    </aside>
  )
}

export { Drawer }
export type { DrawerProps }
