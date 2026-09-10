import * as React from "react"
import { CircleAlert, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SnackbarProps = React.ComponentProps<"div"> & {
  button?: boolean
  close?: boolean
  icon?: boolean | React.ReactNode
  message?: React.ReactNode
  actionLabel?: React.ReactNode
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
  ...props
}: SnackbarProps) {
  return (
    <div
      className={cn(
        "flex min-h-[42px] w-fit max-w-[calc(100vw-2.5rem)] items-center gap-2 rounded-[4px] bg-[color:var(--parser-fill-neutral-dark-ultra)] px-4 py-[6px]",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="flex w-5 shrink-0 items-center justify-end pr-1">
          {icon === true ? (
            <CircleAlert
              className="size-4 shrink-0 text-[color:var(--parser-text-primary-contrast)]"
              strokeWidth={2}
            />
          ) : (
            icon
          )}
        </span>
      )}

      <div className="flex min-w-px flex-1 items-center self-stretch">
        <p
          className="min-w-px flex-1 font-normal text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-primary-contrast)]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {message}
        </p>
      </div>

      {button && (
        <Button
          appearance="contrast"
          endIcon={false}
          startIcon={false}
          size="sm"
        >
          {actionLabel}
        </Button>
      )}

      {close && (
        <button
          aria-label="Close"
          className="inline-flex shrink-0 items-center justify-center rounded-full p-[5px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]"
          type="button"
        >
          <X className="size-4 shrink-0 text-[color:var(--parser-text-primary-contrast)]" strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

export { Snackbar }
export type { SnackbarProps }
