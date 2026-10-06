import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ExpandableContentProps = React.ComponentProps<"div"> & {
  /** Height of the content when it is collapsed, in pixels. */
  collapsedHeight: number
  collapseLabel?: React.ReactNode
  defaultExpanded?: boolean
  expandLabel?: React.ReactNode
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

/**
 * Reveals content that does not fit the configured collapsed height.
 * The control is hidden when all content already fits.
 */
function ExpandableContent({
  children,
  className,
  collapsedHeight,
  collapseLabel = "Свернуть",
  defaultExpanded = false,
  expandLabel = "Читать полностью",
  expanded: expandedProp,
  onExpandedChange,
  ...props
}: ExpandableContentProps) {
  const contentId = React.useId()
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [hasOverflow, setHasOverflow] = React.useState(false)
  const [contentHeight, setContentHeight] = React.useState(collapsedHeight)
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded)
  const expanded = expandedProp ?? uncontrolledExpanded

  const updateOverflow = React.useCallback(() => {
    const content = contentRef.current
    if (!content) return

    setContentHeight(content.scrollHeight)
    setHasOverflow(content.scrollHeight > collapsedHeight + 1)
  }, [collapsedHeight])

  React.useLayoutEffect(() => {
    updateOverflow()

    const content = contentRef.current
    if (!content || typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver(updateOverflow)
    observer.observe(content)

    return () => observer.disconnect()
  }, [updateOverflow])

  const handleExpandedChange = () => {
    const nextExpanded = !expanded
    if (expandedProp === undefined) setUncontrolledExpanded(nextExpanded)
    onExpandedChange?.(nextExpanded)
  }

  return (
    <div className={cn("grid items-start", className)} {...props}>
      <div
        id={contentId}
        ref={contentRef}
        className={cn(
          "min-w-0 overflow-hidden transition-[max-height] duration-200 motion-reduce:transition-none",
        )}
        style={{ maxHeight: expanded ? contentHeight : collapsedHeight }}
      >
        {children}
      </div>

      {hasOverflow && (
        <Button
          appearance="ghost"
          aria-controls={contentId}
          aria-expanded={expanded}
          className="mt-4 justify-self-start"
          endIcon={<ChevronDown aria-hidden="true" className={cn("transition-transform duration-150", expanded && "rotate-180")} />}
          onClick={handleExpandedChange}
          size="sm"
          startIcon={false}
        >
          {expanded ? collapseLabel : expandLabel}
        </Button>
      )}
    </div>
  )
}

export { ExpandableContent }
export type { ExpandableContentProps }
