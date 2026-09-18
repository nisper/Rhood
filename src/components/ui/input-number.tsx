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
  md: "h-[var(--rh-sizing-base-module-5)] px-[var(--rh-sizing-common-input-padding-px-md)] text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
  sm: "h-[var(--rh-sizing-base-module-4-5)] px-[var(--rh-sizing-common-input-padding-px-sm)] text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
}

function stateClasses({ error, state }: { error: boolean; state: InputNumberState }) {
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
    ? "hover:border-[color:var(--rh-theme-border-hover)] hover:bg-[var(--rh-theme-surface-bg)] focus:border-[color:var(--rh-theme-border-focus)] focus:bg-[var(--rh-theme-surface-bg)] focus:ring-1 focus:ring-inset focus:ring-[color:var(--rh-theme-border-focus)]"
    : !disabled && error
      ? "focus:border-[color:var(--rh-theme-border-error)] focus:ring-1 focus:ring-inset focus:ring-[color:var(--rh-theme-border-error)]"
      : undefined

  return (
    <div className="relative w-full">
      {startText && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-[var(--rh-sizing-common-input-padding-px-md)] top-1/2 -translate-y-1/2 font-mono text-[var(--rh-theme-text-neutral-secondary)]",
            size === "md" ? "text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)]" : "text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)]",
          )}
        >
          {startText}
        </span>
      )}
      <input
        aria-invalid={error || undefined}
        className={cn(
          "box-border block w-full appearance-none rounded-[var(--rh-sizing-common-input-shape-border-radius)] border bg-[var(--rh-theme-surface-bg)] font-mono font-normal text-[color:var(--rh-theme-text-neutral-primary)] outline-none transition-colors duration-150 placeholder:font-sans placeholder:text-[color:var(--rh-theme-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:border-[color:var(--rh-theme-border-light)] disabled:text-[color:var(--rh-theme-text-neutral-disabled)]",
          sizeClasses[size],
          stateClasses({ error, state }),
          interactiveClasses,
          startText && "pl-[calc(var(--rh-sizing-common-input-padding-px-md)+var(--rh-sizing-base-module-2-5)+var(--rh-sizing-common-input-padding-gap-md))]",
          (endText || required || showClearButton) && "pr-[var(--rh-sizing-base-module-4)]",
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
            size === "md" ? "size-[var(--rh-sizing-base-module-3)]" : "size-[var(--rh-sizing-base-module-2-5)]",
            endText || required ? "right-[var(--rh-sizing-base-module-4)]" : "right-[var(--rh-sizing-base-module-1)]",
          )}
        >
          <ClearButton
            aria-label="Очистить поле"
            className={cn(
              "focus-visible:ring-2 focus-visible:ring-[var(--rh-theme-border-focus)]",
              size === "md" ? "m-[calc(var(--rh-sizing-base-module-1-5)*-1)]" : "m-[calc(var(--rh-sizing-base-module-1)*-1)]",
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
            "pointer-events-none absolute right-[var(--rh-sizing-common-input-padding-px-md)] top-1/2 -translate-y-1/2 text-[var(--rh-theme-text-neutral-primary)]",
            size === "md" ? "text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)]" : "text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)]",
          )}
        >
          {endText}
        </span>
      )}
      {required && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-[var(--rh-theme-text-error)]",
            endText ? "right-[var(--rh-sizing-base-module-4)]" : "right-[var(--rh-sizing-common-input-padding-px-md)]",
            size === "md" ? "text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)]" : "text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)]",
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
