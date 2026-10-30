import { ShowcaseSection } from "@/components/ui/showcase-section";
import * as React from "react"
import { ArrowUpRight, CodeXml } from "lucide-react"

import { Link } from "@/components/ui/link"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["href", "string", "—", "Адрес, на который ведёт ссылка."],
  ["size", "b1 · b2", "b1", "Текстовый стиль и размер иконок."],
  ["children", "ReactNode", "—", "Текст или другое содержимое ссылки."],
  ["startIcon", "ReactNode", "—", "Иконка слева от содержимого."],
  ["endIcon", "ReactNode", "—", "Иконка справа от содержимого."],
  ["external", "boolean", "false", "Показывает стрелку внешнего ресурса при наведении или фокусе."],
  ["externalLabel", "ReactNode", "—", "Необязательная подпись рядом со стрелкой внешнего ресурса."],
]

function CodeProp({ name, value }: { name: string; value: string }) {
  return (
    <>
      <span className="text-[var(--rh-theme-text-info)]">{name}</span>
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
      <span className="text-[var(--rh-theme-text-success)]">{value}</span>
    </>
  )
}

const compositionSnippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{"<"}</span>
    <span className="text-[var(--rh-palette-purple-700)]">Link</span>{"\n  "}
    <CodeProp name="startIcon" value="{<CodeXml />}" />{"\n  "}
    <CodeProp name="endIcon" value="{<ArrowUpRight />}" />
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{">"}</span>
    Документация
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{"</"}</span>
    <span className="text-[var(--rh-palette-purple-700)]">Link</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{">"}</span>
  </code>
)

function ExampleLink({
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link href="https://rhood.ru" rel="noreferrer" target="_blank" {...props}>
      {children ?? "Ссылка"}
    </Link>
  )
}

export function LinkExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        settings={["size: b1 · b2"]}
        description="b1 — размер по умолчанию; b2 подходит для плотных интерфейсов. Наведи курсор, чтобы увидеть hover-состояние."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <ExampleLink size="b1">Ссылка размером b1</ExampleLink>
                <ExampleLink size="b2">Ссылка размером b2</ExampleLink>
              </div>
            </div>]}
        title="Размер"
      />

      <ShowcaseSection
        settings={["external: true", "externalLabel: ReactNode"]}
        description="При наведении ссылка подчёркивается и показывает стрелку внешнего ресурса. Можно добавить необязательную подпись рядом с иконкой. Стрелка и подпись также появляются при клавиатурном фокусе."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="flex flex-wrap items-center gap-6"><ExampleLink external>Открыть на агрегаторе</ExampleLink><ExampleLink external externalLabel="Космос">Открыть объект</ExampleLink></div></div>]}
        title="Внешний ресурс"
      />

      <ShowcaseSection
        codeSnippet={compositionSnippet}
        description="Иконки уточняют назначение ссылки: слева — тип контента, справа — переход во внешний ресурс."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <ExampleLink>Документация</ExampleLink>
                <ExampleLink startIcon={<CodeXml aria-hidden="true" />}>
                  Исходный код
                </ExampleLink>
                <ExampleLink endIcon={<ArrowUpRight aria-hidden="true" />}>
                  Открыть сайт
                </ExampleLink>
                <ExampleLink
                  endIcon={<ArrowUpRight aria-hidden="true" />}
                  startIcon={<CodeXml aria-hidden="true" />}
                >
                  Документация
                </ExampleLink>
              </div>
            </div>]}
        title="Состав"
      />

      <section className="mb-10 grid gap-3">
        <div className="grid gap-1">
          <h2 className="rh-typography-h4">Свойства</h2>
          <p className="rh-typography-b1">Основные настройки Link для реализации.</p>
        </div>
        <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
          <div className="flex border-b border-[var(--parser-border-light)]" role="row">
            {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => (
              <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>
                {title}
              </TableCell>
            ))}
          </div>
          {properties.map((row) => (
            <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
              {row.map((cell, index) => (
                <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>
                  {cell}
                </TableCell>
              ))}
            </div>
          ))}
        </Table>
      </section>
    </div>
  )
}
