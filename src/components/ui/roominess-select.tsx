import * as React from "react"

import { Button } from "@/components/ui/button"
import { Menu } from "@/components/ui/menu"
import { Select, type SelectProps } from "@/components/ui/select"
import { ToggleChip } from "@/components/ui/toggle-chip"

const roominessOptions = ["Студия", "1", "2", "3", "4+"] as const

type RoominessSelectProps = Omit<
  SelectProps,
  "expanded" | "menu" | "onExpandedChange" | "value"
> & {
  defaultExpanded?: boolean
  defaultSelectedValues?: readonly string[]
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onSelectedValuesChange?: (selectedValues: string[]) => void
  selectedValues?: readonly string[]
}

function formatRoominessValue(selectedValues: readonly string[]) {
  const selected = roominessOptions.filter((option) => selectedValues.includes(option))
  if (selected.length === 0) return "Комнат"
  if (selected.length === 1 && selected[0] === "Студия") return "Студия"

  const labels: string[] = []
  if (selected.includes("Студия")) labels.push("Студия")

  const numbers = selected.filter((option) => option !== "Студия")
  for (let index = 0; index < numbers.length;) {
    let endIndex = index
    while (
      endIndex + 1 < numbers.length &&
      (numbers[endIndex] === "3" && numbers[endIndex + 1] === "4+" ||
        numbers[endIndex + 1] !== "4+" &&
        Number(numbers[endIndex + 1]) === Number(numbers[endIndex]) + 1)
    ) {
      endIndex += 1
    }

    if (endIndex > index) {
      labels.push(`${numbers[index]}–${numbers[endIndex]}`)
    } else {
      labels.push(...numbers.slice(index, endIndex + 1))
    }
    index = endIndex + 1
  }

  return `${labels.join(", ")} комн.`
}

function RoominessSelect({
  defaultExpanded = false,
  defaultSelectedValues = [],
  expanded: controlledExpanded,
  onClick,
  onExpandedChange,
  onSelectedValuesChange,
  selectedValues,
  ...props
}: RoominessSelectProps) {
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded)
  const [uncontrolledSelectedValues, setUncontrolledSelectedValues] = React.useState(
    () => [...defaultSelectedValues],
  )
  const expanded = controlledExpanded ?? uncontrolledExpanded
  const values = selectedValues ?? uncontrolledSelectedValues

  function updateExpanded(nextExpanded: boolean) {
    if (controlledExpanded === undefined) setUncontrolledExpanded(nextExpanded)
    onExpandedChange?.(nextExpanded)
  }

  function toggleOption(option: string, selected: boolean) {
    const nextValues = selected
      ? [...values, option]
      : values.filter((value) => value !== option)
    if (selectedValues === undefined) setUncontrolledSelectedValues(nextValues)
    onSelectedValuesChange?.(nextValues)
  }

  return (
    <Select
      {...props}
      expanded={expanded}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !props.disabled) updateExpanded(!expanded)
      }}
      onExpandedChange={updateExpanded}
      menu={
        expanded && (
          <Menu
            className="absolute left-0 top-full z-20 mt-1 px-[var(--rh-sizing-menu-padding-px-md)] py-[var(--rh-sizing-menu-padding-py-md)]"
          >
            <div className="flex flex-nowrap items-center gap-1">
              {roominessOptions.map((option) => (
                <ToggleChip
                  checked={values.includes(option)}
                  color="neutral"
                  icon={false}
                  key={option}
                  onCheckedChange={(selected) => toggleOption(option, selected)}
                  onClick={(event) => event.stopPropagation()}
                  size="lg"
                >
                  {option}
                </ToggleChip>
              ))}
            </div>
            {values.length > 0 && (
              <div className="mt-2 flex">
                <Button
                  appearance="ghost"
                  endIcon={false}
                  onClick={() => {
                    if (selectedValues === undefined) setUncontrolledSelectedValues([])
                    onSelectedValuesChange?.([])
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
      value={formatRoominessValue(values)}
    />
  )
}

export { RoominessSelect }
export type { RoominessSelectProps }
