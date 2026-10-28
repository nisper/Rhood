import * as React from "react";

import { Badge, type BadgeColor } from "@/components/ui/badge";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";

const colors: BadgeColor[] = ["neutral", "brand", "error", "warning", "success", "contrast"];

const properties = [
  ["color", "neutral · brand · error · warning · success · contrast", "error", "Цветовая семантика метки."],
  ["appearance", "muted · default", "default", "Приглушённая или контрастная заливка."],
  ["shape", "default · circle", "default", "Форма метки; circle подходит для короткого содержимого."],
  ["children", "ReactNode", "—", "Текст или число внутри метки."],
];

function BadgeSnippet({ color, appearance }: { color?: BadgeColor; appearance?: "muted" | "default" }) {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
      <span className="text-[var(--rh-palette-purple-700)]">Badge</span>
      {color && <> <span className="text-[var(--rh-theme-text-info)]">color</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">"{color}"</span></>}
      {appearance && <> <span className="text-[var(--rh-theme-text-info)]">appearance</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">"{appearance}"</span></>}
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>Метка
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span>
      <span className="text-[var(--rh-palette-purple-700)]">Badge</span>
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
    </code>
  );
}

function PropertiesTable() {
  return (
    <section className="mb-10 grid gap-3">
      <div className="grid gap-1"><h2 className="rh-typography-h4">Свойства</h2><p className="rh-typography-b1">Настройки внешнего вида и содержимого Badge.</p></div>
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 140 : 180}>{title}</TableCell>)}
        </div>
        {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
          {row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 140 : 180}>{cell}</TableCell>)}
        </div>)}
      </Table>
    </section>
  );
}

export function BadgeExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={<BadgeSnippet color="error" appearance="default" />}
        description="Badge повторяет цветовую палитру Chip. Сохраняй один appearance для набора меток, чтобы цвет считывался последовательно."
        direction="vertical"
        panelCount={1}
        panels={[<div className="grid gap-6 rounded-xl bg-white px-6 py-6" key="styles">
          {([
            ["default", "Контрастная заливка"],
            ["muted", "Приглушённая заливка"],
          ] as const).map(([appearance, title]) => (
            <div className="grid gap-3" key={appearance}>
              <span className="rh-typography-b2 text-[var(--parser-text-neutral-secondary)]">{title}</span>
              <div className="flex flex-wrap items-center gap-3">
                {colors.map(color => <Badge appearance={appearance} color={color} key={`default-${color}`}>{color}</Badge>)}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {colors.map(color => <Badge appearance={appearance} color={color} key={`circle-${color}`} shape="circle">3</Badge>)}
              </div>
            </div>
          ))}
        </div>]}
        title="Стиль"
      />

      <ShowcaseSection
        codeSnippet={<BadgeSnippet color="error" />}
        description="Круглая форма подходит для коротких счётчиков."
        panels={[<div className="flex min-h-[136px] items-center justify-center gap-4" key="shapes"><Badge>НОВОЕ</Badge><Badge shape="circle">3</Badge><Badge shape="circle">12</Badge><Badge shape="circle">123</Badge></div>]}
        title="Состав"
      />
      <PropertiesTable />
    </div>
  );
}
