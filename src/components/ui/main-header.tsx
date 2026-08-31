import * as React from "react"
import { CircleHelp, Heart, Menu } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"
import { ContrastButton } from "@/components/ui/contrast-button"
import { HelpCenter } from "@/components/ui/help-center"
import {
  MainHeaderMenuButton,
  type MainHeaderMenuButtonState,
} from "@/components/ui/main-header-menu-button"
import { cn } from "@/lib/utils"

const logoDeskSrc = "https://www.figma.com/api/mcp/asset/2c71a79a-c7f4-46bb-915e-e68d040100a5"
const logoMobileSrc = "https://www.figma.com/api/mcp/asset/3279bfec-7db0-46a2-9a7f-096fbe3ab4fe"

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

function MainHeader({
  button = true,
  className,
  navItems = [],
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
          "flex flex-col bg-[var(--parser-fill-neutral-dark-ultra)] px-0 py-2",
          className,
        )}
        {...props}
      >
        <div className="flex h-10 w-full items-center px-3">
          <div className="flex min-w-0 flex-1 items-center">
            <img alt="Rhood" className="h-5 w-[104px] shrink-0" src={logoMobileSrc} />
          </div>

          {button && (
            <ContrastButton
              aria-label="Open menu"
              className="rounded-lg"
              endIcon={false}
              iconOnly
              size="md"
              startIcon={<Menu aria-hidden="true" strokeWidth={2} />}
              variant="text"
            />
          )}
        </div>
      </header>
    )
  }

  return (
    <header
      className={cn(
        "flex items-center gap-4 bg-[var(--parser-fill-neutral-dark-ultra)] px-6 py-2",
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

      <div className="flex shrink-0 items-center gap-2">
        <ContrastButton
          aria-label="Favorites"
          className="rounded-full"
          endIcon={false}
          iconOnly
          size="sm"
          startIcon={<Heart aria-hidden="true" strokeWidth={2} />}
          variant="text"
        />
        <div ref={helpMenuRef} className="relative">
          <ContrastButton
            aria-expanded={isHelpMenuOpen}
            aria-haspopup="menu"
            aria-label="Help"
            className="rounded-full"
            endIcon={false}
            iconOnly
            onClick={() => setIsHelpMenuOpen((open) => !open)}
            size="sm"
            startIcon={<CircleHelp aria-hidden="true" strokeWidth={2} />}
            variant="text"
          />

          {isHelpMenuOpen && (
            <HelpCenter className="absolute right-0 top-full z-20 mt-2" />
          )}
        </div>
        <Avatar content="image" size="32px" />
      </div>
    </header>
  )
}

export { MainHeader }
export type { MainHeaderNavItem, MainHeaderProps }
