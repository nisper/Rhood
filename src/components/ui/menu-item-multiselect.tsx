import * as React from "react";
import { Star } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

type MenuItemMultiselectState = "default" | "hovered";
type MenuItemMultiselectChecked = boolean | "none" | "true" | "indeterminate";

type MenuItemMultiselectProps = React.ComponentProps<"div"> & {
  icon?: boolean;
  caption?: boolean;
  checked?: MenuItemMultiselectChecked;
  disabled?: boolean;
  rightSlot?: boolean;
  rightSlotChip?: boolean;
  rightSlotText?: boolean;
  secondaryText?: boolean;
  selected?: boolean;
  startIcon?: boolean;
  state?: MenuItemMultiselectState;
};

function getBackground({
  disabled,
  state,
}: Pick<MenuItemMultiselectProps, "disabled" | "state">) {
  if (disabled) {
    return "bg-transparent";
  }

  if (state === "hovered") {
    return "bg-[var(--rh-theme-fill-neutral-hover)]";
  }

  return "bg-transparent";
}

function getTitleTone() {
  return "text-[color:var(--rh-theme-text-neutral-primary)]";
}

function getCaptionTone() {
  return "text-[color:var(--rh-theme-text-neutral-secondary)]";
}

function MenuItemMultiselect({
  children = "Menu Item",
  icon,
  caption = false,
  checked,
  className,
  disabled = false,
  rightSlot = true,
  rightSlotChip = true,
  rightSlotText = true,
  secondaryText = true,
  selected = false,
  startIcon = true,
  state = "default",
  ...props
}: MenuItemMultiselectProps) {
  const resolvedChecked: MenuItemMultiselectChecked =
    typeof checked === "boolean"
      ? checked
        ? "true"
        : "none"
      : (checked ?? (selected ? "true" : "none"));
  const resolvedRightSlotText = rightSlotText || caption;
  const rightSlotVisible =
    rightSlot && (resolvedRightSlotText || rightSlotChip);
  const disabledOpacityClass =
    "opacity-[calc(var(--rh-theme-opacity-disabled)/100)]";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-[var(--rh-sizing-menu-padding-gap-sm)] rounded-[var(--rh-sizing-border-radius-md)] px-[var(--rh-sizing-menu-padding-px-sm)]",
        "py-2.5",
        getBackground({ disabled, state }),
        !disabled &&
          "cursor-pointer hover:bg-[var(--rh-theme-fill-neutral-hover)]",
        className,
      )}
      {...props}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : props.onClick}
      onKeyDown={disabled ? undefined : props.onKeyDown}
    >
      <Checkbox
        aria-label={
          typeof children === "string" ? children : "Выбрать пункт меню"
        }
        checked={resolvedChecked === "true"}
        className="min-h-0 gap-0 py-0"
        disabled={disabled}
        indeterminate={resolvedChecked === "indeterminate"}
        label={false}
      />

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

      <div
        className={cn(
          "flex min-w-px flex-1 flex-col items-start",
          secondaryText && "justify-center",
          disabled && disabledOpacityClass,
        )}
      >
        <span
          className={cn(
            "w-full text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
            getTitleTone(),
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {children}
        </span>

        {secondaryText && (
          <span
            className={cn(
              "w-full text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
              getCaptionTone(),
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Secondary text
          </span>
        )}
      </div>

      {rightSlotVisible && (
        <div
          className={cn(
            "flex shrink-0 items-center gap-2",
            disabled && disabledOpacityClass,
          )}
        >
          {resolvedRightSlotText && (
            <span
              className={cn(
                "whitespace-nowrap text-[length:var(--rh-sizing-typography-font-size-xsm)] leading-[var(--rh-sizing-typography-line-height-xsm)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
                getCaptionTone(),
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {caption ? "Typography" : "rightSlot text"}
            </span>
          )}

          {rightSlotChip && (
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
        </div>
      )}
    </div>
  );
}

export { MenuItemMultiselect };
export type {
  MenuItemMultiselectChecked,
  MenuItemMultiselectProps,
  MenuItemMultiselectState,
};
