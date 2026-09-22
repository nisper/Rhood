import { Button } from "@/components/ui/button";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

const horizontalCompositionSnippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="font-medium text-[var(--rh-theme-text-brand)]">
      import
    </span>{" "}
    {`{ Button }`}
    <span className="font-medium text-[var(--rh-theme-text-brand)]">
      {" "}
      from
    </span>{" "}
    {`"@/components/ui/button";`}
    {"\n"}
    <span className="font-medium text-[var(--rh-theme-text-brand)]">
      import
    </span>{" "}
    {`{ ShowcasePanel }`}
    <span className="font-medium text-[var(--rh-theme-text-brand)]">
      {" "}
      from
    </span>{" "}
    {`"@/components/ui/showcase-panel";`}
    {"\n"}
    <span className="font-medium text-[var(--rh-theme-text-brand)]">
      import
    </span>{" "}
    {`{ ShowcaseSurface }`}
    <span className="font-medium text-[var(--rh-theme-text-brand)]">
      {" "}
      from
    </span>{" "}
    {`"@/components/ui/showcase-surface";`}
    {"\n\n"}
    <span className="font-medium text-[var(--rh-theme-text-brand)]">
      const
    </span>{" "}
    HorizontalCompositionExample = () =&gt; {`{`}
    {"\n  "}
    <span className="font-medium text-[var(--rh-theme-text-brand)]">
      return
    </span>
    {" ("}
    {"\n    "}
    {`<ShowcaseSurface>`}
    {"\n      "}
    {`<ShowcasePanel>`}
    {"\n        "}
    {`<Button>Primary</Button>`}
    {"\n      "}
    {`</ShowcasePanel>`}
    {"\n      "}
    {`<ShowcasePanel `}
    <span className="font-medium text-[var(--rh-theme-text-brand)]">
      tone="transparent"
    </span>
    {`>`}
    {"\n        "}
    {`<Button appearance="contrast">Contrast</Button>`}
    {"\n      "}
    {`</ShowcasePanel>`}
    {"\n    "}
    {`</ShowcaseSurface>`}
    {"\n  );\n"}
    {`};`}
    {"\n\n"}
    <span className="font-medium text-[var(--rh-theme-text-brand)]">
      export default
    </span>{" "}
    {"HorizontalCompositionExample;"}
  </code>
);

function Section({
  children,
  description,
  settings,
  title,
}: {
  children: React.ReactNode;
  description: string;
  settings: string[];
  title: string;
}) {
  return (
    <section className="grid gap-3">
      <div className="grid gap-1">
        <h2 className="rh-typography-headline-4">{title}</h2>
        <p className="rh-typography-body-1">{description}</p>
      </div>
      {children}
      <div className="grid gap-0.5">
        {settings.map((setting) => (
          <p
            className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]"
            key={setting}
          >
            {setting}
          </p>
        ))}
      </div>
    </section>
  );
}

export function ShowcaseExamples() {
  return (
    <div className="grid min-w-0 gap-10">
      <Section
        description="ShowcaseSurface объединяет примеры на общей поверхности. Панели добавляются через children — их может быть столько, сколько нужно."
        settings={[
          "direction: horizontal",
          "ShowcasePanel.tone: white · transparent",
        ]}
        title="Горизонтальная композиция"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <Button>Primary</Button>
          </ShowcasePanel>
          <ShowcasePanel tone="transparent">
            <Button appearance="contrast">Contrast</Button>
          </ShowcasePanel>
        </ShowcaseSurface>
        <pre className="overflow-x-auto rounded-[var(--rh-sizing-border-radius-md)] bg-[var(--rh-theme-fill-neutral)] p-4">
          {horizontalCompositionSnippet}
        </pre>
      </Section>

      <Section
        description="direction=vertical размещает панели друг под другом. Прозрачная панель показывает фон родительской поверхности."
        settings={[
          "direction: vertical",
          "ShowcasePanel.tone: white · transparent",
        ]}
        title="Вертикальная композиция"
      >
        <ShowcaseSurface direction="vertical">
          <ShowcasePanel>
            <Button appearance="default">Default</Button>
          </ShowcasePanel>
          <ShowcasePanel tone="transparent">
            <Button appearance="contrast">Contrast</Button>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>
    </div>
  );
}
