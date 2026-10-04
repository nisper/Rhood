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

const usedComponentsSnippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSurface</span>
    {"\n  "}
    <span className="text-[var(--rh-theme-text-info)]">usedComponents</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`{[`}</span>
    {"\n    "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`{ `}</span><span className="text-[var(--rh-theme-text-info)]">title</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">"Button"</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`, `}</span><span className="text-[var(--rh-theme-text-info)]">href</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">"…"</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{` }`}</span>
    {"\n  "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`]}`}</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`}`}</span>
    {"\n"}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`/>`}</span>
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

      <ShowcaseSection
        codeSnippet={usedComponentsSnippet}
        description="usedComponents выводит под примером ссылки на компоненты, из которых собрана композиция. Передавай prop только когда такая связь нужна читателю витрины."
        showcase={
          <ShowcaseSurface usedComponents={[{ href: "/Rhood/?view=components&component=button", title: "Button" }, { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" }]}>
            <ShowcasePanel>
              <Button>Primary</Button>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Состав"
      />
    </>
  );
}
