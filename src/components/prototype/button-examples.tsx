import * as React from "react"

import { Button } from "@/components/ui/button"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["appearance", "primary · default · ghost · destructive · inherit · contrast", "primary", "Визуальный стиль и допустимый контекст применения."],
  ["size", "lg · md · sm · xsm", "md", "Размер кнопки, текста и иконок."],
  ["state", "default · hover", "default", "Визуальное состояние для витрины и тестирования."],
  ["disabled", "true · false", "false", "Блокирует взаимодействие и применяет disabled-состояние."],
  ["children / label", "ReactNode", "Label", "Текст действия."],
  ["startIcon", "ReactNode · true · false", "true", "Иконка слева от label."],
  ["endIcon", "ReactNode · true · false", "true", "Иконка справа от label."],
  ["counter", "true · false", "false", "Счётчик рядом с label."],
]

function Section({ children, description, title }: { children: React.ReactNode; description: string; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="text-xl font-semibold leading-7">{title}</h2><p className="text-base leading-6 tracking-[0.15px]">{description}</p></div>{children}</section>
}

function ButtonSet({ appearance, children, ...props }: React.ComponentProps<typeof Button>) {
  return <Button appearance={appearance} {...props}>{children ?? "Label"}</Button>
}

function LabeledButton({ appearance }: { appearance: NonNullable<React.ComponentProps<typeof Button>["appearance"]> }) {
  return <ButtonSet appearance={appearance} endIcon={false} startIcon={false}>{appearance[0].toUpperCase() + appearance.slice(1)}</ButtonSet>
}

function StateRow({ appearance }: { appearance: NonNullable<React.ComponentProps<typeof Button>["appearance"]> }) {
  const label = appearance[0].toUpperCase() + appearance.slice(1)
  return <div className="grid grid-cols-3 items-center gap-2"><ButtonSet appearance={appearance} endIcon={false} startIcon={false}>{label}</ButtonSet><ButtonSet appearance={appearance} endIcon={false} startIcon={false} state="hover">{label}</ButtonSet><ButtonSet appearance={appearance} disabled endIcon={false} startIcon={false}>{label}</ButtonSet></div>
}

export function ButtonExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="Визуальный стиль кнопки выбирают по контексту: primary — для основного действия, default и ghost — для второстепенных." title="Стиль">
      <ShowcaseSurface direction="vertical"><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3"><LabeledButton appearance="primary" /><LabeledButton appearance="default" /><LabeledButton appearance="ghost" /><LabeledButton appearance="destructive" /><LabeledButton appearance="inherit" /></div></ShowcasePanel><ShowcasePanel tone="transparent"><LabeledButton appearance="contrast" /></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="md — размер по умолчанию; lg подходит для основного действия, sm и xsm — для плотных интерфейсов." title="Размер">
      <ShowcaseSurface><ShowcasePanel><div className="grid gap-3">{(["lg", "md", "sm", "xsm"] as const).map(size => <div className="flex items-center gap-3" key={size}><span className="w-7 text-right text-sm leading-5 text-[var(--parser-text-neutral-secondary)]">{size}</span><ButtonSet appearance="default" endIcon={false} size={size} startIcon={false}>Default</ButtonSet></div>)}</div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Hover показывает реакцию на наведение. Disabled блокирует действие и использует нейтральное состояние." title="Состояния">
      <ShowcaseSurface direction="vertical"><ShowcasePanel><div className="grid w-full max-w-[640px] gap-2"><div className="grid grid-cols-3 gap-2 text-center text-xs leading-4 text-[var(--parser-text-neutral-secondary)]"><span>default</span><span>hover</span><span>disabled</span></div>{(["primary", "default", "ghost", "destructive", "inherit"] as const).map(appearance => <StateRow appearance={appearance} key={appearance} />)}</div></ShowcasePanel><ShowcasePanel tone="transparent"><div className="grid w-full max-w-[640px] gap-2"><div className="grid grid-cols-3 gap-2 text-center text-xs leading-4 text-[var(--parser-text-neutral-secondary)]"><span>default</span><span>hover</span><span>disabled</span></div><StateRow appearance="contrast" /></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Иконки поясняют действие, а счётчик показывает количество связанного контента. Отключай элементы состава только при необходимости." title="Состав">
      <ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3"><ButtonSet appearance="default" endIcon={false} startIcon={false} /><ButtonSet appearance="default" endIcon={false} /><ButtonSet appearance="default" startIcon={false} /><ButtonSet appearance="default" counter endIcon={false} startIcon={false} /></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Основные настройки Button для реализации." title="Свойства">
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>)}
        </div>
        {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
          {row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>)}
        </div>)}
      </Table>
    </Section>
  </div>
}
