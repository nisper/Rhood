import * as React from "react"
import { CircleHelp, Heart, Menu } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"
import { HelpCenter } from "@/components/ui/help-center"
import { IconButton } from "@/components/ui/icon-button"
import {
  MainHeaderMenuButton,
  type MainHeaderMenuButtonState,
} from "@/components/ui/main-header-menu-button"
import { cn } from "@/lib/utils"

const logoDeskSrc = "/assets/rhood-logo-header.svg"
const logoMobileSrc = "/assets/rhood-logo-header-full.svg"

type MainHeaderNavItem = {
  active?: boolean
  label: string
  propNew?: boolean
  state?: MainHeaderMenuButtonState
}

type MainHeaderProps = React.ComponentProps<"header"> & {
  button?: boolean
  navItems?: MainHeaderNavItem[]
  resp?: "mob" | "desk"
}

const defaultNavItems: MainHeaderNavItem[] = [
  { active: true, label: "Набор базы" },
  { label: "Мои объекты" },
  { label: "Подборки" },
  { label: "Статистика" },
]

function MainHeader({
  button = true,
  className,
  navItems = defaultNavItems,
  resp = "desk",
  ...props
}: MainHeaderProps) {
  const isMobile = resp === "mob"
  const [isHelpMenuOpen, setIsHelpMenuOpen] = React.useState(false)
  const helpMenuRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!helpMenuRef.current?.contains(event.target as Node)) {
        setIsHelpMenuOpen(false)
      }
    }

    if (isHelpMenuOpen) {
      document.addEventListener("mousedown", handlePointerDown)
    }

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
    }
  }, [isHelpMenuOpen])

  if (isMobile) {
    return (
      <header
        className={cn(
          "flex h-14 w-full items-center justify-between overflow-hidden bg-[var(--parser-fill-neutral-dark-ultra)] px-3 py-2",
          className,
        )}
        {...props}
      >
        <img alt="Rhood" className="h-6 w-[123px] shrink-0" src={logoMobileSrc} />

        {button && (
          <IconButton
            appearance="inherit"
            aria-label="Open menu"
            className="text-[var(--parser-text-primary-contrast)]"
            icon={<Menu aria-hidden="true" strokeWidth={2} />}
            size="md"
          />
        )}
      </header>
    )
  }

  return (
    <header
      className={cn(
        "flex w-full items-center gap-4 bg-[var(--parser-fill-neutral-dark-ultra)] px-6 py-2",
        className,
      )}
      {...props}
    >
      <div className="flex w-[90px] shrink-0 items-center justify-start">
        <img alt="Rhood" className="h-4 w-[90px] shrink-0" src={logoDeskSrc} />
      </div>

      <nav className="flex min-w-0 flex-1 items-start justify-center gap-4 pl-2">
        {navItems.map((item) => (
          <MainHeaderMenuButton
            key={item.label}
            propNew={item.propNew}
            selected={item.active}
            state={item.state ?? "default"}
            text={item.label}
          />
        ))}
      </nav>

      <div className="flex h-[34px] shrink-0 items-center">
        <IconButton
          appearance="inherit"
          aria-label="Favorites"
          className="text-[var(--parser-text-primary-contrast)]"
          icon={<Heart aria-hidden="true" strokeWidth={2} />}
          size="sm"
        />
        <div ref={helpMenuRef} className="relative">
          <IconButton
            appearance="inherit"
            aria-expanded={isHelpMenuOpen}
            aria-haspopup="menu"
            aria-label="Help"
            className="text-[var(--parser-text-primary-contrast)]"
            icon={<CircleHelp aria-hidden="true" strokeWidth={2} />}
            onClick={() => setIsHelpMenuOpen((open) => !open)}
            size="sm"
          />

          {isHelpMenuOpen && (
            <HelpCenter className="absolute right-0 top-full z-20 mt-2" />
          )}
        </div>
      </div>
      <Avatar content="image" size="32px" />
    </header>
  )
}

export { MainHeader }
export type { MainHeaderNavItem, MainHeaderProps }
