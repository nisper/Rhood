import * as React from "react"
import { Square, SquareCheck, SquareMinus } from "lucide-react"

import { cn } from "@/lib/utils"

type CheckboxDeprecatedSize = "md" | "sm"
type CheckboxDeprecatedState = "default" | "hovered"

type CheckboxDeprecatedProps = Omit<React.ComponentProps<"input">, "size" | "type"> & {
  checked?: boolean
  error?: boolean
  indeterminate?: boolean
  label?: boolean
  size?: CheckboxDeprecatedSize
  skeleton?: boolean
  state?: CheckboxDeprecatedState
}

const sizeClasses: Record<CheckboxDeprecatedSize, { control: string; label: string; root: string; skeleton: string }> = {
  md: { control: "size-5", label: "text-base leading-6 tracking-[0.15px]", root: "min-h-10 gap-2 py-2", skeleton: "h-5 w-28" },
  sm: { control: "size-4", label: "text-sm leading-5 tracking-[0.15px]", root: "min-h-8 gap-2 py-1", skeleton: "h-4 w-24" },
}

/** @deprecated Use Checkbox from checkbox.tsx instead. */
function CheckboxDeprecated({ checked, children = "Label", className, defaultChecked = false, disabled = false, error = false, indeterminate = false, label = true, onChange, size = "md", skeleton = false, state = "default", ...props }: CheckboxDeprecatedProps) {
  const isControlled = checked !== undefined
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const resolvedChecked = isControlled ? checked : uncontrolledChecked
  const isDisabled = Boolean(disabled) || skeleton
  const tokens = sizeClasses[size]

  React.useEffect(() => { if (inputRef.current) inputRef.current.indeterminate = indeterminate }, [indeterminate])

  const iconClassName = cn("shrink-0", tokens.control, isDisabled ? "text-[color:var(--parser-text-disabled)]" : indeterminate || resolvedChecked ? "text-[color:var(--parser-fill-brand)]" : error ? "text-[color:var(--parser-text-error)]" : "text-[color:var(--parser-text-neutral-primary)]")
  const rootClassName = cn("inline-flex shrink-0 items-center rounded-sm text-left transition-colors duration-150", tokens.root, !isDisabled && "cursor-pointer hover:bg-[color:var(--parser-fill-neutral-hover)]", state === "hovered" && !isDisabled && "bg-[color:var(--parser-fill-neutral-hover)]", className)

  if (skeleton) return <span className={rootClassName}><span aria-hidden="true" className={cn("block rounded-sm bg-[color:var(--parser-fill-skeleton)]", tokens.skeleton)} /></span>

  return <label className={rootClassName}>
    <input {...props} checked={isControlled ? checked : undefined} className="sr-only" defaultChecked={isControlled ? undefined : defaultChecked} disabled={disabled} onChange={event => { if (!isControlled) setUncontrolledChecked(event.target.checked); onChange?.(event) }} ref={inputRef} type="checkbox" />
    {indeterminate ? <SquareMinus aria-hidden="true" className={iconClassName} strokeWidth={2} /> : resolvedChecked ? <SquareCheck aria-hidden="true" className={iconClassName} strokeWidth={2} /> : <Square aria-hidden="true" className={iconClassName} strokeWidth={2} />}
    {label && <span className={cn("whitespace-nowrap font-normal", tokens.label, isDisabled ? "text-[color:var(--parser-text-disabled)]" : "text-[color:var(--parser-text-neutral-primary)]")} style={{ fontVariationSettings: "'wdth' 100" }}>{children}</span>}
  </label>
}

export { CheckboxDeprecated }
export type { CheckboxDeprecatedProps, CheckboxDeprecatedSize, CheckboxDeprecatedState }
