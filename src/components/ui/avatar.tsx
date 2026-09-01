import * as React from "react"
import { User } from "lucide-react"

import { cn } from "@/lib/utils"

const imageContent = "/assets/avatar-32.png"

type AvatarSize = "20px" | "24px" | "32px" | "40px"
type AvatarVariant = "Circular" | "Rounded"
type AvatarContent = "text" | "icon" | "image"

type AvatarProps = React.ComponentProps<"div"> & {
  badge?: boolean
  children?: React.ReactNode
  content?: AvatarContent
  skeleton?: boolean
  size?: AvatarSize
  variant?: AvatarVariant
}

const sizeClasses: Record<
  AvatarSize,
  {
    root: string
    text: string
    icon: string
    image: string
  }
> = {
  "20px": {
    root: "size-5",
    text: "text-[10px] leading-[20px] tracking-[0.4px]",
    icon: "size-4",
    image: "size-[132.5%]",
  },
  "24px": {
    root: "size-6",
    text: "text-xs leading-[20px] tracking-[0.4px]",
    icon: "size-5",
    image: "size-[132.5%]",
  },
  "32px": {
    root: "size-8",
    text: "text-lg leading-[20px] tracking-[0.14px]",
    icon: "size-6",
    image: "size-[132.5%]",
  },
  "40px": {
    root: "size-10",
    text: "text-xl leading-[20px] tracking-[0.14px]",
    icon: "size-6",
    image: "size-[132.5%]",
  },
}

const badgeClasses: Record<
  AvatarSize,
  {
    root: string
    border: string
  }
> = {
  "20px": {
    root: "bottom-[-2px] right-[-2px]",
    border: "",
  },
  "24px": {
    root: "bottom-[-2px] right-[-2px]",
    border: "",
  },
  "32px": {
    root: "bottom-0 right-0 border-2 border-white",
    border: "border-2 border-white",
  },
  "40px": {
    root: "bottom-0 right-0 border-2 border-white",
    border: "border-2 border-white",
  },
}

/**
 * Parser avatar matching the Figma `avatar` component set.
 */
function Avatar({
  badge = false,
  children = "EB",
  className,
  content = "text",
  skeleton = false,
  size = "40px",
  variant = "Circular",
  ...props
}: AvatarProps) {
  const isRounded = variant === "Rounded"
  const hasImage = content === "image"
  const hasText = content === "text"
  const hasIcon = content === "icon"
  const rootRadius = isRounded ? "rounded-[8px]" : "rounded-full"
  const baseFill =
    skeleton || hasImage
      ? "bg-[var(--parser-fill-neutral)]"
      : "bg-[var(--parser-fill-neutral-dark)]"

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden",
        sizeClasses[size].root,
        rootRadius,
        baseFill,
        className,
      )}
      {...props}
    >
      {!skeleton && (hasImage || hasText) && (
        <div
          className={cn(
            "absolute inset-0 overflow-hidden pointer-events-none",
            rootRadius,
          )}
        >
          {hasImage && (
            <img
              alt=""
              className={cn(
                "absolute left-[-16.25%] top-0 block max-w-none",
                sizeClasses[size].image,
              )}
              src={imageContent}
            />
          )}
          {hasText && (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center overflow-hidden font-medium text-[color:var(--parser-text-primary-contrast)]",
                sizeClasses[size].text,
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <p className="leading-[inherit]">{children}</p>
            </div>
          )}
        </div>
      )}

      {!skeleton && hasIcon && (
        <div
          className={cn(
            "absolute flex items-center justify-center",
            size === "20px"
              ? "relative size-4 shrink-0"
              : size === "24px"
                ? "left-[2px] top-[2px] size-5"
                : size === "32px"
                  ? "left-1 top-1 size-6"
                  : "left-2 top-2 size-6",
          )}
        >
          <User
            className="size-full text-[color:var(--parser-text-primary-contrast)]"
            strokeWidth={2}
          />
        </div>
      )}

      {badge && (
        <div
          className={cn(
            "absolute size-2 rounded-full bg-[var(--parser-fill-brand)]",
            badgeClasses[size].root,
            badgeClasses[size].border,
          )}
          data-name="indicator"
        />
      )}
    </div>
  )
}

export { Avatar }
export type { AvatarContent, AvatarProps, AvatarSize, AvatarVariant }
