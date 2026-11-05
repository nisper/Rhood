import * as React from "react";

import { Button } from "@/components/ui/button";
import { FilterModal } from "@/components/ui/filter-modal";
import { createDefaultFilterModalValues, type FilterModalValues } from "@/components/ui/filter-modal-values";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const usedComponents = [
  { href: "/Rhood/?view=components&component=button", title: "Button" },
  { href: "/Rhood/?view=components&component=expandable-content", title: "ExpandableContent" },
  { href: "/Rhood/?view=components&component=form", title: "FormBlock · FormSet" },
  { href: "/Rhood/?view=components&component=input-number-range", title: "InputNumberRange" },
  { href: "/Rhood/?view=components&component=modal", title: "Modal · ModalContainer" },
  { href: "/Rhood/?view=components&component=segmented-control", title: "Segment · SegmentedControl" },
  { href: "/Rhood/?view=components&component=textarea", title: "Textarea" },
  { href: "/Rhood/?view=components&component=text-field", title: "Textfield" },
  { href: "/Rhood/?view=components&component=toggle-chip", title: "ToggleChip" },
];

export function FilterModalExamples() {
  const [open, setOpen] = React.useState(true);
  const [editOpen, setEditOpen] = React.useState(true);
  const [searchName, setSearchName] = React.useState("Двухкомнатные в Тюмени");
  const [editValues, setEditValues] = React.useState<FilterModalValues>({
    ...createDefaultFilterModalValues(),
    location: "Тюмень",
    roominess: ["2"],
    areaStart: "66",
    areaEnd: "80",
    priceStart: "3000000",
    priceEnd: "6000000",
    source: ["Авито", "Циан"],
  });

  return (
    <div className="grid min-w-0 gap-8">
      <ShowcaseSection
      description="Модальное окно с полями фильтрации объектов, действиями очистки и применения."
      panels={[
        <div className="min-h-[720px] overflow-hidden rounded-xl" key="filter-modal">
          {open ? (
            <FilterModal containerDisplay="embedded" onOpenChange={setOpen} open={open} resultCount={50} />
          ) : (
            <div className="flex min-h-[720px] items-center justify-center">
              <Button endIcon={false} onClick={() => setOpen(true)} startIcon={false}>Открыть фильтр</Button>
            </div>
          )}
        </div>,
      ]}
      title="Состав и поведение"
      usedComponents={usedComponents}
      />
      <ShowcaseSection
      description="Редактирование сохранённого поиска: можно изменить название и любые параметры, затем сохранить изменения."
      panels={[
        <div className="min-h-[720px] overflow-hidden rounded-xl" key="saved-filter-edit">
          {editOpen ? (
            <FilterModal
              containerDisplay="embedded"
              onApply={() => setEditOpen(false)}
              onDelete={() => setEditOpen(false)}
              onOpenChange={setEditOpen}
              onSearchNameChange={setSearchName}
              onValuesChange={setEditValues}
              open={editOpen}
              primaryActionLabel="Сохранить изменения"
              searchName={searchName}
              values={editValues}
            />
          ) : (
            <div className="flex min-h-[720px] items-center justify-center">
              <Button endIcon={false} onClick={() => setEditOpen(true)} startIcon={false}>Редактировать сохранённый поиск</Button>
            </div>
          )}
        </div>,
      ]}
      settings={["searchName: enabled", "primaryActionLabel: Сохранить изменения"]}
      title="Редактирование сохранённого поиска"
      usedComponents={usedComponents}
      />
    </div>
  );
}
