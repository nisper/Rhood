import * as React from "react";

import { Tab } from "@/components/ui/tab";
import { TabBar } from "@/components/ui/tab-bar";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";

const properties = [
  [
    "Tab.direction",
    "horizontal · vertical",
    "horizontal",
    "Направление активной границы и отступов вкладки.",
  ],
  [
    "Tab.disGutters",
    "true · false",
    "false",
    "Убирает внешние горизонтальные или вертикальные отступы.",
  ],
  ["Tab.label", "ReactNode", "Tab", "Основная подпись вкладки."],
  [
    "Tab.secondaryText",
    "true · false",
    "false",
    "Показывает вторую строку подписи.",
  ],
  ["Tab.secondaryLabel", "ReactNode", "Tab", "Текст второй строки."],
  [
    "Tab.selected",
    "true · false",
    "false",
    "Выделяет текущую вкладку и добавляет активную границу.",
  ],
  [
    "Tab.startIcon",
    "true · false",
    "false",
    "Показывает иконку Star слева от подписи.",
  ],
  [
    "Tab.state",
    "default · hovered",
    "default",
    "Принудительное состояние для витрины и тестирования.",
  ],
  [
    "TabBar.disGutters",
    "true · false",
    "false",
    "Добавляет промежуток между вкладками и убирает их внешние отступы.",
  ],
  [
    "TabBar.children",
    "ReactNode",
    "3 × Tab",
    "Вкладки в группе; без children отображается Figma-пример из трёх вкладок.",
  ],
];

function Section({
  children,
  description,
  settings,
  title,
}: {
  children: React.ReactNode;
  description: string;
  settings?: string[];
  title: string;
}) {
  return (
    <section className="grid gap-3">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold leading-7">{title}</h2>
        <p className="text-base leading-6 tracking-[0.15px]">{description}</p>
      </div>
      {children}
      {settings && (
        <div className="grid gap-0.5">
          {settings.map((setting) => (
            <p
              className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-secondary)]"
              key={setting}
            >
              {setting}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

function PropertiesTable({ rows }: { rows: string[][] }) {
  return (
    <Table className="w-full !min-w-0 border border-[var(--rh-theme-border-light)] bg-white">
      <div
        className="flex border-b border-[var(--rh-theme-border-light)]"
        role="row"
      >
        {["Свойство", "Значения", "По умолчанию", "Назначение"].map(
          (title, index) => (
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
          ),
        )}
      </div>
      {rows.map((row) => (
        <div
          className="flex border-b border-[var(--rh-theme-border-light)] last:border-b-0"
          key={row[0]}
          role="row"
        >
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

function InteractiveTabBar({
  direction = "horizontal",
  disGutters = false,
}: {
  direction?: "horizontal" | "vertical";
  disGutters?: boolean;
}) {
  const [selected, setSelected] = React.useState("Объекты");
  const labels = ["Объекты", "Контакты", "Документы"];

  return (
    <TabBar
      className={
        direction === "vertical" ? "w-fit flex-col border-b-0" : "w-full"
      }
      disGutters={disGutters}
    >
      {labels.map((label) => (
        <Tab
          aria-selected={selected === label}
          direction={direction}
          disGutters={disGutters}
          key={label}
          label={label}
          onClick={() => setSelected(label)}
          selected={selected === label}
        />
      ))}
    </TabBar>
  );
}

export function TabExamples() {
  return (
    <div className="grid min-w-0 gap-10">
      <Section settings={["state: default · hovered"]} title="Состояния">
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid grid-cols-3 items-start gap-3">
              <div className="grid justify-items-center gap-2">
                <span className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">
                  default
                </span>
                <Tab />
              </div>
              <div className="grid justify-items-center gap-2">
                <span className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">
                  hover
                </span>
                <Tab state="hovered" />
              </div>
              <div className="grid justify-items-center gap-2">
                <span className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">
                  selected
                </span>
                <Tab selected />
              </div>
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="TabBar располагает вкладки в строку или столбец. Активная вкладка получает нижнюю или левую границу соответственно."
        settings={["direction: horizontal · vertical"]}
        title="Ориентация"
      >
        <ShowcaseSurface direction="vertical">
          <ShowcasePanel>
            <div className="grid w-full gap-2">
              <p className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">
                Горизонтально
              </p>
              <InteractiveTabBar />
            </div>
          </ShowcasePanel>
          <ShowcasePanel>
            <div className="grid w-full gap-2">
              <p className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">
                Вертикально
              </p>
              <InteractiveTabBar direction="vertical" />
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Иконка и вторая строка дополняют подпись вкладки."
        settings={["startIcon: boolean", "secondaryText: boolean"]}
        title="Состав"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Tab label="С иконкой" startIcon />
              <Tab
                label="Основной текст"
                secondaryLabel="Второй текст"
                secondaryText
              />
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Основные настройки Tab и TabBar для реализации."
        title="Свойства"
      >
        <PropertiesTable rows={properties} />
      </Section>
    </div>
  );
}
