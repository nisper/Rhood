import * as React from "react"

import { Chip } from "@/components/ui/chip"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSection } from "@/components/ui/showcase-section"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const appearances = ["outlined", "muted", "contrast"] as const
const colors = ["neutral", "brand", "warning", "success", "error", "contrast"] as const
const sizes = ["lg", "md", "sm"] as const

const properties = [
  ["appearance", "outlined · muted · contrast", "outlined", "Визуальный стиль. В Figma соответствует свойству style."],
  ["color", "neutral · brand · warning · success · error · contrast", "neutral", "Цветовая тема чипа; warning — жёлтый вариант из Figma."],
  ["size", "lg · md · sm", "lg", "Размер чипа, иконок и типографики."],
  ["icon", "boolean", "true", "Показывает иконку Star."],
  ["label", "boolean", "true", "Показывает текстовую подпись."],
  ["remove", "boolean", "true", "Показывает кнопку удаления. propDelete поддерживается как прежнее имя свойства."],
  ["children", "ReactNode", "Chip", "Текст подписи."],
]

function CodeProp({ name, value }: { name: string; value?: string }) {
  return <><span className="text-[var(--rh-theme-text-info)]">{name}</span>{value && <><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">{value}</span></>}</>
}

function ChipSnippet({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span><span className="text-[var(--rh-palette-purple-700)]">Chip</span>{" "}{children}<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>Chip<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span><span className="text-[var(--rh-palette-purple-700)]">Chip</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span></code>
}

const appearanceSnippet = <ChipSnippet><CodeProp name="appearance" value={'"muted"'} /></ChipSnippet>
const sizeSnippet = <ChipSnippet><CodeProp name="size" value={'"sm"'} /></ChipSnippet>
const compositionSnippet = <ChipSnippet><CodeProp name="icon" value="{false}" />{" "}<CodeProp name="remove" value="{false}" /></ChipSnippet>

function AppearanceRow({ appearance }: { appearance: React.ComponentProps<typeof Chip>["appearance"] }) {
  return <div className="flex flex-wrap items-center justify-center gap-2">{colors.map((color) => <Chip appearance={appearance} color={color} key={color}>{color}</Chip>)}</div>
}

export function ChipExamples() {
  return <div className="grid min-w-0">
    <ShowcaseSection codeSnippet={appearanceSnippet} description="Три стиля из Figma работают с каждой цветовой темой: outlined, muted и contrast." showcase={<ShowcaseSurface direction="vertical">{appearances.map((appearance) => <ShowcasePanel key={appearance}><div className="grid gap-2"><p className="text-center text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">{appearance}</p><AppearanceRow appearance={appearance} /></div></ShowcasePanel>)}</ShowcaseSurface>} title="Стиль" />

    <ShowcaseSection codeSnippet={sizeSnippet} description="Размер управляет отступами, типографикой и габаритами иконок." showcase={<ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3">{sizes.map((size) => <Chip appearance="muted" color="neutral" key={size} remove={false} size={size}>{size}</Chip>)}</div></ShowcasePanel></ShowcaseSurface>} title="Размер" />

    <ShowcaseSection codeSnippet={compositionSnippet} description="Состав чипа настраивается независимо: иконка, подпись и кнопка удаления." showcase={<ShowcaseSurface><ShowcasePanel><div className="flex flex-wrap items-center justify-center gap-3"><Chip appearance="muted" remove={false}>Только иконка и подпись</Chip><Chip appearance="muted" icon={false} remove={false}>Только подпись</Chip><Chip appearance="muted" label={false} remove={false} /><Chip appearance="muted" icon={false}>С удалением</Chip></div></ShowcasePanel></ShowcaseSurface>} title="Состав" />

    <ShowcaseSection description="Публичные свойства Chip для реализации." showcase={<Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white"><div className="flex border-b border-[var(--parser-border-light)]" role="row">{["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>)}</div>{properties.map((row) => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">{row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>)}</div>)}</Table>} title="Свойства" />
  </div>
}
