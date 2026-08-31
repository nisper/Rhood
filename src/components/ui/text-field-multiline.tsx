import * as React from "react"
import { Search, X } from "lucide-react"

import { FormHelperText } from "@/components/ui/form-helper-text"
import { cn } from "@/lib/utils"

type TextFieldMultilineSize = "md" | "sm"
type TextFieldMultilineState = "default" | "hovered" | "focused"
type TextFieldMultilineTopLabel = "dynamic" | "static"
type TextFieldMultilineMinLines = "1" | "2"

type TextFieldMultilineProps = Omit<React.ComponentProps<"textarea">, "size"> & {
  clearButton?: boolean
  disabled?: boolean
  empty?: boolean
  endText?: React.ReactNode | boolean
  error?: boolean
  helperText?: React.ReactNode
  label?: React.ReactNode
  minLines?: TextFieldMultilineMinLines
  placeholder?: string
  required?: boolean
  showTopLabel?: boolean
  size?: TextFieldMultilineSize
  startIcon?: boolean
  startText?: React.ReactNode | boolean
  state?: TextFieldMultilineState
  topLabel?: TextFieldMultilineTopLabel
  onClearClick?: React.MouseEventHandler<HTMLButtonElement>
}

const sizeClasses: Record<
  TextFieldMultilineSize,
  {
    clearIcon: string
    clearWrap: string
    container: string
    iconSize: string
    iconWrap: string
    input: string
    label: string
    lineHeight: string
    minLines1: string
    minLines2: string
    startText: string
  }
> = {
  md: {
    clearIcon: "size-5",
    clearWrap: "size-6",
    container: "px-3 py-2",
    iconSize: "size-6",
    iconWrap: "size-6",
    input: "text-base leading-6 tracking-[0.15px]",
    label: "text-xs leading-3 tracking-[0.15px]",
    lineHeight: "leading-6",
    minLines1: "min-h-10",
    minLines2: "min-h-20",
    startText: "text-base leading-6 tracking-[0.15px]",
  },
  sm: {
    clearIcon: "size-4",
    clearWrap: "size-5",
    container: "px-3 py-2",
    iconSize: "size-5",
    iconWrap: "size-5",
    input: "text-sm leading-5 tracking-[0.15px]",
    label: "text-xs leading-3 tracking-[0.15px]",
    lineHeight: "leading-5",
    minLines1: "min-h-9",
    minLines2: "min-h-16",
    startText: "text-sm leading-5 tracking-[0.15px]",
  },
}

function getBorderClasses({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: TextFieldMultilineState
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
  state: TextFieldMultilineState
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
 * Parser multiline text field matching the Figma `textfield multiline` component set.
 */
function TextFieldMultiline({
  className,
  clearButton = false,
  disabled = false,
  empty = true,
  endText = "₽",
  error = false,
  helperText,
  label = "Label",
  minLines = "1",
  onClearClick,
  placeholder = "Placeholder",
  required = true,
  showTopLabel = true,
  size = "md",
  startIcon = true,
  startText = "с",
  state = "default",
  topLabel = "dynamic",
  defaultValue,
  value,
  ...props
}: TextFieldMultilineProps) {
  const autoId = React.useId()
  const inputId = props.id ?? autoId
  const resolvedState: TextFieldMultilineState = disabled ? "default" : state
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
  const resolvedEndText = normalizeAdornment(endText, "₽")
  const rows = minLines === "2" ? 2 : 1

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
          "relative flex w-full items-start rounded-lg border bg-white transition-colors duration-150",
          sizeClasses[size].container,
          minLines === "2" ? sizeClasses[size].minLines2 : sizeClasses[size].minLines1,
          getBorderClasses({ disabled, error, state: resolvedState }),
          resolvedState === "hovered" && !disabled && !error && "bg-[var(--input-hover,white)]",
          resolvedState === "focused" && !disabled && "bg-[var(--input-focus,white)]",
        )}
      >
        {topLabel === "dynamic" && showTopLabel && (
          <label
            className={cn(
              "pointer-events-none absolute left-2.5 z-10 inline-flex whitespace-nowrap rounded-[2px] bg-white px-1 font-normal transition-all duration-150",
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

        {startIcon && (
          <span className={cn("flex shrink-0 items-center justify-start pr-2", sizeClasses[size].iconWrap)}>
            <Search className={cn("shrink-0", sizeClasses[size].iconSize)} strokeWidth={2} />
          </span>
        )}

        {resolvedStartText && (
          <span
            className={cn(
              "flex shrink-0 items-center pr-2 font-normal text-[color:var(--parser-text-neutral-secondary)]",
              sizeClasses[size].startText,
              disabled && "text-[color:var(--parser-text-disabled)]",
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {resolvedStartText}
          </span>
        )}

        <textarea
          aria-invalid={error || undefined}
          className={cn(
            "min-w-0 flex-1 resize-none border-0 bg-transparent p-0 font-normal text-[color:var(--parser-text-neutral-primary)] outline-none placeholder:text-[color:var(--parser-text-neutral-secondary)] placeholder:opacity-100 disabled:cursor-not-allowed disabled:text-[color:var(--parser-text-disabled)]",
            sizeClasses[size].input,
            sizeClasses[size].lineHeight,
            topLabel === "dynamic" && "pt-2",
          )}
          defaultValue={defaultValue}
          disabled={disabled}
          id={inputId}
          placeholder={placeholder}
          rows={rows}
          style={{ fontVariationSettings: "'wdth' 100" }}
          value={value}
          {...props}
        />

        {resolvedState === "focused" && (
          <span
            aria-hidden="true"
            className={cn(
              "ml-0.5 w-px shrink-0",
              size === "sm" ? "h-5" : "h-6",
              disabled
                ? "bg-[color:var(--parser-text-disabled)]"
                : error
                  ? "bg-[color:var(--parser-text-error)]"
              : "bg-[color:var(--parser-text-neutral-primary)]",
            )}
          />
        )}

        {clearButton && (
          <button
            aria-label="Clear text"
            className={cn(
              "ml-1 inline-flex shrink-0 items-center justify-center rounded-full p-[5px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]",
              disabled && "pointer-events-none opacity-50",
            )}
            disabled={disabled}
            onClick={onClearClick}
            type="button"
          >
            <X className={cn("shrink-0", sizeClasses[size].clearIcon)} strokeWidth={2} />
          </button>
        )}

        {resolvedEndText && (
          <span
            className={cn(
              "flex shrink-0 items-center pl-2 font-normal text-[color:var(--parser-text-neutral-primary)]",
              size === "sm" ? "text-sm leading-5" : "text-base leading-6",
              disabled && "text-[color:var(--parser-text-disabled)]",
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {resolvedEndText}
          </span>
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

export { TextFieldMultiline }
export type {
  TextFieldMultilineMinLines,
  TextFieldMultilineProps,
  TextFieldMultilineSize,
  TextFieldMultilineState,
  TextFieldMultilineTopLabel,
}
