import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeColor = "neutral" | "brand" | "error" | "warning" | "success" | "contrast";
type BadgeAppearance = "muted" | "default";

type BadgeProps = React.ComponentProps<"span"> & {
  appearance?: BadgeAppearance;
  color?: BadgeColor;
  shape?: "default" | "circle";
};

const mutedColors: Record<Exclude<BadgeColor, "contrast">, string> = {
  neutral: "bg-[color:var(--parser-fill-neutral)] text-[color:var(--parser-text-neutral-primary)]",
  brand: "bg-[color:var(--parser-fill-brand-light)] text-[color:var(--parser-text-brand)]",
  error: "bg-[color:var(--parser-fill-error-light)] text-[color:var(--parser-text-error)]",
  warning: "bg-[color:var(--parser-fill-warning-light)] text-[color:var(--parser-text-warning)]",
  success: "bg-[color:var(--parser-fill-success-light)] text-[color:var(--parser-text-success)]",
};

const solidColors: Record<Exclude<BadgeColor, "contrast">, string> = {
  neutral: "bg-[color:var(--parser-fill-neutral-dark)] text-[color:var(--parser-text-primary-contrast)]",
  brand: "bg-[color:var(--parser-fill-brand)] text-[color:var(--parser-text-primary-contrast)]",
  error: "bg-[color:var(--parser-fill-error)] text-[color:var(--parser-text-primary-contrast)]",
  warning: "bg-[color:var(--parser-fill-warning)] text-[color:var(--parser-text-primary-contrast)]",
  success: "bg-[color:var(--parser-fill-success)] text-[color:var(--parser-text-primary-contrast)]",
};

function getColorClasses(color: BadgeColor, appearance: BadgeAppearance) {
  if (color === "contrast") {
    return appearance === "default"
      ? "bg-[color:var(--parser-fill-contrast-static)] text-[color:var(--parser-text-primary-static)]"
      : "bg-[color:var(--parser-fill-contrast-light)] text-[color:var(--parser-text-primary-static)]";
  }

  return appearance === "default" ? solidColors[color] : mutedColors[color];
}

function Badge({
  appearance = "default",
  children,
  className,
  color = "error",
  shape = "default",
  style,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center whitespace-nowrap rounded-sm px-[3px] pb-[2px] pt-[2px] text-[10px] leading-none font-medium",
        getColorClasses(color, appearance),
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
export type { BadgeAppearance, BadgeColor, BadgeProps };
