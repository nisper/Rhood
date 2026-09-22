import * as React from "react";
import { Star } from "lucide-react";

import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

type MenuItemSingleSelectState = "default" | "hovered";

type MenuItemSingleSelectProps = React.ComponentProps<"div"> & {
  icon?: boolean;
  chip?: boolean;
  disabled?: boolean;
  rightSlot?: boolean;
  rightSlotChip?: boolean;
  rightSlotText?: boolean;
  secondaryText?: boolean;
  selected?: boolean;
  startIcon?: boolean;
  state?: MenuItemSingleSelectState;
};

function getBackground({
  disabled,
  selected,
  state,
}: Pick<MenuItemSingleSelectProps, "disabled" | "selected" | "state">) {
  if (disabled) {
    return "bg-transparent";
  }

  if (selected && state === "default") {
    return "bg-[var(--rh-theme-fill-neutral-selected)]";
  }

  if (!selected && state === "hovered") {
    return "bg-[var(--rh-theme-fill-neutral-hover)]";
  }

  return "bg-transparent";
}

function MenuItemSingleSelect({
  chip,
  icon,
  children = "Menu Item",
  className,
  disabled = false,
  rightSlot = true,
  rightSlotChip = true,
  rightSlotText = true,
  secondaryText = true,
  selected = true,
  startIcon = true,
  state = "default",
  ...props
}: MenuItemSingleSelectProps) {
  const resolvedRightSlotChip = chip ?? rightSlotChip;
  const rightSlotVisible =
    rightSlot && (rightSlotText || resolvedRightSlotChip);
  const disabledOpacityClass =
    "opacity-[calc(var(--rh-theme-opacity-disabled)/100)]";

  return (
    <div
      className={cn(
        "flex w-full items-center gap-[var(--rh-sizing-menu-padding-gap-sm)] rounded-[var(--rh-sizing-border-radius-md)] px-[var(--rh-sizing-common-input-padding-px-md)] py-[var(--rh-sizing-common-input-padding-py-md)]",
        getBackground({ disabled, selected, state }),
        !disabled &&
          !selected &&
          "cursor-pointer hover:bg-[var(--rh-theme-fill-neutral-hover)]",
        className,
      )}
      {...props}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : props.onClick}
      onKeyDown={disabled ? undefined : props.onKeyDown}
    >
      {(icon ?? startIcon) && (
        <span
          className={cn(
            "flex size-[calc(var(--spacing)*5)] shrink-0 items-center justify-center text-[var(--rh-theme-text-neutral-primary)]",
            disabled && disabledOpacityClass,
          )}
        >
          <Star
            aria-hidden="true"
            className="size-[calc(var(--spacing)*5)]"
            strokeWidth={2}
          />
        </span>
      )}

      <span
        className={cn(
          "flex min-w-px flex-1 flex-col items-start font-normal",
          selected && state === "default" && "justify-center",
          disabled && disabledOpacityClass,
        )}
      >
        <span
          className="rh-typography-body-2 w-full text-[color:var(--rh-theme-text-neutral-primary)]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {children}
        </span>

        {secondaryText && (
          <span
            className="w-full text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)] text-[color:var(--rh-theme-text-neutral-secondary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Secondary text
          </span>
        )}
      </span>

      {rightSlotVisible && (
        <span
          className={cn(
            "flex shrink-0 items-center gap-2",
            disabled && disabledOpacityClass,
          )}
        >
          {rightSlotText && (
            <span
              className="whitespace-nowrap text-[length:var(--rh-sizing-typography-font-size-xsm)] leading-[var(--rh-sizing-typography-line-height-xsm)] tracking-[var(--rh-sizing-typography-letter-spacing-md)] text-[color:var(--rh-theme-text-neutral-secondary)]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              rightSlot text
            </span>
          )}

          {resolvedRightSlotChip && (
            <Chip
              appearance="outlined"
              color="brand"
              icon={false}
              propDelete={false}
              size="sm"
              thumbnail={false}
            >
              Chip
            </Chip>
          )}
        </span>
      )}
    </div>
  );
}

export { MenuItemSingleSelect };
export type { MenuItemSingleSelectProps, MenuItemSingleSelectState };
