import * as React from "react";

import { Button } from "@/components/ui/button";
import { EmptySavedSearches, FilterModal } from "@/components/ui/filter-modal";
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
  const [mainEditSearch, setMainEditSearch] = React.useState<{ name: string; values: FilterModalValues } | null>(null);
  const [editOpen, setEditOpen] = React.useState(true);
  const [emptyStateOpen, setEmptyStateOpen] = React.useState(true);
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
            <FilterModal
              containerDisplay="embedded"
              onApply={() => setMainEditSearch(null)}
              onEditSavedSearch={(name, values) => setMainEditSearch({ name, values: structuredClone(values) })}
              onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (!nextOpen) setMainEditSearch(null);
              }}
              onSearchNameChange={(name) => setMainEditSearch((current) => current ? { ...current, name } : current)}
              onValuesChange={(values) => setMainEditSearch((current) => current ? { ...current, values } : current)}
              open={open}
              resultCount={50}
              searchName={mainEditSearch?.name}
              values={mainEditSearch?.values}
            />
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
      props={["searchName: enabled", "primaryActionLabel: Сохранить изменения"]}
      title="Редактирование сохранённого поиска"
      usedComponents={usedComponents}
      />
      <ShowcaseSection
        description="Когда сохранённых поисков нет, вместо списка показывается подсказка о том, как добавить первый поиск."
        panels={[
          <div className="min-h-[900px] overflow-hidden rounded-xl" key="empty-saved-searches">
            {emptyStateOpen ? (
              <FilterModal
                containerDisplay="embedded"
                defaultActiveTab="saved-searches"
                onOpenChange={setEmptyStateOpen}
                open={emptyStateOpen}
                savedSearchesContent={<EmptySavedSearches />}
              />
            ) : (
              <div className="flex min-h-[900px] items-center justify-center">
                <Button endIcon={false} onClick={() => setEmptyStateOpen(true)} startIcon={false}>Показать пустое состояние</Button>
              </div>
            )}
          </div>,
        ]}
        props={["defaultActiveTab: saved-searches", "savedSearchesContent: EmptySavedSearches"]}
        title="Пустое состояние сохранённых поисков"
        usedComponents={usedComponents}
      />
    </div>
  );
}
