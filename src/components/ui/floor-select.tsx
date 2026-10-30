import * as React from "react"

import { Button } from "@/components/ui/button"
import { InputNumberRange } from "@/components/ui/input-number-range"
import { Menu } from "@/components/ui/menu"
import { Select, type SelectProps } from "@/components/ui/select"
import { cn } from "@/lib/utils"

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
  const [startValue, setStartValue] = React.useState("")
  const [endValue, setEndValue] = React.useState("")
  const expanded = controlledExpanded ?? uncontrolledExpanded
  const value = getFloorValue(startValue, endValue)

  function updateExpanded(nextExpanded: boolean) {
    if (controlledExpanded === undefined) setUncontrolledExpanded(nextExpanded)
    onExpandedChange?.(nextExpanded)
  }

  return (
    <Select
      {...props}
      aria-label={props["aria-label"] ?? "Этаж"}
      className={cn(props.className, value !== "Этаж" && "tabular-nums")}
      expanded={expanded}
      label={props.label ?? false}
      menu={
        expanded && (
          <Menu className="absolute left-0 top-full z-20 mt-1 min-w-full px-[var(--rh-sizing-menu-padding-px-sm)] py-[var(--rh-sizing-menu-padding-py-sm)]">
            <InputNumberRange
              aria-label="Диапазон этажей"
              appearance="neutral"
              className="!w-[200px]"
              size="md"
              startInputProps={{
                onChange: (event) => setStartValue(event.target.value),
                placeholder: "от",
                value: startValue,
              }}
              endInputProps={{
                onChange: (event) => setEndValue(event.target.value),
                placeholder: "до",
                value: endValue,
              }}
            />
            {(startValue || endValue) && (
              <div className="mt-2 flex">
                <Button
                  appearance="ghost"
                  endIcon={false}
                  onClick={() => {
                    setStartValue("")
                    setEndValue("")
                  }}
                  size="sm"
                  startIcon={false}
                >
                  Сбросить
                </Button>
              </div>
            )}
          </Menu>
        )
      }
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !props.disabled) updateExpanded(!expanded)
      }}
      onExpandedChange={updateExpanded}
      value={value}
    />
  )
}

function getFloorValue(start: string, end: string) {
  if (!start && !end) return "Этаж"
  if (!start) return `до ${end} эт.`
  if (!end) return `от ${start} эт.`

  const sameValue = Number(start) === Number(end)
  return sameValue ? `${start} эт.` : `${start}–${end} эт.`
}

export { FloorSelect }
export type { FloorSelectProps }
