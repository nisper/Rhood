import * as React from "react"
import { List } from "@/components/ui/list"
import { ListItem, type ListItemProps } from "@/components/ui/list-item"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const states: { label: string; props: ListItemProps }[] = [
  { label: "Default", props: {} },
  { label: "Hovered", props: { state: "hovered" } },
  { label: "Selected — текущий раздел", props: { selected: true } },
  { label: "Disabled", props: { disabled: true } },
]
const properties = [
  ["paddingX", "boolean", "true", "Горизонтальные отступы 16 px; false — отступы задаёт родитель."],
  ["dense", "boolean", "false", "Вертикальные отступы строки: 8 px или 4 px для компактной плотности."],
  ["fontWeight", "medium / regular", "medium", "Насыщенность основного текста."],
  ["selected", "boolean", "false", "Текущий раздел навигации."],
  ["state", "default / hovered", "default", "Hovered применяется только к доступной невыбранной строке."],
  ["disabled", "boolean", "false", "Отключает обработчики строки и вложенные кнопки; отменяет selected и hovered."],
  ["startIcon / endIcon", "boolean", "true", "Иконки в начале и конце строки."],
  ["secondaryText", "boolean", "true", "Вторичный текст во всех состояниях и при обеих насыщенностях."],
  ["iconButton / button", "boolean", "true", "Дополнительные действия справа."],
  ["children / secondaryLabel", "ReactNode", "List item / Secondary", "Основной и вторичный текст строки."],
  ["disGutters", "boolean", "false", "Старое имя настройки отступов. Явный paddingX имеет приоритет."],
]

export function ListExamples() {
  const [page, setPage] = React.useState("Объекты")
  return <div className="grid min-w-0 gap-10">
    <section className="grid gap-4">
      <h2 className="text-xl font-semibold">Навигационный список</h2>
      <p>List объединяет строки ListItem. Selected отмечает текущий раздел; для выбора значения в Dropdown используется Menu.</p>
      <div className="grid gap-6 rounded-xl bg-[var(--parser-surface-under-islands)] p-4 sm:grid-cols-2 sm:p-6">
        <nav aria-label="Пример навигации"><List className="rounded-xl bg-white p-2">
          {["Объекты", "Профиль", "Настройки"].map(label => <button
            aria-current={page === label ? "page" : undefined}
            className="w-full cursor-pointer rounded-lg text-left focus-visible:outline-2 focus-visible:outline-[var(--parser-border-focus)]"
            key={label}
            onClick={() => setPage(label)}
            type="button"
          ><ListItem selected={page === label} button={false} iconButton={false} secondaryText={false} endIcon={false}>{label}</ListItem></button>)}
        </List></nav>
        <section aria-live="polite" className="grid content-start gap-2 rounded-xl bg-white p-4">
          <h3 className="font-medium">{page}</h3>
          <p className="text-sm text-[var(--parser-text-neutral-secondary)]">Содержимое выбранного раздела в примере.</p>
        </section>
      </div>
    </section>
    <section className="grid gap-4" id="list-item">
      <h2 className="text-xl font-semibold">ListItem — состояния и варианты</h2>
      <p>Обычная и компактная плотность, оба начертания и варианты горизонтальных отступов.</p>
      {[true, false].map(paddingX => [false, true].map(dense => (["medium", "regular"] as const).map(fontWeight => <section className="grid gap-3" key={`${paddingX}-${dense}-${fontWeight}`}>
        <h3 className="text-sm font-medium">paddingX={String(paddingX)} · dense={String(dense)} · {fontWeight}</h3>
        <div className="grid gap-4 xl:grid-cols-2">{states.map(({label, props}) => <div className="grid min-w-0 gap-2" key={label}>
          <p className="text-xs text-[var(--parser-text-neutral-secondary)]">{label}</p>
          <ListItem {...props} paddingX={paddingX} dense={dense} fontWeight={fontWeight} />
        </div>)}</div>
      </section>)))}
    </section>
    <section className="grid gap-4">
      <h2 className="text-xl font-semibold">Состав строки</h2>
      <List className="max-w-[480px]">
        <ListItem button={false} iconButton={false} secondaryText={false}>Одна строка</ListItem>
        <ListItem button={false} iconButton={false} secondaryLabel="Дополнительная информация">Две строки</ListItem>
        <ListItem startIcon={false} endIcon={false} iconButton={false} button={false} secondaryText={false}>Только текст</ListItem>
        <ListItem startIcon={false} endIcon={false} secondaryText={false} iconButton={false}>С кнопкой</ListItem>
        <ListItem startIcon={false} endIcon={false} secondaryText={false} button={false}>С иконкой-действием</ListItem>
      </List>
    </section>
    <section className="grid min-w-0 gap-4">
      <h2 className="text-xl font-semibold">Свойства</h2>
      <p>Состав List задаётся через children. В ListItem доступны следующие настройки:</p>
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
