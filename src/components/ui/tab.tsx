import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type TabState = "default" | "hovered";
type TabDirection = "horizontal" | "vertical";

type TabProps = React.ComponentProps<"div"> & {
  direction?: TabDirection;
  indicator?: boolean;
  label?: React.ReactNode;
  secondaryLabel?: React.ReactNode;
  secondaryText?: boolean;
  selected?: boolean;
  startIcon?: boolean;
  state?: TabState;
};

function getRootClasses({
  direction,
  indicator,
  selected,
}: Pick<TabProps, "direction" | "indicator" | "selected">) {
  const isHorizontal = direction === "horizontal";

  if (isHorizontal) {
    return cn(
      "group relative flex cursor-pointer items-center justify-center gap-[var(--rh-sizing-common-input-gap-sm)]",
      selected &&
        indicator &&
        "border-b-2 border-[color:var(--rh-theme-text-neutral-primary)]",
      "py-[var(--rh-sizing-tabs-padding-py)]",
    );
  }

  return cn(
    "group relative flex cursor-pointer items-center justify-center gap-[var(--rh-sizing-common-input-gap-sm)]",
    selected &&
      indicator &&
      "border-l-2 border-[color:var(--rh-theme-text-neutral-primary)]",
    "px-[var(--rh-sizing-tabs-padding-px)] py-[var(--rh-sizing-tabs-padding-py)]",
  );
}

function getToneClass(selected: boolean) {
  return selected
    ? "text-[color:var(--rh-theme-text-neutral-primary)]"
    : "text-[color:var(--rh-theme-text-neutral-secondary)] hover:text-[color:var(--rh-theme-text-neutral-primary)]";
}

/**
 * Parser tab matching the Figma `Tab` component.
 */
function Tab({
  className,
  direction = "horizontal",
  indicator = true,
  label = "Tab",
  secondaryLabel = "Tab",
  secondaryText = false,
  selected = false,
  startIcon = false,
  state = "default",
  ...props
}: TabProps) {
  const isHorizontal = direction === "horizontal";
  const isActive = selected || state === "hovered";

  return (
    <div
      className={cn(
        getRootClasses({ direction, indicator, selected }),
        className,
      )}
      {...props}
    >
      {startIcon && (
        <Star
          className={cn(
            "size-[var(--rh-sizing-icon-icon-sm)] shrink-0",
            isActive
              ? "text-[color:var(--rh-theme-icon-neutral-primary)]"
              : "text-[color:var(--rh-theme-icon-neutral-secondary)] group-hover:text-[color:var(--rh-theme-icon-neutral-primary)]",
          )}
          strokeWidth={2}
        />
      )}

      <div
        className={cn(
          "flex min-w-px shrink-0 flex-col items-start justify-center gap-0.5 whitespace-nowrap",
          getToneClass(isActive),
        )}
      >
        <p
          className={cn(
            cn(
              selected ? "rh-typography-b2-med" : "rh-typography-b2",
              "relative shrink-0",
            ),
            isHorizontal && "whitespace-nowrap",
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {label}
        </p>

        {secondaryText && (
          <p
            className="rh-typography-b2 relative shrink-0"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {secondaryLabel}
          </p>
        )}
      </div>
    </div>
  );
}

export { Tab };
export type { TabDirection, TabProps, TabState };
