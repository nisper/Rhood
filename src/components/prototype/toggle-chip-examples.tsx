import * as React from "react"

import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSection } from "@/components/ui/showcase-section"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"
import { ToggleChip } from "@/components/ui/toggle-chip"

const colors = ["neutral", "brand", "warning", "success", "error", "contrast"] as const
const sizes = ["lg", "md", "sm"] as const

const properties = [
  ["checked", "boolean", "—", "Контролируемое состояние выбора."],
  ["defaultChecked", "boolean", "false", "Начальное состояние в неконтролируемом режиме."],
  ["onCheckedChange", "(checked) => void", "—", "Вызывается после переключения."],
  ["color", "neutral · brand · warning · success · error · contrast", "neutral", "Цветовая тема вложенного Chip."],
  ["size", "lg · md · sm", "lg", "Размер вложенного Chip."],
  ["icon", "boolean", "true", "Показывает иконку Star."],
  ["label", "boolean", "true", "Показывает подпись."],
  ["disabled", "boolean", "false", "Блокирует переключение."],
  ["children", "ReactNode", "Chip", "Текст подписи."],
]

function CodeProp({ name, value }: { name: string; value?: string }) {
  return <><span className="text-[var(--rh-theme-text-info)]">{name}</span>{value && <><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">{value}</span></>}</>
}

function ToggleChipSnippet({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span><span className="text-[var(--rh-palette-purple-700)]">ToggleChip</span>{" "}{children}<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>Chip<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span><span className="text-[var(--rh-palette-purple-700)]">ToggleChip</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span></code>
}

const appearanceSnippet = <ToggleChipSnippet><CodeProp name="defaultChecked" /></ToggleChipSnippet>
const sizeSnippet = <ToggleChipSnippet><CodeProp name="size" value={'"sm"'} /></ToggleChipSnippet>
const stateSnippet = <ToggleChipSnippet><CodeProp name="disabled" /></ToggleChipSnippet>
const compositionSnippet = <ToggleChipSnippet><CodeProp name="icon" value="{false}" />{" "}<CodeProp name="label" value="{false}" /></ToggleChipSnippet>

export function ToggleChipExamples() {
  return <div className="grid min-w-0">
    <ShowcaseSection codeSnippet={appearanceSnippet} description="Состояние определяет стиль вложенного Chip: по умолчанию muted, после выбора — default. Нажми на любой пример, чтобы переключить его." showcase={<ShowcaseSurface><ShowcasePanel><div className="grid gap-3"><div className="flex flex-wrap items-center justify-center gap-3">{colors.map((color) => <ToggleChip color={color} key={color}>{color}</ToggleChip>)}</div><div className="flex flex-wrap items-center justify-center gap-3">{colors.map((color) => <ToggleChip color={color} defaultChecked key={color}>{color}</ToggleChip>)}</div></div></ShowcasePanel></ShowcaseSurface>} title="Стиль" />

    <ShowcaseSection codeSnippet={sizeSnippet} description="Размер передаётся вложенному Chip. Каждый пример интерактивен." showcase={<ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3">{sizes.map((size) => <ToggleChip color="neutral" key={size} size={size}>{size}</ToggleChip>)}</div></ShowcasePanel></ShowcaseSurface>} title="Размер" />

    <ShowcaseSection codeSnippet={stateSnippet} description="Компонент поддерживает невыбранное, выбранное и disabled-состояния. В выбранных примерах начальное состояние задаёт defaultChecked." showcase={<ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[560px] grid-cols-3 gap-3 justify-items-center"><div className="grid justify-items-center gap-2"><span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">default</span><ToggleChip /></div><div className="grid justify-items-center gap-2"><span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">checked</span><ToggleChip defaultChecked /></div><div className="grid justify-items-center gap-2"><span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">disabled</span><ToggleChip disabled /></div></div></ShowcasePanel></ShowcaseSurface>} title="Состояния" />

    <ShowcaseSection codeSnippet={compositionSnippet} description="Настраивай состав Chip: иконку и подпись. Кнопка удаления исключена, чтобы ToggleChip оставался единым элементом управления." showcase={<ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3"><ToggleChip>Иконка и подпись</ToggleChip><ToggleChip icon={false}>Только подпись</ToggleChip><ToggleChip label={false} /></div></ShowcasePanel></ShowcaseSurface>} title="Состав" />

    <ShowcaseSection description="Публичные свойства ToggleChip для реализации." showcase={<Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white"><div className="flex border-b border-[var(--parser-border-light)]" role="row">{["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>)}</div>{properties.map((row) => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">{row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>)}</div>)}</Table>} title="Свойства" />
  </div>
}
