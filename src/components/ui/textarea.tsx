import * as React from "react"

import { cn } from "@/lib/utils"

type TextareaSize = "md" | "sm"
type TextareaState = "default" | "hovered" | "focused"
type TextareaRows = 1 | 2

type TextareaProps = Omit<React.ComponentProps<"textarea">, "rows" | "size"> & {
  /** Visual state for component previews. Native hover and focus work by default. */
  state?: TextareaState
  size?: TextareaSize
  error?: boolean
  rows?: TextareaRows
}

const sizeClasses: Record<TextareaSize, Record<TextareaRows, string>> = {
  md: {
    1: "h-[calc(var(--spacing)*10)] px-[var(--rh-sizing-common-input-padding-px-md)] pb-[calc(var(--rh-sizing-common-input-padding-py-md)+1px)] pt-[calc(var(--rh-sizing-common-input-padding-py-md)-1px)] text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
    2: "h-[calc(var(--spacing)*16)] px-[var(--rh-sizing-common-input-padding-px-md)] pb-[calc(var(--rh-sizing-common-input-padding-py-md)+1px)] pt-[calc(var(--rh-sizing-common-input-padding-py-md)-1px)] text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
  },
  sm: {
    1: "h-[calc(var(--spacing)*9)] px-[var(--rh-sizing-common-input-padding-px-sm)] pb-[calc(var(--rh-sizing-common-input-padding-py-sm)+1px)] pt-[calc(var(--rh-sizing-common-input-padding-py-sm)-1px)] text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
    2: "h-[calc(var(--spacing)*14)] px-[var(--rh-sizing-common-input-padding-px-sm)] pb-[calc(var(--rh-sizing-common-input-padding-py-sm)+1px)] pt-[calc(var(--rh-sizing-common-input-padding-py-sm)-1px)] text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
  },
}

function stateClasses({ error, state }: { error: boolean; state: TextareaState }) {
  if (error) {
    return state === "focused"
      ? "border-[color:var(--rh-theme-border-error)] ring-1 ring-inset ring-[color:var(--rh-theme-border-error)]"
      : "border-[color:var(--rh-theme-border-error)]"
  }

  if (state === "focused") {
    return "border-[color:var(--rh-theme-border-focus)] ring-1 ring-inset ring-[color:var(--rh-theme-border-focus)]"
  }

  if (state === "hovered") return "border-[color:var(--rh-theme-border-hover)] bg-[var(--rh-theme-surface-bg)]"
  return "border-[color:var(--rh-theme-border-light)]"
}

/** A native multiline text input styled like Textfield, without adornments or a clear button. */
function Textarea({
  className,
  disabled = false,
  error = false,
  placeholder = "Placeholder",
  required = false,
  rows = 1,
  size = "md",
  state = "default",
  ...props
}: TextareaProps) {
  const isFocusedPreview = state === "focused"
  const interactiveClasses = !disabled && !error && !isFocusedPreview
    ? "hover:border-[color:var(--rh-theme-border-hover)] hover:bg-[var(--rh-theme-surface-bg)] focus:border-[color:var(--rh-theme-border-focus)] focus:bg-[var(--rh-theme-surface-bg)] focus:ring-1 focus:ring-inset focus:ring-[color:var(--rh-theme-border-focus)]"
    : !disabled && error
      ? "focus:border-[color:var(--rh-theme-border-error)] focus:ring-1 focus:ring-inset focus:ring-[color:var(--rh-theme-border-error)]"
      : undefined

  const textarea = (
    <textarea
      aria-invalid={error || undefined}
      className={cn(
        "box-border block w-full resize-y appearance-none rounded-[var(--rh-sizing-common-input-shape-border-radius)] border bg-[var(--rh-theme-surface-bg)] font-normal text-[color:var(--rh-theme-text-neutral-primary)] outline-none transition-colors duration-150 placeholder:text-[color:var(--rh-theme-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:border-[color:var(--rh-theme-border-light)] disabled:text-[color:var(--rh-theme-text-neutral-disabled)]",
        sizeClasses[size][rows],
        stateClasses({ error, state }),
        interactiveClasses,
        required && "pr-[calc(var(--spacing)*8)]",
        className,
      )}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      rows={rows}
      {...props}
    />
  )

  if (!required) return textarea

  return (
    <span className="relative block w-full">
      {textarea}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[var(--rh-sizing-common-input-padding-px-md)] top-1/2 -translate-y-1/2 text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] text-[var(--rh-theme-text-error)]"
      >
        *
      </span>
    </span>
  )
}

export { Textarea }
export type { TextareaProps, TextareaRows, TextareaSize, TextareaState }
