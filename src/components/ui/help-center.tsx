import * as React from 'react'
import { CircleHelp, FileText, Headset, Presentation } from 'lucide-react'

import { MenuDivider } from '@/components/ui/menu-divider'
import { cn } from '@/lib/utils'

type HelpCenterItem = {
  href?: string
  icon: React.ReactNode
  label: string
}

type HelpCenterProps = React.ComponentProps<'div'> & {
  items?: HelpCenterItem[]
}

const defaultItems: HelpCenterItem[] = [
  {
    icon: <Headset aria-hidden="true" className="size-4" strokeWidth={2} />,
    label: 'Техническая поддержка',
  },
  {
    icon: <CircleHelp aria-hidden="true" className="size-4" strokeWidth={2} />,
    label: 'Инструкция к сервису',
  },
  {
    icon: (
      <Presentation aria-hidden="true" className="size-4" strokeWidth={2} />
    ),
    label: 'Обучающий курс',
  },
  {
    icon: <FileText aria-hidden="true" className="size-4" strokeWidth={2} />,
    label: 'Договор оферты',
  },
]

function HelpCenterRow({ href, icon, label }: HelpCenterItem) {
  const Comp = href ? 'a' : 'button'

  return (
    <Comp
      className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-[var(--parser-fill-neutral-hover)]"
      {...(href ? { href } : { type: 'button' as const })}
    >
      <span className="flex size-5 shrink-0 items-center justify-center text-[var(--parser-text-brand)]">
        {icon}
      </span>
      <span
        className="min-w-px flex-1 text-sm leading-5 tracking-[0.15px] text-[var(--parser-text-neutral-primary)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label}
      </span>
    </Comp>
  )
}

function HelpCenter({
  className,
  items = defaultItems,
  ...props
}: HelpCenterProps) {
  const primaryItems = items.slice(0, 3)
  const legalItem = items[3]

  return (
    <div
      className={cn(
        'flex w-[232px] flex-col items-start justify-center rounded-[12px] bg-white px-1 py-1 shadow-[0px_3px_14px_0px_rgba(0,0,0,0.25)]',
        className,
      )}
      {...props}
    >
      {primaryItems.map((item) => (
        <HelpCenterRow key={item.label} {...item} />
      ))}

      {legalItem && (
        <>
          <MenuDivider className="w-full" />
          <HelpCenterRow {...legalItem} />
        </>
      )}
    </div>
  )
}

export { HelpCenter }
export type { HelpCenterItem, HelpCenterProps }
