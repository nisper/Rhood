import * as React from "react"
import { ChevronDown, ChevronUp, Star } from "lucide-react"

import { FormHelperText } from "@/components/ui/form-helper-text"
import { cn } from "@/lib/utils"

type SelectGhostSize = "md" | "sm"
type SelectGhostState = "default" | "hovered" | "focused"

type SelectGhostProps = React.ComponentProps<"div"> & {
  disabled?: boolean
  error?: boolean
  expanded?: boolean
  helperText?: React.ReactNode
  label?: React.ReactNode
  size?: SelectGhostSize
  startIcon?: boolean
  state?: SelectGhostState
  topLabel?: boolean
  value?: React.ReactNode
}

const sizeTokens: Record<
  SelectGhostSize,
  {
    container: string
    text: string
    helper: string
    label: string
    iconWidth: string
    valueLeading: string
    innerPadding: string
  }
> = {
  md: {
    container: "min-h-10 px-3 py-2",
    text: "text-base leading-6 tracking-[0.15px]",
    helper: "text-xs leading-[1.66] tracking-[0.15px]",
    label: "text-xs leading-3 tracking-[0.15px]",
    iconWidth: "w-5",
    valueLeading: "leading-6",
    innerPadding: "gap-2",
  },
  sm: {
    container: "min-h-9 px-3 py-2",
    text: "text-sm leading-5 tracking-[0.15px]",
    helper: "text-xs leading-[1.66] tracking-[0.15px]",
    label: "text-xs leading-3 tracking-[0.15px]",
    iconWidth: "w-4",
    valueLeading: "leading-5",
    innerPadding: "gap-2",
  },
}

function getBorderClasses({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: SelectGhostState
}) {
  if (disabled) {
    return "border-[color:var(--parser-border-disabled)]"
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

  return "border-[color:var(--parser-border-neutral)]"
}

function getTone({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: SelectGhostState
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

  return "text-[color:var(--parser-text-neutral-primary)]"
}

/**
 * Parser ghost select matching the Figma `SelectGhost` component.
 */
function SelectGhost({
  className,
  disabled = false,
  error = false,
  expanded = false,
  helperText,
  label = "Label",
  size = "md",
  startIcon = false,
  state = "default",
  topLabel = true,
  value = "Value",
  ...props
}: SelectGhostProps) {
  const resolvedState: SelectGhostState = disabled ? "default" : state
  const isFloating = topLabel && (resolvedState === "focused" || expanded)
  const showHelper =
    !!helperText &&
    !expanded &&
    (resolvedState === "default" || resolvedState === "hovered" || resolvedState === "focused")
  const labelTone = getTone({ disabled, error, state: resolvedState })

  return (
    <div className={cn("flex w-[298px] flex-col items-start relative", className)} {...props}>
      <div
        className={cn(
          "relative flex w-full items-center overflow-clip rounded-lg bg-white",
          sizeTokens[size].container,
          sizeTokens[size].innerPadding,
          getBorderClasses({ disabled, error, state: resolvedState }),
          state === "hovered" &&
            !disabled &&
            !error &&
            "bg-[var(--parser-fill-neutral-hover)]",
          state === "focused" &&
            !disabled &&
            !error &&
            "bg-white",
        )}
      >
        {startIcon && (
          <span
            className={cn(
              "flex shrink-0 items-center justify-end pr-2",
              size === "sm" ? "w-4" : "w-5",
              disabled && "opacity-60",
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center",
                disabled ? "text-[var(--parser-text-disabled)]" : labelTone,
              )}
            >
              <Star aria-hidden="true" className="size-4" strokeWidth={2} />
            </span>
          </span>
        )}

        <div className="flex min-w-px flex-1 items-center">
          <div
            className={cn(
              "min-w-px overflow-hidden whitespace-nowrap font-normal",
              sizeTokens[size].text,
              sizeTokens[size].valueLeading,
              disabled ? "text-[color:var(--parser-text-disabled)]" : labelTone,
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="overflow-hidden text-ellipsis">
              {value}
            </p>
          </div>
        </div>

        <span
          className={cn(
            "flex shrink-0 items-center justify-center",
            size === "sm" ? "w-4" : "w-5",
            disabled ? "text-[var(--parser-text-disabled)]" : labelTone,
          )}
        >
          {!expanded && (
            <span className="flex shrink-0 items-center justify-center">
              <ChevronDown aria-hidden="true" className="size-4" strokeWidth={2} />
            </span>
          )}

          {!disabled && state === "focused" && expanded && (
            <span className="flex shrink-0 items-center justify-center">
              <ChevronUp aria-hidden="true" className="size-4" strokeWidth={2} />
            </span>
          )}
        </span>

        {topLabel && (
          <div
            className={cn(
              "absolute top-0 h-[2px] bg-white px-1",
              isFloating ? "left-2" : "left-[10px]",
            )}
          >
            <p
              className={cn("whitespace-nowrap font-normal", sizeTokens[size].label, labelTone)}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {label}
            </p>
          </div>
        )}
      </div>

      {showHelper && (
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

export { SelectGhost }
export type { SelectGhostProps, SelectGhostSize, SelectGhostState }
