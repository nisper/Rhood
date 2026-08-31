import * as React from "react"

import { cn } from "@/lib/utils"

type TooltipProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}

function Tooltip({ className, children = "Typography", ...props }: TooltipProps) {
  return (
    <div
      className={cn(
        "inline-flex max-w-[350px] items-center justify-center rounded-[4px] bg-[color:var(--parser-fill-neutral-dark-ultra)] px-1.5 py-0.5",
        className,
      )}
      {...props}
    >
      <div
        className="min-w-px flex-1 text-sm font-normal leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-primary-contrast)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {children}
      </div>
    </div>
  )
}

export { Tooltip }
export type { TooltipProps }
