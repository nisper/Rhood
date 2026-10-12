import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"
import { ToggleChip } from "@/components/ui/toggle-chip"
import { cn } from "@/lib/utils"

type PaginationProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  size?: "md" | "sm"
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1)

  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1])
  if (currentPage <= 3) [2, 3, 4].forEach(page => pages.add(page))
  if (currentPage >= totalPages - 2) [totalPages - 3, totalPages - 2, totalPages - 1].forEach(page => pages.add(page))
  const ordered = [...pages].filter(page => page > 0 && page <= totalPages).sort((a, b) => a - b)

  return ordered.reduce<Array<number | "ellipsis">>((result, page, index) => {
    if (index > 0 && page - ordered[index - 1] > 1) result.push("ellipsis")
    result.push(page)
    return result
  }, [])
}

function Pagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  size = "md",
  ...props
}: PaginationProps) {
  const page = Math.min(Math.max(1, currentPage), Math.max(1, totalPages))
  const buttonSize = size === "sm" ? "sm" : "md"

  return (
    <nav aria-label="Пагинация" className={cn("flex items-center gap-1", className)} {...props}>
      <IconButton
        aria-label="Предыдущая страница"
        appearance="ghost"
        disabled={page <= 1}
        icon={<ChevronLeft aria-hidden="true" />}
        onClick={() => onPageChange?.(page - 1)}
        size={buttonSize}
      />
      {getVisiblePages(page, totalPages).map((item, index) => item === "ellipsis" ? (
        <span aria-hidden="true" className="flex items-center justify-center rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]" key={`ellipsis-${index}`}>…</span>
      ) : (
        <ToggleChip
          aria-current={item === page ? "page" : undefined}
          checked={item === page}
          color="neutral"
          icon={false}
          key={item}
          onClick={event => {
            event.preventDefault()
            onPageChange?.(item)
          }}
          size={buttonSize}
        >{item}</ToggleChip>
      ))}
      <IconButton
        aria-label="Следующая страница"
        appearance="ghost"
        disabled={page >= totalPages}
        icon={<ChevronRight aria-hidden="true" />}
        onClick={() => onPageChange?.(page + 1)}
        size={buttonSize}
      />
    </nav>
  )
}

export { Pagination }
export type { PaginationProps }
