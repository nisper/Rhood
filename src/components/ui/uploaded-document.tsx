import * as React from "react"
import { FileText, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"

type UploadedDocumentFontWeight = "medium" | "regular"
type UploadedDocumentState = "default" | "hovered" | "focused"

type UploadedDocumentProps = React.ComponentProps<"div"> & {
  dense?: boolean
  disGutters?: boolean
  fontWeight?: UploadedDocumentFontWeight
  iconButton?: boolean
  secondaryText?: boolean
  selected?: boolean
  startIcon?: boolean
  state?: UploadedDocumentState
}

function getContainerClasses({
  dense,
  disGutters,
  selected,
  state,
}: {
  dense: boolean
  disGutters: boolean
  selected: boolean
  state: UploadedDocumentState
}) {
  const isActive = selected || (state === "focused" && !selected)
  const isHovered = state === "hovered" && !selected

  return cn(
    "flex w-[260px] items-center rounded-[8px]",
    dense ? "py-1" : "py-2",
    !disGutters && "px-4",
    isActive && "bg-[var(--parser-fill-neutral-selected)]",
    isHovered && "bg-[var(--parser-fill-neutral-hover)]",
  )
}

function UploadedDocument({
  className,
  dense = false,
  disGutters = false,
  fontWeight = "regular",
  iconButton = true,
  secondaryText = false,
  selected = false,
  startIcon = true,
  state = "default",
  ...props
}: UploadedDocumentProps) {
  const titleClass =
    fontWeight === "medium"
      ? "font-medium text-[16px] leading-[1.5] tracking-[0.024px]"
      : "font-normal text-[16px] leading-[1.5] tracking-[0.024px]"
  const secondaryClass = "font-normal text-[14px] leading-[1.43] tracking-[0.0238px]"

  return (
    <div
      className={cn(getContainerClasses({ dense, disGutters, selected, state }), className)}
      {...props}
    >
      {startIcon && (
        <div
          className={cn(
            "flex shrink-0 items-start",
            disGutters ? "pr-0" : "pr-4",
          )}
        >
          <FileText className="size-6 shrink-0 text-[color:var(--parser-text-neutral-secondary)]" strokeWidth={2} />
        </div>
      )}

      <div
        className={cn(
          "flex min-w-px flex-1 flex-col items-start py-1",
          disGutters ? "pl-0" : "",
        )}
      >
        <p
          className={cn(
            "relative shrink-0 w-full text-[color:var(--parser-text-neutral-primary)]",
            titleClass,
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          List item
        </p>

        {secondaryText && (
          <p
            className={cn(
              "relative shrink-0 w-full text-[color:var(--parser-text-neutral-secondary)]",
              secondaryClass,
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Secondary
          </p>
        )}
      </div>

      {iconButton && (
        <button
          aria-label="Delete"
          className="ml-2 inline-flex shrink-0 items-center justify-center overflow-clip rounded-[8px] px-2 py-2"
          type="button"
        >
          <Trash2 className="size-4 shrink-0 text-[color:var(--parser-text-neutral-secondary)]" strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

export { UploadedDocument }
export type { UploadedDocumentFontWeight, UploadedDocumentProps, UploadedDocumentState }
