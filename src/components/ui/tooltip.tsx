import * as React from "react"

import { cn } from "@/lib/utils"

type TooltipProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
}

function Tooltip({ className, children = "Typography", ...props }: TooltipProps) {
  return (
    <div
      className={cn(
        "relative z-[2147483647] inline-flex max-w-[350px] items-center justify-center rounded-[4px] bg-[color:var(--parser-fill-neutral-dark-ultra)] px-1.5 py-0.5 animate-[tooltip-enter_160ms_cubic-bezier(0,0,0.2,1)_both] motion-reduce:animate-none",
        className,
      )}
      {...props}
    >
      <div
        className="rh-typography-b2 min-w-px flex-1 text-[color:var(--parser-text-primary-contrast)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {children}
      </div>
    </div>
  )
}

export { Tooltip }
export type { TooltipProps }
