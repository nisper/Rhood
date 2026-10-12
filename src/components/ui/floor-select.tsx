import * as React from "react"

import { Menu } from "@/components/ui/menu"
import { Select, type SelectProps } from "@/components/ui/select"

type FloorSelectProps = Omit<
  SelectProps,
  "expanded" | "menu" | "onExpandedChange" | "value"
> & {
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

function FloorSelect({
  defaultExpanded = false,
  expanded: controlledExpanded,
  onClick,
  onExpandedChange,
  ...props
}: FloorSelectProps) {
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded)
  const expanded = controlledExpanded ?? uncontrolledExpanded

  function updateExpanded(nextExpanded: boolean) {
    if (controlledExpanded === undefined) setUncontrolledExpanded(nextExpanded)
    onExpandedChange?.(nextExpanded)
  }

  return (
    <Select
      {...props}
      aria-label={props["aria-label"] ?? "Этаж"}
      expanded={expanded}
      label={props.label ?? false}
      menu={expanded && <Menu className="absolute left-0 top-full z-20 mt-1 min-w-full" />}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !props.disabled) updateExpanded(!expanded)
      }}
      onExpandedChange={updateExpanded}
      value="Этаж"
    />
  )
}

export { FloorSelect }
export type { FloorSelectProps }
