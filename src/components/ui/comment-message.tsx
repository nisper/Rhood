import * as React from "react"
import { EllipsisVertical, EyeOff, Info, Pencil, Trash2 } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"
import { IconButton } from "@/components/ui/icon-button"
import { Menu } from "@/components/ui/menu"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { useMenuOpen } from "@/hooks/use-menu-open"
import { cn } from "@/lib/utils"

type CommentMessageMetadata = "auto" | "private"

type CommentMessageProps = React.ComponentProps<"article"> & {
  author: string
  avatarSrc: string
  message: string
  metadata?: CommentMessageMetadata
  timestamp: string
}

function CommentMessageMetadata({ metadata }: { metadata: CommentMessageMetadata | undefined }) {
  if (metadata === "auto") {
    return (
      <div className="flex items-end gap-0.5 pt-2 text-[var(--rh-theme-text-neutral-secondary)]">
        <Info aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.8} />
        <span className="rh-typography-b2">Автокомментарий</span>
      </div>
    )
  }

  if (metadata === "private") {
    return (
      <div className="flex items-end gap-0.5 pt-2 text-[var(--rh-theme-text-neutral-secondary)]">
        <EyeOff aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.8} />
        <span className="rh-typography-b2">Только мне</span>
      </div>
    )
  }

  return null
}

function CommentMessage({
  author,
  avatarSrc,
  className,
  message,
  metadata,
  timestamp,
  ...props
}: CommentMessageProps) {
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useMenuOpen(menuRef)

  return (
    <article className={cn("flex items-start gap-3", className)} {...props}>
      <Avatar imageSrc={avatarSrc} />
      <div className="grid min-w-0 flex-1 gap-0.5">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <span className="min-w-0 flex-1 truncate rh-typography-b1-med">{author}</span>
          <span className="shrink-0 rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">{timestamp}</span>
        </div>
        <p className="rh-typography-b1">{message}</p>
        <CommentMessageMetadata metadata={metadata} />
      </div>
      <div className="relative -mt-1.5 shrink-0" ref={menuRef}>
        <IconButton
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          aria-label="Действия с комментарием"
          appearance="ghost"
          className="[&_svg]:size-5"
          icon={<EllipsisVertical aria-hidden="true" strokeWidth={2} />}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          size="xsm"
        />
        {isMenuOpen && (
          <Menu align="right" className="absolute right-0 top-[calc(100%+4px)] z-10" role="menu">
            <MenuItemSingleSelect
              icon={<Pencil aria-hidden="true" className="size-5" strokeWidth={2} />}
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              secondaryText={false}
              rightSlot={false}
              selected={false}
            >
              Редактировать
            </MenuItemSingleSelect>
            <MenuItemSingleSelect
              icon={<Trash2 aria-hidden="true" className="size-5" strokeWidth={2} />}
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              secondaryText={false}
              rightSlot={false}
              selected={false}
            >
              Удалить
            </MenuItemSingleSelect>
          </Menu>
        )}
      </div>
    </article>
  )
}

export { CommentMessage }
export type { CommentMessageMetadata, CommentMessageProps }
