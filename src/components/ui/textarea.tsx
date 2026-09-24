import * as React from "react"

import { cn } from "@/lib/utils"

type TextareaSize = "md" | "sm"
type TextareaState = "default" | "hovered" | "focused"
type TextareaRows = number

type TextareaProps = Omit<React.ComponentProps<"textarea">, "rows" | "size"> & {
  /** Visual state for component previews. Native hover and focus work by default. */
  state?: TextareaState
  size?: TextareaSize
  error?: boolean
  /** Expands the field while the user enters text. */
  autoResize?: boolean
  /** Maximum number of visible rows when autoResize is enabled. */
  maxRows?: TextareaRows
  rows?: TextareaRows
}

const sizeClasses: Record<TextareaSize, string> = {
  md: "rh-typography-b1 px-[var(--rh-sizing-common-input-padding-px-md)] pb-[calc(var(--rh-sizing-common-input-padding-py-md)+1px)] pt-[calc(var(--rh-sizing-common-input-padding-py-md)-1px)]",
  sm: "rh-typography-b2 px-[var(--rh-sizing-common-input-padding-px-sm)] py-[var(--rh-sizing-common-input-padding-py-sm)]",
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
  autoResize = false,
  disabled = false,
  error = false,
  maxRows,
  onInput,
  placeholder = "Placeholder",
  required = false,
  rows = 2,
  size = "md",
  state = "default",
  ...props
}: TextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const visibleRows = Math.max(1, Math.floor(rows))
  const maximumRows = autoResize && maxRows !== undefined ? Math.max(1, Math.floor(maxRows)) : undefined
  const initialRows = maximumRows ? Math.min(visibleRows, maximumRows) : visibleRows

  const resizeToContent = React.useCallback((textarea: HTMLTextAreaElement | null) => {
    if (!autoResize || !textarea) return

    textarea.style.height = "auto"

    const styles = window.getComputedStyle(textarea)
    const lineHeight = Number.parseFloat(styles.lineHeight)
    const verticalInsets =
      Number.parseFloat(styles.paddingTop) +
      Number.parseFloat(styles.paddingBottom) +
      Number.parseFloat(styles.borderTopWidth) +
      Number.parseFloat(styles.borderBottomWidth)
    const maximumHeight = maximumRows && lineHeight
      ? lineHeight * maximumRows + verticalInsets
      : undefined
    const height = maximumHeight ? Math.min(textarea.scrollHeight, maximumHeight) : textarea.scrollHeight

    textarea.style.height = `${height}px`
    textarea.style.overflowY = maximumHeight && textarea.scrollHeight > maximumHeight ? "auto" : "hidden"
  }, [autoResize, maximumRows])

  React.useLayoutEffect(() => {
    resizeToContent(textareaRef.current)
  }, [resizeToContent, props.value])

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
        "box-border block w-full resize-none appearance-none rounded-[var(--rh-sizing-common-input-shape-border-radius)] border bg-[var(--rh-theme-surface-bg)] text-[color:var(--rh-theme-text-neutral-primary)] outline-none transition-colors duration-150 placeholder:text-[color:var(--rh-theme-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:border-[color:var(--rh-theme-border-light)] disabled:text-[color:var(--rh-theme-text-neutral-disabled)]",
        sizeClasses[size],
        stateClasses({ error, state }),
        interactiveClasses,
        required && "pr-[calc(var(--spacing)*8)]",
        className,
      )}
      disabled={disabled}
      onInput={(event) => {
        resizeToContent(event.currentTarget)
        onInput?.(event)
      }}
      placeholder={placeholder}
      ref={textareaRef}
      required={required}
      rows={initialRows}
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
