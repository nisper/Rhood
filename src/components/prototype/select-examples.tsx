import * as React from "react";

import { Menu } from "@/components/ui/menu";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { useMenuOpen } from "@/hooks/use-menu-open";
import { Select } from "@/components/ui/select";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { cn } from "@/lib/utils";

const options = ["Квартиры", "Дома", "Участки"];

const properties = [
  ["size", "md · sm", "md", "Размер поля и типографики значения."],
  ["content", "text · chips", "text", "Одно или несколько выбранных значений."],
  ["value", "ReactNode", "Value", "Отображаемое выбранное значение."],
  ["label", "ReactNode · false", "Label", "Подпись над полем; false скрывает её."],
  ["icon", "boolean", "false", "Показывает иконку слева от значения."],
  ["helperText", "ReactNode", "—", "Пояснение или текст ошибки под полем."],
  ["state", "default · hovered · focused", "default", "Статичное состояние для демонстрации и тестирования."],
  ["expanded", "boolean", "false", "Открывает меню и поворачивает индикатор."],
  ["onExpandedChange", "(expanded) => void", "—", "Вызывается при закрытии меню вне компонента."],
  ["disabled", "boolean", "false", "Блокирует взаимодействие."],
  ["error", "boolean", "false", "Показывает ошибочное состояние."],
  ["menu", "ReactNode", "—", "Контент выпадающего меню."],
  ["fullWidth", "boolean", "false", "Растягивает поле на ширину контейнера."],
];

function CodeProp({ name, value }: { name: string; value?: string }) {
  return (
    <>
      <span className="text-[var(--rh-theme-text-info)]">{name}</span>
      {value && (
        <>
          <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
          <span className="text-[var(--rh-theme-text-success)]">{value}</span>
        </>
      )}
    </>
  );
}

function SelectSnippet({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
      <span className="text-[var(--rh-palette-purple-700)]">Select</span>{" "}
      {children}
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    </code>
  );
}

const sizeSnippet = <SelectSnippet><CodeProp name="size" value={'"sm"'} /></SelectSnippet>;
const stateSnippet = <SelectSnippet><CodeProp name="state" value={'"focused"'} /></SelectSnippet>;
const compositionSnippet = <SelectSnippet><CodeProp name="content" value={'"chips"'} />{" "}<CodeProp name="icon" /></SelectSnippet>;

function SelectWithMenu({
  align = "left",
  defaultOpen = false,
  ...props
}: React.ComponentProps<typeof Select> & {
  align?: "left" | "right";
  defaultOpen?: boolean;
}) {
  const initialValue = typeof props.value === "string" ? props.value : options[0];
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useMenuOpen(menuRef, defaultOpen);
  const [value, setValue] = React.useState(initialValue);

  return (
    <div ref={menuRef}>
    <Select
      {...props}
      expanded={expanded}
      menu={
        expanded && (
          <Menu
            align={align}
            className={cn(
              "absolute top-full z-50 mt-1",
              align === "left" ? "left-0" : "right-0",
            )}
          >
            {options.map((option) => (
              <MenuItemSingleSelect
                icon={false}
                key={option}
                onClick={(event) => {
                  event.stopPropagation();
                  setValue(option);
                  setExpanded(false);
                }}
                rightSlot={false}
                secondaryText={false}
                selected={option === value}
              >
                {option}
              </MenuItemSingleSelect>
            ))}
          </Menu>
        )
      }
      onClick={() => {
        if (!props.disabled) setExpanded((current) => !current);
      }}
      onExpandedChange={setExpanded}
      value={value}
    />
    </div>
  );
}

function PropertiesTable() {
  return (
    <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
      <div className="flex border-b border-[var(--parser-border-light)]" role="row">
        {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => (
          <TableCell
            helpIcon={false}
            key={title}
            role="head"
            sort={false}
            type="text"
            width={index === 3 ? "fill" : index === 0 ? 160 : 140}
          >
            {title}
          </TableCell>
        ))}
      </div>
      {properties.map((row) => (
        <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
          {row.map((cell, index) => (
            <TableCell
              key={index}
              role="body"
              type="text"
              width={index === 3 ? "fill" : index === 0 ? 160 : 140}
            >
              {cell}
            </TableCell>
          ))}
        </div>
      ))}
    </Table>
  );
}

export function SelectExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={sizeSnippet}
        description="Select использует единый визуальный стиль. Размер md — основной, sm подходит для плотных панелей и фильтров."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <div className="flex flex-wrap items-end justify-center gap-6">
                <SelectWithMenu label="md" size="md" />
                <SelectWithMenu label="sm" size="sm" />
              </div>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Размер"
      />

      <ShowcaseSection
        codeSnippet={stateSnippet}
        description="Нативный hover работает при наведении. Focused, error и disabled помогают показать статичные состояния в макетах."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <div className="grid w-full max-w-[760px] grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                <SelectWithMenu label="default" />
                <SelectWithMenu label="hovered" state="hovered" />
                <SelectWithMenu defaultOpen label="focused" state="focused" />
                <SelectWithMenu disabled label="disabled" />
                <SelectWithMenu error helperText="Проверь значение" label="error" />
              </div>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Состояния"
      />

      <ShowcaseSection
        codeSnippet={compositionSnippet}
        description="Select может показывать подпись, иконку, пояснение и одно либо несколько выбранных значений. Нажми на поле, чтобы открыть меню."
        showcase={
          <ShowcaseSurface
            usedComponents={[
              { href: "/Rhood/?view=components&component=menu", title: "Menu" },
              { href: "/Rhood/?view=components&component=chip", title: "Chip" },
            ]}
          >
            <ShowcasePanel>
              <div className="flex flex-wrap items-end justify-center gap-6">
                <SelectWithMenu icon label="С иконкой" />
                <SelectWithMenu content="chips" label="Несколько значений" />
                <SelectWithMenu helperText="Выбери тип объекта" label={false} />
              </div>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Состав"
      />

      <ShowcaseSection
        description="Публичные свойства Select для реализации."
        showcase={<PropertiesTable />}
        title="Свойства"
      />
    </div>
  );
}
