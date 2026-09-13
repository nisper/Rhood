import * as React from "react"

import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { InputNumberRange } from "@/components/ui/input-number-range"

function Section({ children, description, title }: { children: React.ReactNode; description: string; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="text-xl font-semibold leading-7">{title}</h2><p className="text-base leading-6 tracking-[0.15px]">{description}</p></div>{children}</section>
}

function EditableRange(props: Omit<React.ComponentProps<typeof InputNumberRange>, "onEndChange" | "onStartChange" | "startValue" | "endValue"> & { initialEndValue?: string; initialStartValue?: string }) {
  const { initialEndValue = "", initialStartValue = "", ...rangeProps } = props
  const [startValue, setStartValue] = React.useState(initialStartValue)
  const [endValue, setEndValue] = React.useState(initialEndValue)
  return <InputNumberRange {...rangeProps} endValue={endValue} onEndChange={(event) => setEndValue(event.target.value)} onStartChange={(event) => setStartValue(event.target.value)} startValue={startValue} />
}

function Cell({ children, label }: { children: React.ReactNode; label: string }) {
  return <div className="grid w-full max-w-[380px] min-w-0 gap-2"><p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">{label}</p>{children}</div>
}

export function InputNumberRangeExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="md — основной размер; sm — компактный вариант для плотных фильтров и панелей." title="Размер">
      <ShowcaseSurface><ShowcasePanel><div className="flex w-full max-w-[780px] flex-wrap justify-center gap-5"><Cell label="md"><EditableRange endText="м²" initialEndValue="120" initialStartValue="40" required /></Cell><Cell label="sm"><EditableRange endText="м²" initialEndValue="120" initialStartValue="40" required size="sm" /></Cell></div></ShowcasePanel></ShowcaseSurface>
    </Section>
    <Section description="Граница и фон едины для пары значений. Focus появляется при работе с любым из полей." title="Состояния">
      <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[780px] gap-5 sm:grid-cols-2"><EditableRange state="default" /><EditableRange state="hovered" /><EditableRange state="focused" /><EditableRange error /><EditableRange error state="focused" /><EditableRange disabled /></div></ShowcasePanel></ShowcaseSurface>
    </Section>
    <Section description="Можно добавить единицу измерения, обязательность, helper text и разделение тысяч." title="Наполнение">
      <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[780px] gap-5 sm:grid-cols-2"><EditableRange endText="м²" initialEndValue="120" initialStartValue="40" required /><EditableRange groupThousands initialEndValue="1000000" initialStartValue="1000" /><EditableRange helperText="Укажи допустимый диапазон" /></div></ShowcasePanel></ShowcaseSurface>
    </Section>
  </div>
}
