import * as React from "react"
import { createPortal } from "react-dom"

import { ShowcaseSection } from "@/components/ui/showcase-section"
import { Button } from "@/components/ui/button"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"
import { Tooltip } from "@/components/ui/tooltip"

const properties = [
  ["children", "ReactNode", '"Typography"', "Текст или другое содержимое подсказки."],
  ["className", "string", "—", "Дополнительные классы для компоновки."],
  ["…props", 'ComponentProps<"div">', "—", "Нативные свойства корневого div, включая атрибуты доступности."],
]

function CodeName({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--rh-palette-purple-700)]">{children}</span>
}

function CodeProp({ name, value }: { name: string; value?: string }) {
  return <><span className="text-[var(--rh-theme-text-info)]">{name}</span>{value && <><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">{value}</span></>}</>
}

function TooltipSnippet({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{"<"}</span><CodeName>Tooltip</CodeName>{" "}{children}<span className="text-[var(--rh-theme-text-neutral-secondary)]">{">"}</span>Typography<span className="text-[var(--rh-theme-text-neutral-secondary)]">{"</"}</span><CodeName>Tooltip</CodeName><span className="text-[var(--rh-theme-text-neutral-secondary)]">{">"}</span></code>
}

const defaultSnippet = <TooltipSnippet><CodeProp name="children" value={'"Typography"'} /></TooltipSnippet>
const contentSnippet = <TooltipSnippet><CodeProp name="children" value={'"Текст подсказки"'} /></TooltipSnippet>
const animationSnippet = <TooltipSnippet><CodeProp name="children" value={'"Подсказка появляется с анимацией"'} /></TooltipSnippet>

function TooltipAnimationDemo() {
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState<{ left: number; top: number } | null>(null)

  function showTooltip() {
    const trigger = triggerRef.current?.querySelector("button")
    if (!trigger) return
    const rect = trigger.getBoundingClientRect()
    setPosition({ left: rect.left + rect.width / 2, top: rect.top - 4 })
  }

  return (
    <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4">
      <div ref={triggerRef} onMouseEnter={showTooltip} onMouseLeave={() => setPosition(null)}>
        <Button appearance="default" endIcon={false} size="sm" startIcon={false} onFocus={showTooltip} onBlur={() => setPosition(null)}>
          Наведи курсор или перейди фокусом
        </Button>
      </div>
      {position && typeof document !== "undefined" && createPortal(
        <span className="pointer-events-none fixed z-[2147483647] -translate-x-1/2 -translate-y-full" style={position}>
          <Tooltip role="tooltip">Подсказка появляется с анимацией</Tooltip>
        </span>,
        document.body,
      )}
    </div>
  )
}

export function TooltipExamples() {
  return <div className="grid min-w-0">
    <ShowcaseSection codeSnippet={defaultSnippet} description="Tooltip использует единый тёмный стиль и компактную типографику. Вариантов внешнего вида, размеров и отдельных состояний у компонента нет." panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4"><Tooltip>Typography</Tooltip></div>]} title="Стиль" />

    <ShowcaseSection codeSnippet={animationSnippet} description="Наведи курсор на кнопку или перейди к ней клавишей Tab, чтобы увидеть появление подсказки: fade-in и подъём на 4 px за 160 мс. При включённом prefers-reduced-motion движение отключается." panels={[<TooltipAnimationDemo />]} title="Анимация появления" />

    <ShowcaseSection codeSnippet={contentSnippet} description="Передай текст или ReactNode через children. Ширина подсказки ограничена 350 px; длинный текст переносится внутри контейнера." panels={[<div className="flex min-h-[136px] flex-wrap items-center justify-center gap-6 overflow-hidden rounded-xl bg-white px-6 py-4"><Tooltip>Короткая подсказка</Tooltip><Tooltip className="max-w-[220px]">Подсказка с более длинным текстом, который переносится на следующую строку.</Tooltip></div>]} title="Состав" />

    <section className="mb-10 grid gap-3">
      <div className="grid gap-1"><h2 className="rh-typography-h4">Свойства</h2><p className="rh-typography-b1">Tooltip отображает содержимое в компактном текстовом контейнере и принимает нативные свойства div.</p></div>
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>)}
        </div>
        {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
          {row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>)}
        </div>)}
      </Table>
    </section>
  </div>
}
