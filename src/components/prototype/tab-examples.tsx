import * as React from "react";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Tab } from "@/components/ui/tab";
import { TabBar } from "@/components/ui/tab-bar";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";

const tabProperties = [
  ["Tab.direction", "horizontal · vertical", "horizontal", "Направление активной границы и отступов вкладки."],
  ["Tab.indicator", "true · false", "true", "Показывает активную границу выбранной вкладки."],
  ["Tab.label", "ReactNode", "Tab", "Основная подпись вкладки."],
  ["Tab.secondaryLabel", "ReactNode", "Tab", "Текст второй строки подписи."],
  ["Tab.secondaryText", "true · false", "false", "Показывает вторую строку подписи."],
  ["Tab.selected", "true · false", "false", "Выделяет текущую вкладку."],
  ["Tab.startIcon", "true · false", "false", "Показывает иконку Star слева от подписи."],
  ["Tab.state", "default · hovered", "default", "Задаёт демонстрационное состояние текста; hover работает при наведении."],
];

const tabBarProperties = [
  ["TabBar.direction", "horizontal · vertical", "horizontal", "Располагает вкладки в строку или столбец и задаёт расстояние между ними."],
  ["TabBar.children", "ReactNode", "3 × Tab", "Содержимое группы; без children отображаются три вкладки по умолчанию."],
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

function TabSnippet({ children }: { children?: React.ReactNode }) {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
      <span className="text-[var(--rh-palette-purple-700)]">Tab</span>
      {children}
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    </code>
  );
}

function TabBarSnippet({ children }: { children?: React.ReactNode }) {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
      <span className="text-[var(--rh-palette-purple-700)]">TabBar</span>
      {children}
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span>
      <span className="text-[var(--rh-palette-purple-700)]">TabBar</span>
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
    </code>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4">
      {children}
    </div>
  );
}

function PropertiesTable({ rows }: { rows: string[][] }) {
  return (
    <Table className="w-full !min-w-0 border border-[var(--rh-theme-border-light)] bg-white">
      <div className="flex border-b border-[var(--rh-theme-border-light)]" role="row">
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
      {rows.map((row) => (
        <div className="flex border-b border-[var(--rh-theme-border-light)] last:border-b-0" key={row[0]} role="row">
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

function PropertiesPanel() {
  const [selected, setSelected] = React.useState<"Tab" | "TabBar">("Tab");

  return (
    <div className="grid gap-4">
      <TabBar>
        <Tab label="Tab" onClick={() => setSelected("Tab")} selected={selected === "Tab"} />
        <Tab label="TabBar" onClick={() => setSelected("TabBar")} selected={selected === "TabBar"} />
      </TabBar>
      <PropertiesTable rows={selected === "Tab" ? tabProperties : tabBarProperties} />
    </div>
  );
}

function InteractiveTabBar({ direction = "horizontal" }: { direction?: "horizontal" | "vertical" }) {
  const [selected, setSelected] = React.useState("Объекты");
  const labels = ["Объекты", "Контакты", "Документы"];

  return (
    <TabBar
      className={direction === "vertical" ? "w-fit flex-col border-b-0" : "w-full"}
      direction={direction}
    >
      {labels.map((label) => (
        <Tab
          aria-selected={selected === label}
          direction={direction}
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
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={<TabSnippet><CodeProp name="state" value={'"hovered"'} /></TabSnippet>}
        description="У Tab нет вариантов внешнего стиля и размера, а также состояния disabled. Витрина показывает default, наведение и выбранную вкладку."
        panels={[
          <Panel key="states">
            <div className="grid w-full grid-cols-3 items-start gap-3">
              <div className="grid justify-items-center gap-2">
                <span className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">default</span>
                <Tab />
              </div>
              <div className="grid justify-items-center gap-2">
                <span className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">hover</span>
                <Tab state="hovered" />
              </div>
              <div className="grid justify-items-center gap-2">
                <span className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">selected</span>
                <Tab selected />
              </div>
            </div>
          </Panel>,
        ]}
        title="Состояния"
      />

      <ShowcaseSection
        codeSnippet={<TabBarSnippet><CodeProp name="direction" value={'"vertical"'} /></TabBarSnippet>}
        description="TabBar размещает вкладки в строку с промежутком 24 px или в столбец без промежутка. Выбирай вкладку, чтобы увидеть активную границу."
        panels={[
          <Panel key="horizontal">
            <div className="grid w-full gap-2">
              <p className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">Горизонтально</p>
              <InteractiveTabBar />
            </div>
          </Panel>,
          <Panel key="vertical">
            <div className="grid w-full gap-2">
              <p className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">Вертикально</p>
              <InteractiveTabBar direction="vertical" />
            </div>
          </Panel>,
        ]}
        title="Состав"
      />

      <ShowcaseSection
        codeSnippet={
          <TabSnippet>
            {"\n  "}<CodeProp name="startIcon" value="{true}" />
            {"\n  "}<CodeProp name="secondaryText" value="{true}" />
            {"\n  "}<CodeProp name="secondaryLabel" value={'"Подпись"'} />
          </TabSnippet>
        }
        description="Подпись может включать иконку и вторую строку текста."
        panels={[
          <Panel key="parts">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <Tab label="С иконкой" startIcon />
              <Tab label="Основной текст" secondaryLabel="Второй текст" secondaryText />
            </div>
          </Panel>,
        ]}
        title="Состав подписи"
      />

      <section className="mb-10 grid gap-3">
        <div className="grid gap-1">
          <h2 className="rh-typography-h4">Свойства</h2>
          <p className="rh-typography-b1">Выбери компонент, чтобы посмотреть его публичные настройки.</p>
        </div>
        <PropertiesPanel />
      </section>
    </div>
  );
}
