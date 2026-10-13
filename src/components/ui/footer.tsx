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
  const className = "rh-typography-b2 text-[var(--rh-theme-text-neutral-primary-contrast)]";

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
        <div className="flex flex-col items-center gap-10 text-center">
          <section>
            <p className="rh-typography-h4 text-[var(--rh-theme-text-neutral-primary-contrast)]">
              Parser RHOOD
            </p>
          </section>
          {sections.map((section) => (
            <section className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-4" key={section.title}>
              <h2 className="rh-typography-b2 w-full text-right text-[var(--rh-theme-text-neutral-primary-contrast)] opacity-60">
                {section.title}
              </h2>
              <nav aria-label={section.title} className="flex w-full flex-col items-start gap-2 text-left whitespace-nowrap">
                {section.items.map((item) => (
                  <FooterLinkItem key={item.label} {...item} />
                ))}
              </nav>
            </section>
          ))}
        </div>

      </div>
    </footer>
  );
}

export { Footer };
export type { FooterLink, FooterProps, FooterSection };
