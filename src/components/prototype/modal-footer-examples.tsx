import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Button } from "@/components/ui/button";
import { ModalFooter } from "@/components/ui/modal-footer";

export function ModalFooterExamples() {
  return (
    <section className="grid gap-3">
      <ShowcaseSection
        codeSnippet={<code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{"<"}</span><span className="text-[var(--rh-palette-purple-700)]">ModalFooter</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{">\n  <"}</span><span className="text-[var(--rh-palette-purple-700)]">Button</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{">"}</span>Отмена<span className="text-[var(--rh-theme-text-neutral-secondary)]">{"</"}</span><span className="text-[var(--rh-palette-purple-700)]">Button</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{">\n  <"}</span><span className="text-[var(--rh-palette-purple-700)]">Button</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{">"}</span>Сохранить<span className="text-[var(--rh-theme-text-neutral-secondary)]">{"</"}</span><span className="text-[var(--rh-palette-purple-700)]">Button</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{">\n</"}</span><span className="text-[var(--rh-palette-purple-700)]">ModalFooter</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{">"}</span></code>}
        description="Базовый состав: одно или несколько действий, выровненных по правому краю."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white p-0">
              <ModalFooter>
                <Button appearance="default" endIcon={false} startIcon={false}>
                  Отмена
                </Button>
                <Button endIcon={false} startIcon={false}>
                  Сохранить
                </Button>
              </ModalFooter>
            </div>]}
        title="Состав"
      />
    </section>
  );
}
