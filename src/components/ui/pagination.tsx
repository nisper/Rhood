import * as React from "react"
import { MoveLeft, MoveRight } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

type PaginationProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
}

type PaginationPageButtonProps = {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}

function PaginationPageButton({ active, children, onClick }: PaginationPageButtonProps) {
  return (
    <button
      aria-current={active ? "page" : undefined}
      aria-label={`Страница ${children}`}
      className={cn(
        "inline-flex min-w-8 cursor-pointer items-center justify-center rounded-full border border-transparent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)]",
        "px-1 py-1",
        active
          ? "text-[var(--rh-theme-text-neutral-primary)]"
          : "text-[var(--rh-theme-text-neutral-secondary)] hover:bg-[var(--rh-theme-fill-neutral-hover)] hover:text-[var(--rh-theme-text-neutral-primary)]",
      )}
      onClick={onClick}
      type="button"
    >
      <span
        className="whitespace-nowrap px-2 rh-typography-b1"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {children}
      </span>
    </button>
  )
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
  ...props
}: PaginationProps) {
  const page = Math.min(Math.max(1, currentPage), Math.max(1, totalPages))

  return (
    <nav aria-label="Пагинация" className={cn("flex items-center gap-1", className)} {...props}>
      <IconButton
        aria-label="Предыдущая страница"
        appearance="ghost"
        icon={<MoveLeft aria-hidden="true" />}
        isDisabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        size="md"
      />
      {getVisiblePages(page, totalPages).map((item, index) => item === "ellipsis" ? (
        <span aria-hidden="true" className="flex items-center justify-center rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]" key={`ellipsis-${index}`}>…</span>
      ) : (
        <PaginationPageButton
          active={item === page}
          key={item}
          onClick={() => onPageChange?.(item)}
        >{item}</PaginationPageButton>
      ))}
      <IconButton
        aria-label="Следующая страница"
        appearance="ghost"
        icon={<MoveRight aria-hidden="true" />}
        isDisabled={page >= totalPages}
        onClick={() => onPageChange?.(page + 1)}
        size="md"
      />
    </nav>
  )
}

export { Pagination }
export type { PaginationProps }
