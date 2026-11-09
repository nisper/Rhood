import * as React from "react"
import { CircleAlert, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

type SnackbarProps = React.ComponentProps<"div"> & {
  button?: boolean
  close?: boolean
  icon?: boolean | React.ReactNode
  message?: React.ReactNode
  actionLabel?: React.ReactNode
  open?: boolean
  onAction?: () => void
  onClose?: () => void
}

/**
 * Parser snackbar matching the Figma `snackbar` component.
 */
function Snackbar({
  actionLabel = "Label",
  button = true,
  className,
  close = true,
  icon = true,
  message = "Message",
  open = true,
  onAction,
  onClose,
  ...props
}: SnackbarProps) {
  const [shown, setShown] = React.useState(false)
  const [hasEntered, setHasEntered] = React.useState(false)
  const [displayedMessage, setDisplayedMessage] = React.useState(message)

  React.useEffect(() => {
    if (open) {
      setShown(true)
      setHasEntered(true)
      setDisplayedMessage(message)
    } else {
      setShown(false)
    }
  }, [message, open])

  function closeSnackbar() {
    setShown(false)
    onClose?.()
  }

  return (
    <div
      aria-hidden={!shown}
      className={cn(
        "flex min-h-[42px] w-fit max-w-[calc(100vw-2.5rem)] items-center gap-2 rounded-[var(--rh-sizing-floating-bar-border-radius)] bg-[color:var(--parser-fill-neutral-dark-ultra)] px-4 py-[6px] transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-none",
        (button || close) && "pr-[6px]",
        shown
          ? "translate-y-0 opacity-100"
          : hasEntered
            ? "pointer-events-none translate-y-0 opacity-0"
            : "pointer-events-none -translate-y-[calc(100%+1.5rem)] opacity-0",
        className,
      )}
      inert={!shown}
      {...props}
    >
      {icon && (
        <span className="flex w-5 shrink-0 items-center justify-end">
          {icon === true ? (
            <CircleAlert
              className="size-5 shrink-0 text-[color:var(--parser-text-primary-contrast)]"
              strokeWidth={2}
            />
          ) : (
            icon
          )}
        </span>
      )}

      <div className="flex min-w-px flex-1 items-center self-stretch">
        <p
          className="rh-typography-b2 min-w-px flex-1 text-[color:var(--parser-text-primary-contrast)]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {displayedMessage}
        </p>
      </div>

      {button && (
        <Button
          appearance="contrast"
          endIcon={false}
          onClick={onAction}
          startIcon={false}
          size="sm"
        >
          {actionLabel}
        </Button>
      )}

      {close && (
        <span className={button ? "-ml-[var(--rh-sizing-common-input-gap-xsm)]" : undefined}>
          <IconButton
            aria-label="Close"
            appearance="contrast-ghost"
            icon={<X aria-hidden="true" strokeWidth={2} />}
            onClick={closeSnackbar}
            size="sm"
          />
        </span>
      )}
    </div>
  )
}

export { Snackbar }
export type { SnackbarProps }
