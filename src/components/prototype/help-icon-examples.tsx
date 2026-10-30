import * as React from "react"

import { ShowcaseSection } from "@/components/ui/showcase-section"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"
import { HelpIcon } from "@/components/ui/help-icon"

const properties = [
  ["size", '"lg" · "md" · "sm"', '"lg"', "Размер иконки."],
  ["icon", '"circle-question-mark" · "info"', '"circle-question-mark"', "Вариант значка: вопрос по умолчанию или информация."],
  ["state", '"default" · "hovered"', '"default"', "Фиксированное состояние для примеров; при наведении состояние также меняется автоматически."],
  ["tooltip", "ReactNode", '"Typography"', "Содержимое подсказки, которая показывается при наведении."],
  ["disabled", "boolean", "false", "Нативно отключает кнопку и её взаимодействие."],
  ["type", '"button" · "submit" · "reset"', '"button"', "Тип нативной кнопки."],
  ["className", "string", "—", "Дополнительные классы для компоновки."],
  ["…props", 'ComponentProps<"button">', "—", "Остальные нативные свойства кнопки."],
]

const canvasClass = "flex min-h-[136px] items-center justify-center overflow-visible rounded-xl bg-white px-6 py-4"

export function HelpIconExamples() {
  return <div className="grid min-w-0">
    <ShowcaseSection description="По умолчанию HelpIcon показывает круглый значок вопроса. Он сохраняет один стиль во всех трёх размерах." panels={[<div className={canvasClass}><HelpIcon /></div>]} title="Стиль" />

    <ShowcaseSection settings={["size: lg · md · sm"]} description="Доступны три размера: lg, md и sm. Каждый пример показан в исходном состоянии; наведи курсор, чтобы увидеть подсказку." panels={[<div className={`${canvasClass} gap-10`}><div className="grid justify-items-center gap-2"><HelpIcon size="lg" /><span className="rh-typography-b2">lg</span></div><div className="grid justify-items-center gap-2"><HelpIcon size="md" /><span className="rh-typography-b2">md</span></div><div className="grid justify-items-center gap-2"><HelpIcon size="sm" /><span className="rh-typography-b2">sm</span></div></div>]} title="Размер" />

    <ShowcaseSection settings={["state: default · hovered", "disabled: boolean"]} description="default показывает только иконку. Наведение открывает подсказку и усиливает контраст; hovered зафиксирован для сравнения. disabled использует нативное отключение кнопки, отдельный визуальный стиль для него в Figma не задан." panels={[<div className={`${canvasClass} gap-12`}><div className="grid justify-items-center gap-2"><HelpIcon /><span className="rh-typography-b2">default · hover</span></div><div className="grid justify-items-center gap-2"><HelpIcon state="hovered" /><span className="rh-typography-b2">hovered</span></div><div className="grid justify-items-center gap-2"><HelpIcon disabled /><span className="rh-typography-b2">disabled</span></div></div>]} title="Состояния" />

    <ShowcaseSection settings={["icon: circle-question-mark · info", "tooltip: ReactNode"]} description="Вариант info отображает информационный значок, а tooltip принимает любой ReactNode. Подсказка появляется поверх соседних элементов и не меняет их положение." panels={[<div className={`${canvasClass} gap-10`}><HelpIcon tooltip="Краткая подсказка" /><HelpIcon icon="info" tooltip="Подсказка с дополнительной информацией" /></div>]} title="Состав" />

    <section className="mb-10 grid gap-3">
      <div className="grid gap-1"><h2 className="rh-typography-h4">Свойства</h2><p className="rh-typography-b1">HelpIcon — кнопка с подсказкой и тремя размерами значка.</p></div>
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
}
