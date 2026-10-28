import * as React from "react"
import { createPortal } from "react-dom"
import { ChevronDown, Star } from "lucide-react"

import { Chip } from "@/components/ui/chip"
import { FormHelperText } from "@/components/ui/form-helper-text"
import { cn } from "@/lib/utils"

type SelectSize = "md" | "sm"
type SelectContent = "text" | "chips"
type SelectAppearance = "default" | "ghost"
type SelectState = "default" | "hovered" | "focused"

type SelectProps = Omit<React.ComponentProps<"div">, "content"> & {
  appearance?: SelectAppearance
  content?: SelectContent
  disabled?: boolean
  error?: boolean
  expanded?: boolean
  /** Called when an open menu should be dismissed, for example after an outside click. */
  onExpandedChange?: (expanded: boolean) => void
  fullWidth?: boolean
  helperText?: React.ReactNode
  label?: React.ReactNode
  menu?: React.ReactNode
  size?: SelectSize
  icon?: React.ReactNode | boolean
  /** @deprecated Use icon. Kept for compatibility with existing consumers. */
  startIcon?: React.ReactNode | boolean
  state?: SelectState
  value?: React.ReactNode
}

const sizeTokens: Record<
  SelectSize,
  {
    container: string
    valueText: string
    helperText: string
    staticLabel: string
  }
> = {
  md: {
    container: "h-[calc(var(--spacing)*10)] px-[var(--rh-sizing-common-input-padding-px-md)] py-[var(--rh-sizing-common-input-padding-py-md)]",
    valueText: "rh-typography-b1",
    helperText: "text-[length:var(--rh-sizing-typography-font-size-xsm)] leading-[var(--rh-sizing-typography-line-height-xsm)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
    staticLabel: "text-[length:var(--rh-sizing-typography-font-size-xsm)] leading-[var(--rh-sizing-typography-line-height-xsm)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
  },
  sm: {
    container: "h-[calc(var(--spacing)*9)] px-[var(--rh-sizing-common-input-padding-px-sm)] py-[var(--rh-sizing-common-input-padding-py-sm)]",
    valueText: "rh-typography-b2",
    helperText: "text-[length:var(--rh-sizing-typography-font-size-xsm)] leading-[var(--rh-sizing-typography-line-height-xsm)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
    staticLabel: "text-[length:var(--rh-sizing-typography-font-size-xsm)] leading-[var(--rh-sizing-typography-line-height-xsm)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
  },
}

function getSurfaceClasses({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: SelectState
}) {
  if (disabled) {
    return "bg-[var(--rh-theme-fill-disabled)] text-[var(--rh-theme-text-neutral-disabled)]"
  }

  if (error) {
    return state === "focused"
      ? "border border-[color:var(--rh-theme-border-error)] bg-[var(--rh-theme-fill-error-light-hover)] text-[var(--rh-theme-text-error)] ring-1 ring-inset ring-[color:var(--rh-theme-border-error)]"
      : "bg-[var(--rh-theme-fill-error-light)] text-[var(--rh-theme-text-error)]"
  }

  if (state === "focused") {
    return "border border-[color:var(--rh-theme-border-focus)] bg-[var(--rh-theme-fill-neutral)] text-[var(--rh-theme-text-neutral-primary)] ring-1 ring-inset ring-[color:var(--rh-theme-border-focus)]"
  }

  if (state === "hovered") {
    return "bg-[var(--rh-theme-fill-neutral-hover)] text-[var(--rh-theme-text-neutral-primary)]"
  }

  return "bg-[var(--rh-theme-fill-neutral)] text-[var(--rh-theme-text-neutral-primary)]"
}

function getLabelTone({
  disabled,
  error,
  state,
}: {
  disabled: boolean
  error: boolean
  state: SelectState
}) {
  if (disabled) {
    return "text-[color:var(--rh-theme-text-neutral-disabled)]"
  }

  if (error) {
    return "text-[color:var(--rh-theme-text-error)]"
  }

  if (state === "focused") {
    return "text-[color:var(--rh-theme-text-brand)]"
  }

  return "text-[color:var(--rh-theme-text-neutral-secondary)]"
}

function resolveValue(value: React.ReactNode | undefined, fallback: string) {
  if (value === false) {
    return null
  }

  if (value === true || value === undefined) {
    return fallback
  }

  return value
}

