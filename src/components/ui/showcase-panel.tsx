import * as React from "react"

import { cn } from "@/lib/utils"

type ShowcasePanelTone = "white" | "transparent"

type ShowcasePanelProps = React.ComponentProps<"div"> & {
  tone?: ShowcasePanelTone
}

/** A presentation panel placed inside ShowcaseSurface. */
function ShowcasePanel({ children, className, tone = "white", ...props }: ShowcasePanelProps) {
  return <div
    {...props}
    className={cn(
      "flex min-h-[136px] items-center justify-center rounded-xl px-6 py-4",
      tone === "white" && "bg-white",
      className,
    )}
  >
    {children}
  </div>
}

export { ShowcasePanel }
export type { ShowcasePanelProps, ShowcasePanelTone }
