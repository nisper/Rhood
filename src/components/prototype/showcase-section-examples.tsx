import { Button } from "@/components/ui/button";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

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
    <span className="text-[var(--rh-theme-text-info)]">showcase</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">={`{`}</span>
    {"\n    "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSurface</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
    {"\n      "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcasePanel</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    {"\n    "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSurface</span>
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
      showcase={
        <ShowcaseSurface>
          <ShowcasePanel>
            <Button endIcon={false} startIcon={false}>
              Primary action
            </Button>
          </ShowcasePanel>
        </ShowcaseSurface>
      }
      title="Заголовок секции"
    />
  );
}
