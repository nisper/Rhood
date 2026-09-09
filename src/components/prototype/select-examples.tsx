import * as React from "react"

import { Select } from "@/components/ui/select"
import { Menu } from "@/components/ui/menu"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"
import { cn } from "@/lib/utils"

const properties = [
  ["size", "md / sm", "md", "Размер поля."],
  ["content", "text / chips", "text", "Одно значение или несколько выбранных значений."],
  ["disabled", "boolean", "false", "Недоступность поля."],
  ["error", "boolean", "false", "Ошибочное состояние."],
  ["state", "default / hovered / focused", "default", "Состояние взаимодействия."],
  ["expanded", "boolean", "false", "Раскрытое состояние и стрелка вверх."],
  ["helperText", "ReactNode", "—", "Вспомогательный текст под полем."],
  ["icon", "ReactNode / boolean", "false", "Иконка слева от значения."],
]
const options = ["Квартиры", "Дома", "Участки"]

function SelectProperties() {
  const widths = [160, "fill", 140, "fill"] as const

  return (
    <Table className="w-full !min-w-0 rounded-lg border border-[var(--parser-border-light)] bg-white">
      <div className="flex border-b border-[var(--parser-border-light)]" role="row">
        {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={widths[index]}>{title}</TableCell>)}
      </div>
      {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
        {row.map((cell, index) => <TableCell key={cell} role="body" type="text" width={widths[index]}>{cell}</TableCell>)}
      </div>)}
    </Table>
  )
}

function Section({ title, children, description }: { title: string; description: string; children: React.ReactNode }) {
  return <section className="grid w-full gap-4"><div className="grid gap-1"><h2 className="text-xl font-semibold">{title}</h2><p>{description}</p></div>{children}</section>
}

function SelectWithMenu({ align = "left", showMenu = false, ...props }: React.ComponentProps<typeof Select> & { align?: "left" | "right"; showMenu?: boolean }) {
  const selectedValue = typeof props.value === "string" ? props.value : options[0]
  const [open, setOpen] = React.useState(showMenu)

  return <div className={cn("flex w-fit max-w-full flex-col gap-1", align === "right" && "self-end")}>
    <Select {...props} expanded={open} onClick={() => setOpen(value => !value)} value={selectedValue} />
    {open && <Menu align={align}>
      {options.map(option => <MenuItemSingleSelect icon={false} key={option} onClick={() => setOpen(false)} rightSlot={false} secondaryText={false} selected={option === selectedValue} size={props.size ?? "md"}>{option}</MenuItemSingleSelect>)}
    </Menu>}
  </div>
}

export function SelectExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="content=text показывает одно выбранное значение. Для нескольких значений используй content=chips: выбранные значения отображаются как Chip." title="Контент">
      <div className="grid gap-6 rounded-xl bg-[var(--parser-surface-under-islands)] p-4 sm:grid-cols-2">
        <div className="grid gap-2"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Одно значение</p><SelectWithMenu label="Тип объекта" /></div>
        <div className="grid gap-2"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Несколько значений</p><SelectWithMenu content="chips" label="Тип объекта" /></div>
      </div>
    </Section>

    <Section description="Состояние focused обозначает активное поле, expanded — открытое меню. Ошибка и disabled имеют приоритет над состоянием взаимодействия." title="Состояния">
      <div className="grid gap-6 rounded-xl bg-[var(--parser-surface-under-islands)] p-4 sm:grid-cols-2">
        <SelectWithMenu label="По умолчанию" />
        <SelectWithMenu label="Наведение" />
        <SelectWithMenu expanded label="Раскрыто" state="focused" />
        <SelectWithMenu disabled label="Недоступно" />
        <SelectWithMenu error helperText="Проверь значение" label="Ошибка" />
      </div>
    </Section>

    <Section description={'При раскрытии Select открывает компонент Menu на расстоянии 4px от поля. По умолчанию Menu выравнивается по левому краю Select; для выравнивания по правому краю передай align="right". Menu содержит пункты MenuItemSingleSelect, а выбранный пункт отмечается selected=true.'} title="Выпадающее меню">
      <div className="grid w-full gap-6 rounded-xl bg-[var(--parser-surface-under-islands)] p-4 sm:grid-cols-2">
        {["left", "right"].map((align) => (
          <div className="flex w-full flex-col" key={align}>
            <p className="text-xs text-[var(--parser-text-neutral-secondary)]">Выравнивание: {align === "left" ? "слева" : "справа"}</p>
            <SelectWithMenu align={align as "left" | "right"} label="Тип объекта" showMenu state="focused" />
          </div>
        ))}
      </div>
    </Section>

    <Section description="md — основной размер поля, sm — компактный вариант для плотных форм и панелей." title="Размер">
      <div className="grid w-full gap-4 rounded-xl bg-[var(--parser-surface-under-islands)] p-4 sm:grid-cols-2"><SelectWithMenu label="md" size="md" /><SelectWithMenu label="sm" size="sm" /></div>
    </Section>

    <Section description="helperText поясняет поле или сообщает об ошибке. icon добавляет иконку слева от значения." title="Дополнительные элементы">
      <div className="grid w-full gap-6 rounded-xl bg-[var(--parser-surface-under-islands)] p-4 sm:grid-cols-2"><SelectWithMenu helperText="Выбери один вариант" icon label="С иконкой" /><SelectWithMenu helperText="Helper text" label="С пояснением" /></div>
    </Section>

    <SelectProperties />
  </div>
}
