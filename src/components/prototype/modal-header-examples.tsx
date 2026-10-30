import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ModalHeader } from "@/components/ui/modal-header";

export function ModalHeaderExamples() {
  return (
    <section className="grid gap-3">
      <ShowcaseSection
        codeSnippet={<code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{"<"}</span><span className="text-[var(--rh-palette-purple-700)]">ModalHeader</span>{" "}<span className="text-[var(--rh-theme-text-info)]">title</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">{"\"Заголовок\""}</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{" />"}</span></code>}
        description="Базовый состав: заголовок и кнопка закрытия."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white p-0">
              <ModalHeader title="Заголовок modal" />
            </div>]}
        title="Состав"
      />
    </section>
  );
}
