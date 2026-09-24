import { ModalHeader } from "@/components/ui/modal-header";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

export function ModalHeaderExamples() {
  return (
    <section className="grid gap-3">
      <ShowcaseSection
        description="Базовый состав: заголовок и кнопка закрытия."
        showcase={
          <ShowcaseSurface direction="vertical">
            <ShowcasePanel className="p-0">
              <ModalHeader title="Заголовок modal" />
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Состав"
      />
    </section>
  );
}
