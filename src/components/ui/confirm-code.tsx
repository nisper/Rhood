import * as React from "react"

import { FormHelperText } from "@/components/ui/form-helper-text"
import { cn } from "@/lib/utils"

type ConfirmCodeState = "default" | "hovered" | "focused"

type ConfirmCodeProps = React.ComponentProps<"div"> & {
  disabled?: boolean
  empty?: boolean
  error?: boolean
  helperText?: React.ReactNode
  state?: ConfirmCodeState
}

function getBorderClasses({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: ConfirmCodeState
}) {
  if (disabled) {
    return "border-[color:var(--parser-border-light)]"
  }

  if (error) {
    return state === "focused"
      ? "border-2 border-[color:var(--parser-fill-error)]"
      : "border-[color:var(--parser-fill-error)]"
  }

  if (state === "focused") {
    return "border-2 border-[color:var(--parser-fill-brand)]"
  }

  if (state === "hovered") {
    return "border-[color:var(--parser-border-neutral-dark)]"
  }

  return "border-[color:var(--parser-border-light)]"
}

function getToneClass({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: ConfirmCodeState
}) {
  if (disabled) {
    return "text-[color:var(--parser-text-disabled)]"
  }

  if (error) {
    return "text-[color:var(--parser-text-error)]"
  }

  if (state === "focused") {
    return "text-[color:var(--parser-text-brand)]"
  }

  return "text-[color:var(--parser-text-neutral-secondary)]"
}

function ConfirmCode({
  className,
  disabled = false,
  empty = true,
  error = false,
  helperText,
  state = "default",
  ...props
}: ConfirmCodeProps) {
  const resolvedState: ConfirmCodeState = disabled ? "default" : state
  const hasValue = !empty

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        className={cn(
          "relative flex w-full items-center rounded-lg border bg-white px-4 py-3 transition-colors duration-150",
          getBorderClasses({ disabled, error, state: resolvedState }),
          resolvedState === "hovered" && !disabled && !error && "bg-[var(--input-hover,white)]",
          resolvedState === "focused" && !disabled && "bg-[var(--input-focus,white)]",
        )}
      >
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center justify-center overflow-hidden text-center font-bold leading-[1.33] whitespace-nowrap",
            "font-['Roboto_Mono:Bold',sans-serif] text-[24px]",
            disabled
              ? "text-[color:var(--parser-text-disabled)]"
              : error
                ? "text-[color:var(--parser-text-secondary)]"
                : "text-[color:var(--parser-text-neutral-primary)]",
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {resolvedState === "focused" ? (
            <>
              <span className="overflow-hidden text-ellipsis">{hasValue ? "380" : "___"}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "mx-0.5 w-px shrink-0",
                  hasValue ? "h-8" : "h-8",
                  disabled
                    ? "bg-[color:var(--parser-text-disabled)]"
                    : error
                      ? "bg-[color:var(--parser-text-error)]"
                      : "bg-[color:var(--parser-text-neutral-primary)]",
                )}
              />
              <span className="overflow-hidden text-ellipsis">{hasValue ? "916" : "___"}</span>
            </>
          ) : (
            <span className="overflow-hidden text-ellipsis">{hasValue ? "380 916" : "___ ___"}</span>
          )}
        </div>
      </div>

      {helperText && (
        <FormHelperText
          className="mt-1"
          color={error ? "error" : disabled ? "disabled" : "default"}
        >
          {helperText}
        </FormHelperText>
      )}
    </div>
  )
}

export { ConfirmCode }
export type { ConfirmCodeProps, ConfirmCodeState }
