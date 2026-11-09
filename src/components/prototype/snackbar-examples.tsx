import * as React from "react"

import { Button } from "@/components/ui/button"
import { ShowcaseSection } from "@/components/ui/showcase-section"
import { Snackbar } from "@/components/ui/snackbar"
import { SnackbarViewport } from "@/components/ui/snackbar-viewport"
import { Switch } from "@/components/ui/switch"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"
import { useSnackbarQueue } from "@/hooks/use-snackbar-queue"

const properties = [
  ["message", "ReactNode", "Message", "Текст уведомления."],
  ["icon", "boolean · ReactNode", "true", "Показывает стандартную или переданную иконку; false скрывает её."],
  ["button", "boolean", "true", "Показывает кнопку действия."],
  ["actionLabel", "ReactNode", "Label", "Подпись кнопки действия."],
  ["open", "boolean", "true", "Показывает Snackbar; при скрытии он плавно уезжает вниз."],
  ["onAction", "() => void", "—", "Вызывается при нажатии на кнопку действия."],
  ["close", "boolean", "true", "Показывает кнопку закрытия."],
  ["onClose", "() => void", "—", "Вызывается при нажатии на кнопку закрытия."],
]

export function SnackbarExamples() {
  const [showIcon, setShowIcon] = React.useState(true)
  const [showAction, setShowAction] = React.useState(true)
  const [showClose, setShowClose] = React.useState(true)
  const { notices, show: showSnackbarOnScreen, dismiss: dismissScreenSnackbar } = useSnackbarQueue(3)

  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Переключай дополнительные элементы и смотри, как меняется Snackbar."
        panels={[
          <div className="flex min-h-[100px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4" key="default">
            <Snackbar button={showAction} close={showClose} icon={showIcon} message="Изменения сохранены" />
          </div>,
        ]}
        direction="vertical"
        settings={(
          <div className="grid content-start gap-0 bg-white px-4">
          <Switch checked={showIcon} onChange={(event) => setShowIcon(event.target.checked)} size="sm" switchPosition="left">Иконка</Switch>
          <Switch checked={showAction} onChange={(event) => setShowAction(event.target.checked)} size="sm" switchPosition="left">Кнопка действия</Switch>
          <Switch checked={showClose} onChange={(event) => setShowClose(event.target.checked)} size="sm" switchPosition="left">Кнопка закрытия</Switch>
          </div>
        )}
        title="Состав"
      >
        <Button appearance="ghost" className="justify-self-start" endIcon={false} onClick={() => showSnackbarOnScreen("Изменения сохранены", showClose ? 8000 : 3000)} size="md" startIcon={false}>Показать на экране</Button>
      </ShowcaseSection>
      <SnackbarViewport
        button={showAction}
        close={showClose}
        icon={showIcon}
        notices={notices}
        onAction={dismissScreenSnackbar}
        onClose={dismissScreenSnackbar}
      />

      <section className="mb-10 grid gap-3">
        <div className="grid gap-1">
          <h2 className="rh-typography-h4">Свойства</h2>
          <p className="rh-typography-b1">Уведомление настраивается сообщением, иконкой и необязательными элементами управления.</p>
        </div>
        <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
          <div className="flex border-b border-[var(--parser-border-light)]" role="row">
            {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => (
              <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>
            ))}
          </div>
          {properties.map((row) => (
            <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
              {row.map((cell, index) => (
                <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>
              ))}
            </div>
          ))}
        </Table>
      </section>
    </div>
  )
}
