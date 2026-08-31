import * as React from "react"
import { Search } from "lucide-react"

import { FormHelperText } from "@/components/ui/form-helper-text"
import { cn } from "@/lib/utils"

type SearchInputSize = "md" | "sm"
type SearchInputState = "default" | "hovered" | "focused"

type SearchInputProps = React.ComponentProps<"div"> & {
  disabled?: boolean
  empty?: boolean
  error?: boolean
  helperText?: React.ReactNode
  placeholder?: React.ReactNode
  size?: SearchInputSize
  state?: SearchInputState
  value?: React.ReactNode
}

const sizeClasses: Record<
  SearchInputSize,
  {
    container: string
    input: string
    iconSize: string
    iconWrap: string
    cursorHeight: string
  }
> = {
  md: {
    container: "min-h-10 px-3 py-2",
    input: "text-base leading-6 tracking-[0.15px]",
    iconSize: "size-6",
    iconWrap: "size-6",
    cursorHeight: "h-6",
  },
  sm: {
    container: "min-h-9 px-3 py-2",
    input: "text-sm leading-5 tracking-[0.15px]",
    iconSize: "size-5",
    iconWrap: "size-5",
    cursorHeight: "h-5",
  },
}

function getBorderClasses({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: SearchInputState
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
  state: SearchInputState
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
 * Parser search input matching the Figma `SearchInput` component set.
 */
function SearchInput({
  className,
  disabled = false,
  empty = true,
  error = false,
  helperText,
  placeholder = "Поиск",
  size = "md",
  state = "default",
  value = "Value",
  ...props
}: SearchInputProps) {
  const resolvedState: SearchInputState = disabled ? "default" : state
  const hasValue = !empty
  const showPlaceholder = !hasValue && !(resolvedState === "focused")
  const showCursor = !disabled && resolvedState === "focused"

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        className={cn(
          "relative flex w-full items-center rounded-lg border bg-white transition-colors duration-150",
          sizeClasses[size].container,
          getBorderClasses({ disabled, error, state: resolvedState }),
          resolvedState === "hovered" && !disabled && !error && "bg-[var(--input-hover,white)]",
          resolvedState === "focused" && !disabled && "bg-[var(--input-focus,white)]",
        )}
      >
        <span
          className={cn(
            "flex shrink-0 items-center justify-start pr-2",
            sizeClasses[size].iconWrap,
          )}
        >
          <Search className={cn("shrink-0", sizeClasses[size].iconSize)} strokeWidth={2} />
        </span>

        <div className="flex min-w-0 flex-1 items-center overflow-hidden">
          {showPlaceholder && (
            <p
              className={cn(
                "min-w-0 truncate font-normal",
                sizeClasses[size].input,
                getToneClasses({ disabled, error, state: resolvedState }),
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {placeholder}
            </p>
          )}

          {hasValue && (
            <p
              className={cn(
                "min-w-0 truncate font-normal text-[color:var(--parser-text-neutral-primary)]",
                sizeClasses[size].input,
                disabled && "text-[color:var(--parser-text-disabled)]",
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {value}
            </p>
          )}

          {showCursor && (
            <span
              className={cn(
                "ml-0.5 w-px shrink-0 bg-[color:var(--parser-text-neutral-primary)]",
                sizeClasses[size].cursorHeight,
                disabled && "bg-[color:var(--parser-text-disabled)]",
                error && "bg-[color:var(--parser-text-error)]",
                resolvedState === "focused" && !error && "bg-[color:var(--parser-text-neutral-primary)]",
              )}
              aria-hidden="true"
            />
          )}
        </div>
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

export { SearchInput }
export type { SearchInputProps, SearchInputSize, SearchInputState }
