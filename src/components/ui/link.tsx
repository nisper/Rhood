import * as React from "react"

import { cn } from "@/lib/utils"

type LinkSize = "b1" | "b2"

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
  asButton?: boolean
  buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
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
  { asButton = false, buttonType = "button", children, className, endIcon, size = "b1", startIcon, ...props },
  ref,
) {
  const classes = cn(
    "inline-flex cursor-pointer items-center gap-1 text-[var(--rh-theme-text-link)] underline-offset-2 transition-colors duration-150 hover:text-[var(--rh-theme-text-link-hovered)] hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)]",
    sizeClasses[size],
    className,
  )
  const content = (
    <>
      {startIcon && <span className="flex shrink-0 [&_svg]:size-4">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex shrink-0 [&_svg]:size-4">{endIcon}</span>}
    </>
  )

  if (asButton) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonType}
        className={cn("border-0 bg-transparent p-0 text-left", classes)}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  }

  return (
    <a
      ref={ref}
      className={classes}
      {...props}
    >
      {content}
    </a>
  )
})

export { Link }
export type { LinkProps, LinkSize }
