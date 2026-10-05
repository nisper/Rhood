import * as React from "react"

import { InputNumber, type InputNumberProps, type InputNumberSize, type InputNumberState } from "@/components/ui/input-number"
import { cn } from "@/lib/utils"

type InputNumberRangeAppearance = "default" | "neutral"
type RangeInputProps = Omit<InputNumberProps, "appearance" | "className" | "disabled" | "endText" | "error" | "size" | "startText" | "state">

type InputNumberRangeProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  /** Controls the shared field background. */
  appearance?: InputNumberRangeAppearance
  /** Makes both values unavailable. */
  disabled?: boolean
  /** Shows the error treatment on the shared field outline. */
  error?: boolean
  /** Props for the first numeric input. Group styling always takes precedence. */
  startInputProps?: RangeInputProps
  /** Props for the second numeric input. Group styling always takes precedence. */
  endInputProps?: RangeInputProps
  /** Visual state for component previews; native hover and focus work by default. */
  state?: InputNumberState
  /** The separator between values. */
  separator?: React.ReactNode
  size?: InputNumberSize
  /** Optional unit displayed in a dedicated section after the second field. */
  unit?: React.ReactNode
}

const sizeClasses: Record<InputNumberSize, string> = {
  md: "h-[calc(var(--spacing)*10)]",
  sm: "h-[calc(var(--spacing)*9)]",
}

function groupStateClasses({ appearance, disabled, error, state }: { appearance: InputNumberRangeAppearance; disabled: boolean; error: boolean; state: InputNumberState }) {
  if (error) {
    return state === "focused"
      ? "border-[color:var(--rh-theme-border-error)] ring-1 ring-inset ring-[color:var(--rh-theme-border-error)]"
      : "border-[color:var(--rh-theme-border-error)]"
  }

  if (state === "focused") {
    return "border-[color:var(--rh-theme-border-focus)] bg-[var(--rh-theme-surface-bg)] ring-1 ring-inset ring-[color:var(--rh-theme-border-focus)]"
  }

  if (state === "hovered") return "border-[color:var(--rh-theme-border-hover)] bg-[var(--rh-theme-surface-bg)]"
  if (appearance === "neutral" && !disabled) return "border-transparent"
  return "border-[color:var(--rh-theme-border-light)]"
}

/** Two numeric values in one shared field outline, for example a minimum and maximum area. */
function InputNumberRange({
  appearance = "default",
  className,
  disabled = false,
  endInputProps,
  error = false,
  separator = "–",
  size = "md",
  startInputProps,
  state,
  unit,
  ...props
}: InputNumberRangeProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const resolvedState = state ?? (isFocused ? "focused" : isHovered ? "hovered" : "default")

  const startProps = startInputProps ?? {}
  const endProps = endInputProps ?? {}
  const required = Boolean(startProps.required || endProps.required)

  return (
    <div
      {...props}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex w-full items-stretch overflow-hidden rounded-lg border transition-colors duration-150",
        appearance === "neutral" ? "bg-[var(--rh-theme-fill-input-neutral)]" : "bg-[var(--rh-theme-surface-bg)]",
        sizeClasses[size],
        groupStateClasses({ appearance, disabled, error, state: resolvedState }),
        disabled && "cursor-not-allowed bg-[var(--rh-theme-surface-bg)] text-[color:var(--rh-theme-text-neutral-disabled)]",
        className,
      )}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false)
        props.onBlurCapture?.(event)
      }}
      onFocusCapture={(event) => {
        setIsFocused(true)
        props.onFocusCapture?.(event)
      }}
      onMouseEnter={(event) => {
        if (!disabled) setIsHovered(true)
        props.onMouseEnter?.(event)
      }}
      onMouseLeave={(event) => {
        setIsHovered(false)
        props.onMouseLeave?.(event)
      }}
      role="group"
    >
      <InputNumber
        {...startProps}
        aria-label={startProps["aria-label"] ?? "Начальное значение"}
        bare
        disabled={disabled}
        endText={undefined}
        error={false}
        size={size}
        required={required}
        showRequiredIndicator={false}
        startText={undefined}
        state="default"
      />
      <span aria-hidden="true" className="shrink-0 self-center text-base leading-6 text-[color:var(--parser-text-neutral-secondary)]">
        {separator}
      </span>
      <InputNumber
        {...endProps}
        aria-label={endProps["aria-label"] ?? "Конечное значение"}
        bare
        disabled={disabled}
        endText={undefined}
        error={false}
        size={size}
        required={required}
        showRequiredIndicator={false}
        startText={undefined}
        state="default"
      />
      {(unit || required) && (
        <span
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center pr-[var(--rh-sizing-common-input-padding-px-md)] text-[color:var(--rh-theme-text-neutral-primary)]",
            size === "md"
              ? "text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)]"
              : "pr-[var(--rh-sizing-common-input-padding-px-sm)] text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)]",
          )}
        >
          {unit}
          {required && <span className={cn(unit && "ml-1", "text-[var(--rh-theme-text-error)]")}>*</span>}
        </span>
      )}
    </div>
  )
}

export { InputNumberRange }
export type { InputNumberRangeAppearance, InputNumberRangeProps }
