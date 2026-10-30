import * as React from "react";

import { Button } from "@/components/ui/button";
import { FilterModal } from "@/components/ui/filter-modal";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const usedComponents = [
  { href: "/Rhood/?view=components&component=button", title: "Button" },
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

  return (
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
  );
}
