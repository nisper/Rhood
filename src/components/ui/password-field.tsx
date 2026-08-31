import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { FormHelperText } from "@/components/ui/form-helper-text"
import { cn } from "@/lib/utils"

type PasswordFieldSize = "lg" | "md" | "sm"
type PasswordFieldState = "default" | "hovered" | "focused"
type PasswordFieldTopLabel = "dynamic" | "static"

type PasswordFieldProps = Omit<React.ComponentProps<"input">, "size" | "type"> & {
  empty?: boolean
  error?: boolean
  helperText?: React.ReactNode
  label?: React.ReactNode
  showPassword?: boolean
  size?: PasswordFieldSize
  state?: PasswordFieldState
  topLabel?: PasswordFieldTopLabel
}

const sizeClasses: Record<
  PasswordFieldSize,
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
  state: PasswordFieldState
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
  state: PasswordFieldState
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
 * Parser password field matching the Figma password component set.
 */
function PasswordField({
  className,
  defaultValue,
  disabled = false,
  empty = true,
  error = false,
  helperText,
  id,
  label = "Пароль",
  placeholder = "Placeholder",
  showPassword = false,
  size = "md",
  state = "default",
  topLabel = "dynamic",
  value,
  ...props
}: PasswordFieldProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const resolvedState: PasswordFieldState = disabled ? "default" : state
  const isFloating =
    topLabel === "dynamic" &&
    ((typeof value === "string" && value.length > 0) ||
      typeof value === "number" ||
      typeof defaultValue === "string" ||
      typeof defaultValue === "number" ||
      !empty ||
      resolvedState === "focused")

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
          placeholder={placeholder as string}
          style={{ fontVariationSettings: "'wdth' 100" }}
          type={showPassword ? "text" : "password"}
          value={value}
          {...props}
        />

        <span className="flex shrink-0 items-center justify-center self-center pl-2">
          {showPassword ? (
            <EyeOff
              aria-hidden="true"
              className={cn(
                size === "sm" ? "size-4" : "size-5",
                disabled
                  ? "text-[color:var(--parser-text-disabled)]"
                  : error
                    ? "text-[color:var(--parser-text-error)]"
                    : resolvedState === "focused"
                      ? "text-[color:var(--parser-text-brand)]"
                      : "text-[color:var(--parser-text-neutral-secondary)]",
              )}
              strokeWidth={2}
            />
          ) : (
            <Eye
              aria-hidden="true"
              className={cn(
                size === "sm" ? "size-4" : "size-5",
                disabled
                  ? "text-[color:var(--parser-text-disabled)]"
                  : error
                    ? "text-[color:var(--parser-text-error)]"
                    : resolvedState === "focused"
                      ? "text-[color:var(--parser-text-brand)]"
                      : "text-[color:var(--parser-text-neutral-secondary)]",
              )}
              strokeWidth={2}
            />
          )}
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

export { PasswordField }
export type { PasswordFieldProps, PasswordFieldSize, PasswordFieldState, PasswordFieldTopLabel }
