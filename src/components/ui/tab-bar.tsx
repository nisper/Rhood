import * as React from "react"

import { Tab, type TabDirection } from "@/components/ui/tab"
import { cn } from "@/lib/utils"

type TabBarProps = React.ComponentProps<"div"> & {
  direction?: TabDirection
  indicator?: boolean
}

/**
 * Parser tab bar matching the Figma `TabBar` component.
 */
function TabBar({
  children,
  className,
  direction = "horizontal",
  indicator = true,
  ...props
}: TabBarProps) {
  const defaultTabs = (
    <>
      <Tab selected />
      <Tab />
      <Tab />
    </>
  )

  return (
    <div
      className={cn(
        "flex items-start",
        indicator && "border-b border-[color:var(--rh-theme-border-light)]",
        direction === "horizontal" && "gap-[var(--rh-sizing-base-module-2)]",
        direction === "vertical" && "gap-0",
        className,
      )}
      {...props}
    >
      {children ?? defaultTabs}
    </div>
  )
}

export { TabBar }
export type { TabBarProps }
