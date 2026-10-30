import * as React from "react"

import { ExpandableContentTrigger } from "@/components/ui/expandable-content-trigger"
import { cn } from "@/lib/utils"

type ExpandableContentProps = React.ComponentProps<"div"> & {
  /** Height of the content when it is collapsed, in pixels. */
  collapsedHeight: number
  collapseLabel?: React.ReactNode
  defaultExpanded?: boolean
  expandLabel?: React.ReactNode
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  triggerClassName?: string
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
  triggerClassName,
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
        <ExpandableContentTrigger
          className={cn("mt-2 justify-self-start", triggerClassName)}
          controls={contentId}
          expanded={expanded}
          onClick={handleExpandedChange}
        >
          {expanded ? collapseLabel : expandLabel}
        </ExpandableContentTrigger>
      )}
    </div>
  )
}

export { ExpandableContent }
export type { ExpandableContentProps }
