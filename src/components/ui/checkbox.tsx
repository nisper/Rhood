import * as React from "react"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"

type CheckboxSize = "md" | "sm"
type CheckboxState = "default" | "hovered"

type CheckboxProps = Omit<React.ComponentProps<"input">, "size" | "type"> & {
  checked?: boolean
  error?: boolean
  indeterminate?: boolean
  label?: boolean
  size?: CheckboxSize
  skeleton?: boolean
  state?: CheckboxState
}

const sizes: Record<CheckboxSize, { control: string; label: string; root: string; skeleton: string }> = {
  md: { control: "size-6 rounded-[3px]", label: "text-base leading-6 tracking-[0.15px]", root: "min-h-10 gap-2 py-2", skeleton: "h-6 w-14 rounded-lg" },
  sm: { control: "size-5 rounded-[3px]", label: "text-sm leading-5 tracking-[0.17px]", root: "min-h-9 gap-2 py-2", skeleton: "h-5 w-14 rounded-lg" },
}

/** Figma: https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=405-3391 */
function Checkbox({ checked, children = "Label", className, defaultChecked = false, disabled = false, error = false, indeterminate = false, label = true, onChange, size = "md", skeleton = false, state = "default", ...props }: CheckboxProps) {
  const isControlled = checked !== undefined
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const isChecked = isControlled ? checked : uncontrolledChecked
  const isActive = Boolean(isChecked) || indeterminate
  const token = sizes[size]

  React.useEffect(() => { if (inputRef.current) inputRef.current.indeterminate = indeterminate }, [indeterminate])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setUncontrolledChecked(event.target.checked)
    onChange?.(event)
  }

  if (skeleton) return <span aria-hidden="true" className={cn("inline-flex", token.root, className)}><span className={cn("block bg-[var(--parser-fill-skeleton)]", token.skeleton)} /></span>

  const controlClassName = cn(
    "flex shrink-0 items-center justify-center border-2 transition-colors",
    token.control,
    disabled ? "border-[var(--parser-border-light)] bg-transparent text-transparent" : isActive ? "border-[var(--parser-fill-brand)] bg-[var(--parser-fill-brand)] text-[var(--parser-text-primary-contrast)]" : error ? "border-[var(--parser-text-error)] bg-transparent text-transparent" : "border-[var(--parser-border-light)] bg-transparent text-transparent",
    !disabled && !isActive && state === "hovered" && "border-[var(--parser-fill-brand)]",
  )

  return <label className={cn("inline-flex shrink-0 items-start text-left", token.root, !disabled && "cursor-pointer", className)}>
    <input {...props} checked={isControlled ? checked : undefined} className="sr-only" defaultChecked={isControlled ? undefined : defaultChecked} disabled={disabled} onChange={handleChange} ref={inputRef} type="checkbox" />
    <span aria-hidden="true" className={controlClassName}>{indeterminate ? <Minus className={size === "md" ? "size-4" : "size-3.5"} strokeWidth={2} /> : isChecked ? <Check className={size === "md" ? "size-4" : "size-3.5"} strokeWidth={2.5} /> : null}</span>
    {label && <span className={cn("whitespace-nowrap font-normal", token.label, disabled ? "text-[var(--parser-text-disabled)]" : "text-[var(--parser-text-neutral-primary)]")} style={{ fontVariationSettings: "'wdth' 100" }}>{children}</span>}
  </label>
}

export { Checkbox }
export type { CheckboxProps, CheckboxSize, CheckboxState }
