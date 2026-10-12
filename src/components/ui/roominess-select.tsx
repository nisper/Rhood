import * as React from "react"

import { Menu } from "@/components/ui/menu"
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect"
import { Select, type SelectProps } from "@/components/ui/select"

const roominessOptions = ["Студия", "1", "2", "3", "4+"] as const

type RoominessSelectProps = Omit<SelectProps, "menu"> & {
  onOptionSelect?: (option: string) => void
  selectedValues?: readonly string[]
}

function RoominessSelect({
  expanded = false,
  onOptionSelect,
  selectedValues = [],
  value = "Комнат",
  ...props
}: RoominessSelectProps) {
  return (
    <Select
      {...props}
      expanded={expanded}
      menu={
        expanded && (
          <Menu
            className="absolute left-0 top-full z-20 mt-1 min-w-full"
            role="listbox"
          >
            {roominessOptions.map((option) => (
              <MenuItemMultiselect
                checked={selectedValues.includes(option)}
                key={option}
                onClick={() => onOptionSelect?.(option)}
                rightSlot={false}
                rightSlotChip={false}
                rightSlotText={false}
                secondaryText={false}
              >
                {option}
              </MenuItemMultiselect>
            ))}
          </Menu>
        )
      }
      value={value}
    />
  )
}

export { RoominessSelect }
export type { RoominessSelectProps }
