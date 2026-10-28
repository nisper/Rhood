import * as React from "react"
import { SquareArrowOutUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

type LinkSize = "b1" | "b2"

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
  asButton?: boolean
  buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  endIcon?: React.ReactNode
  external?: boolean
  externalLabel?: React.ReactNode
  size?: LinkSize
  startIcon?: React.ReactNode
}

const sizeClasses: Record<LinkSize, string> = {
  b1: "rh-typography-b1",
  b2: "rh-typography-b2",
}

/** Text link with optional leading and trailing icons. */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { asButton = false, buttonType = "button", children, className, endIcon, external = false, externalLabel, size = "b1", startIcon, ...props },
  ref,
) {
  const classes = cn(
    "group inline-flex cursor-pointer items-center gap-1 text-[var(--rh-theme-text-link)] transition-colors duration-150 hover:text-[var(--rh-theme-text-link-hovered)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)]",
    external && "max-w-full flex-wrap",
    sizeClasses[size],
    className,
  )
  const content = (
    <>
      {startIcon && <span className="flex shrink-0 [&_svg]:size-4">{startIcon}</span>}
      <span className={cn("underline-offset-2 group-hover:underline group-focus-visible:underline", external && "min-w-0")}>{children}</span>
      {(external || endIcon) && (
        <span className={cn(
          "flex shrink-0 items-center gap-1 [&_svg]:size-4",
          external && "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
        )}>
          {external ? <SquareArrowOutUpRight aria-hidden="true" className="text-[var(--rh-theme-text-neutral-secondary)]" /> : endIcon}
          {external && externalLabel && (
            <span className="inline-block text-[var(--rh-theme-text-neutral-secondary)] no-underline">{externalLabel}</span>
          )}
        </span>
      )}
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
