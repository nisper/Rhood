import * as React from "react"

import { InputNumberRange } from "@/components/ui/input-number-range"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"

function Section({ children, description, settings, title }: { children: React.ReactNode; description: string; settings: string[]; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="rh-typography-h4">{title}</h2><p className="rh-typography-b1">{description}</p></div>{children}<div className="grid gap-0.5">{settings.map((setting) => <p className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]" key={setting}>{setting}</p>)}</div></section>
}

function Cell({ children, label }: { children: React.ReactNode; label: string }) {
  return <div className="grid min-w-0 gap-2"><p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">{label}</p>{children}</div>
}

function EditableRange() {
  const [start, setStart] = React.useState("25")
  const [end, setEnd] = React.useState("120")

  return <InputNumberRange endInputProps={{ onChange: (event) => setEnd(event.target.value), value: end }} startInputProps={{ onChange: (event) => setStart(event.target.value), value: start }} />
}

function ClearableRange({ size = "md" }: { size?: "md" | "sm" }) {
  const [start, setStart] = React.useState("25")
  const [end, setEnd] = React.useState("120")

  return <InputNumberRange endInputProps={{ clearButton: true, onChange: (event) => setEnd(event.target.value), onClear: () => setEnd(""), value: end }} size={size} startInputProps={{ clearButton: true, onChange: (event) => setStart(event.target.value), onClear: () => setStart(""), value: start }} />
}

export function InputNumberRangeExamples() {
  const inputProps = { placeholder: "Введите значение" }

  return (
    <div className="grid min-w-0 gap-10">
      <Section description="md — основной размер, sm — компактный. Размер применяется к обоим числовым полям диапазона." settings={["size: md · sm"]} title="Размер">
        <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2"><Cell label="md"><InputNumberRange endInputProps={inputProps} startInputProps={inputProps} /></Cell><Cell label="sm"><InputNumberRange endInputProps={inputProps} size="sm" startInputProps={inputProps} /></Cell></div></ShowcasePanel></ShowcaseSurface>
      </Section>
      <Section description="Состояние применяется сразу ко всей группе — оба поля остаются без собственных рамок." settings={["state: default · hovered · focused", "error: boolean", "disabled: boolean"]} title="Состояния">
        <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[920px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Cell label="default"><InputNumberRange endInputProps={inputProps} startInputProps={inputProps} /></Cell>
          <Cell label="hovered"><InputNumberRange endInputProps={inputProps} startInputProps={inputProps} state="hovered" /></Cell>
          <Cell label="focused"><InputNumberRange endInputProps={inputProps} startInputProps={inputProps} state="focused" /></Cell>
          <Cell label="error"><InputNumberRange endInputProps={inputProps} error startInputProps={inputProps} /></Cell>
          <Cell label="error focused"><InputNumberRange endInputProps={inputProps} error startInputProps={inputProps} state="focused" /></Cell>
          <Cell label="disabled"><InputNumberRange disabled endInputProps={inputProps} startInputProps={inputProps} /></Cell>
        </div></ShowcasePanel></ShowcaseSurface>
      </Section>
      <Section description="Каждому вложенному InputNumber можно передать его обычные props — например, единицу измерения и форматирование." settings={["startInputProps: InputNumberProps", "endInputProps: InputNumberProps", "separator: ReactNode"]} title="Наполнение">
        <ShowcaseSurface><ShowcasePanel><div className="grid w-full gap-5 sm:grid-cols-2"><Cell label="value"><EditableRange /></Cell><Cell label="endText"><InputNumberRange endInputProps={{ endText: "м²", value: "120" }} startInputProps={{ endText: "м²", value: "25" }} /></Cell><Cell label="startText"><InputNumberRange endInputProps={{ startText: "от", value: "120" }} startInputProps={{ startText: "от", value: "25" }} /></Cell><Cell label="required"><InputNumberRange endInputProps={{ required: true, value: "120" }} startInputProps={{ required: true, value: "25" }} /></Cell><Cell label="groupThousands"><InputNumberRange endInputProps={{ groupThousands: true, value: "1000000" }} startInputProps={{ groupThousands: true, value: "500000" }} /></Cell></div></ShowcasePanel></ShowcaseSurface>
      </Section>
      <Section description="Опциональный крестик показывается для заполненного поля, которое находится в фокусе." settings={["startInputProps.clearButton: boolean", "endInputProps.clearButton: boolean"]} title="Очистка ввода">
        <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2"><Cell label="md"><ClearableRange /></Cell><Cell label="sm"><ClearableRange size="sm" /></Cell></div></ShowcasePanel></ShowcaseSurface>
      </Section>
    </div>
  )
}
