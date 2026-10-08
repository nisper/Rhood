import * as React from "react"

import { cn } from "@/lib/utils"

const imageContent = "/Rhood/assets/avatar-32.png"
const iconContent: Record<AvatarSize, string> = {
  "20px": "/Rhood/assets/avatar-user-20.svg",
  "24px": "/Rhood/assets/avatar-user-24.svg",
  "32px": "/Rhood/assets/avatar-user-32.svg",
  "40px": "/Rhood/assets/avatar-user-32.svg",
}

type AvatarSize = "20px" | "24px" | "32px" | "40px"
type AvatarType = "text" | "icon" | "image" | "skeleton"

type AvatarProps = React.ComponentProps<"div"> & {
  badge?: boolean
  children?: React.ReactNode
  /** Source for the image avatar. Falls back to the RHOOD demo image. */
  imageSrc?: string
  size?: AvatarSize
  type?: AvatarType
}

const sizeClasses: Record<
  AvatarSize,
  {
    root: string
    text: string
    icon: string
  }
> = {
  "20px": {
    root: "size-[var(--rh-sizing-avatar-20)]",
    text: "text-[10px] leading-[20px] tracking-[0.4px]",
    icon: "size-[14px]",
  },
  "24px": {
    root: "size-[var(--rh-sizing-avatar-24)]",
    text: "text-xs leading-[20px] tracking-[0.4px]",
    icon: "size-4",
  },
  "32px": {
    root: "size-[var(--rh-sizing-avatar-32)]",
    text: "text-base leading-6 tracking-[0.024px]",
    icon: "size-5",
  },
  "40px": {
    root: "size-[var(--rh-sizing-avatar-40)]",
    text: "text-xl leading-[20px] tracking-[0.14px]",
    icon: "size-6",
  },
}

const badgeClasses: Record<
  AvatarSize,
  {
    root: string
  }
> = {
  "20px": {
    root: "bottom-[-2px] right-[-2px]",
  },
  "24px": {
    root: "bottom-[-2px] right-[-2px]",
  },
  "32px": {
    root: "bottom-0 right-0 border-2 border-[var(--rh-theme-surface-bg)]",
  },
  "40px": {
    root: "bottom-0 right-0 border-2 border-[var(--rh-theme-surface-bg)]",
  },
}

/**
 * Avatar matching the Figma `avatar` component set.
 */
function Avatar({
  badge = false,
  children = "EB",
  className,
  imageSrc = imageContent,
  size = "40px",
  type = "image",
  ...props
}: AvatarProps) {
  const isSkeleton = type === "skeleton"
  const hasImage = type === "image"
  const hasText = type === "text"
  const hasIcon = type === "icon"
  const baseFill =
    isSkeleton
      ? "bg-[var(--rh-theme-fill-skeleton)]"
      : !hasImage && "bg-[var(--rh-theme-fill-neutral-dark)]"

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden",
        sizeClasses[size].root,
        "rounded-full",
        baseFill,
        className,
      )}
      {...props}
    >
      {!isSkeleton && (hasImage || hasText) && (
        <div
          className={cn(
            "absolute inset-0 overflow-hidden pointer-events-none rounded-full",
          )}
        >
          {hasImage && (
            <img
              alt=""
              className="absolute inset-0 block size-full object-cover"
              src={imageSrc}
            />
          )}
          {hasText && (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center overflow-hidden font-normal text-[var(--rh-theme-text-neutral-primary-contrast)]",
                sizeClasses[size].text,
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <p className="leading-[inherit]">{children}</p>
            </div>
          )}
        </div>
      )}

      {!isSkeleton && hasIcon && (
        <div
          className={cn("relative shrink-0", sizeClasses[size].icon)}
        >
          <img alt="" className="absolute inset-0 size-full" src={iconContent[size]} />
        </div>
      )}

      {badge && (
        <div
          className={cn(
            "absolute size-2 rounded-full bg-[var(--rh-theme-fill-success)]",
            badgeClasses[size].root,
          )}
          data-name="indicator"
        />
      )}
    </div>
  )
}

export { Avatar }
export type { AvatarProps, AvatarSize, AvatarType }
