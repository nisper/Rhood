import * as React from "react"
import { Heart } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["appearance", "primary · secondary · ghost · contrast · inherit", "primary", "Визуальный стиль кнопки."],
  ["size", "md · sm · xsm", "md", "Размер кнопки и вложенной иконки."],
  ["state", "default · hovered", "default", "Визуальное состояние для витрины и тестирования."],
  ["icon", "ReactNode · boolean", "true", "Иконка внутри кнопки. Передай false, чтобы скрыть её."],
]

function Section({ children, description, settings, title }: { children: React.ReactNode; description: string; settings?: string[]; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="text-xl font-semibold leading-7">{title}</h2><p className="text-base leading-6 tracking-[0.15px]">{description}</p></div>{children}{settings && <div className="grid gap-0.5">{settings.map((setting) => <p className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]" key={setting}>{setting}</p>)}</div>}</section>
}

function StateRow({ appearance }: { appearance: NonNullable<React.ComponentProps<typeof IconButton>["appearance"]> }) {
  return <div className="grid grid-cols-2 items-center justify-items-center gap-2"><IconButton appearance={appearance} /><IconButton appearance={appearance} state="hovered" /></div>
}

export function IconButtonExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="Стиль определяет роль икон-кнопки в интерфейсе: primary — для главного действия, secondary и ghost — для второстепенных." settings={["appearance: primary · secondary · ghost · contrast · inherit"]} title="Стиль">
      <ShowcaseSurface direction="vertical"><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3"><IconButton appearance="primary" /><IconButton appearance="secondary" /><IconButton appearance="ghost" /><IconButton appearance="inherit" /></div></ShowcasePanel><ShowcasePanel tone="transparent"><IconButton appearance="contrast" /></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="md — размер по умолчанию; sm и xsm подходят для более плотных интерфейсов." settings={["size: md · sm · xsm"]} title="Размер">
      <ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3">{(["md", "sm", "xsm"] as const).map(size => <IconButton appearance="secondary" key={size} size={size} />)}</div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Hover показывает реакцию на наведение. Состояние применяется также при передаче state='hovered' в витрине." settings={["state: default · hovered"]} title="Состояния">
      <ShowcaseSurface direction="vertical"><ShowcasePanel><div className="grid w-full max-w-[360px] gap-2"><div className="grid grid-cols-2 justify-items-center gap-2 text-center text-xs leading-4 text-[var(--parser-text-neutral-secondary)]"><span>default</span><span>hovered</span></div>{(["primary", "secondary", "ghost", "inherit"] as const).map(appearance => <StateRow appearance={appearance} key={appearance} />)}</div></ShowcasePanel><ShowcasePanel tone="transparent"><div className="grid w-full max-w-[360px] gap-2"><div className="grid grid-cols-2 justify-items-center gap-2 text-center text-xs leading-4 text-[var(--parser-text-neutral-secondary)]"><span>default</span><span>hovered</span></div><StateRow appearance="contrast" /></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Иконка определяет действие. По умолчанию используется Star; для конкретного сценария передай свою через prop icon." settings={["icon: ReactNode · boolean"]} title="Состав">
      <ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3"><IconButton appearance="secondary" /><IconButton appearance="secondary" icon={<Heart aria-hidden="true" strokeWidth={2} />} /></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Основные настройки IconButton для реализации." title="Свойства">
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
