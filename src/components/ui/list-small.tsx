import * as React from "react"

import { ListItemSmall } from "@/components/ui/list-item-small"
import { cn } from "@/lib/utils"

type ListSmallProps = React.ComponentProps<"div">

/**
 * Parser small list matching the Figma `list small` component set.
 */
function ListSmall({ className, ...props }: ListSmallProps) {
  return (
    <div className={cn("flex w-fit flex-col items-start", className)} {...props}>
      <ListItemSmall className="w-[260px]" selected />
      <ListItemSmall className="w-[260px]" state="hovered" />
      <ListItemSmall className="w-[260px]" />
      <ListItemSmall className="w-[260px]" />
    </div>
  )
}

export { ListSmall }
export type { ListSmallProps }
