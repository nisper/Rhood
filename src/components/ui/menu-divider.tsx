import * as React from "react"
import { cn } from "@/lib/utils"

type MenuDividerProps = React.ComponentProps<"div">

function MenuDivider({ className, ...props }: MenuDividerProps) {
  return (
    <div
      className={cn("px-3 py-2", className)}
      {...props}
    >
      <div className="h-px w-full bg-border" />
    </div>
  )
}

export { MenuDivider }
export type { MenuDividerProps }