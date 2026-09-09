import * as React from "react"
import { ChevronDown, Star } from "lucide-react"

import { Chip } from "@/components/ui/chip"
import { FormHelperText } from "@/components/ui/form-helper-text"
import { cn } from "@/lib/utils"

type SelectSize = "md" | "sm"
type SelectContent = "text" | "chips"
type SelectState = "default" | "hovered" | "focused"

type SelectProps = Omit<React.ComponentProps<"div">, "content"> & {
  content?: SelectContent
  disabled?: boolean
  empty?: boolean
  error?: boolean
  expanded?: boolean
  helperText?: React.ReactNode
  label?: React.ReactNode
  size?: SelectSize
  icon?: React.ReactNode | boolean
  /** @deprecated Use icon. Kept for compatibility with existing consumers. */
  startIcon?: React.ReactNode | boolean
  state?: SelectState
  value?: React.ReactNode
}

const sizeTokens: Record<
  SelectSize,
  {
    container: string
    valueText: string
    helperText: string
    staticLabel: string
  }
> = {
  md: {
    container: "min-h-10 px-3 py-2",
    valueText: "text-base leading-6 tracking-[0.15px]",
    helperText: "text-xs leading-[1.66] tracking-[0.15px]",
    staticLabel: "text-xs leading-4 tracking-[0.15px]",
  },
  sm: {
    container: "min-h-9 px-3 py-2",
    valueText: "text-sm leading-5 tracking-[0.15px]",
    helperText: "text-xs leading-[1.66] tracking-[0.15px]",
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
  state: SelectState
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

function getLabelTone({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: SelectState
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

function resolveValue(value: React.ReactNode | undefined, fallback: string) {
  if (value === false) {
    return null
  }

  if (value === true || value === undefined) {
    return fallback
  }

  return value
}

function Select({
  className,
  content = "text",
  disabled = false,
  empty = false,
  error = false,
  expanded = false,
  helperText,
  label = "Label",
  size = "md",
  state = "default",
  icon = false,
  startIcon = false,
  value,
  ...props
}: SelectProps) {
  const resolvedState: SelectState = disabled ? "default" : state
  const hasIcon = icon || startIcon
  const resolvedValue = resolveValue(value, "Value")

  return (
    <div className={cn("w-fit max-w-full", className)} {...props}>
      {label !== false && (
        <label
          className={cn(
            "mb-1 block whitespace-nowrap font-normal",
            sizeTokens[size].staticLabel,
            getLabelTone({ disabled, error, state: resolvedState }),
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "relative flex w-fit max-w-full cursor-pointer items-center rounded-lg border bg-white transition-colors duration-150",
          sizeTokens[size].container,
          getBorderClasses({ disabled, error, state: resolvedState }),
          !disabled && !error && resolvedState === "default" && "hover:border-[color:var(--parser-border-neutral-dark)]",
        )}
      >
        {hasIcon && (
          <span className={cn("flex shrink-0 items-center pr-2", disabled && "opacity-60")}>
            <Star className="size-5 shrink-0" strokeWidth={2} />
          </span>
        )}

        {content === "chips" ? (
          <div className={cn("flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-clip", disabled && "opacity-60")}>
            <Chip
              appearance="muted"
              color="neutral"
              icon={false}
              label
              propDelete
              size="md"
              thumbnail={false}
            >
              Microsoft
            </Chip>
            <Chip
              appearance="muted"
              color="neutral"
              icon={false}
              label
              propDelete
              size="md"
              thumbnail={false}
            >
              Apple
            </Chip>
            <span
              className={cn(
                "whitespace-nowrap pl-3 pr-0.5 font-normal text-[color:var(--parser-text-neutral-primary)]",
                sizeTokens[size].valueText,
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              +1
            </span>
          </div>
        ) : (
          <div
            className={cn(
              "flex min-w-0 flex-1 items-center overflow-hidden font-normal text-[color:var(--parser-text-neutral-primary)]",
              disabled && "opacity-60",
              sizeTokens[size].valueText,
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <span className="truncate">{resolvedValue}</span>
          </div>
        )}

        <span className={cn("flex w-5 shrink-0 items-center justify-center", disabled && "opacity-60")}>
          <ChevronDown
            className={cn("size-5 shrink-0 transition-transform duration-150", expanded && "rotate-180")}
            strokeWidth={2}
          />
        </span>

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

export { Select }
export type { SelectProps, SelectSize, SelectContent, SelectState }
