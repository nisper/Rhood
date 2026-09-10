import * as React from "react"

import { Segment } from "@/components/ui/segment"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"
import { cn } from "@/lib/utils"

const properties = [
  ["size", "lg / md / sm", "lg", "Размер сегментов и контрола."],
  ["color", "neutral / contrast", "neutral", "Цветовая поверхность контрола."],
  ["icon", "boolean", "false", "Показывает иконку перед текстом сегмента."],
  ["children", "ReactNode", "2 Segment", "Сегменты внутри контрола."],
  ["selected", "boolean", "false", "Выбранное состояние сегмента."],
  ["state", "default / hover", "default", "Состояние взаимодействия сегмента."],
  ["disabled", "boolean", "false", "Недоступность сегмента."],
]

function Properties() {
  const widths = [160, "fill", 140, "fill"] as const
  return <Table className="w-full !min-w-0 rounded-lg border border-[var(--parser-border-light)] bg-white">
    <div className="flex border-b border-[var(--parser-border-light)]" role="row">
      {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={widths[index]}>{title}</TableCell>)}
    </div>
    {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
      {row.map((cell, index) => <TableCell key={`${row[0]}-${index}`} role="body" type="text" width={widths[index]}>{cell}</TableCell>)}
    </div>)}
  </Table>
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <section className="grid w-full gap-4"><div className="grid gap-1"><h2 className="text-xl font-semibold">{title}</h2><p>{description}</p></div>{children}</section>
}

function ExampleCard({ children, className, tone = "white" }: { children: React.ReactNode; className?: string; tone?: "white" | "under-islands" }) {
  return <div className={cn("flex min-h-[130px] items-center justify-center rounded-xl p-[10px]", tone === "white" ? "bg-white" : "bg-[var(--parser-surface-under-islands)]", className)}>{children}</div>
}

function ExamplesFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-1 rounded-2xl bg-[var(--parser-surface-under-islands)] p-1", className)}>{children}</div>
}

export function SegmentedControlExamples() {
  const labels = ["Студии", "1", "2", "3", "4+"]
  const renderSegments = (props: React.ComponentProps<typeof Segment> = {}) => labels.map((label, index) => (
    <Segment key={label} {...props} defaultSelected={index === 0}>{label}</Segment>
  ))

  return <div className="grid min-w-0 gap-10">
    <Section description="Segmented control объединяет два или больше взаимоисключающих вариантов. Каждый вариант — отдельный Segment." title="Цвет">
      <ExamplesFrame className="sm:grid-cols-2">
        <ExampleCard><SegmentedControl>{renderSegments({ color: "neutral" })}</SegmentedControl></ExampleCard>
        <ExampleCard tone="under-islands"><SegmentedControl color="contrast">{renderSegments({ color: "contrast" })}</SegmentedControl></ExampleCard>
      </ExamplesFrame>
    </Section>

    <Section description="По умолчанию сегменты отображаются без иконок. Иконка добавляется отдельно для каждого сегмента." title="Иконки">
      <ExamplesFrame className="sm:grid-cols-2">
        <ExampleCard><SegmentedControl>{renderSegments()}</SegmentedControl></ExampleCard>
        <ExampleCard tone="under-islands"><SegmentedControl>{renderSegments({ icon: true })}</SegmentedControl></ExampleCard>
      </ExamplesFrame>
    </Section>

    <Section description="Выбранный сегмент отличается фоном, остальные остаются в состоянии по умолчанию." title="Состояния">
      <ExamplesFrame className="sm:grid-cols-2">
        <ExampleCard>
          <div className="flex flex-nowrap items-end justify-center gap-3">
            <div className="grid justify-items-center gap-1"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Selected</p><Segment color="neutral" selected>{labels[0]}</Segment></div>
            <div className="grid justify-items-center gap-1"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Hovered</p><Segment color="neutral" state="hover">{labels[1]}</Segment></div>
            <div className="grid justify-items-center gap-1"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Default</p><Segment color="neutral">{labels[2]}</Segment></div>
          </div>
        </ExampleCard>
        <ExampleCard tone="under-islands">
          <div className="flex flex-nowrap items-end justify-center gap-3">
            <div className="grid justify-items-center gap-1"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Selected</p><Segment color="contrast" selected>{labels[0]}</Segment></div>
            <div className="grid justify-items-center gap-1"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Hovered</p><Segment color="contrast" state="hover">{labels[1]}</Segment></div>
            <div className="grid justify-items-center gap-1"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Default</p><Segment color="contrast">{labels[2]}</Segment></div>
          </div>
        </ExampleCard>
      </ExamplesFrame>
    </Section>

    <Section description="lg — основной размер, md — компактный вариант, sm — плотный вариант для панелей." title="Размер">
      <ExamplesFrame className="sm:grid-cols-3">
        <ExampleCard><SegmentedControl size="lg">{renderSegments({ size: "lg" })}</SegmentedControl></ExampleCard>
        <ExampleCard tone="under-islands"><SegmentedControl size="md">{renderSegments({ size: "md" })}</SegmentedControl></ExampleCard>
        <ExampleCard><SegmentedControl size="sm">{renderSegments({ size: "sm" })}</SegmentedControl></ExampleCard>
      </ExamplesFrame>
    </Section>

    <Properties />
  </div>
}
