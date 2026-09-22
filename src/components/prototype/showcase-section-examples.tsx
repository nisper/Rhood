import { Button } from "@/components/ui/button";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

export function ShowcaseSectionExamples() {
  return (
    <ShowcaseSection
      description="Описание объясняет назначение примера до того, как пользователь увидит сам компонент."
      showcase={
        <ShowcaseSurface>
          <ShowcasePanel>
            <Button endIcon={false} startIcon={false}>
              Primary action
            </Button>
          </ShowcasePanel>
        </ShowcaseSurface>
      }
      title="Заголовок секции"
    />
  );
}