function Select({
  appearance = "default",
  className,
  content = "text",
  disabled = false,
  error = false,
  expanded = false,
  onExpandedChange,
  fullWidth = false,
  helperText,
  label = "Label",
  menu,
  size = "md",
  state = "default",
  icon = false,
  startIcon = false,
  value,
  ...props
}: SelectProps) {
  const selectRef = React.useRef<HTMLDivElement>(null)
  const menuAnchorRef = React.useRef<HTMLDivElement>(null)
  const menuLayerRef = React.useRef<HTMLDivElement>(null)
  const [menuPosition, setMenuPosition] = React.useState<{
    left: number
    top: number
    width: number
  } | null>(null)
  const resolvedState: SelectState = disabled ? "default" : state
  const hasIcon = icon || startIcon
  const resolvedValue = resolveValue(value, "Value")
  const valueTextClass = appearance === "ghost" && size === "sm"
    ? "rh-typography-b2-med"
    : sizeTokens[size].valueText
  const valueTone = error
    ? "text-[color:var(--rh-theme-text-error)]"
    : disabled
      ? "text-[color:var(--rh-theme-text-neutral-disabled)]"
      : "text-[color:var(--rh-theme-text-neutral-primary)]"
  const iconTone = error
    ? "text-[var(--rh-theme-icon-error)]"
    : disabled
      ? "text-[var(--rh-theme-icon-neutral-disabled)]"
      : "text-[var(--rh-theme-icon-neutral-primary)]"

  React.useEffect(() => {
    if (!expanded) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        !selectRef.current?.contains(target) &&
        !menuLayerRef.current?.contains(target)
      ) {
        onExpandedChange?.(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [expanded, onExpandedChange])

  React.useLayoutEffect(() => {
    if (!expanded || !menu) {
      setMenuPosition(null)
      return
    }

    const updateMenuPosition = () => {
      const anchor = menuAnchorRef.current
      if (!anchor) return

      const rect = anchor.getBoundingClientRect()
      setMenuPosition({ left: rect.left, top: rect.bottom, width: rect.width })
    }

    updateMenuPosition()
    window.addEventListener("resize", updateMenuPosition)
    window.addEventListener("scroll", updateMenuPosition, true)

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(updateMenuPosition)
    if (menuAnchorRef.current) resizeObserver?.observe(menuAnchorRef.current)

    return () => {
      window.removeEventListener("resize", updateMenuPosition)
      window.removeEventListener("scroll", updateMenuPosition, true)
      resizeObserver?.disconnect()
    }
  }, [expanded, menu])

  return (
    <>
    <div className={cn("w-fit max-w-full", fullWidth && "w-full", className)} ref={selectRef} {...props}>
      {label !== false && (
        <label
          className={cn(
            "mb-1 block whitespace-nowrap font-normal",
            sizeTokens[size].staticLabel,
            getLabelTone({ disabled, error, state: resolvedState }),
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {label}
        </label>
      )}

      <div className={cn("relative w-fit max-w-full", fullWidth && "w-full")} ref={menuAnchorRef}>
        <div
          className={cn(
            "relative flex w-fit max-w-full items-center gap-[var(--rh-sizing-common-input-padding-gap-md)] rounded-[var(--rh-sizing-common-input-shape-border-radius)] transition-colors duration-150",
            fullWidth && "w-full",
            sizeTokens[size].container,
            appearance === "ghost" && !disabled && !error && "bg-transparent",
            !(appearance === "ghost" && !disabled && !error) && getSurfaceClasses({ disabled, error, state: resolvedState }),
            disabled ? "cursor-not-allowed" : "cursor-pointer",
            !disabled && !error && resolvedState === "default" && "hover:bg-[var(--rh-theme-fill-neutral-hover)]",
          )}
        >
        {hasIcon && (
          <span className={cn("flex shrink-0 items-center pr-2", disabled && "opacity-60")}>
            <Star className="size-5 shrink-0" strokeWidth={2} />
          </span>
        )}

        {content === "chips" ? (
          <div className={cn("flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-clip", disabled && "opacity-60")}>
            <Chip
              appearance="muted"
              color="neutral"
              icon={false}
              label
              propDelete
              size="md"
            >
              Microsoft
            </Chip>
            <Chip
              appearance="muted"
              color="neutral"
              icon={false}
              label
              propDelete
              size="md"
            >
              Apple
            </Chip>
            <span
              className={cn(
            "whitespace-nowrap pl-[var(--rh-sizing-common-input-padding-px-md)] pr-[calc(var(--spacing)*1)]",
                valueTone,
                valueTextClass,
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              +1
            </span>
          </div>
        ) : (
          <div
            className={cn(
              "flex min-w-0 flex-1 items-center overflow-hidden",
              valueTone,
              disabled && "opacity-60",
              valueTextClass,
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <span className="truncate">{resolvedValue}</span>
          </div>
        )}

        <span className={cn("mx-[-2px] flex w-5 shrink-0 items-center justify-center", disabled && "opacity-60")}>
          <ChevronDown
            className={cn("size-5 shrink-0 transition-transform duration-150", iconTone, expanded && "rotate-180")}
            strokeWidth={2}
          />
        </span>

        </div>
      </div>

      {helperText && (
        <FormHelperText
          className="mt-1"
          color={error ? "error" : disabled ? "disabled" : "default"}
        >
          {helperText}
        </FormHelperText>
      )}
    </div>
    {expanded && menu && menuPosition && typeof document !== "undefined"
      ? createPortal(
          <div
            data-menu-portal
            ref={menuLayerRef}
            style={{
              height: 0,
              left: menuPosition.left,
              position: "fixed",
              top: menuPosition.top,
              width: menuPosition.width,
              zIndex: 50,
            }}
          >
            {menu}
          </div>,
          document.body,
        )
      : null}
    </>
  )
}

export { Select }
export type { SelectProps, SelectSize, SelectContent, SelectState }
