import * as React from "react"

import { ButtonFavorite } from "@/components/ui/button-favorite"
import { ShowcaseSection } from "@/components/ui/showcase-section"
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

function StateRow({ appearance }: { appearance: "neutral" | "ghost" }) {
  return <div className="grid grid-cols-3 items-center justify-items-center gap-2"><ButtonFavorite appearance={appearance} iconOnly={false} /><ButtonFavorite appearance={appearance} iconOnly={false} state="hover" /><ButtonFavorite appearance={appearance} disabled iconOnly={false} /></div>
}

export function ButtonFavoriteExamples() {
  return <div className="grid min-w-0">
    <ShowcaseSection description="Визуальный стиль повторяет второстепенные Button: neutral использует нейтральную поверхность, ghost — прозрачную." panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4"><div className="flex flex-wrap items-center justify-center gap-3"><ButtonFavorite appearance="neutral" iconOnly={false} /><ButtonFavorite appearance="ghost" iconOnly={false} /></div></div>]} title="Стиль" />

    <ShowcaseSection description="Размеры md и sm соответствуют Figma. xsm оставлен для компактных контекстов прототипа." panels={[<div className="grid min-h-[136px] content-center justify-items-center gap-4 overflow-hidden rounded-xl bg-white px-6 py-4"><div className="flex flex-wrap items-center justify-center gap-3">{(["md", "sm", "xsm"] as const).map(size => <ButtonFavorite appearance="neutral" iconOnly={false} key={size} size={size} />)}</div><div className="flex flex-wrap items-center justify-center gap-3">{(["md", "sm", "xsm"] as const).map(size => <ButtonFavorite key={`icon-${size}`} size={size} />)}</div></div>]} title="Размер" />

    <ShowcaseSection description="Hover показывает реакцию на наведение. Disabled блокирует переключение и использует нейтральное состояние." panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-[var(--rh-theme-fill-neutral-dark)] px-6 py-4"><div className="grid w-full max-w-[520px] gap-2"><div className="grid grid-cols-3 gap-2 text-center text-xs leading-4 text-[var(--parser-text-neutral-secondary)]"><span>default</span><span>hover</span><span>disabled</span></div><StateRow appearance="neutral" /><StateRow appearance="ghost" /><div className="grid grid-cols-3 items-center justify-items-center gap-2"><ButtonFavorite /><ButtonFavorite state="hover" /><ButtonFavorite disabled /></div></div></div>]} title="Состояния" />

    <ShowcaseSection description="Сердце — обязательная иконка действия. Круглый тоггл переключается по нажатию и меняет подпись в текстовом режиме." panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4"><div className="flex flex-wrap items-center justify-center gap-3"><ButtonFavorite /><ButtonFavorite defaultChecked /><ButtonFavorite appearance="neutral" iconOnly={false} /><ButtonFavorite appearance="neutral" defaultChecked iconOnly={false} /></div></div>]} title="Состав" />

    <section className="mb-10 grid gap-3">
      <div className="grid gap-1"><h2 className="rh-typography-h4">Свойства</h2><p className="rh-typography-b1">Основные настройки ButtonFavorite для реализации.</p></div>
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>)}
        </div>
        {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">{row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>)}</div>)}
      </Table>
    </section>
  </div>
}
