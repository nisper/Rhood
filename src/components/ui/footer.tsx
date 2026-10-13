import * as React from "react";

import { helpCenterLinks } from "@/components/ui/help-center-links";
import { cn } from "@/lib/utils";

type FooterLink = {
  label: string;
  href?: string;
};

type FooterSection = {
  title: string;
  items: readonly FooterLink[];
};

type FooterProps = React.ComponentProps<"footer"> & {
  sections?: readonly FooterSection[];
};

const defaultSections: readonly FooterSection[] = [
  {
    title: "Разделы",
    items: [
      { label: "Набор базы", href: "/Rhood/?view=apartment-listings" },
      { label: "Мои объекты", href: "/Rhood/?view=my-listings" },
      { label: "Подборки" },
      { label: "Избранное" },
      { label: "Архив", href: "/Rhood/?view=archive" },
    ],
  },
  {
    title: "Помощь",
    items: helpCenterLinks.map(({ label, href }) => ({ label, href })),
  },
];

function FooterLinkItem({ href, label }: FooterLink) {
  const className = "rh-typography-b1 text-[var(--rh-theme-text-neutral-primary-contrast)]";

  return href ? (
    <a className={cn(className, "cursor-pointer hover:underline")} href={href}>
      {label}
    </a>
  ) : (
    <span className={className}>{label}</span>
  );
}

function Footer({
  className,
  sections = defaultSections,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-[var(--rh-theme-surface-neutral-ultra-dark)]",
        className,
      )}
      {...props}
    >
      <div className="rhood-layout-container py-10">
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {sections.map((section) => (
            <section className="grid content-start gap-5" key={section.title}>
              <h2 className="rh-typography-b2 text-[var(--rh-theme-text-neutral-primary-contrast)] opacity-60">
                {section.title}
              </h2>
              <nav aria-label={section.title} className="grid justify-items-start gap-2">
                {section.items.map((item) => (
                  <FooterLinkItem key={item.label} {...item} />
                ))}
              </nav>
            </section>
          ))}
          <section className="grid content-start gap-5">
            <h2 className="rh-typography-b2 text-[var(--rh-theme-text-neutral-primary-contrast)] opacity-60">
              О сервисе
            </h2>
            <p className="rh-typography-h4 text-[var(--rh-theme-text-neutral-primary-contrast)]">
              Работа с недвижимостью — в одном месте
            </p>
          </section>
        </div>

        <img
          alt="RHOOD"
          className="mt-14 block h-auto w-full opacity-20"
          src="/Rhood/assets/rhood-logo-header.svg"
        />

      </div>
    </footer>
  );
}

export { Footer };
export type { FooterLink, FooterProps, FooterSection };
