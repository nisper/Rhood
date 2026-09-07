import * as React from "react"
import { cn } from "@/lib/utils"

type MenuDividerProps = React.ComponentProps<"div">

function MenuDivider({ className, ...props }: MenuDividerProps) {
  return (
    <div
      role="separator"
      className={cn("flex h-4 w-full shrink-0 items-center px-3", className)}
      {...props}
    >
      <div className="h-px w-full bg-[var(--parser-border-light)]" />
    </div>
  )
}

export { MenuDivider }
export type { MenuDividerProps }