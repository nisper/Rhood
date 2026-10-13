import * as React from "react";

import { Button } from "@/components/ui/button";
import { FilterModal } from "@/components/ui/filter-modal";
import { ShowcaseSection } from "@/components/ui/showcase-section";

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
    />
  );
}
