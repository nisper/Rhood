import * as React from "react"

import { ClearButton } from "@/components/ui/clear-button"
import { cn } from "@/lib/utils"

type InputNumberSize = "md" | "sm"
type InputNumberState = "default" | "hovered" | "focused"

type InputNumberProps = Omit<React.ComponentProps<"input">, "size" | "type"> & {
  clearButton?: boolean
  endText?: React.ReactNode
  error?: boolean
  /** Separates digit groups in the integer part with spaces. */
  groupThousands?: boolean
  onClear?: () => void
  size?: InputNumberSize
  startText?: React.ReactNode
  state?: InputNumberState
}

function digitsOnly(value: string | number | readonly string[] | undefined) {
  return `${value ?? ""}`.replace(/\D/g, "")
}

function formatThousands(value: string | number | readonly string[] | undefined) {
  return digitsOnly(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const sizeClasses: Record<InputNumberSize, string> = {
  md: "h-10 px-3 text-base leading-6 tracking-[0.15px]",
  sm: "h-9 px-3 text-sm leading-5 tracking-[0.17px]",
}

function stateClasses({ error, state }: { error: boolean; state: InputNumberState }) {
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

/** A single-line numeric field with monospaced values and optional units. */
function InputNumber({
  className,
  clearButton = false,
  defaultValue,
  disabled = false,
  endText,
  error = false,
  groupThousands = false,
  inputMode = "numeric",
  onBlur,
  onChange,
  onClear,
  onFocus,
  onKeyDown,
  placeholder = "Введите значение",
  required = false,
  size = "md",
  startText,
  state = "default",
  value,
  ...props
}: InputNumberProps) {
  const isControlled = value !== undefined
  const [isFocused, setIsFocused] = React.useState(false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? "")
  const isFocusedPreview = state === "focused"
  const currentValue = digitsOnly(isControlled ? value : uncontrolledValue)
  const displayValue = groupThousands ? formatThousands(currentValue) : currentValue
  const hasValue = currentValue.length > 0
  const showClearButton = clearButton && hasValue && !disabled && (isFocused || isFocusedPreview)
  const interactiveClasses = !disabled && !error && !isFocusedPreview
    ? "hover:border-[color:var(--parser-border-hover)] hover:bg-[var(--input-hover,white)] focus:border-[color:var(--parser-border-focus)] focus:bg-[var(--input-focus,white)] focus:ring-1 focus:ring-inset focus:ring-[color:var(--parser-border-focus)]"
    : !disabled && error
      ? "focus:border-[color:var(--parser-border-error)] focus:ring-1 focus:ring-inset focus:ring-[color:var(--parser-border-error)]"
      : undefined

  return (
    <div className="relative w-full">
      {startText && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[var(--parser-text-neutral-secondary)]",
            size === "md" ? "text-base leading-6" : "text-sm leading-5",
          )}
        >
          {startText}
        </span>
      )}
      <input
        aria-invalid={error || undefined}
        className={cn(
          "box-border block w-full appearance-none rounded-lg border bg-white font-mono font-normal text-[color:var(--parser-text-neutral-primary)] outline-none transition-colors duration-150 placeholder:font-sans placeholder:text-[color:var(--parser-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:border-[color:var(--parser-border-light)] disabled:text-[color:var(--parser-text-disabled)]",
          sizeClasses[size],
          stateClasses({ error, state }),
          interactiveClasses,
          startText && "pl-8",
          (endText || required || showClearButton) && "pr-8",
          className,
        )}
        disabled={disabled}
        inputMode={inputMode}
        onBlur={(event) => {
          setIsFocused(false)
          onBlur?.(event)
        }}
        onChange={(event) => {
          const normalizedValue = digitsOnly(event.target.value)
          event.target.value = normalizedValue

          if (!isControlled) {
            setUncontrolledValue(normalizedValue)
          }
          onChange?.(event)
        }}
        onFocus={(event) => {
          setIsFocused(true)
          onFocus?.(event)
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)

          if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return
          if (!/\d/.test(event.key)) event.preventDefault()
        }}
        placeholder={placeholder}
        required={required}
        type="text"
        value={displayValue}
        {...props}
      />
      {showClearButton && (
        <span
          className={cn(
            "absolute top-1/2 flex -translate-y-1/2 items-center justify-center",
            size === "md" ? "size-6" : "size-5",
            endText || required ? "right-8" : "right-2",
          )}
        >
          <ClearButton
            aria-label="Очистить поле"
            className={cn(
              "focus-visible:ring-2 focus-visible:ring-[var(--rhood-theme-border-focus)]",
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
      {endText && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--parser-text-neutral-primary)]",
            size === "md" ? "text-base leading-6" : "text-sm leading-5",
          )}
        >
          {endText}
        </span>
      )}
      {required && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-[var(--parser-text-error)]",
            endText ? "right-8" : "right-3",
            size === "md" ? "text-base leading-6" : "text-sm leading-5",
          )}
        >
          *
        </span>
      )}
    </div>
  )
}

export { InputNumber }
export type { InputNumberProps, InputNumberSize, InputNumberState }
