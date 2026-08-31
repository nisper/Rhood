import * as React from "react"
import { Star } from "lucide-react"

import { FormHelperText } from "@/components/ui/form-helper-text"
import { cn } from "@/lib/utils"

type RangeInputSize = "lg" | "md" | "sm"
type RangeInputState = "default" | "hovered" | "focused"
type RangeInputTopLabel = "dynamic" | "static"

type RangeInputProps = Omit<React.ComponentProps<"input">, "size"> & {
  empty?: boolean
  error?: boolean
  helperText?: React.ReactNode
  label?: React.ReactNode
  endText?: React.ReactNode | boolean
  required?: boolean
  size?: RangeInputSize
  startIcon?: React.ReactNode | boolean
  state?: RangeInputState
  topLabel?: RangeInputTopLabel
  value?: React.ReactNode
  placeholder?: React.ReactNode
}

const sizeClasses: Record<
  RangeInputSize,
  {
    container: string
    label: string
    value: string
    rootHeight: string
    sidePadding: string
    iconGap: string
    separator: string
  }
> = {
  lg: {
    container: "min-h-14 px-4 py-4",
    label: "text-base leading-6 tracking-normal",
    value: "text-base leading-6 tracking-normal",
    rootHeight: "h-14",
    sidePadding: "px-4 py-4",
    iconGap: "pr-2",
    separator: "text-base leading-6 tracking-normal",
  },
  md: {
    container: "min-h-10 px-4 py-2",
    label: "text-base leading-6 tracking-[0.15px]",
    value: "text-base leading-6 tracking-[0.15px]",
    rootHeight: "h-10",
    sidePadding: "px-4 py-2",
    iconGap: "pr-2",
    separator: "text-base leading-6 tracking-[0.15px]",
  },
  sm: {
    container: "min-h-9 px-3 py-2",
    label: "text-sm leading-5 tracking-[0.15px]",
    value: "text-sm leading-5 tracking-[0.15px]",
    rootHeight: "h-9",
    sidePadding: "px-3 py-2",
    iconGap: "pr-2",
    separator: "text-sm leading-5 tracking-[0.15px]",
  },
}

function getBorderClasses({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: RangeInputState
}) {
  if (disabled) {
    return "border-[color:var(--parser-border-disabled)]"
  }

  if (error) {
    return state === "focused"
      ? "border-[color:var(--parser-fill-error)] ring-1 ring-[color:var(--parser-fill-error)]"
      : "border-[color:var(--parser-fill-error)]"
  }

  if (state === "focused") {
    return "border-[color:var(--parser-fill-brand)] ring-1 ring-[color:var(--parser-fill-brand)]"
  }

  if (state === "hovered") {
    return "border-[color:var(--parser-border-neutral-dark)]"
  }

  return "border-[color:var(--parser-border-neutral)]"
}

