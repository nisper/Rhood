import * as React from 'react'

import { cn } from '@/lib/utils'

type MainHeaderMenuButtonState = 'default' | 'hovered'

type MainHeaderMenuButtonProps = React.ComponentProps<'button'> & {
  propNew?: boolean
  selected?: boolean
  state?: MainHeaderMenuButtonState
  text?: React.ReactNode
}

function MainHeaderMenuButton({
  className,
  propNew = false,
  selected = false,
  state = 'default',
  text = 'Page menu button',
  type = 'button',
  ...props
}: MainHeaderMenuButtonProps) {
  const isEmphasized = selected || state === 'hovered'
  const showHoverState = !selected && state !== 'hovered'

  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-full py-0.5',
        isEmphasized ? 'gap-2' : 'gap-1',
        showHoverState && 'hover:gap-2',
        className,
      )}
      type={type}
      {...props}
    >
      <span
        className={cn(
          'whitespace-nowrap text-sm leading-5 tracking-[0.17px] font-medium',
          isEmphasized
            ? 'text-[var(--parser-text-primary-contrast)]'
            : 'text-[rgba(255,255,255,0.6)]',
          showHoverState && 'hover:text-[var(--parser-text-primary-contrast)]',
        )}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {text}
      </span>

      {propNew && (
        <span className="inline-flex items-center justify-center rounded-sm bg-[var(--parser-fill-error)] px-[3px] pb-px pt-[2px]">
          <span
            className="whitespace-nowrap text-[8px] leading-none tracking-[0.012px] font-medium text-[var(--parser-text-primary-contrast)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            НОВОЕ
          </span>
        </span>
      )}
    </button>
  )
}

export { MainHeaderMenuButton }
export type { MainHeaderMenuButtonProps, MainHeaderMenuButtonState }
