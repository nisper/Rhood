import * as React from "react"

import { MenuItemAnchor } from "@/components/ui/menu-item-anchor"
import { cn } from "@/lib/utils"

type MenuAnchorProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}

/**
 * Parser menu popover matching the Figma `MenuAnchor` component set.
 */
function MenuAnchor({ className, children, ...props }: MenuAnchorProps) {
  return (
    <div
      className={cn(
        "flex w-[215px] flex-col items-start justify-center rounded-[12px] bg-white",
        className,
      )}
      {...props}
    >
      <div className="flex w-full flex-col items-start p-2">
        {children || (
          <>
            <MenuItemAnchor className="w-full" />
            <MenuItemAnchor className="w-full" />
            <MenuItemAnchor className="w-full" />
            <MenuItemAnchor className="w-full" />
            <MenuItemAnchor className="w-full" />
          </>
        )}
      </div>
    </div>
  )
}

export { MenuAnchor }
export type { MenuAnchorProps }
