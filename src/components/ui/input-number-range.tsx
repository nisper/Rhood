import * as React from "react"

import { InputNumber, type InputNumberProps, type InputNumberSize, type InputNumberState } from "@/components/ui/input-number"
import { cn } from "@/lib/utils"

type RangeInputProps = Omit<InputNumberProps, "className" | "disabled" | "error" | "size" | "state">

type InputNumberRangeProps = Omit<React.ComponentProps<"div">, "onChange"> & {
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
}

const sizeClasses: Record<InputNumberSize, string> = {
  md: "h-[calc(var(--spacing)*10)]",
  sm: "h-[calc(var(--spacing)*9)]",
}

function groupStateClasses({ error, state }: { error: boolean; state: InputNumberState }) {
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

/** Two numeric values in one shared field outline, for example a minimum and maximum area. */
function InputNumberRange({
  className,
  disabled = false,
  endInputProps,
  error = false,
  separator = "–",
  size = "md",
  startInputProps,
  state,
  ...props
}: InputNumberRangeProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const resolvedState = state ?? (isFocused ? "focused" : isHovered ? "hovered" : "default")

  const startProps = startInputProps ?? {}
  const endProps = endInputProps ?? {}

  return (
    <div
      {...props}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex w-full items-stretch overflow-hidden rounded-lg border bg-white transition-colors duration-150",
        sizeClasses[size],
        groupStateClasses({ error, state: resolvedState }),
        disabled && "cursor-not-allowed bg-white text-[color:var(--parser-text-disabled)]",
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
        error={false}
        size={size}
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
        error={false}
        size={size}
        state="default"
      />
    </div>
  )
}

export { InputNumberRange }
export type { InputNumberRangeProps }
