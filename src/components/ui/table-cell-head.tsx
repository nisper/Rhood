import * as React from "react"
import { ArrowUpDown, Square } from "lucide-react"

import { HelpIcon } from "@/components/ui/help-icon"
import { cn } from "@/lib/utils"

type TableCellHeadType = "text" | "checkbox" | "number" | "placeholder"

type TableCellHeadProps = React.ComponentProps<"div"> & {
  disGutters?: boolean
  helpIcon?: boolean
  secondaryText?: boolean
  sizeSmall?: boolean
  sort?: boolean
  type?: TableCellHeadType
}

function getRootClasses({
  disGutters,
  sizeSmall,
  type,
}: Pick<TableCellHeadProps, "disGutters" | "sizeSmall" | "type">) {
  if (type === "placeholder") {
    return sizeSmall ? "h-[36px] w-[120px]" : "h-[44px] w-[120px]"
  }

  if (type === "checkbox") {
    if (disGutters) {
      return sizeSmall
        ? "bg-transparent pr-2 py-0"
        : "bg-transparent pr-2 py-1"
    }

    return sizeSmall
      ? "bg-transparent px-2 py-0"
      : "bg-transparent px-2 py-1"
  }

  const width = "w-[120px]"
  const px = disGutters ? "" : "px-3"
  const py = sizeSmall ? "py-2" : "py-3"
  const align = type === "number" ? "items-end" : "items-start"

  return cn("content-stretch flex flex-col", align, px, py, width)
}

function getLabelTone(type: TableCellHeadType) {
  return type === "checkbox"
    ? "text-[color:var(--parser-text-neutral-primary)]"
    : "text-[color:var(--parser-text-neutral-primary)]"
}

/**
 * Parser table header cell matching the Figma `TableCellHead` component.
 */
function TableCellHead({
  className,
  disGutters = false,
  helpIcon = true,
  secondaryText = false,
  sizeSmall = false,
  sort = true,
  type = "text",
  ...props
}: TableCellHeadProps) {
  const isCheckbox = type === "checkbox"
  const isNumber = type === "number"
  const isText = type === "text"

  return (
    <div
      className={cn(
        "relative",
        getRootClasses({ disGutters, sizeSmall, type }),
        className,
      )}
      {...props}
    >
      {isText || isNumber ? (
        <div
          className={cn(
            "flex w-full items-start gap-2",
            isNumber && "justify-end",
            disGutters && "px-0",
          )}
        >
          <p
            className={cn(
              "whitespace-nowrap font-semibold text-sm leading-[1.43] tracking-[0.0238px]",
              getLabelTone(type),
              isNumber && "text-right",
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Head
          </p>

          {sort && (
            <span className="flex size-5 shrink-0 items-center justify-center text-[var(--parser-text-neutral-secondary)]">
              <ArrowUpDown aria-hidden="true" className="size-4" strokeWidth={2} />
            </span>
          )}

          {helpIcon && (
            <HelpIcon size="sm" state="default" tooltip="Typography" />
          )}
        </div>
      ) : null}

      {isText && secondaryText && (
        <div className="flex w-full items-center gap-2 pt-1">
          <p
            className="min-w-px flex-1 whitespace-nowrap text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-secondary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            secondary
          </p>
          {helpIcon && <span className="relative size-5 shrink-0" />}
        </div>
      )}

      {isNumber && secondaryText && (
        <div className="flex w-full items-center justify-end gap-2 pt-1">
          <p
            className="min-w-px flex-1 whitespace-nowrap text-right text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-secondary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            secondary
          </p>
          {helpIcon && <span className="relative size-5 shrink-0" />}
        </div>
      )}

      {isCheckbox && (
        <div className="flex items-start justify-start">
          <span className="flex size-5 shrink-0 items-center justify-center text-[var(--parser-text-neutral-primary)]">
            <Square aria-hidden="true" className="size-4" strokeWidth={2} />
          </span>
        </div>
      )}
    </div>
  )
}

export { TableCellHead }
export type { TableCellHeadProps, TableCellHeadType }
