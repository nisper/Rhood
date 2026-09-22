import { Button } from "@/components/ui/button";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

const horizontalCompositionSnippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSurface</span>
    {" "}
    <span className="text-[var(--rh-theme-text-info)]">direction</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">"horizontal"</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
    {"\n  "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcasePanel</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    {"\n  "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcasePanel</span>
    {" "}
    <span className="text-[var(--rh-theme-text-info)]">tone</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">"transparent"</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    {"\n"}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSurface</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
  </code>
);

export function ShowcaseExamples() {
  return (
    <>
      <ShowcaseSection
        codeSnippet={horizontalCompositionSnippet}
        description="ShowcaseSurface объединяет примеры на общей поверхности. По умолчанию direction=horizontal; панели добавляются через children, их может быть столько, сколько нужно."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <Button>Primary</Button>
            </ShowcasePanel>
            <ShowcasePanel tone="transparent">
              <Button appearance="contrast">Contrast</Button>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Горизонтальная композиция"
      />

      <ShowcaseSection
        description="direction=vertical размещает панели друг под другом. Прозрачная панель показывает фон родительской поверхности."
        showcase={
          <ShowcaseSurface direction="vertical">
            <ShowcasePanel>
              <Button appearance="default">Default</Button>
            </ShowcasePanel>
            <ShowcasePanel tone="transparent">
              <Button appearance="contrast">Contrast</Button>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Вертикальная композиция"
      />
    </>
  );
}
