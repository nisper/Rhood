import * as React from "react"

import { PaginationButton } from "@/components/ui/pagination-button"
import { cn } from "@/lib/utils"

type PaginationAltProps = React.ComponentProps<"div">

/**
 * Parser pagination strip matching the Figma `pagination-alt` component.
 */
function PaginationAlt({ className, ...props }: PaginationAltProps) {
  return (
    <div className={cn("flex items-center gap-[6px] px-6", className)} {...props}>
      <PaginationButton type="icon" />
      <PaginationButton />
      <span
        className="w-8 text-center text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-primary)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        ...
      </span>
      <PaginationButton />
      <PaginationButton state="checked" />
      <PaginationButton />
      <span
        className="w-8 text-center text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-primary)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        ...
      </span>
      <PaginationButton />
      <PaginationButton direction="right" type="icon" />
    </div>
  )
}

export { PaginationAlt }
export type { PaginationAltProps }
