import * as React from "react"
import { Menu } from "@/components/ui/menu"
import { MenuDivider } from "@/components/ui/menu-divider"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect"

const options = ["Квартира", "Дом", "Комната"]
const commonProperties = [
  ["icon / startIcon", "boolean", "true", "Иконка слева; startIcon сохранён для совместимости."],
  ["secondaryText", "boolean", "true", "Показ вторичного текста."],
  ["rightSlot", "boolean", "true", "Видимость всего правого слота."],
  ["rightSlotText / rightSlotChip", "boolean", "true", "Текст и Chip внутри включённого правого слота."],
  ["disabled", "boolean", "false", "Недоступное состояние, обработчики клика и клавиатуры отключены."],
  ["state", "default / hovered", "default", "Фиксированное состояние для примера; наведение также работает мышью."],
  ["children", "ReactNode", "Menu Item", "Основной текст пункта."],
]

function Properties({ rows }: { rows: string[][] }) {
  return <div className="overflow-x-auto rounded-lg border border-[var(--parser-border-light)]">
    <table className="w-full min-w-[640px] text-left text-sm leading-5">
      <thead className="bg-[var(--parser-fill-neutral)]"><tr>{["Свойство", "Значения", "По умолчанию", "Назначение"].map(t => <th className="p-3 font-medium" key={t}>{t}</th>)}</tr></thead>
      <tbody>{rows.map(row => <tr className="border-t border-[var(--parser-border-light)]" key={row[0]}>{row.map((cell, i) => <td className="p-3 align-top" key={i}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
}

function Example({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid content-start gap-2"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">{label}</p>{children}</div>
}

export function MenuExamples() {
  const [selected, setSelected] = React.useState("Квартира")
  const [checked, setChecked] = React.useState<string[]>(["Квартира"])
  return <div className="grid min-w-0 gap-10">
    <section className="grid gap-4">
      <h3 className="text-xl font-semibold">Menu</h3>
      <p>Общий контейнер. Нажми на пункт: слева выбирается одно значение, справа — несколько.</p>
      <div className="flex flex-wrap gap-8 rounded-xl bg-[var(--parser-surface-under-islands)] p-6">
        <Example label="Одиночный выбор"><Menu>{options.map((label, index) => <React.Fragment key={label}>
          {index === 2 && <MenuDivider />}
          <button type="button" aria-pressed={selected === label} className="cursor-pointer rounded-lg text-left focus-visible:outline-2 focus-visible:outline-[var(--parser-border-focus)]" onClick={() => setSelected(label)}>
            <MenuItemSingleSelect className="w-full" secondaryText={false} rightSlot={false} selected={selected === label}>{label}</MenuItemSingleSelect>
          </button>
        </React.Fragment>)}</Menu></Example>
        <Example label="Множественный выбор"><Menu>{options.map((label, index) => <React.Fragment key={label}>
          {index === 2 && <MenuDivider />}
          <button type="button" aria-pressed={checked.includes(label)} className="cursor-pointer rounded-lg text-left focus-visible:outline-2 focus-visible:outline-[var(--parser-border-focus)]" onClick={() => setChecked(values => values.includes(label) ? values.filter(v => v !== label) : [...values, label])}>
            <MenuItemMultiselect className="w-full" icon={false} secondaryText={false} rightSlot={false} checked={checked.includes(label)}>{label}</MenuItemMultiselect>
          </button>
        </React.Fragment>)}</Menu></Example>
      </div>
      <Properties rows={[["children", "ReactNode", "—", "Пункты выбора и разделители. Пустой состав остаётся пустым."], ["className", "string", "—", "Ширина и оформление контейнера; базовая ширина 215 px."]]} />
    </section>
    <section className="grid gap-4" id="menu-item-single-select">
      <h3 className="text-xl font-semibold">MenuItemSingleSelect</h3>
      <div className="flex flex-wrap gap-6">
        <Example label="Default"><MenuItemSingleSelect selected={false} /></Example>
        <Example label="Hovered"><MenuItemSingleSelect selected={false} state="hovered" /></Example>
        <Example label="Selected"><MenuItemSingleSelect /></Example>
        <Example label="Disabled"><MenuItemSingleSelect selected={false} disabled /></Example>
        <Example label="Без иконки и дополнительного текста"><MenuItemSingleSelect selected={false} icon={false} secondaryText={false} rightSlot={false} /></Example>
      </div>
      <Properties rows={[["selected", "boolean", "true", "Текущее выбранное значение."], ...commonProperties]} />
    </section>
    <section className="grid gap-4" id="menu-item-multiselect">
      <h3 className="text-xl font-semibold">MenuItemMultiselect</h3>
      <div className="flex flex-wrap gap-6">{[false, true].map(value => <React.Fragment key={String(value)}>
        <Example label={`Checked: ${value}`}><MenuItemMultiselect checked={value} /></Example>
        <Example label={`Checked: ${value}, hovered`}><MenuItemMultiselect checked={value} state="hovered" /></Example>
        <Example label={`Checked: ${value}, disabled`}><MenuItemMultiselect checked={value} disabled /></Example>
      </React.Fragment>)}
        <Example label="Indeterminate — дополнительное состояние кода"><MenuItemMultiselect checked="indeterminate" /></Example>
      </div>
      <Properties rows={[["checked", 'boolean / "none" / "true" / "indeterminate"', "false", "Выбранность. Старые строковые значения сохранены."], ["selected", "boolean", "false", "Совместимость: используется, только если checked не задан."], ...commonProperties]} />
    </section>
    <section className="grid gap-4" id="menu-divider">
      <h3 className="text-xl font-semibold">MenuDivider</h3>
      <p>Разделяет группы внутри Menu. Высота 16 px, отступы линии по бокам 12 px; ширина следует за контейнером.</p>
      <Menu><MenuItemSingleSelect selected={false} secondaryText={false} rightSlot={false}>Первая группа</MenuItemSingleSelect><MenuDivider /><MenuItemSingleSelect selected={false} secondaryText={false} rightSlot={false}>Вторая группа</MenuItemSingleSelect></Menu>
    </section>
  </div>
}
