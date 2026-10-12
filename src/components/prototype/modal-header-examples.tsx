import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ModalHeader } from "@/components/ui/modal-header";

export function ModalHeaderExamples() {
  return (
    <section className="grid gap-3">
      <ShowcaseSection
        description="Базовый состав: заголовок и кнопка закрытия."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white p-0">
              <ModalHeader title="Заголовок modal" />
            </div>]}
        title="Состав"
      />
    </section>
  );
}
