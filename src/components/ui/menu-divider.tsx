import * as React from "react"
import { cn } from "@/lib/utils"

type MenuDividerProps = React.ComponentProps<"div">

function MenuDivider({ className, ...props }: MenuDividerProps) {
  return (
    <div
      role="separator"
      className={cn("flex h-[calc(var(--spacing)*4)] w-full shrink-0 items-center px-[var(--rh-sizing-menu-padding-px-sm)]", className)}
      {...props}
    >
      <div className="h-px w-full bg-[var(--rh-theme-border-light)]" />
    </div>
  )
}

export { MenuDivider }
export type { MenuDividerProps }
