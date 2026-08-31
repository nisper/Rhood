import * as React from "react"

import { FormHelperText } from "@/components/ui/form-helper-text"
import { cn } from "@/lib/utils"

type TextFieldSize = "lg" | "md" | "sm"
type TextFieldState = "default" | "hovered" | "focused"
type TextFieldTopLabel = "dynamic" | "static"

type TextFieldProps = Omit<React.ComponentProps<"input">, "size"> & {
  helperText?: React.ReactNode
  label?: React.ReactNode
  state?: TextFieldState
  size?: TextFieldSize
  topLabel?: TextFieldTopLabel
  empty?: boolean
  error?: boolean
}

const sizeClasses: Record<
  TextFieldSize,
  {
    container: string
    input: string
    staticLabel: string
  }
> = {
  lg: {
    container: "min-h-12 px-4 py-2.5",
    input: "h-6 text-base leading-6 tracking-[0.15px]",
    staticLabel: "text-xs leading-4 tracking-[0.15px]",
  },
  md: {
    container: "min-h-10 px-3 py-2",
    input: "h-6 text-base leading-6 tracking-[0.15px]",
    staticLabel: "text-xs leading-4 tracking-[0.15px]",
  },
  sm: {
    container: "min-h-9 px-3 py-1.5",
    input: "h-5 text-sm leading-5 tracking-[0.15px]",
    staticLabel: "text-xs leading-4 tracking-[0.15px]",
  },
}

function getBorderClasses({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: TextFieldState
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
  state: TextFieldState
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

/**
 * Parser text field matching the Figma `textfield` component set.
 */
function TextField({
  className,
  disabled = false,
  empty = true,
  error = false,
  helperText,
  id,
  label = "Label",
  placeholder = "Placeholder",
  size = "md",
  state = "default",
  topLabel = "dynamic",
  type = "text",
  value,
  defaultValue,
  ...props
}: TextFieldProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const resolvedState: TextFieldState = disabled ? "default" : state
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

  return (
    <div className={cn("w-full", className)}>
      {topLabel === "static" && (
        <label
          className={cn(
            "mb-1 block whitespace-nowrap font-normal",
            sizeClasses[size].staticLabel,
            getLabelClasses({ disabled, error, state: resolvedState }),
          )}
          htmlFor={inputId}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "relative flex w-full items-start rounded-lg border bg-white transition-colors duration-150",
          sizeClasses[size].container,
          getBorderClasses({ disabled, error, state: resolvedState }),
        )}
      >
        {topLabel === "dynamic" && (
          <label
            className={cn(
              "pointer-events-none absolute left-3 z-10 inline-flex whitespace-nowrap rounded-[2px] bg-white px-1 font-normal transition-all duration-150",
              sizeClasses[size].staticLabel,
              getLabelClasses({ disabled, error, state: resolvedState }),
              isFloating ? "-top-2" : "top-1.5",
            )}
            htmlFor={inputId}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {label}
          </label>
        )}

        <input
          aria-invalid={error || undefined}
          className={cn(
            "peer min-w-0 flex-1 border-0 bg-transparent p-0 font-normal text-[color:var(--parser-text-neutral-primary)] outline-none placeholder:text-[color:var(--parser-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:text-[color:var(--parser-text-disabled)]",
            sizeClasses[size].input,
            topLabel === "dynamic" && "pt-2",
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          id={inputId}
          placeholder={placeholder}
          style={{ fontVariationSettings: "'wdth' 100" }}
          type={type}
          value={value}
          {...props}
        />
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

export { TextField }
export type { TextFieldProps, TextFieldSize, TextFieldState, TextFieldTopLabel }
