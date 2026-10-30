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
  ["Tab.size", "b2 · h2 · h4", "b2", "Размер типографики основной подписи."],
  ["Tab.startIcon", "true · false", "false", "Показывает иконку Star слева от подписи."],
  ["Tab.state", "default · hovered", "default", "Задаёт демонстрационное состояние текста; hover работает при наведении."],
];

const tabBarProperties = [
  ["TabBar.direction", "horizontal · vertical", "horizontal", "Располагает вкладки в строку или столбец и задаёт расстояние между ними."],
  ["TabBar.children", "ReactNode", "3 × Tab", "Содержимое группы; без children отображаются три вкладки по умолчанию."],
  ["TabBar.indicator", "true · false", "true", "Показывает или скрывает общую нижнюю границу группы."],
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

function InteractiveTabBar({
  direction = "horizontal",
  indicator = true,
  size = "b2",
}: {
  direction?: "horizontal" | "vertical";
  indicator?: boolean;
  size?: "b2" | "h2" | "h4";
}) {
  const [selected, setSelected] = React.useState("Объекты");
  const labels = ["Объекты", "Контакты", "Документы"];

  return (
    <TabBar
      className={direction === "vertical" ? "w-fit flex-col" : "w-full"}
      direction={direction}
      indicator={indicator}
    >
      {labels.map((label) => (
        <Tab
          aria-selected={selected === label}
          direction={direction}
          indicator={indicator}
          key={label}
          label={label}
          onClick={() => setSelected(label)}
          selected={selected === label}
          size={size}
        />
      ))}
    </TabBar>
  );
}

function InteractiveTabSize() {
  const sizes = ["b2", "h2", "h4"] as const;
  const [selectedSize, setSelectedSize] = React.useState<(typeof sizes)[number]>("b2");

  return (
    <div aria-label="Размер подписи вкладки" className="flex flex-wrap items-center gap-6" role="group">
      {sizes.map((size) => (
        <button
          aria-pressed={selectedSize === size}
          className="border-0 bg-transparent p-0"
          key={size}
          onClick={() => setSelectedSize(size)}
          type="button"
        >
          <Tab indicator={false} label={size} selected={selectedSize === size} size={size} />
        </button>
      ))}
    </div>
  );
}

export function TabExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        settings={["size: b2 · h2 · h4"]}
        description="Выбери размер типографики подписи. По умолчанию сохраняется текущий размер b2; h2 и h4 подходят для крупных заголовочных вкладок."
        panels={[
          <Panel key="sizes">
            <InteractiveTabSize />
          </Panel>,
        ]}
        title="Размер"
      />

      <ShowcaseSection
        settings={["state: default · hovered", "selected: boolean"]}
        description="Витрина показывает default, наведение и выбранную вкладку. Состояние disabled не поддерживается."
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
        settings={["direction: horizontal · vertical"]}
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
        settings={["Tab.size: b2 · h2 · h4", "Tab.indicator: false", "TabBar.indicator: false"]}
        description="Так выглядят группы вкладок с разными размерами подписи без подчёркивания и общей нижней границы — как на странице «Мои объекты». В каждой группе можно переключать активную вкладку."
        panels={(["b2", "h2", "h4"] as const).map((size) => (
          <Panel key={size}>
            <div className="grid w-full gap-3">
              <p className="text-xs text-[var(--rh-theme-text-neutral-secondary)]">{size}</p>
              <InteractiveTabBar indicator={false} size={size} />
            </div>
          </Panel>
        ))}
        direction="vertical"
        title="TabBar с разными размерами"
      />

      <ShowcaseSection
        codeSnippet={
          <TabSnippet>
            {"\n  "}<CodeProp name="label" value={'"Основной текст"'} />
            {"\n  "}<CodeProp name="startIcon" value="{true}" />
            {"\n  "}<CodeProp name="secondaryText" value="{true}" />
            {"\n  "}<CodeProp name="secondaryLabel" value={'"Подпись"'} />
            {"\n"}
          </TabSnippet>
        }
        description="Подпись может включать иконку и вторую строку текста."
        panels={[
          <Panel key="parts">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <Tab label="Основной текст" secondaryLabel="Подпись" secondaryText startIcon />
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
