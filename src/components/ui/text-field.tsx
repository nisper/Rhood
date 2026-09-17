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
  md: "h-10 px-3 text-base leading-6 tracking-[0.15px]",
  sm: "h-9 px-3 text-sm leading-5 tracking-[0.15px]",
}

function stateClasses({ error, state }: { error: boolean; state: TextfieldState }) {
  if (error) {
    return state === "focused"
      ? "border-[color:var(--parser-border-error)] ring-1 ring-inset ring-[color:var(--parser-border-error)]"
      : "border-[color:var(--parser-border-error)]"
  }

  if (state === "focused") {
    return "border-[color:var(--parser-border-focus)] ring-1 ring-inset ring-[color:var(--parser-border-focus)]"
  }

  if (state === "hovered") return "border-[color:var(--parser-border-hover)] bg-[var(--input-hover,white)]"
  return "border-[color:var(--parser-border-light)]"
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
    ? "hover:border-[color:var(--parser-border-hover)] hover:bg-[var(--input-hover,white)] focus:border-[color:var(--parser-border-focus)] focus:bg-[var(--input-focus,white)] focus:ring-1 focus:ring-inset focus:ring-[color:var(--parser-border-focus)]"
    : !disabled && error
      ? "focus:border-[color:var(--parser-border-error)] focus:ring-1 focus:ring-inset focus:ring-[color:var(--parser-border-error)]"
      : undefined

  const input = (
    <input
      aria-invalid={error || undefined}
      className={cn(
        "box-border block w-full appearance-none rounded-lg border bg-white font-normal text-[color:var(--parser-text-neutral-primary)] outline-none transition-colors duration-150 placeholder:text-[color:var(--parser-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:border-[color:var(--parser-border-light)] disabled:text-[color:var(--parser-text-disabled)]",
        sizeClasses[size],
        stateClasses({ error, state }),
        interactiveClasses,
        hasStartAdornment && (size === "md" ? "pl-11" : "pl-10"),
        (required || showClearButton) && "pr-8",
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
          className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-[var(--parser-text-neutral-secondary)]"
        >
          {startAdornment}
        </span>
      )}
      {showClearButton && (
        <span
          className={cn(
            "absolute top-1/2 flex -translate-y-1/2 items-center justify-center",
            size === "md" ? "size-6" : "size-5",
            required ? "right-8" : "right-2",
          )}
        >
          <ClearButton
            aria-label="Очистить поле"
            className={cn(
              "focus-visible:ring-2 focus-visible:ring-[var(--rh-theme-border-focus)]",
              size === "md" ? "m-[-12px]" : "m-[-8px]",
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
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base leading-6 text-[var(--parser-text-error)]"
      >
        *
      </span>
      )}
    </span>
  )
}

export { Textfield }
export type { TextfieldProps, TextfieldSize, TextfieldState }
