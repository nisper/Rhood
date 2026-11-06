import { Button } from "@/components/ui/button"
import { ModalFooter } from "@/components/ui/modal-footer"
import { ShowcaseSection } from "@/components/ui/showcase-section"

export function ModalFooterExamples() {
  return (
    <ShowcaseSection
      description="Прилипает к нижнему краю прокручиваемой области и выравнивает действия по правому краю."
      panels={[
        <div className="grid min-h-[180px] w-full grid-rows-[1fr_auto] overflow-hidden rounded-xl">
          <div className="grid content-center gap-2 px-6 py-4">
            <p className="rh-typography-b1-med">Параметры формы</p>
            <p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">
              Нижняя панель отделяет действия от содержимого.
            </p>
          </div>
          <ModalFooter>
            <Button appearance="default" endIcon={false} startIcon={false}>Отмена</Button>
            <Button appearance="primary" endIcon={false} startIcon={false}>Сохранить</Button>
          </ModalFooter>
        </div>,
      ]}
      title="Состав"
    />
  )
}
