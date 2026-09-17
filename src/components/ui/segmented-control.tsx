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

const sizeClasses: Record<SegmentSize, string> = {
  lg: "h-[var(--rh-sizing-base-module-7)] rounded-[var(--rh-sizing-border-radius-border-radius-lg)]",
  md: "h-[var(--rh-sizing-base-module-5)] rounded-[var(--rh-sizing-border-radius-border-radius-md)]",
  sm: "h-[var(--rh-sizing-base-module-4-5)] rounded-[var(--rh-sizing-border-radius-border-radius-md)]",
}

const colorClasses: Record<SegmentColor, string> = {
  neutral: "bg-[var(--rh-theme-fill-neutral)]",
  contrast: "border border-[var(--rh-theme-border-light)] bg-[var(--rh-theme-fill-contrast-static)]",
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
      className={cn(
        "inline-flex w-fit items-center gap-[var(--rh-sizing-base-module-0-25)] overflow-clip p-[var(--rh-sizing-base-module-0-5)]",
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
      role={selectionMode === "single" ? "radiogroup" : "group"}
      {...props}
    >
      {segments}
    </div>
  )
}

export { SegmentedControl }
export type { SegmentedControlProps }
