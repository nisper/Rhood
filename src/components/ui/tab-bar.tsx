import * as React from "react"

import { Tab } from "@/components/ui/tab"
import { cn } from "@/lib/utils"

type TabBarProps = React.ComponentProps<"div"> & {
  disGutters?: boolean
}

/**
 * Parser tab bar matching the Figma `TabBar` component.
 */
function TabBar({ children, className, disGutters = false, ...props }: TabBarProps) {
  const defaultTabs = (
    <>
      <Tab disGutters={disGutters} selected />
      <Tab disGutters={disGutters} />
      <Tab disGutters={disGutters} />
    </>
  )

  return (
    <div
      className={cn(
        "flex items-start border-b border-[color:var(--rh-theme-border-light)]",
        disGutters && "gap-[var(--rh-sizing-tabs-padding-gap)]",
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
