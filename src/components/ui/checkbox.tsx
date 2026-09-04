import * as React from "react"
import { Square, SquareCheck, SquareMinus } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Figma: https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=405-3391
 */
type CheckboxSize = "md" | "sm"
type CheckboxState = "default" | "hovered"

type CheckboxProps = React.ComponentProps<"button"> & {
  checked?: boolean
  defaultChecked?: boolean
  error?: boolean
  indeterminate?: boolean
  label?: boolean
  size?: CheckboxSize
  skeleton?: boolean
  state?: CheckboxState
}

const sizeClasses: Record<
  CheckboxSize,
  { control: string; label: string; root: string; skeleton: string }
> = {
  md: {
    control: "size-5",
    label: "text-base leading-6 tracking-[0.15px]",
    root: "min-h-10 gap-2 py-2",
    skeleton: "h-5 w-28",
  },
  sm: {
    control: "size-4",
    label: "text-sm leading-5 tracking-[0.15px]",
    root: "min-h-8 gap-2 py-1",
    skeleton: "h-4 w-24",
  },
}

function Checkbox({
  checked,
  children = "Label",
  className,
  defaultChecked = false,
  disabled = false,
  error = false,
  indeterminate = false,
  label = true,
  onClick,
  size = "md",
  skeleton = false,
  state = "default",
  type = "button",
  ...props
}: CheckboxProps) {
  const isControlled = checked !== undefined
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
  const resolvedChecked = isControlled ? checked : uncontrolledChecked
  const resolvedIndeterminate = resolvedChecked && indeterminate
  const isDisabled = disabled || skeleton
  const isHovered = state === "hovered"
  const tokens = sizeClasses[size]

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!isControlled) {
      setUncontrolledChecked((value) => !value)
    }

    onClick?.(event)
  }

  const iconClassName = cn(
    "shrink-0",
    tokens.control,
    isDisabled
      ? "text-[color:var(--parser-text-disabled)]"
      : !resolvedChecked && error
        ? "text-[color:var(--parser-text-error)]"
        : resolvedChecked
          ? "text-[color:var(--parser-fill-brand)]"
          : "text-[color:var(--parser-text-neutral-primary)]",
  )

  return (
    <button
      aria-checked={resolvedIndeterminate ? "mixed" : resolvedChecked}
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm text-left transition-colors duration-150",
        tokens.root,
        !isDisabled && "cursor-pointer hover:bg-[color:var(--parser-fill-neutral-hover)]",
        isHovered && !isDisabled && "bg-[color:var(--parser-fill-neutral-hover)]",
        className,
      )}
      disabled={isDisabled}
      onClick={handleClick}
      role="checkbox"
      type={type}
      {...props}
    >
      {skeleton ? (
        <span
          aria-hidden="true"
          className={cn(
            "block rounded-sm bg-[color:var(--parser-fill-skeleton)]",
            tokens.skeleton,
          )}
        />
      ) : (
        <>
          {resolvedIndeterminate ? (
            <SquareMinus aria-hidden="true" className={iconClassName} strokeWidth={2} />
          ) : resolvedChecked ? (
            <SquareCheck aria-hidden="true" className={iconClassName} strokeWidth={2} />
          ) : (
            <Square aria-hidden="true" className={iconClassName} strokeWidth={2} />
          )}

          {label && (
            <span
              className={cn(
                "whitespace-nowrap font-normal",
                tokens.label,
                isDisabled
                  ? "text-[color:var(--parser-text-disabled)]"
                  : "text-[color:var(--parser-text-neutral-primary)]",
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {children}
            </span>
          )}
        </>
      )}
    </button>
  )
}

export { Checkbox }
export type { CheckboxProps, CheckboxSize, CheckboxState }
