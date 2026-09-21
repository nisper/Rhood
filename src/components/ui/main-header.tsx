import * as React from "react"
import { CircleHelp, Heart, Menu } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"
import { HelpCenter } from "@/components/ui/help-center"
import { IconButton } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

const logoDeskSrc = "/Rhood/assets/rhood-logo-header.svg"
const logoMobileSrc = "/Rhood/assets/rhood-logo-header.svg"

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
  { label: "Статистика" },
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
          "rhood-page-gutter-mobile flex h-14 w-full items-center justify-between overflow-hidden bg-[var(--parser-fill-neutral-dark-ultra)] py-2",
          className,
        )}
        {...props}
      >
        {logoHref ? (
          <a aria-label="На главную" className="shrink-0" href={logoHref}>
            <img alt="Rhood" className="h-6 w-[123px]" src={logoMobileSrc} />
          </a>
        ) : (
          <img alt="Rhood" className="h-6 w-[123px] shrink-0" src={logoMobileSrc} />
        )}

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
        "rhood-page-gutter flex w-full items-center gap-4 bg-[var(--parser-fill-neutral-dark-ultra)] py-2",
        className,
      )}
      {...props}
    >
      <div className="flex w-[90px] shrink-0 items-center justify-start">
        {logoHref ? (
          <a aria-label="На главную" href={logoHref}>
            <img alt="Rhood" className="h-4 w-[90px]" src={logoDeskSrc} />
          </a>
        ) : (
          <img alt="Rhood" className="h-4 w-[90px] shrink-0" src={logoDeskSrc} />
        )}
      </div>

      <nav className="flex min-w-0 flex-1 items-start justify-center gap-4 pl-2">
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
                "rh-typography-body-2-medium whitespace-nowrap",
                item.active || item.state === "hovered"
                  ? "text-[var(--parser-text-primary-contrast)]"
                  : "text-[rgba(255,255,255,0.6)] hover:text-[var(--parser-text-primary-contrast)]",
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
