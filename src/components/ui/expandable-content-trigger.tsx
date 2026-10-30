import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type ExpandableContentTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  controls: string
  expanded: boolean
}

function ExpandableContentTrigger({
  children,
  className,
  controls,
  expanded,
  ...props
}: ExpandableContentTriggerProps) {
  return (
    <button
      aria-controls={controls}
      aria-expanded={expanded}
      className={cn(
        "mt-2 inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-left rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)] transition-colors hover:text-[var(--rh-theme-text-neutral-primary)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)] disabled:cursor-default",
        className,
      )}
      type="button"
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        aria-hidden="true"
        className={cn("size-4 transition-transform duration-150", expanded && "rotate-180")}
      />
    </button>
  )
}

export { ExpandableContentTrigger }
export type { ExpandableContentTriggerProps }
