import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span">;

function Badge({
  children,
  className,
  style,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center whitespace-nowrap rounded-sm bg-[var(--rh-theme-fill-error)] px-[3px] pb-px pt-[2px] text-[8px] leading-none font-medium text-[var(--rh-theme-text-neutral-primary-contrast)]",
        className,
      )}
      style={{ fontVariationSettings: "'wdth' 100", ...style }}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps };
