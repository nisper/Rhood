import { Menu, type MenuProps } from "@/components/ui/menu"
import { MenuDivider } from "@/components/ui/menu-divider"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"

type MenuSingleSelectProps = MenuProps

/** Compatibility wrapper. New compositions should use Menu with children. */
function MenuSingleSelect({ children, ...props }: MenuSingleSelectProps) {
  return (
    <Menu {...props}>
      {children ?? <>
        <MenuItemSingleSelect selected={false} secondaryText={false} rightSlot={false} />
        <MenuItemSingleSelect selected={false} secondaryText={false} rightSlot={false} />
        <MenuDivider />
        <MenuItemSingleSelect selected={false} secondaryText={false} rightSlot={false} />
      </>}
    </Menu>
  )
}

export { MenuSingleSelect }
export type { MenuSingleSelectProps }
