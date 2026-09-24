import * as React from "react";
import { Check, Minus, Star } from "lucide-react";

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
  onMouseEnter,
  onMouseLeave,
  ...props
}: MenuItemMultiselectProps) {
  const [isHovered, setIsHovered] = React.useState(false);
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
  const checkboxState =
    resolvedChecked === "indeterminate"
      ? "indeterminate"
      : resolvedChecked === "true"
        ? "checked"
        : "unchecked";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-[var(--rh-sizing-menu-padding-gap-sm)] rounded-[var(--rh-sizing-border-radius-md)] px-[var(--rh-sizing-common-input-padding-px-md)] py-[var(--rh-sizing-common-input-padding-py-md)]",
        getBackground({ disabled, state }),
        !disabled &&
          "cursor-pointer hover:bg-[var(--rh-theme-fill-neutral-hover)]",
        className,
      )}
      {...props}
      aria-disabled={disabled || undefined}
      aria-checked={
        !props.role || props.role === "checkbox"
          ? checkboxState === "checked"
            ? true
            : checkboxState === "indeterminate"
              ? "mixed"
              : false
          : undefined
      }
      role={props.role ?? "checkbox"}
      onClick={disabled ? undefined : props.onClick}
      onKeyDown={disabled ? undefined : props.onKeyDown}
      onMouseEnter={(event) => {
        setIsHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setIsHovered(false);
        onMouseLeave?.(event);
      }}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none m-0.5 flex size-4 shrink-0 items-center justify-center rounded-[3px] border-2",
          disabled
            ? "border-[var(--parser-border-light)] bg-transparent text-transparent"
            : checkboxState === "checked" || checkboxState === "indeterminate"
              ? "border-[var(--parser-fill-brand)] bg-[var(--parser-fill-brand)] text-[var(--parser-text-primary-contrast)]"
              : isHovered || state === "hovered"
                ? "border-[var(--parser-fill-checkbox-neutral-hover)] bg-transparent text-transparent"
                : "border-[var(--parser-border-light)] bg-transparent text-transparent",
        )}
      >
        {checkboxState === "indeterminate" ? (
          <Minus className="size-3.5" strokeWidth={2} />
        ) : checkboxState === "checked" ? (
          <Check className="size-3.5" strokeWidth={2.5} />
        ) : null}
      </span>

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
            "rh-typography-b2 w-full",
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
