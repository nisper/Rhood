import * as React from "react"

import { Segment } from "@/components/ui/segment"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { cn } from "@/lib/utils"

const labels = Array.from({ length: 3 }, () => "Option")

function Section({ children, description, title }: { children: React.ReactNode; description: string; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="text-xl font-semibold leading-7">{title}</h2><p className="text-base leading-6 tracking-[0.15px]">{description}</p></div>{children}</section>
}

function Surface({ children, tone }: { children: React.ReactNode; tone: "white" | "gray" }) {
  return <div className={cn("flex min-h-[136px] items-center justify-center rounded-xl p-4", tone === "white" ? "bg-white" : "bg-[var(--parser-surface-under-islands)]")}>{children}</div>
}

function SplitSurface({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-1 rounded-2xl bg-[var(--parser-surface-under-islands)] p-1 sm:grid-cols-2", className)}>{children}</div>
}

function Options({ color, icon = false, selected = [0], size = "lg" }: { color: "neutral" | "contrast"; icon?: boolean; selected?: readonly number[]; size?: "lg" | "md" | "sm" }) {
  const selectionMode = selected.length > 1 ? "multiple" : "single"
  return <SegmentedControl color={color} defaultValue={selected.map(String)} selectionMode={selectionMode} size={size}>{labels.map((label, index) => <Segment icon={icon && index === 0} key={index} value={String(index)}>{label}</Segment>)}</SegmentedControl>
}

function StateOptions({ color, size = "lg" }: { color: "neutral" | "contrast"; size?: "lg" | "md" | "sm" }) {
  return <SegmentedControl color={color} defaultValue="selected" size={size}><Segment value="selected">Selected</Segment><Segment state="hover" value="hovered">Hovered</Segment><Segment value="default">Default</Segment></SegmentedControl>
}

export function SegmentedControlExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="Segmented control объединяет два или больше взаимоисключающих вариантов. Каждый вариант — отдельный Segment." title="Цвет">
      <SplitSurface><Surface tone="white"><Options color="neutral" selected={[0]} size="md" /></Surface><Surface tone="gray"><Options color="contrast" selected={[0]} size="md" /></Surface></SplitSurface>
    </Section>

    <Section description="По умолчанию сегменты отображаются без иконок. Иконка добавляется отдельно для каждого сегмента." title="Иконки">
      <SplitSurface><Surface tone="white"><Options color="neutral" icon selected={[0]} size="md" /></Surface><Surface tone="gray"><Options color="contrast" icon selected={[0]} size="md" /></Surface></SplitSurface>
    </Section>

    <Section description="Выбранный сегмент отличается фоном, остальные остаются в состоянии по умолчанию." title="Сегменты и их состояния">
      <SplitSurface><Surface tone="white"><StateOptions color="neutral" size="md" /></Surface><Surface tone="gray"><StateOptions color="contrast" size="md" /></Surface></SplitSurface>
    </Section>

    <Section description="md — размер по умолчанию; lg подходит для основного сценария, sm — для плотных панелей." title="Размер">
      <SplitSurface><Surface tone="white"><div className="grid gap-3">{(["lg", "md", "sm"] as const).map((size) => <div className="flex items-center gap-3" key={size}><span className="w-6 text-right text-sm leading-5 text-[var(--parser-text-neutral-secondary)]">{size}</span><Options color="neutral" size={size} /></div>)}</div></Surface><Surface tone="gray"><div className="grid gap-3">{(["lg", "md", "sm"] as const).map((size) => <div className="flex items-center gap-3" key={size}><span className="w-6 text-right text-sm leading-5 text-[var(--parser-text-neutral-secondary)]">{size}</span><Options color="contrast" size={size} /></div>)}</div></Surface></SplitSurface>
    </Section>

    <Section description="В Segmented control можно выбрать один или несколько вариантов, по аналогии с checkbox/radio." title="Выбор">
      <SplitSurface><Surface tone="white"><div className="grid gap-3">{([["Single select", [0]], ["Multi select", [0, 2]]] as const).map(([label, selected]) => <div className="flex items-center gap-3" key={label}><span className="w-[92px] text-right text-sm leading-5 text-[var(--parser-text-neutral-secondary)]">{label}</span><Options color="neutral" selected={selected} size="md" /></div>)}</div></Surface><Surface tone="gray"><div className="grid gap-3">{([["Single select", [0]], ["Multi select", [0, 2]]] as const).map(([label, selected]) => <div className="flex items-center gap-3" key={label}><span className="w-[92px] text-right text-sm leading-5 text-[var(--parser-text-neutral-secondary)]">{label}</span><Options color="contrast" selected={selected} size="md" /></div>)}</div></Surface></SplitSurface>
    </Section>
  </div>
}
