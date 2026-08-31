import * as React from "react"
import { X } from "lucide-react"

import { FormHelperText } from "@/components/ui/form-helper-text"
import { cn } from "@/lib/utils"

type DateInputSize = "md" | "sm"
type DateInputState = "default" | "hovered" | "focused"
type DateInputTopLabel = "dynamic" | "static"

type DateInputProps = Omit<React.ComponentProps<"input">, "size" | "type"> & {
  empty?: boolean
  error?: boolean
  helperText?: React.ReactNode
  label?: React.ReactNode
  showTopLabel?: boolean
  size?: DateInputSize
  startText?: React.ReactNode | boolean
  state?: DateInputState
  topLabel?: DateInputTopLabel
}

const sizeClasses: Record<
  DateInputSize,
  {
    container: string
    input: string
    label: string
    start: string
    closeWrap: string
    closeIcon: string
    helper: string
  }
> = {
  md: {
    container: "min-h-10 px-3 py-2",
    input: "text-base leading-6 tracking-[0.15px]",
    label: "text-xs leading-3 tracking-[0.15px]",
    start: "text-base leading-6 tracking-[0.15px]",
    closeWrap: "size-5",
    closeIcon: "size-5",
    helper: "text-xs leading-[1.66]",
  },
  sm: {
    container: "min-h-9 px-3 py-2",
    input: "text-sm leading-5 tracking-[0.15px]",
    label: "text-xs leading-3 tracking-[0.15px]",
    start: "text-sm leading-5 tracking-[0.15px]",
    closeWrap: "size-4",
    closeIcon: "size-4",
    helper: "text-xs leading-[1.66]",
  },
}

function getBorderClasses({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: DateInputState
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

function getToneClasses({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: DateInputState
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

function normalizeAdornment(adornment: React.ReactNode | boolean | undefined, fallback: string) {
  if (adornment === false) {
    return null
  }

  if (adornment === true || adornment === undefined) {
    return fallback
  }

  return adornment
}

/**
 * Parser date input matching the Figma `DateInput` component set.
 */
function DateInput({
  className,
  disabled = false,
  empty = true,
  error = false,
  helperText,
  id,
  label = "Дата",
  placeholder = "Placeholder",
  showTopLabel = true,
  size = "md",
  startText = "с",
  state = "default",
  topLabel = "dynamic",
  defaultValue,
  value,
  ...props
}: DateInputProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const resolvedState: DateInputState = disabled ? "default" : state
  const hasValue =
    typeof value === "string"
      ? value.length > 0
      : typeof value === "number"
        ? true
        : typeof defaultValue === "string"
          ? defaultValue.length > 0
          : typeof defaultValue === "number"
            ? true
            : !empty
  const isFloating = topLabel === "dynamic" && (hasValue || resolvedState === "focused")
  const resolvedStartText = normalizeAdornment(startText, "с")

  return (
    <div className={cn("w-full", className)}>
      {topLabel === "static" && (
        <label
          className={cn(
            "mb-1 block whitespace-nowrap font-normal",
            sizeClasses[size].label,
            getToneClasses({ disabled, error, state: resolvedState }),
          )}
          htmlFor={inputId}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "relative flex w-full items-center rounded-lg border bg-white transition-colors duration-150",
          sizeClasses[size].container,
          getBorderClasses({ disabled, error, state: resolvedState }),
        )}
      >
        {topLabel === "dynamic" && showTopLabel && (
          <label
            className={cn(
              "pointer-events-none absolute left-2 z-10 inline-flex whitespace-nowrap rounded-[2px] bg-white px-1 font-normal transition-all duration-150",
              sizeClasses[size].label,
              getToneClasses({ disabled, error, state: resolvedState }),
              isFloating ? "-top-2" : "top-1.5",
            )}
            htmlFor={inputId}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {label}
          </label>
        )}

        {resolvedStartText && (
          <span
            className={cn(
              "flex shrink-0 items-center pr-2 font-normal text-[color:var(--parser-text-neutral-secondary)]",
              sizeClasses[size].start,
              disabled && "text-[color:var(--parser-text-disabled)]",
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {resolvedStartText}
          </span>
        )}

        <input
          aria-invalid={error || undefined}
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent p-0 font-normal text-[color:var(--parser-text-neutral-primary)] outline-none placeholder:text-[color:var(--parser-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:text-[color:var(--parser-text-disabled)]",
            sizeClasses[size].input,
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          id={inputId}
          placeholder={placeholder as string}
          readOnly
          style={{ fontVariationSettings: "'wdth' 100" }}
          type="text"
          value={value}
          {...props}
        />

        {hasValue && (
          <button
            aria-label="Clear date"
            className="inline-flex shrink-0 items-center justify-center p-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)] disabled:pointer-events-none"
            disabled={disabled}
            type="button"
          >
            <X className={cn("shrink-0", sizeClasses[size].closeIcon)} strokeWidth={2} />
          </button>
        )}
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

export { DateInput }
export type { DateInputProps, DateInputSize, DateInputState, DateInputTopLabel }
