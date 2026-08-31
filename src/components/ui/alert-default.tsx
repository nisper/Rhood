import * as React from "react"
import {
  CircleAlert,
  CircleCheck,
  Info,
  Send,
  TriangleAlert,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

type AlertDefaultColor = "error" | "warning" | "info" | "neutral" | "brand"
type AlertDefaultStyle = "muted" | "outlined" | "contrast"
type AlertDefaultResp = "desk" | "mob"

type AlertDefaultProps = Omit<
  React.ComponentProps<"div">,
  "color" | "style" | "title"
> & {
  action?: boolean
  bigIcon?: boolean
  children?: React.ReactNode | null
  closeButton?: boolean
  color?: AlertDefaultColor
  description?: boolean
  icon?: boolean
  resp?: AlertDefaultResp
  style?: AlertDefaultStyle
  title?: boolean
}

const toneClasses: Record<
  AlertDefaultColor,
  {
    bg: string
    border: string
    text: string
    icon: string
    bigIconBg: string
    bigIconTone: string
    contrastBigIconTone: string
  }
> = {
  brand: {
    bg: "bg-[color:var(--parser-fill-brand-light)]",
    border: "border-[color:var(--parser-border-brand-light)]",
    text: "text-[color:var(--parser-text-brand)]",
    icon: "text-[color:var(--parser-text-brand)]",
    bigIconBg: "bg-[color:var(--parser-fill-brand)]",
    bigIconTone: "text-[color:var(--parser-text-primary-contrast)]",
    contrastBigIconTone: "text-[color:var(--parser-text-brand)]",
  },
  error: {
    bg: "bg-[color:var(--parser-fill-error-light)]",
    border: "border-[color:var(--parser-border-error-light)]",
    text: "text-[color:var(--parser-text-error)]",
    icon: "text-[color:var(--parser-text-error)]",
    bigIconBg: "bg-[color:var(--parser-fill-error)]",
    bigIconTone: "text-[color:var(--parser-text-primary-contrast)]",
    contrastBigIconTone: "text-[color:var(--parser-text-error)]",
  },
  info: {
    bg: "bg-[color:var(--parser-fill-info-light)]",
    border: "border-[color:var(--parser-border-info-light)]",
    text: "text-[color:var(--parser-text-info)]",
    icon: "text-[color:var(--parser-text-info)]",
    bigIconBg: "bg-[color:var(--parser-fill-info)]",
    bigIconTone: "text-[color:var(--parser-text-primary-contrast)]",
    contrastBigIconTone: "text-[color:var(--parser-text-info)]",
  },
  neutral: {
    bg: "bg-[color:var(--parser-fill-neutral)]",
    border: "border-[color:var(--parser-border-light)]",
    text: "text-[color:var(--parser-text-primary-static)]",
    icon: "text-[color:var(--parser-text-primary-static)]",
    bigIconBg: "bg-[color:var(--parser-fill-neutral-dark)]",
    bigIconTone: "text-[color:var(--parser-text-primary-contrast)]",
    contrastBigIconTone: "text-[color:var(--parser-text-primary-static)]",
  },
  warning: {
    bg: "bg-[color:var(--parser-fill-warning-light)]",
    border: "border-[color:var(--parser-border-warning-light)]",
    text: "text-[color:var(--parser-text-warning)]",
    icon: "text-[color:var(--parser-text-warning)]",
    bigIconBg: "bg-[color:var(--parser-fill-warning)]",
    bigIconTone: "text-[color:var(--parser-text-primary-contrast)]",
    contrastBigIconTone: "text-[color:var(--parser-text-warning)]",
  },
}

const bigIconToneMap: Record<
  AlertDefaultColor,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  brand: Send,
  error: Send,
  info: Send,
  neutral: Send,
  warning: Send,
}

const smallIconMap: Record<
  AlertDefaultColor,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  brand: CircleCheck,
  error: CircleAlert,
  info: Info,
  neutral: CircleCheck,
  warning: TriangleAlert,
}

