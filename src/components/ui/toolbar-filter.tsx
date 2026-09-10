import * as React from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { ToggleButton } from "@/components/ui/toggle-button"
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group"
import { cn } from "@/lib/utils"

type ToolbarFilterResp = "desk" | "mob"

type ToolbarFilterProps = React.ComponentProps<"section"> & {
  empty?: boolean
  progressLinear?: boolean
  resp?: ToolbarFilterResp
}

const roominessOptions = ["Студия", "1", "2", "3", "4+"]

function FilterSelect({
  label,
  widthClass,
}: {
  label: string
  widthClass?: string
}) {
  return (
    <Select
      className={widthClass}
      fullWidth={Boolean(widthClass)}
      label={false}
      size="sm"
      value={label}
    />
  )
}

function FilterRange({
  suffix,
  widthClass,
}: {
  suffix: string
  widthClass: string
}) {
  return (
    <button
      className={cn(
        "flex h-9 cursor-pointer items-center rounded-lg border border-[var(--parser-border-light)] bg-white text-sm leading-5 tracking-[0.15px] text-[var(--parser-text-neutral-secondary)]",
        widthClass,
      )}
      type="button"
    >
      <span className="min-w-0 flex-1 px-3 py-2 text-left">от</span>
      <span className="shrink-0">–</span>
      <span className="min-w-0 flex-1 px-3 py-2 text-left">до</span>
      <span className="shrink-0 pr-3 text-[var(--parser-text-neutral-primary)]">{suffix}</span>
    </button>
  )
}

function RoominessGroup({ empty }: { empty: boolean }) {
  return (
    <ToggleButtonGroup className="bg-white" color="contrast" size="sm">
      {roominessOptions.map((item, index) => {
        const active = index === 0

        return (
          <ToggleButton
            color="neutral-dark"
            defaultSelected={active}
            icon={false}
            key={item}
            className={cn(
              "min-w-9 bg-transparent",
              empty && active && "bg-transparent",
            )}
            size="sm"
          >
            <span
              className={cn(
                "whitespace-nowrap text-sm leading-5 tracking-[0.15px] font-medium",
                active && !empty
                  ? "text-[var(--parser-text-primary-contrast)]"
                  : "text-[var(--parser-text-neutral-primary)]",
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {item}
            </span>
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}

function MobileFilterButton({ empty }: { empty: boolean }) {
  return (
    <Button
      appearance="contrast"
      className="shrink-0"
      counter={!empty}
      counterValue={1}
      endIcon={false}
      size="sm"
      startIcon={empty ? <SlidersHorizontal aria-hidden="true" strokeWidth={2} /> : false}
    >
      Фильтры
    </Button>
  )
}

function ToolbarFilter({
  className,
  empty = true,
  progressLinear = true,
  resp = "desk",
  ...props
}: ToolbarFilterProps) {
  const isMobile = resp === "mob"

  if (isMobile) {
    return (
      <section
        className={cn(
          "relative flex items-center gap-1 bg-[var(--parser-fill-neutral)] px-3 py-2",
          className,
        )}
        {...props}
      >
        <MobileFilterButton empty={empty} />
        <FilterSelect label="Квартиры" />
        <FilterSelect label={empty ? "Комнаты" : "1 ком."} />
        <FilterSelect label={empty ? "Площадь" : "50–70 м²"} />
        <FilterSelect label={empty ? "Цена" : "8–12,5 млн. ₽"} />

        {!empty && progressLinear && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
            <div className="h-full w-1/2 bg-[var(--parser-fill-brand)]" />
          </div>
        )}
      </section>
    )
  }

  return (
    <section
      className={cn(
        "relative flex items-center gap-4 overflow-hidden bg-[var(--parser-fill-neutral)] px-6 py-3",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-2 overflow-hidden">
        <FilterSelect label="Квартиры" widthClass="w-[150px]" />
        <RoominessGroup empty={empty} />
        <FilterRange suffix="м²" widthClass="w-[152px]" />
        <FilterRange suffix="₽" widthClass="w-[240px]" />

        <Button
          appearance="contrast"
          counter={!empty}
          counterValue={8}
          endIcon={false}
          size="sm"
          startIcon={empty ? <SlidersHorizontal aria-hidden="true" strokeWidth={2} /> : false}
        >
          Все фильтры
        </Button>
      </div>

      {!empty && (
        <div className="flex items-center gap-1">
          <Button
            appearance="ghost"
            endIcon={false}
            size="sm"
            startIcon={<Search aria-hidden="true" strokeWidth={2} />}
          >
            Сохранить фильтры
          </Button>
          <Button
            appearance="ghost"
            aria-label="Clear filters"
            className="px-2"
            endIcon={false}
            iconOnly
            size="sm"
            startIcon={<X aria-hidden="true" strokeWidth={2} />}
          />
        </div>
      )}

      {!empty && progressLinear && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
          <div className="h-full w-1/2 bg-[var(--parser-fill-brand)]" />
        </div>
      )}
    </section>
  )
}

export { ToolbarFilter }
export type { ToolbarFilterProps, ToolbarFilterResp }
