import * as React from "react"

import { cn } from "@/lib/utils"

type LinkSize = "b1" | "b2"

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
  endIcon?: React.ReactNode
  size?: LinkSize
  startIcon?: React.ReactNode
}

const sizeClasses: Record<LinkSize, string> = {
  b1: "rh-typography-b1",
  b2: "rh-typography-b2",
}

/** Text link with optional leading and trailing icons. */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, className, endIcon, size = "b1", startIcon, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 text-[var(--rh-theme-text-link)] underline underline-offset-2 transition-colors duration-150 hover:text-[var(--rh-theme-text-link-hovered)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)]",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {startIcon && <span className="flex shrink-0 [&_svg]:size-4">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex shrink-0 [&_svg]:size-4">{endIcon}</span>}
    </a>
  )
})

export { Link }
export type { LinkProps, LinkSize }
