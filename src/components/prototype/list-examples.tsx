import * as React from "react"
import { List } from "@/components/ui/list"
import { ListItem, type ListItemProps } from "@/components/ui/list-item"

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
      <div className="overflow-x-auto rounded-lg border border-[var(--parser-border-light)]"><table className="w-full min-w-[640px] text-left text-sm leading-5">
        <thead className="bg-[var(--parser-fill-neutral)]"><tr>{["Свойство", "Значения", "По умолчанию", "Назначение"].map(title => <th className="p-3 font-medium" key={title}>{title}</th>)}</tr></thead>
        <tbody>{properties.map(row => <tr className="border-t border-[var(--parser-border-light)]" key={row[0]}>{row.map((cell,i) => <td className="p-3 align-top" key={i}>{cell}</td>)}</tr>)}</tbody>
      </table></div>
    </section>
  </div>
}
