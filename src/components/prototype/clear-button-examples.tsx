import * as React from "react"

import { ClearButton } from "@/components/ui/clear-button"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"

function Section({ children, description, title }: { children: React.ReactNode; description: string; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="text-xl font-semibold leading-7">{title}</h2><p className="text-base leading-6 tracking-[0.15px]">{description}</p></div>{children}</section>
}

export function ClearButtonExamples() {
  const [cleared, setCleared] = React.useState(false)

  return <div className="grid min-w-0 gap-10">
    <Section description="ClearButton — компактное действие для удаления текущего значения из однострочного поля. Он сохраняет фокус в поле, поэтому ввод можно продолжить сразу после очистки." title="Назначение">
      <ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-4"><ClearButton onClick={() => setCleared(true)} /><span aria-live="polite" className="text-sm leading-5 text-[var(--parser-text-neutral-secondary)]">{cleared ? "Поле очищено" : "Нажми, чтобы очистить поле"}</span></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Размер соответствует высоте связанного Textfield или InputNumber: md для поля 40 px, sm для поля 36 px." title="Размер">
      <ShowcaseSurface><ShowcasePanel><div className="flex items-center justify-center gap-6"><div className="grid justify-items-center gap-2"><ClearButton size="md" /><span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">md</span></div><div className="grid justify-items-center gap-2"><ClearButton size="sm" /><span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">sm</span></div></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Hover доступен нативно; prop state нужен, чтобы показать его на витрине. Disabled блокирует взаимодействие." title="Состояния">
      <ShowcaseSurface><ShowcasePanel><div className="grid grid-cols-3 justify-items-center gap-5"><div className="grid justify-items-center gap-2"><ClearButton /><span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">default</span></div><div className="grid justify-items-center gap-2"><ClearButton state="hovered" /><span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">hovered</span></div><div className="grid justify-items-center gap-2"><ClearButton disabled /><span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">disabled</span></div></div></ShowcasePanel></ShowcaseSurface>
    </Section>
  </div>
}
