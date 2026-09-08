import * as React from "react"

import { cn } from "@/lib/utils"

type TableProps = React.ComponentProps<"div">

/** Container for header and body rows composed from TableCell instances. */
function Table({ className, children, ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div
        {...props}
        className={cn("flex min-w-max flex-col items-stretch overflow-hidden rounded-lg", className)}
        role="table"
      >
        {children}
      </div>
    </div>
  )
}

export { Table }
export type { TableProps }
