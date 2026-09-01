import * as React from "react"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PageTitleProps = React.ComponentProps<"div"> & {
  back?: boolean
  button1?: boolean
  button2?: boolean
  secondaryText?: boolean
  title?: React.ReactNode
  button1Label?: React.ReactNode
  button2Label?: React.ReactNode
  secondaryTextLabel?: React.ReactNode
}

/**
 * Parser page title matching the Figma `page title` component.
 */
function PageTitle({
  back = true,
  button1 = true,
  button1Label = "Button 1",
  button2 = false,
  button2Label = "Button 2",
  className,
  secondaryText = true,
  secondaryTextLabel = "Secondary text",
  title = "Подписки",
  ...props
}: PageTitleProps) {
  return (
    <div
      className={cn(
        "flex w-[1100px] items-center gap-0 px-6 py-6",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-px flex-1 items-center gap-2 px-0">
        {back && (
          <div className="flex w-7 shrink-0 items-center justify-end">
            <Button
              appearance="ghost"
              aria-label="Back"
              iconOnly
              size="sm"
              startIcon={
                <span className="flex size-6 shrink-0 items-center justify-center">
                  <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={2} />
                </span>
              }
            />
          </div>
        )}

        <div className="flex min-w-px flex-1 flex-col items-start justify-center gap-2">
          <p
            className="w-full whitespace-nowrap text-[24px] font-semibold leading-[1.33] text-[color:var(--parser-text-neutral-primary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {title}
          </p>

          {secondaryText && (
            <p
              className="w-full whitespace-nowrap text-sm font-normal leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-secondary)]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {secondaryTextLabel}
            </p>
          )}
        </div>

        {button2 && (
          <Button appearance="secondary" size="md">
            {button2Label}
          </Button>
        )}

        {button1 && (
          <Button appearance="primary" size="md">
            {button1Label}
          </Button>
        )}
      </div>
    </div>
  )
}

export { PageTitle }
export type { PageTitleProps }
