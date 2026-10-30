import * as React from "react"

import { Search } from "@/components/ui/search"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["appearance", "neutral · default", "neutral", "Нейтральный фон по умолчанию или белое поле с рамкой."],
  ["size", "lg · md · sm", "md", "Размер поля и иконки поиска."],
  ["state", "default · hovered · focused", "default", "Состояние для витрины и визуальных тестов."],
  ["disabled", "true · false", "false", "Недоступное для ввода поле."],
  ["placeholder", "string", "Поиск", "Текст пустого поля."],
  ["value / defaultValue", "string", "—", "Значение поиска для управляемого или неуправляемого поля."],
] as const

function Section({ children, description, settings, title }: { children: React.ReactNode; description: string; settings?: string[]; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="rh-typography-h4">{title}</h2><p className="rh-typography-b1">{description}</p></div>{children}{settings && <div className="grid gap-0.5">{settings.map((setting) => <p className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]" key={setting}>{setting}</p>)}</div>}</section>
}

function FieldCell({ children, label }: { children: React.ReactNode; label: string }) {
  return <div className="grid min-w-0 gap-2"><p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">{label}</p>{children}</div>
}

export function SearchExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="lg использует увеличенные паддинги по обеим осям; sm — компактный вариант для плотных панелей и фильтров." settings={["size: lg · md · sm"]} title="Размер">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid w-full max-w-[920px] gap-5 sm:grid-cols-3"><FieldCell label="lg"><Search placeholder="Поиск" size="lg" /></FieldCell><FieldCell label="md"><Search placeholder="Поиск" size="md" /></FieldCell><FieldCell label="sm"><Search placeholder="Поиск" size="sm" /></FieldCell></div></div></div>
    </Section>

    <Section description="Search использует neutral appearance по умолчанию. Передай default, чтобы показать белое поле с рамкой." settings={["appearance: neutral · default"]} title="Внешний вид">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2"><FieldCell label="neutral"><Search placeholder="Поиск" /></FieldCell><FieldCell label="default"><Search appearance="default" placeholder="Поиск" /></FieldCell></div></div></div>
    </Section>

    <Section description="Hover и focus относятся к состояниям интерактивного поля. Disabled имеет приоритет и блокирует ввод." settings={["state: default · hovered · focused", "disabled: boolean"]} title="Состояния">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid w-full max-w-[920px] gap-5 sm:grid-cols-2 lg:grid-cols-3"><FieldCell label="default"><Search placeholder="Поиск" /></FieldCell><FieldCell label="hovered"><Search placeholder="Поиск" state="hovered" /></FieldCell><FieldCell label="focused"><Search placeholder="Поиск" state="focused" /></FieldCell><FieldCell label="disabled, empty"><Search disabled placeholder="Поиск" /></FieldCell><FieldCell label="disabled, value"><Search defaultValue="Квартиры" disabled /></FieldCell></div></div></div>
    </Section>

    <Section description="Иконка поиска зафиксирована слева. Содержание поля задаётся стандартными props Input: placeholder, value и defaultValue." settings={["placeholder: string", "value: string", "defaultValue: string"]} title="Наполнение">
      <div className="grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)] grid-flow-col auto-cols-fr"><div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2"><FieldCell label="Пустой"><Search placeholder="Поиск" /></FieldCell><FieldCell label="С значением"><Search defaultValue="Квартиры" /></FieldCell></div></div></div>
    </Section>

    <Section description="Основные настройки Search для реализации." title="Свойства">
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white"><div className="flex border-b border-[var(--parser-border-light)]" role="row">{["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 0 ? 160 : index === 2 ? 140 : "fill"}>{title}</TableCell>)}</div>{properties.map((row) => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">{row.map((cell, index) => <TableCell key={cell} role="body" type="text" width={index === 0 ? 160 : index === 2 ? 140 : "fill"}>{cell}</TableCell>)}</div>)}</Table>
    </Section>
  </div>
}
