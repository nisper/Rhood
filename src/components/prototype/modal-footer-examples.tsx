import { Button } from "@/components/ui/button";
import { ModalFooter } from "@/components/ui/modal-footer";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

export function ModalFooterExamples() {
  return (
    <section className="grid gap-3">
      <ShowcaseSection
        description="Базовый состав: одно или несколько действий, выровненных по правому краю."
        showcase={
          <ShowcaseSurface direction="vertical">
            <ShowcasePanel className="p-0">
              <ModalFooter>
                <Button appearance="default" endIcon={false} startIcon={false}>
                  Отмена
                </Button>
                <Button endIcon={false} startIcon={false}>
                  Сохранить
                </Button>
              </ModalFooter>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Состав"
      />
    </section>
  );
}
