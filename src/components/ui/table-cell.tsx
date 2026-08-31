import * as React from "react"
import { Square } from "lucide-react"

import { cn } from "@/lib/utils"

type TableCellType = "text" | "number" | "skeleton" | "checkbox" | "placeholder"

type TableCellProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
  custom?: boolean
  disGutters?: boolean
  instance1?: boolean
  instance2?: boolean
  sizeSmall?: boolean
  type?: TableCellType
}

const widthClass = "w-[120px]"

function getRootClasses({
  custom,
  disGutters,
  sizeSmall,
  type,
}: Pick<TableCellProps, "custom" | "disGutters" | "sizeSmall" | "type">) {
  if (type === "placeholder") {
    return sizeSmall ? "h-[36px]" : "h-[44px]"
  }

  if (type === "checkbox") {
    if (disGutters) {
      return sizeSmall ? "bg-transparent pr-2 py-0" : "bg-transparent pr-2 py-1"
    }

    return sizeSmall ? "bg-transparent px-2 py-0" : "bg-transparent px-2 py-1"
  }

  if (type === "skeleton" && !custom) {
    return cn(
      widthClass,
      "content-stretch flex flex-col items-start",
      disGutters ? (sizeSmall ? "py-[13px]" : "py-[23px]") : sizeSmall ? "px-3 py-[13px]" : "px-3 py-[23px]",
    )
  }

  if (type === "text" || type === "number") {
    return cn(
      widthClass,
      "content-stretch flex flex-col",
      type === "number" ? "items-end" : "items-start",
      disGutters ? (sizeSmall ? "py-2" : "py-3") : sizeSmall ? "px-3 py-2" : "px-3 py-3",
    )
  }

  return cn("relative bg-transparent", widthClass)
}

/**
 * Parser table cell matching the Figma `TableCell` component.
 */
function TableCell({
  children = null,
  className,
  custom = false,
  disGutters = false,
  instance1 = true,
  instance2 = false,
  sizeSmall = false,
  type = "text",
  ...props
}: TableCellProps) {
  const isText = type === "text"
  const isNumber = type === "number"
  const isSkeleton = type === "skeleton"
  const isCheckbox = type === "checkbox"

  return (
    <div
      className={cn(
        "relative bg-transparent",
        getRootClasses({ custom, disGutters, sizeSmall, type }),
        className,
      )}
      {...props}
    >
      {!custom && (isText || isNumber) && (
        <div
          className={cn(
            "flex h-5 w-full shrink-0 items-start",
            isNumber && "justify-end",
          )}
        >
          {isText && instance1 && (
            <div className="flex w-full flex-col items-start">
              <p
                className="w-full whitespace-nowrap font-normal text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-primary)]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Cell
              </p>
            </div>
          )}

          {isText && instance2 && (
            <div className="flex w-full flex-col items-start">
              <p
                className="w-full whitespace-nowrap font-normal text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-primary)]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                secondary instacne
              </p>
            </div>
          )}

          {isNumber && instance1 && (
            <div className="flex w-full flex-col items-start">
              <p
                className="w-full whitespace-nowrap font-normal text-right text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-primary)]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Cell
              </p>
            </div>
          )}

          {isNumber && instance2 && (
            <div className="flex w-full flex-col items-start">
              <p
                className="w-full whitespace-nowrap font-normal text-right text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-primary)]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                secondary instacne
              </p>
            </div>
          )}
        </div>
      )}

      {isSkeleton && !custom && (
        <div
          className={cn(
            "w-full overflow-clip rounded-lg bg-[var(--parser-fill-neutral-selected)]",
            sizeSmall ? "h-[6px]" : "h-[6px]",
          )}
        />
      )}

      {isCheckbox && !custom && (
        <div
          className={cn(
            "flex h-5 items-center justify-center",
            sizeSmall ? "gap-2" : "gap-2",
          )}
        >
          <span className="flex size-5 shrink-0 items-center justify-center text-[var(--parser-text-neutral-primary)]">
            <Square aria-hidden="true" className="size-4" strokeWidth={2} />
          </span>
        </div>
      )}

      {type === "text" && custom && <div className="h-5 w-full">{children || null}</div>}
    </div>
  )
}

export { TableCell }
export type { TableCellProps, TableCellType }
