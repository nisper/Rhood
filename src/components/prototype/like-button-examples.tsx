import * as React from "react"

import { LikeButton } from "@/components/ui/like-button"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["checked", "boolean", "false", "Показывает выбранное состояние кнопки."],
  ["state", "default · hover", "default", "Статично задаёт состояние для витрины и тестирования."],
  ["disabled", "boolean", "false", "Блокирует взаимодействие и применяет нативное disabled-состояние."],
  ["aria-label", "string", "—", "Текстовое описание действия для скринридера."],
]

function Section({ children, description, settings, title }: { children: React.ReactNode; description: string; settings?: string[]; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="rh-typography-h4">{title}</h2><p className="rh-typography-b1">{description}</p></div>{children}{settings && <div className="grid gap-0.5">{settings.map(setting => <p className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]" key={setting}>{setting}</p>)}</div>}</section>
}

function InteractiveLikeButton({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked)

  return <LikeButton aria-label={checked ? "Убрать лайк" : "Поставить лайк"} checked={checked} onClick={() => setChecked(current => !current)} />
}

export function LikeButtonExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="LikeButton не имеет вариантов стиля и размера: это круглая кнопка 40 × 40 px с иконкой thumbs-up." title="Состояния" settings={["state: default · hover", "disabled: boolean"]}>
      <ShowcaseSurface>
        <ShowcasePanel>
          <div className="grid w-full max-w-[360px] grid-cols-3 justify-items-center gap-3">
            <span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">default</span>
            <span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">hover</span>
            <span className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">disabled</span>
            <LikeButton aria-label="Поставить лайк" />
            <LikeButton aria-label="Поставить лайк" state="hover" />
            <LikeButton aria-label="Поставить лайк" disabled />
            <LikeButton aria-label="Убрать лайк" checked />
            <LikeButton aria-label="Убрать лайк" checked state="hover" />
            <LikeButton aria-label="Убрать лайк" checked disabled />
          </div>
        </ShowcasePanel>
      </ShowcaseSurface>
    </Section>

    <Section description="Thumbs-up — единственный элемент кнопки. Нажми на примеры, чтобы переключить выбранное состояние; нативный hover также работает при наведении." title="Состав" settings={["checked: boolean", "aria-pressed: boolean"]}>
      <ShowcaseSurface>
        <ShowcasePanel>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <InteractiveLikeButton />
            <InteractiveLikeButton defaultChecked />
          </div>
        </ShowcasePanel>
      </ShowcaseSurface>
    </Section>

    <Section description="Основные настройки LikeButton для реализации." title="Свойства">
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>)}
        </div>
        {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">{row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>)}</div>)}
      </Table>
    </Section>
  </div>
}
