import * as React from "react"

import { InputNumber } from "@/components/ui/input-number"
import { cn } from "@/lib/utils"

type InputNumberRangeState = "default" | "hovered" | "focused"
type InputNumberRangeSize = "md" | "sm"

type InputNumberRangeProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  defaultEndValue?: string | number
  defaultStartValue?: string | number
  disabled?: boolean
  endPlaceholder?: string
  endText?: React.ReactNode
  endValue?: string | number
  error?: boolean
  groupThousands?: boolean
  helperText?: React.ReactNode
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
  onEndChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onStartChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  size?: InputNumberRangeSize
  startPlaceholder?: string
  startValue?: string | number
  state?: InputNumberRangeState
}

function borderClasses({ error, state }: { error: boolean; state: InputNumberRangeState }) {
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

/** A pair of numeric inputs for specifying a minimum and maximum value. */
function InputNumberRange({
  className,
  defaultEndValue = "",
  defaultStartValue = "",
  disabled = false,
  endPlaceholder = "Введите значение",
  endText,
  endValue,
  error = false,
  groupThousands = false,
  helperText,
  inputMode = "decimal",
  onEndChange,
  onStartChange,
  required = false,
  size = "md",
  startPlaceholder = "Введите значение",
  startValue,
  state = "default",
  ...props
}: InputNumberRangeProps) {
  const startControlled = startValue !== undefined
  const endControlled = endValue !== undefined
  const [isFocused, setIsFocused] = React.useState(false)
  const resolvedState = isFocused ? "focused" : state
  const interactiveClasses = !disabled && !error && state !== "focused"
    ? "hover:border-[color:var(--parser-border-hover)] hover:bg-[var(--input-hover,white)] focus-within:border-[color:var(--parser-border-focus)] focus-within:bg-[var(--input-focus,white)] focus-within:ring-1 focus-within:ring-inset focus-within:ring-[color:var(--parser-border-focus)]"
    : !disabled && error
      ? "focus-within:border-[color:var(--parser-border-error)] focus-within:ring-1 focus-within:ring-inset focus-within:ring-[color:var(--parser-border-error)]"
      : undefined

  return (
    <div className={cn("grid min-w-0 w-full gap-[3px]", className)} {...props}>
      <div className={cn("flex items-center rounded-lg border bg-white", size === "md" ? "h-10" : "h-9", size === "md" ? "text-base leading-6" : "text-sm leading-5", borderClasses({ error, state: resolvedState }), interactiveClasses)}>
        <InputNumber
          appearance="embedded"
          aria-label="Начальное значение диапазона"
          defaultValue={defaultStartValue}
          disabled={disabled}
          groupThousands={groupThousands}
          inputMode={inputMode}
          onBlur={() => setIsFocused(false)}
          onChange={(event) => {
            onStartChange?.(event)
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={startPlaceholder}
          size={size}
          value={startControlled ? startValue : undefined}
        />
        <span aria-hidden="true" className="shrink-0 text-[var(--parser-text-neutral-secondary)]">–</span>
        <div className="flex h-full min-w-0 flex-1 items-center">
          <InputNumber
            appearance="embedded"
            aria-label="Конечное значение диапазона"
            defaultValue={defaultEndValue}
            disabled={disabled}
            endText={endText}
            groupThousands={groupThousands}
            inputMode={inputMode}
            onBlur={() => setIsFocused(false)}
            onChange={(event) => {
              onEndChange?.(event)
            }}
            onFocus={() => setIsFocused(true)}
            placeholder={endPlaceholder}
            required={required}
            size={size}
            value={endControlled ? endValue : undefined}
          />
        </div>
      </div>
      {helperText && <p className={cn("text-xs leading-5", error ? "text-[var(--parser-text-error)]" : "text-[var(--parser-text-neutral-secondary)]")}>{helperText}</p>}
    </div>
  )
}

export { InputNumberRange }
export type { InputNumberRangeProps, InputNumberRangeSize, InputNumberRangeState }
