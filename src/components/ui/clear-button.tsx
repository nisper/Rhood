import * as React from "react"

import { IconButton } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

type ClearButtonSize = "md" | "sm"
type ClearButtonState = "default" | "hovered"

type ClearButtonProps = Omit<React.ComponentProps<"button">, "size" | "style" | "type"> & {
  size?: ClearButtonSize
  state?: ClearButtonState
}

const sizeClasses: Record<ClearButtonSize, { button: "sm" | "xsm"; icon: string }> = {
  md: { button: "sm", icon: "size-[calc(var(--spacing)*5)]" },
  sm: { button: "xsm", icon: "size-[calc(var(--spacing)*4)]" },
}

/** Clears the current value while keeping focus on its associated text input. */
function ClearButton({
  "aria-label": ariaLabel = "Очистить поле",
  className,
  onMouseDown,
  size = "md",
  state = "default",
  ...props
}: ClearButtonProps) {
  const resolvedSize = sizeClasses[size]

  return (
    <IconButton
      {...props}
      aria-label={ariaLabel}
      appearance="inherit"
      className={cn(
        "focus-visible:ring-2 focus-visible:ring-[var(--rh-theme-border-focus)]",
        className,
      )}
      icon={<img alt="" className={resolvedSize.icon} src="/Rhood/assets/circle-x.svg" />}
      onMouseDown={(event) => {
        event.preventDefault()
        onMouseDown?.(event)
      }}
      size={resolvedSize.button}
      state={state}
      type="button"
    />
  )
}

export { ClearButton }
export type { ClearButtonProps, ClearButtonSize, ClearButtonState }
