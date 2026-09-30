import { ObjectInfo } from "@/components/ui/object-info";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

function ObjectInfoExamples() {
  return (
    <ShowcaseSection
      description="Готовая композиция информации об объекте: header действий, основной контент, комментарии и правая колонка. Помещается в Drawer или в страницу объекта без изменения состава."
      showcase={<ShowcaseSurface className="overflow-x-auto"><ObjectInfo /></ShowcaseSurface>}
      title="Состав"
    />
  );
}

export { ObjectInfoExamples };
