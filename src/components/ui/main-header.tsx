import * as React from "react";
import { CircleHelp, Menu as MenuIcon } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { HelpCenter } from "@/components/ui/help-center";
import { IconButton } from "@/components/ui/icon-button";
import { Menu } from "@/components/ui/menu";
import { MenuDivider } from "@/components/ui/menu-divider";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { useMenuOpen } from "@/hooks/use-menu-open";
import { cn } from "@/lib/utils";

const logoSrc = "/Rhood/assets/rhood-logo.svg";

type MainHeaderNavItem = {
  active?: boolean;
  href?: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  propNew?: boolean;
  state?: "default" | "hovered";
};

type MainHeaderProps = React.ComponentProps<"header"> & {
  button?: boolean;
  /** Controls the horizontal width of the header content. */
  contentWidth?: "full" | "container";
  controls?: boolean;
  logoHref?: string;
  navAlign?: "start" | "end";
  navItems?: MainHeaderNavItem[];
  resp?: "mob" | "desk";
};

const defaultNavItems: MainHeaderNavItem[] = [
  { active: true, label: "Набор базы" },
  { label: "Мои объекты" },
  { label: "Подборки" },
  { label: "Избранное" },
];

function MainHeader({
  button = true,
  className,
  contentWidth = "full",
  controls = true,
  logoHref,
  navAlign = "start",
  navItems = defaultNavItems,
  resp = "desk",
  ...props
}: MainHeaderProps) {
  const isMobile = resp === "mob";
  const contentWidthClass =
    contentWidth === "container"
      ? "rhood-layout-container"
      : "rhood-page-gutter";
  const helpMenuRef = React.useRef<HTMLDivElement | null>(null);
  const avatarMenuRef = React.useRef<HTMLDivElement | null>(null);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useMenuOpen(helpMenuRef);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useMenuOpen(avatarMenuRef);

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (!helpMenuRef.current?.contains(target)) {
        setIsHelpMenuOpen(false);
      }

      if (!avatarMenuRef.current?.contains(target)) {
        setIsAvatarMenuOpen(false);
      }
    }

    if (isHelpMenuOpen || isAvatarMenuOpen) {
      document.addEventListener("mousedown", handlePointerDown);
    }

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isAvatarMenuOpen, isHelpMenuOpen, setIsAvatarMenuOpen, setIsHelpMenuOpen]);

  if (isMobile) {
    return (
      <header
        className={cn(
          "w-full overflow-hidden border-b border-[color:var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)]",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            contentWidthClass,
            "flex h-14 items-center justify-between py-2",
          )}
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
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "w-full border-b border-[color:var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          contentWidthClass,
          "relative flex items-center gap-6 py-4",
        )}
      >
        <div className="flex shrink-0 items-center justify-start">
          {logoHref ? (
            <a aria-label="На главную" href={logoHref}>
              <img alt="Rhood" className="h-[32px] w-auto" src={logoSrc} />
            </a>
          ) : (
            <img
              alt="Rhood"
              className="h-[30px] w-auto shrink-0"
              src={logoSrc}
            />
          )}
        </div>

        <nav
          className={cn("flex items-center gap-1", navAlign === "end" && "ml-auto")}
        >
          {navItems.map((item) => {
            const className = cn(
              "group inline-flex cursor-pointer items-center justify-center rounded-[var(--rh-sizing-common-input-shape-border-radius)] px-2 py-2",
              item.active || item.state === "hovered"
                ? "gap-2"
                : "gap-1 hover:gap-2",
            );
            const content = (
              <>
                <span
                  className={cn(
                    "rh-typography-b1 whitespace-nowrap font-[500]",
                    item.active || item.state === "hovered"
                      ? "text-[var(--rh-theme-text-neutral-primary)]"
                      : "text-[var(--rh-theme-text-neutral-secondary)] group-hover:text-[var(--rh-theme-text-neutral-primary)]",
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
              </>
            );

            return item.href ? (
              <a
                aria-current={item.active ? "page" : undefined}
                className={className}
                href={item.href}
                key={item.label}
              >
                {content}
              </a>
            ) : (
              <button
                className={className}
                key={item.label}
                onClick={item.onClick}
                type="button"
              >
                {content}
              </button>
            );
          })}
        </nav>

        {controls && (
          <div className="ml-auto flex h-[34px] shrink-0 items-center gap-2">
          <div ref={helpMenuRef} className="relative">
            <IconButton
              appearance="inherit"
              aria-expanded={isHelpMenuOpen}
              aria-haspopup="menu"
              aria-label="Help"
              className="text-[var(--rh-theme-icon-neutral-primary)]"
              icon={<CircleHelp aria-hidden="true" strokeWidth={2} />}
              onClick={() => {
                setIsHelpMenuOpen((open) => !open);
                setIsAvatarMenuOpen(false);
              }}
              size="sm"
            />

            {isHelpMenuOpen && (
              <HelpCenter className="absolute right-0 top-full z-20 mt-2" />
            )}
          </div>
          <div ref={avatarMenuRef} className="relative shrink-0">
          <button
            aria-expanded={isAvatarMenuOpen}
            aria-haspopup="menu"
            aria-label="Профиль"
            className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rh-theme-text-brand)]"
            onClick={() => {
              setIsAvatarMenuOpen((open) => !open);
              setIsHelpMenuOpen(false);
            }}
            type="button"
          >
            <Avatar size="32px" type="image" />
          </button>

          {isAvatarMenuOpen && (
            <Menu
              align="right"
              className="absolute right-0 top-full z-20 mt-1"
              role="menu"
            >
              {["Профиль", "Статистика"].map((item) => (
                <MenuItemSingleSelect
                  icon={false}
                  key={item}
                  onClick={() => setIsAvatarMenuOpen(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setIsAvatarMenuOpen(false);
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
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setIsAvatarMenuOpen(false);
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
          </div>
        )}
      </div>
    </header>
  );
}

export { MainHeader };
export type { MainHeaderNavItem, MainHeaderProps };
