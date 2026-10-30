import { ShowcaseSection } from "@/components/ui/showcase-section";
import * as React from "react"

import { Menu } from "@/components/ui/menu"
import { MenuDivider } from "@/components/ui/menu-divider"
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const options = ["Квартира", "Дом", "Комната"]

const properties = [
  ["Menu.children", "ReactNode", "—", "Пункты выбора и разделители внутри контейнера."],
  ["Menu.align", "left · right", "left", "Выравнивает Menu по соответствующему краю родителя."],
  ["Menu.className", "string", "—", "Настраивает расположение и ширину контейнера."],
  ["MenuItemSingleSelect.selected", "true · false", "true", "Отмечает выбранный пункт одиночного выбора."],
  ["MenuItemMultiselect.checked", "true · false · indeterminate", "false", "Определяет состояние чекбокса пункта множественного выбора."],
  ["MenuItem*.state", "default · hovered", "default", "Фиксирует состояние для витрины; нативный hover также работает."],
  ["MenuItem*.disabled", "true · false", "false", "Отключает взаимодействие и снижает контраст пункта."],
  ["MenuItem*.startIcon", "true · false", "true", "Показывает иконку слева от текста."],
  ["MenuItem*.secondaryText", "true · false", "true", "Показывает вторичный текст под основным."],
  ["MenuItem*.rightSlot", "true · false", "true", "Показывает правый слот с текстом и Chip."],
]

function CodeSyntax({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--rh-theme-text-neutral-secondary)]">{children}</span>
}

function CodeComponent({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--rh-palette-purple-700)]">{children}</span>
}

function CodeProp({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--rh-theme-text-info)]">{children}</span>
}

function MenuCompositionSnippet() {
  return <code className="font-mono text-sm leading-5"><CodeSyntax>{"<"}</CodeSyntax><CodeComponent>Menu</CodeComponent><CodeSyntax>{">\n  <"}</CodeSyntax><CodeComponent>MenuItemSingleSelect</CodeComponent>{" "}<CodeProp>selected</CodeProp><CodeSyntax>{" />\n  <"}</CodeSyntax><CodeComponent>MenuDivider</CodeComponent><CodeSyntax>{" />\n  <"}</CodeSyntax><CodeComponent>MenuItemMultiselect</CodeComponent>{" "}<CodeProp>checked</CodeProp><CodeSyntax>{" />\n</"}</CodeSyntax><CodeComponent>Menu</CodeComponent><CodeSyntax>{">"}</CodeSyntax></code>
}

function MenuItemLabel({ children, label }: { children: React.ReactNode; label: string }) {
  return <div className="grid content-start gap-2"><p className="text-center text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">{label}</p>{children}</div>
}

function InteractiveMenus() {
  const [selected, setSelected] = React.useState("Квартира")
  const [checked, setChecked] = React.useState<string[]>(["Квартира"])

  return <div className="flex flex-wrap items-start justify-center gap-8">
    <MenuItemLabel label="Одиночный выбор">
      <Menu aria-label="Тип объекта" role="listbox">
        {options.map((label, index) => <React.Fragment key={label}>
          {index === 2 && <MenuDivider />}
          <MenuItemSingleSelect aria-selected={selected === label} onClick={() => setSelected(label)} role="option" secondaryText={false} rightSlot={false} selected={selected === label} tabIndex={0}>{label}</MenuItemSingleSelect>
        </React.Fragment>)}
      </Menu>
    </MenuItemLabel>
    <MenuItemLabel label="Множественный выбор">
      <Menu aria-label="Типы объектов" aria-multiselectable="true" role="listbox">
        {options.map((label, index) => <React.Fragment key={label}>
          {index === 2 && <MenuDivider />}
          <MenuItemMultiselect aria-selected={checked.includes(label)} checked={checked.includes(label)} icon={false} onClick={() => setChecked(values => values.includes(label) ? values.filter(value => value !== label) : [...values, label])} role="option" secondaryText={false} rightSlot={false} tabIndex={0}>{label}</MenuItemMultiselect>
        </React.Fragment>)}
      </Menu>
    </MenuItemLabel>
  </div>
}

export function MenuExamples() {
  return <div className="grid min-w-0 gap-10">
    <ShowcaseSection
      codeSnippet={<MenuCompositionSnippet />}
      description="Menu использует единый контрастный контейнер без вариантов appearance и размеров. Его визуальный контекст формируют пункты MenuItemSingleSelect и MenuItemMultiselect."
      panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><Menu><MenuItemSingleSelect secondaryText={false} rightSlot={false}>Menu item</MenuItemSingleSelect><MenuDivider /><MenuItemMultiselect checked={false} icon={false} secondaryText={false} rightSlot={false}>Menu item</MenuItemMultiselect></Menu></div>]}
      title="Стиль"
    />

    <ShowcaseSection
      settings={["state: default · hovered", "disabled: boolean", "selected: boolean", "checked: boolean"]}
      description="Пункты поддерживают default, hover и disabled. Для одиночного выбора выбранность — отдельное состояние; для множественного её показывает чекбокс."
      panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><div className="grid w-full max-w-[640px] grid-cols-3 gap-3"><MenuItemLabel label="default"><Menu><MenuItemSingleSelect secondaryText={false} rightSlot={false} selected={false}>Menu item</MenuItemSingleSelect></Menu></MenuItemLabel><MenuItemLabel label="hover"><Menu><MenuItemSingleSelect secondaryText={false} rightSlot={false} selected={false} state="hovered">Menu item</MenuItemSingleSelect></Menu></MenuItemLabel><MenuItemLabel label="disabled"><Menu><MenuItemSingleSelect disabled secondaryText={false} rightSlot={false} selected={false}>Menu item</MenuItemSingleSelect></Menu></MenuItemLabel></div></div>, <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4"><div className="grid w-full max-w-[640px] grid-cols-2 gap-3"><MenuItemLabel label="selected"><Menu><MenuItemSingleSelect secondaryText={false} rightSlot={false}>Menu item</MenuItemSingleSelect></Menu></MenuItemLabel><MenuItemLabel label="checked"><Menu><MenuItemMultiselect checked icon={false} secondaryText={false} rightSlot={false}>Menu item</MenuItemMultiselect></Menu></MenuItemLabel></div></div>]}
      title="Состояния"
    />

    <ShowcaseSection
      codeSnippet={<MenuCompositionSnippet />}
      description="Собирай Menu из пунктов и MenuDivider. Примеры интерактивны: нажми на пункт, чтобы изменить выбранное значение."
      panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><InteractiveMenus /></div>]}
      title="Состав"
    />

    <ShowcaseSection
      description="Основные настройки Menu и его пунктов для реализации."
      panels={[<Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 180 : 140}>{title}</TableCell>)}
        </div>
        {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
          {row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 180 : 140}>{cell}</TableCell>)}
        </div>)}
      </Table>]}
      title="Свойства"
    />
  </div>
}
