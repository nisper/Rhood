import * as React from "react"

import { IconButton } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

type TextFieldSize = "md" | "sm"
type TextFieldState = "default" | "hovered" | "focused"

type TextFieldProps = Omit<React.ComponentProps<"input">, "size"> & {
  /** Visual state for component previews. Native hover and focus work by default. */
  clearButton?: boolean
  state?: TextFieldState
  size?: TextFieldSize
  error?: boolean
  onClear?: () => void
}

const sizeClasses: Record<TextFieldSize, string> = {
  md: "h-10 px-3 text-base leading-6 tracking-[0.15px]",
  sm: "h-9 px-3 text-sm leading-5 tracking-[0.15px]",
}

function stateClasses({ error, state }: { error: boolean; state: TextFieldState }) {
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
function TextField({
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
  state = "default",
  type = "text",
  value,
  ...props
}: TextFieldProps) {
  const isControlled = value !== undefined
  const [isFocused, setIsFocused] = React.useState(false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? "")
  const isFocusedPreview = state === "focused"
  const currentValue = isControlled ? value : uncontrolledValue
  const hasValue = `${currentValue ?? ""}`.length > 0
  const showClearButton = clearButton && hasValue && !disabled && (isFocused || isFocusedPreview)
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

  if (!required && !clearButton) return input

  return (
    <span className="relative block w-full">
      {input}
      {showClearButton && (
        <span
          className={cn(
            "absolute top-1/2 flex -translate-y-1/2 items-center justify-center",
            size === "md" ? "size-6" : "size-5",
            required ? "right-8" : "right-2",
          )}
        >
          <IconButton
            aria-label="Очистить поле"
            appearance="inherit"
            className={cn(
              "focus-visible:ring-2 focus-visible:ring-[var(--parser-border-focus)]",
              size === "md" ? "m-[-12px]" : "m-[-8px]",
            )}
            icon={<img alt="" className={size === "md" ? "size-5" : "size-4"} src="/Rhood/assets/circle-x.svg" />}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              if (!isControlled) setUncontrolledValue("")
              onClear?.()
            }}
            size={size === "md" ? "sm" : "xsm"}
            type="button"
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

export { TextField }
export type { TextFieldProps, TextFieldSize, TextFieldState }
