import * as React from "react"

import { PaginationButton } from "@/components/ui/pagination-button"
import { cn } from "@/lib/utils"

type PaginationProps = React.ComponentProps<"div">

/**
 * Parser pagination bar matching the Figma `pagination` component.
 */
function Pagination({ className, ...props }: PaginationProps) {
  return (
    <div
      className={cn(
        "flex w-[384px] items-center justify-end gap-6 py-[2px]",
        className,
      )}
      {...props}
    >
      <p
        className="whitespace-nowrap text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-primary)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        1–10 из 13 525
      </p>

      <div className="flex shrink-0 items-start">
        <PaginationButton type="icon" />
        <PaginationButton direction="right" type="icon" />
      </div>
    </div>
  )
}

export { Pagination }
export type { PaginationProps }