function BigIcon({
  color,
  contrast,
}: {
  color: AlertDefaultColor
  contrast: boolean
}) {
  const Icon = bigIconToneMap[color]
  const tone = toneClasses[color]

  return (
    <div
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full",
        contrast ? "bg-[color:var(--parser-fill-contrast)]" : tone.bigIconBg,
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn("size-8", contrast ? tone.contrastBigIconTone : tone.bigIconTone)}
        strokeWidth={2.2}
      />
    </div>
  )
}

function SmallIcon({
  color,
  contrast,
}: {
  color: AlertDefaultColor
  contrast: boolean
}) {
  const Icon = smallIconMap[color]
  const tone = toneClasses[color]

  return (
    <Icon
      aria-hidden="true"
      className={cn("size-5 shrink-0", contrast ? "text-[color:var(--parser-text-primary-contrast)]" : tone.icon)}
      strokeWidth={2.1}
    />
  )
}

function AlertDefault({
  action = true,
  bigIcon = true,
  children = null,
  closeButton = true,
  className,
  color = "error",
  description = true,
  icon = true,
  resp = "desk",
  style = "muted",
  title = true,
  ...props
}: AlertDefaultProps) {
  const tone = toneClasses[color]
  const isContrast = style === "contrast"
  const isDesk = resp === "desk"
  const isOutlined = style === "outlined"

  const rootClasses = cn(
    "w-[360px] overflow-hidden rounded-xl",
    isDesk ? "px-4 py-[6px]" : "p-4",
    isContrast
      ? cn(tone.bg, "text-[color:var(--parser-text-primary-contrast)]")
      : isOutlined
        ? cn("bg-white border", tone.border, tone.text)
        : cn(tone.bg, tone.text),
    className,
  )

  const containerClasses = cn(
    "flex w-full min-w-0",
    isDesk ? "items-center gap-4" : "items-start gap-4",
  )

  const contentClasses = cn(
    "min-w-0 flex-1",
    isDesk ? "flex items-center gap-4" : "flex flex-col gap-2",
  )

  const textBlockClasses = cn("min-w-0 flex-1", isDesk ? "flex flex-col gap-1" : "flex flex-col gap-1")

  const buttonTone = isContrast
    ? "text-[color:var(--parser-text-primary-contrast)]"
    : tone.text

  const CloseIcon = X

  return (
    <div aria-live="polite" className={rootClasses} role="alert" {...props}>
      <div className={containerClasses}>
        {bigIcon && (
          <div className={cn("shrink-0", isDesk ? "py-1" : "pt-0.5")}>
            {children || <BigIcon color={color} contrast={isContrast} />}
          </div>
        )}

        <div className={contentClasses}>
          {icon && (
            <div className={cn("shrink-0", isDesk ? "pt-0.5" : "pt-0.5")}>
              <SmallIcon color={color} contrast={isContrast} />
            </div>
          )}

          <div className={textBlockClasses}>
            {title && (
              <p
                className="text-base font-medium leading-6 tracking-[0.024px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Title
              </p>
            )}
            {description && (
              <p
                className="text-sm font-normal leading-5 tracking-[0.0238px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Description
              </p>
            )}
          </div>

          {action && (
            <button
              type="button"
              className={cn(
                "shrink-0 whitespace-nowrap text-sm leading-5 tracking-[0.15px] transition-opacity hover:opacity-80",
                isDesk ? "ml-auto self-center" : "self-start",
                buttonTone,
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Button
            </button>
          )}
        </div>

        {closeButton && (
          <button
            aria-label="Dismiss alert"
            type="button"
            className={cn(
              "ml-auto shrink-0 p-1 transition-opacity hover:opacity-80",
              isContrast ? "text-[color:var(--parser-text-primary-contrast)]" : tone.icon,
            )}
          >
            <CloseIcon aria-hidden="true" className="size-5" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  )
}

export { AlertDefault }
export type {
  AlertDefaultColor,
  AlertDefaultProps,
  AlertDefaultResp,
  AlertDefaultStyle,
}
