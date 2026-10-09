import { ObjectInfo } from "@/components/ui/object-info";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

const usedComponents = [
  { href: "/Rhood/?view=components&component=button", title: "Button" },
  { href: "/Rhood/?view=components&component=button-favorite", title: "ButtonFavorite" },
  { href: "/Rhood/?view=components&component=chip", title: "Chip" },
  { href: "/Rhood/?view=components&component=comments", title: "Comments" },
  { href: "/Rhood/?view=components&component=expandable-content", title: "ExpandableContent" },
  { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" },
  { href: "/Rhood/?view=components&component=object-buyers-v2", title: "ObjectBuyers v2" },
  { href: "/Rhood/?view=components&component=toggle-chip", title: "ToggleChip" },
];

function ObjectInfoExamples() {
  return (
    <ShowcaseSection
      description="Готовая композиция информации об объекте: header действий, основной контент и правая колонка. Помещается в Drawer или в страницу объекта без изменения состава."
      showcase={<ShowcaseSurface className="overflow-x-auto" usedComponents={usedComponents}><div className="flex justify-center"><ObjectInfo /></div></ShowcaseSurface>}
      title="Состав"
    />
  );
}

export { ObjectInfoExamples };
