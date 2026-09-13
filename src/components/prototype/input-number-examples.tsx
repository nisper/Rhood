import * as React from "react"

import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { InputNumber } from "@/components/ui/input-number"

function Section({ children, description, title }: { children: React.ReactNode; description: string; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="text-xl font-semibold leading-7">{title}</h2><p className="text-base leading-6 tracking-[0.15px]">{description}</p></div>{children}</section>
}

function Cell({ children, label }: { children: React.ReactNode; label: string }) {
  return <div className="grid min-w-0 gap-2"><p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">{label}</p>{children}</div>
}

function ClearableNumber({ size = "md" }: { size?: "md" | "sm" }) {
  const [value, setValue] = React.useState("2007")
  return <InputNumber aria-label="Числовое значение" clearButton onChange={(event) => setValue(event.target.value)} onClear={() => setValue("")} size={size} state="focused" value={value} />
}

function EditableNumber(props: Omit<React.ComponentProps<typeof InputNumber>, "onChange" | "value"> & { initialValue: string }) {
  const { initialValue, ...inputProps } = props
  const [value, setValue] = React.useState(initialValue)

  return <InputNumber {...inputProps} onChange={(event) => setValue(event.target.value)} value={value} />
}

export function InputNumberExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="md — основной размер, sm — компактный. Значение набирается моноширинным шрифтом." title="Размер">
      <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2"><Cell label="md"><InputNumber placeholder="Введите значение" /></Cell><Cell label="sm"><InputNumber placeholder="Введите значение" size="sm" /></Cell></div></ShowcasePanel></ShowcaseSurface>
    </Section>
    <Section description="Состояния совпадают с текстовым Input: default, hovered, focused, error и disabled." title="Состояния">
      <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[920px] gap-5 sm:grid-cols-2 lg:grid-cols-3"><Cell label="default"><InputNumber placeholder="Введите значение" /></Cell><Cell label="hovered"><InputNumber placeholder="Введите значение" state="hovered" /></Cell><Cell label="focused"><InputNumber placeholder="Введите значение" state="focused" /></Cell><Cell label="error"><InputNumber error placeholder="Введите значение" /></Cell><Cell label="error focused"><InputNumber error placeholder="Введите значение" state="focused" /></Cell><Cell label="disabled"><InputNumber disabled placeholder="Введите значение" /></Cell></div></ShowcasePanel></ShowcaseSurface>
    </Section>
    <Section description="Поле поддерживает префикс, единицу измерения и обязательность; числовое значение остаётся моноширинным." title="Наполнение">
      <ShowcaseSurface><ShowcasePanel><div className="grid w-full gap-5 sm:grid-cols-2"><Cell label="Значение"><EditableNumber initialValue="2007" /></Cell><Cell label="Единица измерения"><EditableNumber endText="м²" initialValue="2007" /></Cell><Cell label="Префикс"><EditableNumber initialValue="2007" startText="с" /></Cell><Cell label="Обязательное"><EditableNumber initialValue="2007" required /></Cell><Cell label="groupThousands: true"><EditableNumber groupThousands initialValue="1000000" /></Cell></div></ShowcasePanel></ShowcaseSurface>
    </Section>
    <Section description="Опциональный крестик показывается для заполненного поля в состоянии focused." title="Очистка ввода">
      <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2"><Cell label="md"><ClearableNumber /></Cell><Cell label="sm"><ClearableNumber size="sm" /></Cell></div></ShowcasePanel></ShowcaseSurface>
    </Section>
  </div>
}
