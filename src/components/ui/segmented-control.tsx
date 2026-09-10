import * as React from "react"

import { Segment, type SegmentColor, type SegmentProps, type SegmentSize } from "@/components/ui/segment"
import { cn } from "@/lib/utils"

type SegmentedControlProps = Omit<React.ComponentProps<"div">, "color"> & {
  color?: SegmentColor
  defaultValue?: string | readonly string[]
  onValueChange?: (value: string | string[]) => void
  selectionMode?: "single" | "multiple"
  size?: SegmentSize
  value?: string | readonly string[]
}

/** A shared surface that visually combines two or more Segment components. */
function SegmentedControl({
  children,
  className,
  color = "neutral",
  defaultValue,
  onValueChange,
  selectionMode = "single",
  size = "md",
  value,
  ...props
}: SegmentedControlProps) {
  const height = size === "lg" ? "min-h-14" : size === "md" ? "min-h-10" : "min-h-9"
  const surface = color === "contrast"
    ? "border border-[var(--parser-border-light)] bg-[var(--parser-fill-contrast-static)]"
    : "bg-[var(--parser-fill-neutral)]"

  const content = children ?? <><Segment defaultSelected /><Segment /></>
  const childArray = React.Children.toArray(content)
  const getSegmentValue = (child: React.ReactNode, index: number) => {
    if (!React.isValidElement<SegmentProps>(child) || child.type !== Segment) return `segment-${index}`
    return typeof child.props.value === "string" ? child.props.value : `segment-${index}`
  }
  const normalizeValue = (nextValue: string | readonly string[] | undefined) => {
    if (nextValue === undefined) return []
    return Array.isArray(nextValue) ? [...nextValue] : [nextValue]
  }
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() => {
    if (defaultValue !== undefined) return normalizeValue(defaultValue)
    return childArray.flatMap((child, index) =>
      React.isValidElement<SegmentProps>(child) && child.type === Segment && child.props.defaultSelected
        ? [getSegmentValue(child, index)]
        : [],
    )
  })
  const selectedValues = value === undefined ? uncontrolledValue : normalizeValue(value)

  function selectValue(segmentValue: string) {
    const nextValue = selectionMode === "single"
      ? [segmentValue]
      : selectedValues.includes(segmentValue)
        ? selectedValues.filter((currentValue) => currentValue !== segmentValue)
        : [...selectedValues, segmentValue]

    if (value === undefined) setUncontrolledValue(nextValue)
    onValueChange?.(selectionMode === "single" ? nextValue[0] : nextValue)
  }

  const segments = childArray.map((child, index) => {
    if (!React.isValidElement(child) || child.type !== Segment) return child
    const segment = child as React.ReactElement<React.ComponentProps<typeof Segment>>
    const segmentValue = getSegmentValue(segment, index)
    return React.cloneElement(segment, {
      color: segment.props.color ?? color,
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        segment.props.onClick?.(event)
        if (!event.defaultPrevented && !segment.props.disabled) selectValue(segmentValue)
      },
      role: selectionMode === "single" ? "radio" : "checkbox",
      "aria-checked": selectedValues.includes(segmentValue),
      selected: selectedValues.includes(segmentValue),
      size: segment.props.size ?? size,
    })
  })

  return (
    <div
      aria-label="Segmented control"
      className={cn("inline-flex w-fit items-center gap-0.5 overflow-clip rounded-xl p-1", height, surface, className)}
      role={selectionMode === "single" ? "radiogroup" : "group"}
      {...props}
    >
      {segments}
    </div>
  )
}

export { SegmentedControl }
export type { SegmentedControlProps }
