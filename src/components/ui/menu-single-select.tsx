import * as React from 'react'

import { MenuDivider } from '@/components/ui/menu-divider'
import { MenuItemSingleSelect } from '@/components/ui/menu-item-single-select'
import { cn } from '@/lib/utils'

type MenuSingleSelectProps = React.ComponentProps<'div'> & {
  children?: React.ReactNode
}

/**
 * Parser menu popover matching the Figma `menu-single select` component.
 */
function MenuSingleSelect({
  className,
  children,
  ...props
}: MenuSingleSelectProps) {
  return (
    <div
      className={cn(
        'flex w-[215px] flex-col items-start justify-center rounded-[12px] bg-white px-1 py-1 shadow-[0px_3px_14px_0px_rgba(0,0,0,0.25)]',
        className,
      )}
      {...props}
    >
      {children || (
        <div className="flex w-full flex-col items-start">
          <MenuItemSingleSelect className="w-full" />
          <MenuItemSingleSelect className="w-full" />
          <MenuItemSingleSelect className="w-full" />{' '}
          <MenuItemSingleSelect className="w-full" />
          <MenuDivider className="w-full" />
          <MenuItemSingleSelect className="w-full" />
        </div>
      )}
    </div>
  )
}

export { MenuSingleSelect }
export type { MenuSingleSelectProps }
