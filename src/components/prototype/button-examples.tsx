import * as React from "react"

import { Button } from "@/components/ui/button"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSection } from "@/components/ui/showcase-section"
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

function CodeProp({ name, value }: { name: string; value?: string }) {
  return <><span className="text-[var(--rh-theme-text-info)]">{name}</span>{value && <><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">{value}</span></>}</>
}

function ButtonSnippet({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span><span className="text-[var(--rh-palette-purple-700)]">Button</span>{" "}{children}<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>Label<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span><span className="text-[var(--rh-palette-purple-700)]">Button</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span></code>
}

const appearanceSnippet = <ButtonSnippet><CodeProp name="appearance" value={'"primary"'} /></ButtonSnippet>
const sizeSnippet = <ButtonSnippet><CodeProp name="size" value={'"lg"'} /></ButtonSnippet>
const stateSnippet = <ButtonSnippet><CodeProp name="disabled" /></ButtonSnippet>
const compositionSnippet = <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span><span className="text-[var(--rh-palette-purple-700)]">Button</span>{"\n  "}<CodeProp name="startIcon" value="{false}" />{"\n  "}<CodeProp name="endIcon" value="{false}" />{"\n  "}<CodeProp name="counter" /><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>Label<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span><span className="text-[var(--rh-palette-purple-700)]">Button</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span></code>

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
  return <div className="grid min-w-0">
    <ShowcaseSection codeSnippet={appearanceSnippet} description="Визуальный стиль кнопки выбирают по контексту: primary — для основного действия, default и ghost — для второстепенных." showcase={<ShowcaseSurface direction="vertical"><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3"><LabeledButton appearance="primary" /><LabeledButton appearance="default" /><LabeledButton appearance="ghost" /><LabeledButton appearance="destructive" /><LabeledButton appearance="inherit" /></div></ShowcasePanel><ShowcasePanel tone="transparent"><LabeledButton appearance="contrast" /></ShowcasePanel></ShowcaseSurface>} title="Стиль" />

    <ShowcaseSection codeSnippet={sizeSnippet} description="md — размер по умолчанию; lg подходит для основного действия, sm и xsm — для плотных интерфейсов." showcase={<ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3">{(["lg", "md", "sm", "xsm"] as const).map(size => <ButtonSet appearance="default" className="w-[100px]" endIcon={false} key={size} size={size} startIcon={false}>{({ lg: "Large", md: "Medium", sm: "Small", xsm: "Extra small" } as const)[size]}</ButtonSet>)}</div></ShowcasePanel></ShowcaseSurface>} title="Размер" />

    <ShowcaseSection codeSnippet={stateSnippet} description="Hover показывает реакцию на наведение. Disabled блокирует действие и использует нейтральное состояние." showcase={<ShowcaseSurface direction="vertical"><ShowcasePanel><div className="grid w-full max-w-[640px] gap-2"><div className="grid grid-cols-3 gap-2 text-center text-xs leading-4 text-[var(--parser-text-neutral-secondary)]"><span>default</span><span>hover</span><span>disabled</span></div>{(["primary", "default", "ghost", "destructive", "inherit"] as const).map(appearance => <StateRow appearance={appearance} key={appearance} />)}</div></ShowcasePanel><ShowcasePanel tone="transparent"><div className="grid w-full max-w-[640px] gap-2"><div className="grid grid-cols-3 gap-2 text-center text-xs leading-4 text-[var(--parser-text-neutral-secondary)]"><span>default</span><span>hover</span><span>disabled</span></div><StateRow appearance="contrast" /></div></ShowcasePanel></ShowcaseSurface>} title="Состояния" />

    <ShowcaseSection codeSnippet={compositionSnippet} description="Иконки поясняют действие, а счётчик показывает количество связанного контента. Отключай элементы состава только при необходимости." showcase={<ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3"><ButtonSet appearance="default" endIcon={false} startIcon={false} /><ButtonSet appearance="default" endIcon={false} /><ButtonSet appearance="default" startIcon={false} /><ButtonSet appearance="default" counter endIcon={false} startIcon={false} /></div></ShowcasePanel></ShowcaseSurface>} title="Состав" />

    <section className="mb-10 grid gap-3">
      <div className="grid gap-1"><h2 className="rh-typography-headline-4">Свойства</h2><p className="rh-typography-body-1">Основные настройки Button для реализации.</p></div>
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