function getLabelClasses({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: RangeInputState
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

function renderIcon(icon: React.ReactNode | boolean | undefined) {
  if (icon === false) {
    return null
  }

  if (icon === true || icon === undefined) {
    return <Star className="size-5 shrink-0" strokeWidth={2} />
  }

  return icon
}

function normalizeText(value: React.ReactNode | undefined, fallback: string) {
  if (value === false) {
    return null
  }

  if (value === true || value === undefined) {
    return fallback
  }

  return value
}

/**
 * Parser range input matching the Figma `RangeInput` component set.
 */
function RangeInput({
  className,
  disabled = false,
  empty = false,
  endText = "₽",
  error = false,
  helperText,
  label = "Label",
  placeholder = "Placeholder",
  required = true,
  size = "lg",
  startIcon = true,
  state = "default",
  topLabel = "dynamic",
  defaultValue,
  value,
  ...props
}: RangeInputProps) {
  const autoId = React.useId()
  const inputId = props.id ?? autoId
  const resolvedState: RangeInputState = disabled ? "default" : state
  const hasValue =
    value !== undefined
      ? Boolean(value)
      : defaultValue !== undefined
        ? Boolean(defaultValue)
        : !empty
  const startText = hasValue ? "Value" : placeholder
  const endValue = hasValue ? "Value" : placeholder
  const resolvedEndText = normalizeText(endText, "₽")
  const isFloating = topLabel === "dynamic" && (hasValue || resolvedState === "focused")

  return (
    <div className={cn("w-full", className)}>
      {topLabel === "static" && (
        <label
          className={cn(
            "mb-1 block whitespace-nowrap font-normal",
            sizeClasses[size].label,
            getLabelClasses({ disabled, error, state: resolvedState }),
          )}
          htmlFor={inputId}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {label}
          {required && (
            <span
              aria-hidden="true"
              className="pl-0.5 text-[color:var(--parser-text-error)]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              *
            </span>
          )}
        </label>
      )}

      <div
        className={cn(
          "relative flex w-full items-center rounded-lg border bg-white transition-colors duration-150",
          sizeClasses[size].container,
          getBorderClasses({ disabled, error, state: resolvedState }),
        )}
      >
        {topLabel === "dynamic" && (
          <label
            className={cn(
              "pointer-events-none absolute left-2 z-10 inline-flex whitespace-nowrap rounded-[2px] bg-white px-1 font-normal transition-all duration-150",
              sizeClasses[size].label,
              getLabelClasses({ disabled, error, state: resolvedState }),
              isFloating ? "-top-2" : "top-1.5",
            )}
            htmlFor={inputId}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {label}
            {required && (
              <span
                aria-hidden="true"
                className="pl-0.5 text-[color:var(--parser-text-error)]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                *
              </span>
            )}
          </label>
        )}

        <div
          className={cn(
            "flex flex-1 min-w-0 items-center",
            sizeClasses[size].sidePadding,
            startIcon && sizeClasses[size].iconGap,
          )}
        >
          {startIcon && (
            <span className="flex shrink-0 items-center pr-2">
              <span className="relative size-6 shrink-0 overflow-clip">
                {renderIcon(startIcon)}
              </span>
            </span>
          )}

          <input
            aria-invalid={error || undefined}
            className={cn(
              "min-w-0 flex-1 border-0 bg-transparent p-0 font-normal text-[color:var(--parser-text-neutral-primary)] outline-none placeholder:text-[color:var(--parser-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:text-[color:var(--parser-text-disabled)]",
              sizeClasses[size].value,
              topLabel === "dynamic" && "pt-2",
            )}
            disabled={disabled}
            id={inputId}
            placeholder={String(startText)}
            readOnly
            style={{ fontVariationSettings: "'wdth' 100" }}
            defaultValue={hasValue ? String(value ?? defaultValue ?? "Value") : undefined}
            {...props}
          />
        </div>

        <div
          className={cn(
            "flex shrink-0 items-center justify-center px-2 text-[color:var(--parser-text-neutral-secondary)]",
            sizeClasses[size].separator,
            disabled && "text-[color:var(--parser-text-disabled)]",
          )}
          aria-hidden="true"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          –
        </div>

        <div className={cn("flex flex-1 min-w-0 items-center", sizeClasses[size].sidePadding)}>
          <input
            aria-invalid={error || undefined}
            className={cn(
              "min-w-0 flex-1 border-0 bg-transparent p-0 font-normal text-[color:var(--parser-text-neutral-primary)] outline-none placeholder:text-[color:var(--parser-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:text-[color:var(--parser-text-disabled)]",
              sizeClasses[size].value,
            )}
            disabled={disabled}
            id={`${inputId}-end`}
            placeholder={String(endValue)}
            readOnly
            style={{ fontVariationSettings: "'wdth' 100" }}
            defaultValue={hasValue ? String(value ?? defaultValue ?? "Value") : undefined}
            {...props}
          />
        </div>

        {resolvedEndText && (
          <div
            className={cn(
              "shrink-0 pr-3 text-[color:var(--parser-text-neutral-primary)]",
              sizeClasses[size].value,
              disabled && "text-[color:var(--parser-text-disabled)]",
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {resolvedEndText}
          </div>
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

export { RangeInput }
export type { RangeInputProps, RangeInputSize, RangeInputState, RangeInputTopLabel }
