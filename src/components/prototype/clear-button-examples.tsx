import * as React from "react"

import { ClearButton } from "@/components/ui/clear-button"

function Section({ children, description, title }: { children: React.ReactNode; description: string; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="rh-typography-h4">{title}</h2><p className="rh-typography-b1">{description}</p></div>{children}</section>
}

export function ClearButtonExamples() {
  const [cleared, setCleared] = React.useState(false)

  return <div className="grid min-w-0 gap-10">
    <Section description="ClearButton — компактное действие для удаления текущего значения из однострочного поля. Он сохраняет фокус в поле, поэтому ввод можно продолжить сразу после очистки." title="Назначение">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="flex flex-wrap items-center justify-center gap-4"><ClearButton onClick={() => setCleared(true)} /><span aria-live="polite" className="text-sm leading-5 text-[var(--parser-text-neutral-secondary)]">{cleared ? "Поле очищено" : "Нажми, чтобы очистить поле"}</span></div></div></div>
    </Section>

    <Section description="Размер соответствует высоте связанного Textfield или InputNumber: md для поля 40 px, sm для поля 36 px." title="Размер">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="flex items-center justify-center gap-6"><div className="grid justify-items-center gap-2"><ClearButton size="md" /><span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">md</span></div><div className="grid justify-items-center gap-2"><ClearButton size="sm" /><span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">sm</span></div></div></div></div>
    </Section>

    <Section description="Hover доступен нативно; prop state нужен, чтобы показать его на витрине. Disabled блокирует взаимодействие." title="Состояния">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid grid-cols-3 justify-items-center gap-5"><div className="grid justify-items-center gap-2"><ClearButton /><span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">default</span></div><div className="grid justify-items-center gap-2"><ClearButton state="hovered" /><span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">hovered</span></div><div className="grid justify-items-center gap-2"><ClearButton disabled /><span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">disabled</span></div></div></div></div>
    </Section>
  </div>
}
