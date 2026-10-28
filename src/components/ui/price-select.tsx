import * as React from "react"

import { Button } from "@/components/ui/button"
import { InputNumberRange } from "@/components/ui/input-number-range"
import { Menu } from "@/components/ui/menu"
import { Select, type SelectProps } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type PriceSelectProps = Omit<
  SelectProps,
  "expanded" | "menu" | "onExpandedChange" | "value"
> & {
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

function PriceSelect({
  defaultExpanded = false,
  expanded: controlledExpanded,
  onClick,
  onExpandedChange,
  ...props
}: PriceSelectProps) {
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded)
  const [startValue, setStartValue] = React.useState("")
  const [endValue, setEndValue] = React.useState("")
  const expanded = controlledExpanded ?? uncontrolledExpanded
  const value = getPriceValue(startValue, endValue)

  function updateExpanded(nextExpanded: boolean) {
    if (controlledExpanded === undefined) setUncontrolledExpanded(nextExpanded)
    onExpandedChange?.(nextExpanded)
  }

  return (
    <Select
      {...props}
      aria-label={props["aria-label"] ?? "Цена"}
      className={cn(props.className, value !== "Цена" && "tabular-nums")}
      expanded={expanded}
      label={props.label ?? false}
      menu={
        expanded && (
          <Menu className="absolute left-0 top-full z-20 mt-1 min-w-full px-[var(--rh-sizing-menu-padding-px-md)] py-[var(--rh-sizing-menu-padding-py-md)]">
            <InputNumberRange
              aria-label="Диапазон цены"
              appearance="neutral"
              className="!w-[310px]"
              size={props.size}
              startInputProps={{
                groupThousands: true,
                onChange: (event) => setStartValue(event.target.value),
                placeholder: "от",
                value: startValue,
              }}
              endInputProps={{
                groupThousands: true,
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

function getPriceValue(start: string, end: string) {
  if (!start && !end) return "Цена"
  if (!start) return `до ${formatPriceAmount(end, Number(end) >= 1_000_000)} ₽`
  if (!end) return `от ${formatPriceAmount(start, Number(start) >= 1_000_000)} ₽`

  const sameValue = Number(start) === Number(end)
  if (sameValue) return `${formatPriceAmount(start, Number(start) >= 1_000_000)} ₽`

  const useCompactFormat = Number(start) >= 1_000_000 || Number(end) >= 1_000_000
  return `${formatPriceAmount(start, useCompactFormat)}–${formatPriceAmount(end, useCompactFormat)} ₽`
}

function formatPriceAmount(value: string, compact: boolean) {
  const amount = Number(value)
  if (compact && amount >= 1_000) {
    return new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: 2,
      notation: "compact",
    }).format(amount)
  }

  return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export { PriceSelect }
export type { PriceSelectProps }
