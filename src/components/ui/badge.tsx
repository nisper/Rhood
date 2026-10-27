import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span"> & {
  shape?: "default" | "circle";
};

function Badge({
  children,
  className,
  shape = "default",
  style,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center whitespace-nowrap rounded-sm bg-[var(--rh-theme-fill-error)] px-[3px] pb-[2px] pt-[2px] text-[8px] leading-none font-medium text-[var(--rh-theme-text-neutral-primary-contrast)]",
        shape === "circle" && "min-h-5 min-w-5 shrink-0 justify-center rounded-full px-1 py-0 text-[12px] leading-4 font-normal tabular-nums",
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
