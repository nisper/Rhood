import * as React from "react"

import { ExpandableContent } from "@/components/ui/expandable-content"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSection } from "@/components/ui/showcase-section"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"

const description = "Квартира в тихом районе с готовым ремонтом, просторной кухней-гостиной и видом на парк. В пешей доступности школа, детский сад, магазины и остановка общественного транспорта. Во дворе — закрытая территория, детская площадка и гостевая парковка."

function CodeProp({ name, value }: { name: string; value?: string }) {
  return <><span className="text-[var(--rh-theme-text-info)]">{name}</span>{value && <><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">{value}</span></>}</>
}

function ExpandableContentSnippet({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span><span className="text-[var(--rh-palette-purple-700)]">ExpandableContent</span>{" "}{children}<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>Контент<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span><span className="text-[var(--rh-palette-purple-700)]">ExpandableContent</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span></code>
}

const heightSnippet = <ExpandableContentSnippet><CodeProp name="collapsedHeight" value="{48}" /></ExpandableContentSnippet>
const stateSnippet = <ExpandableContentSnippet><CodeProp name="defaultExpanded" value="{true}" /></ExpandableContentSnippet>
const compositionSnippet = <ExpandableContentSnippet><CodeProp name="expandLabel" value={'"Показать детали"'} /></ExpandableContentSnippet>

function Example({ defaultExpanded = false, collapsedHeight = 72 }: { defaultExpanded?: boolean; collapsedHeight?: number }) {
  return <ExpandableContent collapsedHeight={collapsedHeight} defaultExpanded={defaultExpanded}><p className="rh-typography-b1">{description}</p></ExpandableContent>
}

export function ExpandableContentExamples() {
  return <div className="grid min-w-0">
    <ShowcaseSection
      codeSnippet={heightSnippet}
      description="У компонента нет визуальных вариантов: размер раскрытой области задаёт collapsedHeight. Значение выбирай по содержанию и контексту экрана."
      showcase={<ShowcaseSurface className="auto-rows-auto" direction="vertical"><ShowcasePanel className="items-start"><div className="grid w-full max-w-[480px] gap-2"><p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">collapsedHeight = 48</p><Example collapsedHeight={48} /></div></ShowcasePanel><ShowcasePanel className="items-start"><div className="grid w-full max-w-[480px] gap-2"><p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">collapsedHeight = 96</p><Example collapsedHeight={96} /></div></ShowcasePanel></ShowcaseSurface>}
      title="Размер"
    />

    <ShowcaseSection
      codeSnippet={stateSnippet}
      description="По умолчанию контент свёрнут. Нажми на кнопку, чтобы переключить состояние; defaultExpanded задаёт начальное раскрытое состояние."
      showcase={<ShowcaseSurface><ShowcasePanel className="items-start"><div className="w-full max-w-[480px]"><Example defaultExpanded /></div></ShowcasePanel></ShowcaseSurface>}
      title="Состояния"
    />

    <ShowcaseSection
      codeSnippet={compositionSnippet}
      description="Внутрь можно передать любой React-контент. Подписи кнопки настраиваются отдельно для раскрытого и свёрнутого состояния."
      showcase={<ShowcaseSurface><ShowcasePanel className="items-start"><div className="w-full max-w-[480px]"><ExpandableContent collapseLabel="Скрыть детали" collapsedHeight={72} expandLabel="Показать детали"><div className="grid gap-2"><p className="rh-typography-b1">{description}</p><p className="rh-typography-b1-med">Один собственник, документы готовы к сделке.</p></div></ExpandableContent></div></ShowcasePanel></ShowcaseSurface>}
      title="Состав"
    />
  </div>
}
