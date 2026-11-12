import * as React from "react"
import { Heart, MessageSquareText, MoreHorizontal } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"
import { Segment } from "@/components/ui/segment"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { ShowcaseSection } from "@/components/ui/showcase-section"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["appearance", "primary · secondary · ghost · contrast · contrast-ghost · inherit", "primary", "Визуальный стиль кнопки."],
  ["counter", "boolean", "false", "Показывает счётчик в правом верхнем углу кнопки."],
  ["counterValue", "ReactNode", "1", "Содержимое счётчика."],
  ["disabled", "boolean", "false", "Стандартный атрибут кнопки: блокирует взаимодействие."],
  ["icon", "ReactNode · boolean", "true", "Иконка внутри кнопки. Передай false, чтобы скрыть её."],
  ["iconSize", "lg · md · sm · xsm", "как size", "Размер иконки. По умолчанию соответствует размеру кнопки."],
  ["isDisabled", "boolean", "false", "Альтернативный флаг отключения кнопки."],
  ["size", "md · sm · xsm", "md", "Размер кнопки."],
  ["state", "default · hovered", "default", "Показывает hover-состояние в примере."],
  ["style", "primary · secondary · ghost · contrast · contrast-ghost · inherit", "—", "Устаревший алиас appearance."],
]

const panelClass = "flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4"

function LabeledButton({ appearance, label, ...props }: React.ComponentProps<typeof IconButton> & { label: string }) {
  return (
    <div className="grid justify-items-center gap-2">
      <IconButton aria-label={label} appearance={appearance} {...props} />
      <span className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">{label}</span>
    </div>
  )
}

function StateRow({ appearance }: { appearance: NonNullable<React.ComponentProps<typeof IconButton>["appearance"]> }) {
  return (
    <div className="grid grid-cols-3 items-center justify-items-center gap-2">
      <IconButton aria-label={`${appearance}, default`} appearance={appearance} />
      <IconButton aria-label={`${appearance}, hover`} appearance={appearance} state="hovered" />
      <IconButton aria-label={`${appearance}, disabled`} appearance={appearance} disabled />
    </div>
  )
}

export function IconButtonExamples() {
  const [size, setSize] = React.useState<"md" | "sm" | "xsm">("md")

  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Выбери оформление по контексту действия. Наведи на кнопки, чтобы увидеть hover."
        panels={[
          <div className={`${panelClass} gap-8`} key="light">
            <LabeledButton appearance="primary" label="primary" />
            <LabeledButton appearance="secondary" label="secondary" />
            <LabeledButton appearance="ghost" label="ghost" />
            <LabeledButton appearance="inherit" label="inherit" />
          </div>,
          <div className="flex min-h-[136px] items-center justify-center gap-8 overflow-hidden rounded-xl bg-[var(--rh-theme-fill-contrast)] px-6 py-4">
            <LabeledButton appearance="contrast" label="contrast" />
            <LabeledButton appearance="contrast-ghost" label="contrast-ghost" />
          </div>,
        ]}
        title="Стиль"
      />

      <ShowcaseSection
        description="Переключи размер, чтобы посмотреть габариты кнопки и иконки."
        panels={[
          <div className={panelClass} key="size">
            <div className="grid justify-items-center gap-3">
              <IconButton aria-label={`IconButton ${size}`} appearance="secondary" size={size} />
            </div>
          </div>,
        ]}
        settings={(
          <div className="py-2">
            <SegmentedControl aria-label="Размер IconButton" onValueChange={(value) => typeof value === "string" && setSize(value as typeof size)} value={size}>
              <Segment value="md">md</Segment>
              <Segment value="sm">sm</Segment>
              <Segment value="xsm">xsm</Segment>
            </SegmentedControl>
          </div>
        )}
        title="Размер"
      />

      <ShowcaseSection
        description="Показаны default, hover и disabled. Hover также работает при наведении на обычную кнопку."
        panels={[
          <div className={panelClass} key="default">
            <div className="grid w-full max-w-[420px] gap-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]"><span>default</span><span>hover</span><span>disabled</span></div>
              {(["primary", "secondary", "ghost", "inherit"] as const).map(appearance => <StateRow appearance={appearance} key={appearance} />)}
            </div>
          </div>,
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-[var(--rh-theme-fill-contrast)] px-6 py-4" key="contrast">
            <div className="grid w-full max-w-[420px] gap-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]"><span>default</span><span>hover</span><span>disabled</span></div>
              <StateRow appearance="contrast" />
              <StateRow appearance="contrast-ghost" />
            </div>
          </div>,
        ]}
        title="Состояния"
      />

      <ShowcaseSection
        description="Счётчик отображается в правом верхнем углу кнопки. Его можно включить и передать любое содержимое через counterValue."
        panels={[
          <div className={`${panelClass} gap-8`} key="composition">
            <LabeledButton appearance="secondary" label="Иконка по умолчанию" />
            <LabeledButton appearance="secondary" icon={<Heart aria-hidden="true" strokeWidth={2} />} label="Своя иконка" />
            <LabeledButton appearance="secondary" counter counterValue={3} icon={<MessageSquareText aria-hidden="true" />} label="Комментарии: 3" />
            <LabeledButton appearance="secondary" counter counterValue="9+" icon={<MoreHorizontal aria-hidden="true" />} label="Ещё: 9+" />
          </div>,
        ]}
        title="Состав"
        usedComponents={[{ href: "/Rhood/?view=components&component=badge", title: "Badge" }]}
      />

      <section className="mb-10 grid gap-3">
        <div className="grid gap-1"><h2 className="rh-typography-h4">Свойства</h2><p className="rh-typography-b1">Публичные настройки IconButton и унаследованный атрибут disabled.</p></div>
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
  )
}
