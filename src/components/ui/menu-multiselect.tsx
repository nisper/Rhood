import * as React from "react"

import { MenuDivider } from "@/components/ui/menu-divider"
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect"
import { cn } from "@/lib/utils"

type MenuMultiselectProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}

/**
 * Parser menu popover matching the Figma `menu-multiselect` component.
 */
function MenuMultiselect({ className, children, ...props }: MenuMultiselectProps) {
  return (
    <div
      className={cn(
        "flex w-[215px] flex-col items-start justify-center rounded-[12px] bg-white px-1 py-1 shadow-[0px_3px_14px_0px_rgba(0,0,0,0.25)]",
        className,
      )}
      {...props}
    >
      {children || (
        <div className="flex w-full flex-col items-start">
          <MenuItemMultiselect className="w-full bg-[var(--parser-fill-neutral-hover)]" state="hovered" />
          <MenuItemMultiselect className="w-full" />
          <MenuItemMultiselect className="w-full" />
          <MenuDivider className="w-full" />
          <MenuItemMultiselect className="w-full" />
        </div>
      )}
    </div>
  )
}

export { MenuMultiselect }
export type { MenuMultiselectProps }
