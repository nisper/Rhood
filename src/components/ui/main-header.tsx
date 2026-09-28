import * as React from "react"
import { CircleHelp, Menu as MenuIcon } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"
import { HelpCenter } from "@/components/ui/help-center"
import { IconButton } from "@/components/ui/icon-button"
import { Menu } from "@/components/ui/menu"
import { MenuDivider } from "@/components/ui/menu-divider"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { cn } from "@/lib/utils"

const logoSrc = "/Rhood/assets/rhood-logo.svg"

type MainHeaderNavItem = {
  active?: boolean
  label: string
  propNew?: boolean
  state?: "default" | "hovered"
}

type MainHeaderProps = React.ComponentProps<"header"> & {
  button?: boolean
  logoHref?: string
  navItems?: MainHeaderNavItem[]
  resp?: "mob" | "desk"
}

const defaultNavItems: MainHeaderNavItem[] = [
  { active: true, label: "Набор базы" },
  { label: "Мои объекты" },
  { label: "Подборки" },
  { label: "Избранное" },
]

function MainHeader({
  button = true,
  className,
  logoHref,
  navItems = defaultNavItems,
  resp = "desk",
  ...props
}: MainHeaderProps) {
  const isMobile = resp === "mob"
  const [isHelpMenuOpen, setIsHelpMenuOpen] = React.useState(false)
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = React.useState(false)
  const helpMenuRef = React.useRef<HTMLDivElement | null>(null)
  const avatarMenuRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node

      if (!helpMenuRef.current?.contains(target)) {
        setIsHelpMenuOpen(false)
      }

      if (!avatarMenuRef.current?.contains(target)) {
        setIsAvatarMenuOpen(false)
      }
    }

    if (isHelpMenuOpen || isAvatarMenuOpen) {
      document.addEventListener("mousedown", handlePointerDown)
    }

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
    }
  }, [isAvatarMenuOpen, isHelpMenuOpen])

  if (isMobile) {
    return (
      <header
        className={cn(
          "rhood-page-gutter flex h-14 w-full items-center justify-between overflow-hidden bg-[var(--rh-theme-surface-bg)] py-2",
          className,
        )}
        {...props}
      >
        {logoHref ? (
          <a aria-label="На главную" className="shrink-0" href={logoHref}>
            <img alt="Rhood" className="h-6 w-auto" src={logoSrc} />
          </a>
        ) : (
          <img alt="Rhood" className="h-6 w-auto shrink-0" src={logoSrc} />
        )}

        {button && (
          <IconButton
            appearance="inherit"
            aria-label="Open menu"
            className="text-[var(--rh-theme-icon-neutral-primary)]"
            icon={<MenuIcon aria-hidden="true" strokeWidth={2} />}
            size="md"
          />
        )}
      </header>
    )
  }

  return (
    <header
      className={cn(
        "rhood-page-gutter relative flex w-full items-center gap-4 bg-[var(--rh-theme-surface-bg)] py-2",
        className,
      )}
      {...props}
    >
      <div className="flex w-[104px] shrink-0 items-center justify-start">
        {logoHref ? (
          <a aria-label="На главную" href={logoHref}>
            <img alt="Rhood" className="h-8 w-auto" src={logoSrc} />
          </a>
        ) : (
          <img alt="Rhood" className="h-8 w-auto shrink-0" src={logoSrc} />
        )}
      </div>

      <nav className="absolute left-1/2 flex -translate-x-1/2 items-start gap-4">
        {navItems.map((item) => (
          <button
            className={cn(
              "inline-flex cursor-pointer items-center justify-center rounded-full py-0.5",
              item.active || item.state === "hovered" ? "gap-2" : "gap-1 hover:gap-2",
            )}
            key={item.label}
            type="button"
          >
            <span
              className={cn(
                "rh-typography-b2-med whitespace-nowrap",
                item.active || item.state === "hovered"
                  ? "text-[var(--rh-theme-text-neutral-primary)]"
                  : "text-[var(--rh-theme-text-neutral-secondary)] hover:text-[var(--rh-theme-text-neutral-primary)]",
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {item.label}
            </span>
            {item.propNew && (
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
        ))}
      </nav>

      <div className="ml-auto flex h-[34px] shrink-0 items-center">
        <div ref={helpMenuRef} className="relative">
          <IconButton
            appearance="inherit"
            aria-expanded={isHelpMenuOpen}
            aria-haspopup="menu"
            aria-label="Help"
            className="text-[var(--rh-theme-icon-neutral-primary)]"
            icon={<CircleHelp aria-hidden="true" strokeWidth={2} />}
            onClick={() => {
              setIsHelpMenuOpen((open) => !open)
              setIsAvatarMenuOpen(false)
            }}
            size="sm"
          />

          {isHelpMenuOpen && (
            <HelpCenter className="absolute right-0 top-full z-20 mt-2" />
          )}
        </div>
      </div>
      <div ref={avatarMenuRef} className="relative shrink-0">
        <button
          aria-expanded={isAvatarMenuOpen}
          aria-haspopup="menu"
          aria-label="Профиль"
          className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rh-theme-text-brand)]"
          onClick={() => {
            setIsAvatarMenuOpen((open) => !open)
            setIsHelpMenuOpen(false)
          }}
          type="button"
        >
          <Avatar content="image" size="32px" />
        </button>

        {isAvatarMenuOpen && (
          <Menu
            align="right"
            className="absolute right-0 top-full z-20 mt-1"
            role="menu"
          >
            {['Профиль', 'Статистика'].map((item) => (
              <MenuItemSingleSelect
                icon={false}
                key={item}
                onClick={() => setIsAvatarMenuOpen(false)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setIsAvatarMenuOpen(false)
                  }
                }}
                rightSlot={false}
                role="menuitem"
                secondaryText={false}
                selected={false}
                tabIndex={0}
              >
                {item}
              </MenuItemSingleSelect>
            ))}
            <MenuDivider className="w-full" />
            <MenuItemSingleSelect
              icon={false}
              onClick={() => setIsAvatarMenuOpen(false)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setIsAvatarMenuOpen(false)
                }
              }}
              rightSlot={false}
              role="menuitem"
              secondaryText={false}
              selected={false}
              tabIndex={0}
            >
              Выход
            </MenuItemSingleSelect>
          </Menu>
        )}
      </div>
    </header>
  )
}

export { MainHeader }
export type { MainHeaderNavItem, MainHeaderProps }
