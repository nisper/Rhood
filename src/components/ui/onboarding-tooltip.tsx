import * as React from "react"

import { NeutralButton } from "@/components/ui/neutral-button"
import { PaginationButton } from "@/components/ui/pagination-button"
import { cn } from "@/lib/utils"

type OnboardingTooltipProps = React.ComponentProps<"div"> & {
  bottomArrow?: boolean
  leftArrow?: boolean
  rightArrow?: boolean
  topArrow?: boolean
}

function OnboardingTooltip({
  className,
  bottomArrow = false,
  leftArrow = false,
  rightArrow = false,
  topArrow = true,
  ...props
}: OnboardingTooltipProps) {
  const arrow = (
    <span
      aria-hidden="true"
      className="block h-0 w-0 border-x-[8px] border-b-[8px] border-x-transparent border-b-[var(--parser-fill-contrast-static)]"
    />
  )

  return (
    <div
      className={cn("flex flex-col items-start gap-0 rounded-[12px]", className)}
      {...props}
    >
      {topArrow && (
        <div className="flex w-full shrink-0 flex-col items-start px-4">
          {arrow}
        </div>
      )}

      <div className="flex items-start">
        {leftArrow && (
          <div className="flex shrink-0 flex-col items-start py-4 self-stretch">
            <div className="flex h-4 w-2 items-center justify-center">
              <div className="-rotate-90 flex-none">
                {arrow}
              </div>
            </div>
          </div>
        )}

        <div className="flex w-[330px] shrink-0 flex-col items-start rounded-[12px] bg-[var(--parser-fill-contrast-static)] p-0.5">
          <div className="flex w-full items-start rounded-[10px] px-3 py-4">
            <p
              className="min-w-px flex-1 text-[16px] leading-[1.5] tracking-[0.024px] text-[color:var(--parser-text-neutral-primary)]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Typography
            </p>
          </div>

          <div className="flex w-full items-center justify-between rounded-[10px] bg-[var(--parser-fill-neutral)] px-3 py-1">
            <NeutralButton
              className="rounded-lg"
              endIcon={false}
              iconOnly={false}
              size="sm"
              startIcon={false}
              variant="text"
            >
              Закрыть
            </NeutralButton>

            <div className="flex min-w-px flex-1 items-center justify-end gap-4">
              <p
                className="whitespace-nowrap text-[14px] leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-secondary)]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                1/12
              </p>

              <div className="flex items-start gap-1">
                <PaginationButton direction="left" state="default" type="icon" />
                <PaginationButton direction="right" state="default" type="icon" />
              </div>
            </div>
          </div>
        </div>

        {rightArrow && (
          <div className="flex shrink-0 flex-col items-start py-4 self-stretch">
            <div className="flex h-4 w-2 items-center justify-center">
              <div className="rotate-90 flex-none">
                {arrow}
              </div>
            </div>
          </div>
        )}
      </div>

      {bottomArrow && (
        <div className="flex w-full shrink-0 flex-col items-start px-4">
          <div className="flex items-center justify-center">
            <div className="-scale-y-100 flex-none">
              {arrow}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { OnboardingTooltip }
export type { OnboardingTooltipProps }
