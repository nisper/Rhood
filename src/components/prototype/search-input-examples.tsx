import * as React from "react"

import { Search } from "@/components/ui/search"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["size", "md · sm", "md", "Размер поля и иконки поиска."],
  ["state", "default · hovered · focused", "default", "Состояние для витрины и визуальных тестов."],
  ["disabled", "true · false", "false", "Недоступное для ввода поле."],
  ["placeholder", "string", "Поиск", "Текст пустого поля."],
  ["value / defaultValue", "string", "—", "Значение поиска для управляемого или неуправляемого поля."],
] as const

function Section({ children, description, settings, title }: { children: React.ReactNode; description: string; settings?: string[]; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="text-xl font-semibold leading-7">{title}</h2><p className="text-base leading-6 tracking-[0.15px]">{description}</p></div>{children}{settings && <div className="grid gap-0.5">{settings.map((setting) => <p className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]" key={setting}>{setting}</p>)}</div>}</section>
}

function FieldCell({ children, label }: { children: React.ReactNode; label: string }) {
  return <div className="grid min-w-0 gap-2"><p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">{label}</p>{children}</div>
}

export function SearchExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="md — основной размер поля; sm — компактный вариант для плотных панелей и фильтров." settings={["size: md · sm"]} title="Размер">
      <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2"><FieldCell label="md"><Search placeholder="Поиск" size="md" /></FieldCell><FieldCell label="sm"><Search placeholder="Поиск" size="sm" /></FieldCell></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Hover и focus относятся к состояниям интерактивного поля. Disabled имеет приоритет и блокирует ввод." settings={["state: default · hovered · focused", "disabled: boolean"]} title="Состояния">
      <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[920px] gap-5 sm:grid-cols-2 lg:grid-cols-3"><FieldCell label="default"><Search placeholder="Поиск" /></FieldCell><FieldCell label="hovered"><Search placeholder="Поиск" state="hovered" /></FieldCell><FieldCell label="focused"><Search placeholder="Поиск" state="focused" /></FieldCell><FieldCell label="disabled, empty"><Search disabled placeholder="Поиск" /></FieldCell><FieldCell label="disabled, value"><Search defaultValue="Квартиры" disabled /></FieldCell></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Иконка поиска зафиксирована слева. Содержание поля задаётся стандартными props Input: placeholder, value и defaultValue." settings={["placeholder: string", "value: string", "defaultValue: string"]} title="Наполнение">
      <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2"><FieldCell label="Пустой"><Search placeholder="Поиск" /></FieldCell><FieldCell label="С значением"><Search defaultValue="Квартиры" /></FieldCell></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Основные настройки Search для реализации." title="Свойства">
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white"><div className="flex border-b border-[var(--parser-border-light)]" role="row">{["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 0 ? 160 : index === 2 ? 140 : "fill"}>{title}</TableCell>)}</div>{properties.map((row) => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">{row.map((cell, index) => <TableCell key={cell} role="body" type="text" width={index === 0 ? 160 : index === 2 ? 140 : "fill"}>{cell}</TableCell>)}</div>)}</Table>
    </Section>
  </div>
}
