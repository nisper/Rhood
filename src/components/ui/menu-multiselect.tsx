import { Menu, type MenuProps } from "@/components/ui/menu"
import { MenuDivider } from "@/components/ui/menu-divider"
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect"

type MenuMultiselectProps = MenuProps

/** Compatibility wrapper. New compositions should use Menu with children. */
function MenuMultiselect({ children, ...props }: MenuMultiselectProps) {
  return (
    <Menu {...props}>
      {children ?? <>
        <MenuItemMultiselect selected={false} secondaryText={false} rightSlot={false} />
        <MenuItemMultiselect selected={false} secondaryText={false} rightSlot={false} />
        <MenuDivider />
        <MenuItemMultiselect selected={false} secondaryText={false} rightSlot={false} />
      </>}
    </Menu>
  )
}

export { MenuMultiselect }
export type { MenuMultiselectProps }
