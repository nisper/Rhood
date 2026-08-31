import * as React from "react"

import { Tab } from "@/components/ui/tab"
import { cn } from "@/lib/utils"

type TabBarProps = React.ComponentProps<"div"> & {
  disGutters?: boolean
}

/**
 * Parser tab bar matching the Figma `TabBar` component.
 */
function TabBar({ className, disGutters = false, ...props }: TabBarProps) {
  return (
    <div
      className={cn(
        "flex items-start border-b border-[color:var(--parser-border-light)]",
        disGutters ? "gap-4" : "gap-0",
        className,
      )}
      {...props}
    >
      {disGutters ? (
        <>
          <Tab disGutters selected />
          <Tab disGutters />
          <Tab disGutters />
        </>
      ) : (
        <>
          <Tab selected />
          <Tab />
          <Tab />
        </>
      )}
    </div>
  )
}

export { TabBar }
export type { TabBarProps }
