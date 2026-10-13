import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Button } from "@/components/ui/button";

const horizontalCompositionSnippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSection</span>
    {" "}
    <span className="text-[var(--rh-theme-text-info)]">direction</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">"horizontal"</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
    {"\n  "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">panels</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    {"\n  "}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">panels</span>
    {" "}
    <span className="text-[var(--rh-theme-text-info)]">tone</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">"transparent"</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    {"\n"}
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSection</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
  </code>
);

const usedComponentsSnippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ShowcaseSection</span>
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
        description="ShowcaseSection отображает содержимое массива panels по горизонтали или вертикали."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
              <Button>Primary</Button>
            </div>, <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4">
              <Button appearance="contrast">Contrast</Button>
            </div>]}
        title="Горизонтальная композиция"
      />

      <ShowcaseSection
        description="direction=vertical размещает панели друг под другом. Прозрачная панель показывает фон родительской поверхности."
        direction="vertical"
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
              <Button appearance="default">Default</Button>
            </div>, <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4">
              <Button appearance="contrast">Contrast</Button>
            </div>]}
        title="Вертикальная композиция"
      />

      <ShowcaseSection
        codeSnippet={usedComponentsSnippet}
        description="usedComponents выводит под примером ссылки на компоненты, из которых собрана композиция. Передавай prop только когда такая связь нужна читателю витрины."
        usedComponents={[{ href: "/Rhood/?view=components&component=button", title: "Button" }, { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" }]}
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
              <Button>Primary</Button>
            </div>]}
        title="Состав"
      />
    </>
  );
}
