import * as React from "react"

import { cn } from "@/lib/utils"

type SwitchSize = "md" | "sm"
type SwitchPosition = "left" | "right"

type SwitchProps = Omit<React.ComponentProps<"input">, "size" | "type"> & {
  label?: boolean
  size?: SwitchSize
  switchPosition?: SwitchPosition
}

const sizes: Record<SwitchSize, { control: string; knob: string; label: string; root: string }> = {
  md: { control: "h-6 w-[46px] p-0.5", knob: "h-5 w-6", label: "rh-typography-b1", root: "gap-3 py-2" },
  sm: { control: "h-5 w-[38px] p-0.5", knob: "h-4 w-5", label: "rh-typography-b2", root: "gap-2 py-2" },
}

function Switch({
  checked,
  children = "Label",
  className,
  defaultChecked = true,
  disabled = false,
  label = true,
  onChange,
  size = "md",
  switchPosition = "right",
  ...props
}: SwitchProps) {
  const isControlled = checked !== undefined
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
  const isChecked = isControlled ? checked : uncontrolledChecked
  const token = sizes[size]

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setUncontrolledChecked(event.target.checked)
    onChange?.(event)
  }

  const switchControl = (
    <span className={cn(
      "relative inline-flex shrink-0 items-center rounded-full transition-colors",
      token.control,
      disabled
        ? "bg-[var(--rh-theme-fill-disabled)]"
        : isChecked
          ? "bg-[var(--rh-theme-fill-brand)] group-hover:bg-[var(--rh-theme-fill-brand-hover)]"
          : "bg-[var(--rh-theme-fill-toggle)] group-hover:bg-[var(--rh-theme-border-hover)]",
    )}>
      <input
        {...props}
        checked={isControlled ? checked : undefined}
        className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer appearance-none rounded-full opacity-0 disabled:cursor-not-allowed"
        defaultChecked={isControlled ? undefined : defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        role="switch"
        type="checkbox"
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none rounded-full transition-transform",
          disabled
            ? "bg-[var(--rh-theme-icon-neutral-disabled)]"
            : "bg-[var(--rh-theme-fill-contrast-static)] shadow-sm",
          token.knob,
          isChecked && (size === "md" ? "translate-x-[18px]" : "translate-x-[14px]"),
          "peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--rh-theme-text-neutral-focus)]",
        )}
      />
    </span>
  )
  const labelContent = label ? (
    <span
      className={cn(
        token.label,
        disabled
          ? "text-[var(--rh-theme-text-neutral-disabled)]"
          : "text-[var(--rh-theme-text-neutral-primary)]",
      )}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {children}
    </span>
  ) : null

  return (
    <label className={cn("group inline-flex shrink-0 items-center text-left", token.root, !disabled && "cursor-pointer", className)}>
      {switchPosition === "left" ? switchControl : labelContent}
      {switchPosition === "left" ? labelContent : switchControl}
    </label>
  )
}

export { Switch }
export type { SwitchPosition, SwitchProps, SwitchSize }
