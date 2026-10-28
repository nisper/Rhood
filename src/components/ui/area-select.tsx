import * as React from "react"

import { Button } from "@/components/ui/button"
import { InputNumberRange } from "@/components/ui/input-number-range"
import { Menu } from "@/components/ui/menu"
import { Select, type SelectProps } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type AreaSelectProps = Omit<
  SelectProps,
  "expanded" | "menu" | "onExpandedChange" | "value"
> & {
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

function AreaSelect({
  defaultExpanded = false,
  expanded: controlledExpanded,
  onClick,
  onExpandedChange,
  ...props
}: AreaSelectProps) {
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded)
  const [startValue, setStartValue] = React.useState("")
  const [endValue, setEndValue] = React.useState("")
  const expanded = controlledExpanded ?? uncontrolledExpanded
  const value = getAreaValue(startValue, endValue)

  function updateExpanded(nextExpanded: boolean) {
    if (controlledExpanded === undefined) setUncontrolledExpanded(nextExpanded)
    onExpandedChange?.(nextExpanded)
  }

  return (
    <Select
      {...props}
      aria-label={props["aria-label"] ?? "Площадь"}
        className={cn(props.className, value !== "Площадь" && "tabular-nums")}
      expanded={expanded}
      label={props.label ?? false}
      menu={
        expanded && (
          <Menu className="absolute left-0 top-full z-20 mt-1 min-w-full px-[var(--rh-sizing-menu-padding-px-md)] py-[var(--rh-sizing-menu-padding-py-md)]">
            <InputNumberRange
              aria-label="Диапазон площади"
              appearance="neutral"
              className="!w-[200px]"
              size={props.size}
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

function getAreaValue(start: string, end: string) {
  if (!start && !end) return "Площадь"
  if (!start) return `до ${end} м²`
  if (!end) return `от ${start} м²`

  const sameValue = Number(start) === Number(end)
  return sameValue ? `${start} м²` : `${start}–${end} м²`
}

export { AreaSelect }
export type { AreaSelectProps }
