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
        <div className="grid grid-cols-2 items-start gap-10 text-left">
          <section className="text-right">
            <p className="rh-typography-h4 text-[var(--rh-theme-text-neutral-primary-contrast)]">
              Parser RHOOD
            </p>
          </section>
          {sections.map((section) => (
            <section className="flex flex-col items-start gap-2" key={section.title}>
              <nav aria-label={section.title} className="flex flex-col items-start gap-2 whitespace-nowrap">
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
