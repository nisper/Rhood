import * as React from "react"

import { ClearButton } from "@/components/ui/clear-button"
import { cn } from "@/lib/utils"

type TextfieldSize = "md" | "sm"
type TextfieldState = "default" | "hovered" | "focused"

type TextfieldProps = Omit<React.ComponentProps<"input">, "size"> & {
  /** Visual state for component previews. Native hover and focus work by default. */
  clearButton?: boolean
  /** Non-interactive element fixed at the start of the field. */
  startAdornment?: React.ReactNode
  state?: TextfieldState
  size?: TextfieldSize
  error?: boolean
  onClear?: () => void
}

const sizeClasses: Record<TextfieldSize, string> = {
  md: "h-[calc(var(--spacing)*10)] px-[var(--rh-sizing-common-input-padding-px-md)] text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
  sm: "h-[calc(var(--spacing)*9)] px-[var(--rh-sizing-common-input-padding-px-sm)] text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
}

function stateClasses({ error, state }: { error: boolean; state: TextfieldState }) {
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

/** A native, single-line text input styled with Parser tokens. */
function Textfield({
  className,
  clearButton = false,
  defaultValue,
  disabled = false,
  error = false,
  onBlur,
  onChange,
  onClear,
  onFocus,
  placeholder = "Placeholder",
  required = false,
  size = "md",
  startAdornment,
  state = "default",
  type = "text",
  value,
  ...props
}: TextfieldProps) {
  const isControlled = value !== undefined
  const [isFocused, setIsFocused] = React.useState(false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? "")
  const isFocusedPreview = state === "focused"
  const currentValue = isControlled ? value : uncontrolledValue
  const hasValue = `${currentValue ?? ""}`.length > 0
  const showClearButton = clearButton && hasValue && !disabled && (isFocused || isFocusedPreview)
  const hasStartAdornment = Boolean(startAdornment)
  const interactiveClasses = !disabled && !error && !isFocusedPreview
    ? "hover:border-[color:var(--rh-theme-border-hover)] hover:bg-[var(--rh-theme-surface-bg)] focus:border-[color:var(--rh-theme-border-focus)] focus:bg-[var(--rh-theme-surface-bg)] focus:ring-1 focus:ring-inset focus:ring-[color:var(--rh-theme-border-focus)]"
    : !disabled && error
      ? "focus:border-[color:var(--rh-theme-border-error)] focus:ring-1 focus:ring-inset focus:ring-[color:var(--rh-theme-border-error)]"
      : undefined

  const input = (
    <input
      aria-invalid={error || undefined}
      className={cn(
        "box-border block w-full appearance-none rounded-[var(--rh-sizing-common-input-shape-border-radius)] border bg-[var(--rh-theme-surface-bg)] font-normal text-[color:var(--rh-theme-text-neutral-primary)] outline-none transition-colors duration-150 placeholder:text-[color:var(--rh-theme-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:border-[color:var(--rh-theme-border-light)] disabled:text-[color:var(--rh-theme-text-neutral-disabled)]",
        sizeClasses[size],
        stateClasses({ error, state }),
        interactiveClasses,
        hasStartAdornment && (size === "md" ? "pl-[calc(var(--rh-sizing-common-input-padding-px-md)+calc(var(--spacing)*6)+var(--rh-sizing-common-input-padding-gap-md))]" : "pl-[calc(var(--rh-sizing-common-input-padding-px-sm)+calc(var(--spacing)*5)+var(--rh-sizing-common-input-padding-gap-sm))]"),
        (required || showClearButton) && "pr-[calc(var(--spacing)*8)]",
        className,
      )}
      disabled={disabled}
      onBlur={(event) => {
        setIsFocused(false)
        onBlur?.(event)
      }}
      onChange={(event) => {
        if (!isControlled) setUncontrolledValue(event.target.value)
        onChange?.(event)
      }}
      onFocus={(event) => {
        setIsFocused(true)
        onFocus?.(event)
      }}
      placeholder={placeholder}
      required={required}
      type={type}
      value={currentValue}
      {...props}
    />
  )

  if (!required && !clearButton && !hasStartAdornment) return input

  return (
    <span className="relative block w-full">
      {input}
      {hasStartAdornment && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[var(--rh-sizing-common-input-padding-px-md)] top-1/2 flex -translate-y-1/2 items-center justify-center text-[var(--rh-theme-text-neutral-secondary)]"
        >
          {startAdornment}
        </span>
      )}
      {showClearButton && (
        <span
          className={cn(
            "absolute top-1/2 flex -translate-y-1/2 items-center justify-center",
            size === "md" ? "size-[calc(var(--spacing)*6)]" : "size-[calc(var(--spacing)*5)]",
            required ? "right-[calc(var(--spacing)*8)]" : "right-[calc(var(--spacing)*2)]",
          )}
        >
          <ClearButton
            aria-label="Очистить поле"
            className={cn(
              "focus-visible:ring-2 focus-visible:ring-[var(--rh-theme-border-focus)]",
              size === "md" ? "m-[calc(calc(var(--spacing)*3)*-1)]" : "m-[calc(calc(var(--spacing)*2)*-1)]",
            )}
            onClick={() => {
              if (!isControlled) setUncontrolledValue("")
              onClear?.()
            }}
            size={size}
          />
        </span>
      )}
      {required && (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[var(--rh-sizing-common-input-padding-px-md)] top-1/2 -translate-y-1/2 text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] text-[var(--rh-theme-text-error)]"
      >
        *
      </span>
      )}
    </span>
  )
}

export { Textfield }
export type { TextfieldProps, TextfieldSize, TextfieldState }
