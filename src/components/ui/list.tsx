import * as React from "react"
import { cn } from "@/lib/utils"

type ListProps = React.ComponentProps<"div">

/** Composition container for navigation rows. */
function List({ className, children, ...props }: ListProps) {
  return <div className={cn("flex w-full flex-col items-stretch", className)} {...props}>{children}</div>
}

export { List }
export type { ListProps }
