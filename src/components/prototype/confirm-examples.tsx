import * as React from "react"

import { Button } from "@/components/ui/button"
import { Confirm } from "@/components/ui/confirm"
import { ShowcaseSection } from "@/components/ui/showcase-section"

export function ConfirmExamples() {
  const [open, setOpen] = React.useState(false)

  return (
    <ShowcaseSection
      description="Confirm просит подтвердить действие до его выполнения. Обе кнопки используют appearance=default."
      panels={[
        <div className="grid justify-items-center gap-4 rounded-xl bg-white p-4">
          <Confirm
            backdrop={false}
            cancelLabel="Отмена"
            confirmLabel="Удалить"
            description="Сохранённый фильтр будет удалён. Это действие нельзя отменить."
            open
            title="Удалить фильтр?"
          />
          <Button appearance="ghost" endIcon={false} onClick={() => setOpen(true)} size="md" startIcon={false}>
            Открыть с backdrop
          </Button>
          <Confirm
            cancelLabel="Отмена"
            confirmLabel="Удалить"
            description="Сохранённый фильтр будет удалён. Это действие нельзя отменить."
            onOpenChange={setOpen}
            open={open}
            title="Удалить фильтр?"
          />
        </div>,
      ]}
      props={["backdrop: false · true", "cancelLabel: Отмена", "confirmLabel: Удалить"]}
      title="Состав"
    />
  )
}
