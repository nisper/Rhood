import * as React from "react"

import { ButtonFavorite } from "@/components/ui/button-favorite"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["appearance", "neutral · ghost", "neutral", "Фон кнопки: нейтральный или прозрачный."],
  ["iconOnly", "boolean", "true", "Компактная круглая кнопка без подписи."],
  ["checked / defaultChecked", "boolean", "false", "Контролируемое или начальное состояние тоггла."],
  ["onCheckedChange", "(checked) => void", "—", "Вызывается после переключения состояния."],
  ["size", "md · sm · xsm", "md", "Высота кнопки, иконка и типографика."],
  ["state", "default · hover", "default", "Визуальное состояние для витрины и тестирования."],
  ["label", "ReactNode", "В избранное", "Подпись для невыбранного состояния."],
  ["selectedLabel", "ReactNode", "В избранном", "Подпись для выбранного состояния."],
]

function Section({ children, description, settings, title }: { children: React.ReactNode; description: string; settings?: string[]; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="rh-typography-h4">{title}</h2><p className="rh-typography-b1">{description}</p></div>{children}{settings && <div className="grid gap-0.5">{settings.map(setting => <p className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]" key={setting}>{setting}</p>)}</div>}</section>
}

function StateRow({ appearance }: { appearance: "neutral" | "ghost" }) {
  return <div className="grid grid-cols-3 items-center justify-items-center gap-2"><ButtonFavorite appearance={appearance} iconOnly={false} /><ButtonFavorite appearance={appearance} iconOnly={false} state="hover" /><ButtonFavorite appearance={appearance} disabled iconOnly={false} /></div>
}

export function ButtonFavoriteExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="Визуальный стиль повторяет второстепенные Button: neutral использует нейтральную поверхность, ghost — прозрачную." settings={["appearance: neutral · ghost"]} title="Стиль">
      <ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3"><ButtonFavorite appearance="neutral" iconOnly={false} /><ButtonFavorite appearance="ghost" iconOnly={false} /></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Размер управляет областью нажатия, иконкой и подписью." settings={["size: md · sm · xsm"]} title="Размер">
      <ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3">{(["md", "sm", "xsm"] as const).map(size => <ButtonFavorite appearance="neutral" iconOnly={false} key={size} size={size} />)}</div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Hover показывает реакцию на наведение. Disabled блокирует переключение и использует нейтральное состояние." settings={["state: default · hover", "disabled: boolean"]} title="Состояния">
      <ShowcaseSurface><ShowcasePanel><div className="grid w-full max-w-[520px] gap-2"><div className="grid grid-cols-3 gap-2 text-center text-xs leading-4 text-[var(--parser-text-neutral-secondary)]"><span>default</span><span>hover</span><span>disabled</span></div><StateRow appearance="neutral" /><StateRow appearance="ghost" /></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Сердце — обязательная иконка действия. iconOnly показывает компактный круглый тоггл, а текстовая версия меняет подпись после нажатия." settings={["iconOnly: boolean", "checked / defaultChecked: boolean", "label / selectedLabel: ReactNode"]} title="Состав">
      <ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3"><ButtonFavorite /><ButtonFavorite defaultChecked /><ButtonFavorite appearance="neutral" iconOnly={false} /><ButtonFavorite appearance="neutral" defaultChecked iconOnly={false} /></div></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Основные настройки ButtonFavorite для реализации." title="Свойства">
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>)}
        </div>
        {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">{row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>)}</div>)}
      </Table>
    </Section>
  </div>
}
