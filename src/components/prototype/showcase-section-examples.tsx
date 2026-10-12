import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Button } from "@/components/ui/button";

const showcaseSectionSnippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSection</span>
    {"\n  "}
    <span className="text-[var(--rh-theme-text-info)]">title</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">"Заголовок секции"</span>
    {"\n  "}
    <span className="text-[var(--rh-theme-text-info)]">description</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">"Описание примера"</span>
    {"\n  "}
    <span className="text-[var(--rh-theme-text-info)]">panels</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">={`{`}</span>
    {"\n    "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSection</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
    {"\n      "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">panels</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    {"\n    "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSection</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
    {"\n  "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`}`}</span>
    {"\n"}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`/>`}</span>
  </code>
);

export function ShowcaseSectionExamples() {
  return (
    <ShowcaseSection
      codeSnippet={showcaseSectionSnippet}
      description="Описание объясняет назначение примера до того, как пользователь увидит сам компонент."
      panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
            <Button endIcon={false} startIcon={false}>
              Primary action
            </Button>
          </div>]}
      title="Заголовок секции"
    />
  );
}
