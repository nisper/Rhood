import { Footer } from "@/components/ui/footer";
import { ShowcaseSection } from "@/components/ui/showcase-section";

function FooterExamples() {
  return (
    <section className="grid gap-3">
      <ShowcaseSection
        codeSnippet={
          <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
            <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
            <span className="text-[var(--rh-palette-purple-700)]">Footer</span>
            <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
          </code>
        }
        description="Тёмный футер с логотипом и помощью. Содержимое расположено в отдельных колонках."
        panels={[
          <div className="w-full" key="default">
            <Footer />
          </div>,
        ]}
        title="Состав"
      />
    </section>
  );
}

export { FooterExamples };
