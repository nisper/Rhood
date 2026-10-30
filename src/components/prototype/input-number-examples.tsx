import * as React from "react"

import { InputNumber } from "@/components/ui/input-number"

function Section({ children, description, settings, title }: { children: React.ReactNode; description: string; settings: string[]; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="rh-typography-h4">{title}</h2><p className="rh-typography-b1">{description}</p></div>{children}<div className="grid gap-0.5">{settings.map((setting) => <p className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]" key={setting}>{setting}</p>)}</div></section>
}

function Cell({ children, label }: { children: React.ReactNode; label: string }) {
  return <div className="grid min-w-0 gap-2"><p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">{label}</p>{children}</div>
}

function ClearableNumber({ size = "md" }: { size?: "lg" | "md" | "sm" }) {
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
    <Section description="lg использует увеличенные отступы; md — основной размер, sm — компактный. Значение набирается моноширинным шрифтом." settings={["size: lg · md · sm"]} title="Размер">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid w-full max-w-[920px] gap-5 sm:grid-cols-3"><Cell label="lg"><InputNumber placeholder="Введите значение" size="lg" /></Cell><Cell label="md"><InputNumber placeholder="Введите значение" /></Cell><Cell label="sm"><InputNumber placeholder="Введите значение" size="sm" /></Cell></div></div></div>
    </Section>
    <Section description="Neutral использует нейтральную заливку без рамки в default-состоянии. Остальные состояния совпадают с default appearance." settings={["appearance: default · neutral"]} title="Внешний вид">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2"><Cell label="default"><InputNumber placeholder="Введите значение" /></Cell><Cell label="neutral"><InputNumber appearance="neutral" placeholder="Введите значение" /></Cell></div></div></div>
    </Section>
    <Section description="Состояния совпадают с текстовым Input: default, hovered, focused, error и disabled." settings={["state: default · hovered · focused", "error: boolean", "disabled: boolean"]} title="Состояния">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid w-full max-w-[920px] gap-5 sm:grid-cols-2 lg:grid-cols-3"><Cell label="default"><InputNumber placeholder="Введите значение" /></Cell><Cell label="hovered"><InputNumber placeholder="Введите значение" state="hovered" /></Cell><Cell label="focused"><InputNumber placeholder="Введите значение" state="focused" /></Cell><Cell label="error"><InputNumber error placeholder="Введите значение" /></Cell><Cell label="error focused"><InputNumber error placeholder="Введите значение" state="focused" /></Cell><Cell label="disabled"><InputNumber disabled placeholder="Введите значение" /></Cell></div></div></div>
    </Section>
    <Section description="Поле поддерживает префикс, единицу измерения и обязательность; числовое значение остаётся моноширинным." settings={["startText: ReactNode", "endText: ReactNode", "required: boolean", "groupThousands: boolean"]} title="Наполнение">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid w-full gap-5 sm:grid-cols-2"><Cell label="value"><EditableNumber initialValue="2007" /></Cell><Cell label="endText"><EditableNumber endText="м²" initialValue="2007" /></Cell><Cell label="startText"><EditableNumber initialValue="2007" startText="с" /></Cell><Cell label="required"><EditableNumber initialValue="2007" required /></Cell><Cell label="groupThousands"><EditableNumber groupThousands initialValue="1000000" /></Cell></div></div></div>
    </Section>
    <Section description="Опциональный крестик показывается для заполненного поля в состоянии focused." settings={["clearButton: boolean", "onClear: () => void"]} title="Очистка ввода">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid w-full max-w-[920px] gap-5 sm:grid-cols-3"><Cell label="lg"><ClearableNumber size="lg" /></Cell><Cell label="md"><ClearableNumber /></Cell><Cell label="sm"><ClearableNumber size="sm" /></Cell></div></div></div>
    </Section>
  </div>
}
