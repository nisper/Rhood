import * as React from "react"
import { cn } from "@/lib/utils"

type MenuProps = React.ComponentProps<"div"> & {
  align?: "left" | "right"
}

/** Visual popup surface; the owning Select controls opening and selection. */
function Menu({ align = "left", className, children, ...props }: MenuProps) {
  return (
    <div className={cn("flex w-[215px] max-w-full flex-col rounded-xl bg-[var(--parser-fill-contrast)] p-1 shadow-[0_3px_14px_rgba(0,0,0,0.25)] [&>*]:w-full", align === "left" ? "self-start" : "self-end", className)} {...props}>
      {children}
    </div>
  )
}

export { Menu }
export type { MenuProps }
