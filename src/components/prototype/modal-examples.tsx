import * as React from "react"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["title", "ReactNode", "—", "Заголовок, который связывается с role=dialog."],
  ["description", "ReactNode", "—", "Краткое пояснение под заголовком."],
  ["actions", "ReactNode", "—", "Кнопки и другие действия в нижней части."],
  ["responsive", "desktop · mobile", "desktop", "Адаптация поверхности и порядка действий."],
  ["closeButton", "true · false", "true", "Показывает кнопку закрытия в desktop-версии."],
  ["onClose", "() => void", "—", "Обработчик кнопки закрытия."],
]

function Section({ children, description, settings, title }: { children: React.ReactNode; description: string; settings?: string[]; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="text-xl font-semibold leading-7">{title}</h2><p className="text-base leading-6 tracking-[0.15px]">{description}</p></div>{children}{settings && <div className="grid gap-0.5">{settings.map((setting) => <p className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]" key={setting}>{setting}</p>)}</div>}</section>
}

function ExampleModal({ responsive = "desktop" }: { responsive?: "desktop" | "mobile" }) {
  const [open, setOpen] = React.useState(true)

  return (
    <div className="grid justify-items-center gap-3">
      {!open && <Button endIcon={false} onClick={() => setOpen(true)} startIcon={false}>Открыть модалку</Button>}
      {open && (
        <Modal
          actions={<><Button appearance="ghost" endIcon={false} onClick={() => setOpen(false)} startIcon={false}>Продолжить создание</Button><Button appearance="default" endIcon={false} onClick={() => setOpen(false)} startIcon={false}>Отменить</Button></>}
          closeButton={responsive === "desktop"}
          description="Все несохранённые данные будут потеряны"
          onClose={() => setOpen(false)}
          responsive={responsive}
          title="Отменить создание объекта?"
        />
      )}
    </div>
  )
}

export function ModalExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="Modal — поверхность диалога для подтверждения действия или решения пользователя. Затемнение фона и управление открытием остаются на уровне экрана." title="Стиль">
      <ShowcaseSurface><ShowcasePanel className="min-h-[360px] bg-[var(--rh-theme-surface-under-islands)]"><ExampleModal /></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Desktop показывает компактный диалог, а mobile — нижний лист с grabber. В мобильной версии второстепенное действие располагается выше основного." settings={["responsive: desktop · mobile"]} title="Размер">
      <ShowcaseSurface direction="vertical"><ShowcasePanel className="min-h-[360px] bg-[var(--rh-theme-surface-under-islands)]"><ExampleModal /></ShowcasePanel><ShowcasePanel className="min-h-[440px] items-end bg-[var(--rh-theme-surface-under-islands)]"><ExampleModal responsive="mobile" /></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Кнопка закрытия доступна в desktop-версии и вызывает onClose. Нативный hover кнопок работает при наведении; disabled не является состоянием Modal и задаётся на самих действиях." settings={["closeButton: true · false", "onClose: () => void"]} title="Состояния">
      <ShowcaseSurface><ShowcasePanel className="min-h-[360px] bg-[var(--rh-theme-surface-under-islands)]"><ExampleModal /></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Передай заголовок, описание и любые существующие RHOOD-кнопки. На витрине действия кликабельны: они закрывают диалог и позволяют открыть его снова." settings={["title: ReactNode", "description: ReactNode", "actions: ReactNode"]} title="Состав">
      <ShowcaseSurface><ShowcasePanel className="min-h-[360px] bg-[var(--rh-theme-surface-under-islands)]"><ExampleModal /></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="Публичные настройки Modal для реализации." title="Свойства">
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
