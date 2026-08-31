import * as React from "react"

import { ListItem } from "@/components/ui/list-item"
import { cn } from "@/lib/utils"

type ListProps = React.ComponentProps<"div">

/**
 * Parser list matching the Figma `list` component set.
 */
function List({ className, ...props }: ListProps) {
  return (
    <div className={cn("flex w-fit flex-col items-start", className)} {...props}>
      <ListItem className="w-[260px]" selected />
      <ListItem className="w-[260px]" state="hovered" />
      <ListItem className="w-[260px]" />
      <ListItem className="w-[260px]" />
    </div>
  )
}

export { List }
export type { ListProps }
