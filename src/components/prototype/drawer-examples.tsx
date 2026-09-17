import * as React from "react"

import { Button } from "@/components/ui/button"
import { Drawer } from "@/components/ui/drawer"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["title", "ReactNode", "Modal Header", "Заголовок стандартного хедера."],
  ["onClose", "() => void", "—", "Вызывается по нажатию на кнопку закрытия."],
  ["closeButton", "boolean", "true", "Показывает кнопку закрытия в стандартном хедере."],
  ["header", "ReactNode", "—", "Полностью заменяет стандартный хедер."],
  ["children", "ReactNode", "—", "Основное содержимое Drawer."],
  ["actions", "ReactNode", "2 × Button", "Содержимое нижней области действий."],
  ["className", "string", "—", "Позволяет задать высоту или ширину в конкретном сценарии."],
]

function Section({ children, description, title }: { children: React.ReactNode; description: string; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="text-xl font-semibold leading-7">{title}</h2><p className="text-base leading-6 tracking-[0.15px]">{description}</p></div>{children}</section>
}

function DrawerPreview({ custom = false }: { custom?: boolean }) {
  const [closed, setClosed] = React.useState(false)

  if (closed) {
    return <Button appearance="default" onClick={() => setClosed(false)}>Открыть Drawer</Button>
  }

  return (
    <Drawer
      actions={custom ? <Button appearance="primary" className="w-full" endIcon={false} startIcon={false}>Сохранить</Button> : undefined}
      className="h-[520px]"
      header={custom ? <div className="shrink-0 px-[var(--rh-sizing-layout-container)] py-[var(--rh-sizing-base-module-2)] text-sm leading-5 text-[var(--rh-theme-text-neutral-secondary)]">Пользовательский хедер</div> : undefined}
      onClose={() => setClosed(true)}
      title="Настройка объекта"
    >
      <div className="p-[var(--rh-sizing-layout-container)] text-sm leading-5 text-[var(--rh-theme-text-neutral-secondary)]">
        Содержимое Drawer прокручивается внутри панели, а область действий остаётся внизу, пока содержимое помещается по высоте.
      </div>
    </Drawer>
  )
}

export function DrawerExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="Drawer — боковая панель для задач, которые не требуют покидать текущий экран. Заголовок, содержимое и действия настраиваются независимо." title="Стандартный вид">
      <ShowcaseSurface background="white"><ShowcasePanel tone="transparent"><DrawerPreview /></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Передайте header или actions, когда стандартного заголовка или пары действий недостаточно." title="Слоты">
      <ShowcaseSurface background="white"><ShowcasePanel tone="transparent"><DrawerPreview custom /></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Основные настройки Drawer для реализации." title="Свойства">
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>)}
        </div>
        {properties.map((row) => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">{row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>)}</div>)}
      </Table>
    </Section>
  </div>
}
