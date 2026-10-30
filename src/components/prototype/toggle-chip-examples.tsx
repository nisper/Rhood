import { ShowcaseSection } from "@/components/ui/showcase-section";
import * as React from "react"

import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"
import { ToggleChip } from "@/components/ui/toggle-chip"

const sizes = ["lg", "md", "sm"] as const

const properties = [
  ["checked", "boolean", "—", "Контролируемое состояние выбора."],
  ["defaultChecked", "boolean", "false", "Начальное состояние в неконтролируемом режиме."],
  ["onCheckedChange", "(checked) => void", "—", "Вызывается после переключения."],
  ["size", "lg · md · sm", "lg", "Размер ToggleChip."],
  ["icon", "boolean", "true", "Показывает иконку Star."],
  ["label", "boolean", "true", "Показывает подпись."],
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
const compositionSnippet = <ToggleChipSnippet><CodeProp name="icon" value="{false}" />{" "}<CodeProp name="label" value="{false}" /></ToggleChipSnippet>

export function ToggleChipExamples() {
  const [singleValue, setSingleValue] = React.useState<string | null>("1")
  const [multipleValues, setMultipleValues] = React.useState<string[]>(["Циан"])
  const [lockedValue, setLockedValue] = React.useState("1")

  function toggleMultiple(value: string, checked: boolean) {
    setMultipleValues((current) => checked
      ? [...current, value]
      : current.filter((item) => item !== value))
  }

  return <div className="grid min-w-0">
    <ShowcaseSection codeSnippet={appearanceSnippet} description="Нейтральный чип переключается между обычным и выбранным состояниями. Нажми на любой пример, чтобы переключить его." panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="flex flex-wrap items-center justify-center gap-3"><ToggleChip>Не выбрано</ToggleChip><ToggleChip defaultChecked>Выбрано</ToggleChip></div></div>]} title="Стиль" />

    <ShowcaseSection codeSnippet={sizeSnippet} description="Размер задаёт габариты и типографику ToggleChip. Каждый пример интерактивен." panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="flex flex-wrap items-center justify-center gap-3">{sizes.map((size) => <ToggleChip key={size} size={size}>{size}</ToggleChip>)}</div></div>]} title="Размер" />

    <ShowcaseSection description="Настройка выбора задаётся группой: можно снять выбранный вариант, выбрать несколько или запретить снятие повторным нажатием." panels={[<div className="grid min-h-[220px] gap-6 rounded-xl bg-white px-6 py-5"><div className="grid gap-2"><span className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Несколько из множества</span><div className="flex flex-wrap gap-2" role="group">{["Авито", "Циан", "Юла", "ДомКлик"].map((value) => <ToggleChip checked={multipleValues.includes(value)} icon={false} key={value} onCheckedChange={(checked) => toggleMultiple(value, checked)} size="md">{value}</ToggleChip>)}</div></div><div className="grid gap-2"><span className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Один из множества</span><div className="flex flex-wrap gap-2" role="group">{["Студия", "1", "2", "3", "4+"].map((value) => <ToggleChip checked={singleValue === value} icon={false} key={value} onCheckedChange={(checked) => setSingleValue(checked ? value : null)} size="md">{value}</ToggleChip>)}</div></div><div className="grid gap-2"><span className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Один из множества с отключением снятия выбора</span><div className="flex flex-wrap gap-2" role="group">{["Студия", "1", "2", "3", "4+"].map((value) => <ToggleChip checked={lockedValue === value} icon={false} key={value} onCheckedChange={(checked) => checked && setLockedValue(value)} size="md">{value}</ToggleChip>)}</div></div></div>]} title="Поведение" />

    <ShowcaseSection codeSnippet={compositionSnippet} description="Настраивай состав Chip: иконку и подпись. Кнопка удаления исключена, чтобы ToggleChip оставался единым элементом управления." panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="flex flex-wrap items-center justify-center gap-3"><ToggleChip>Иконка и подпись</ToggleChip><ToggleChip icon={false}>Только подпись</ToggleChip><ToggleChip label={false} /></div></div>]} title="Состав" />

    <ShowcaseSection description="Публичные свойства ToggleChip для реализации." panels={[<Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white"><div className="flex border-b border-[var(--parser-border-light)]" role="row">{["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>)}</div>{properties.map((row) => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">{row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>)}</div>)}</Table>]} title="Свойства" />
  </div>
}
