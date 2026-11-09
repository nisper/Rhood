import * as React from "react"

import { ShowcaseSection } from "@/components/ui/showcase-section"
import { Switch } from "@/components/ui/switch"

const panelClass = "flex min-h-24 items-center justify-center rounded-xl bg-white px-6 py-4 text-center rh-typography-b2"

export function ShowcaseSectionExamples() {
  const [settingEnabled, setSettingEnabled] = React.useState(true)

  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Стандартная подложка, скругление и внутренний отступ вокруг панелей."
        panels={[<div className={panelClass}>Содержимое примера</div>]}
        title="Панель с рамкой"
      />

      <ShowcaseSection
        description="Отключает общую подложку, скругление и внутренний отступ вокруг панелей."
        panelFrame={false}
        panels={[<div className={panelClass}>Содержимое без общей подложки</div>]}
        title="Панель без рамки"
      />

      <ShowcaseSection
        description="Переключатель позволяет показать разные случаи применения одного компонента."
        exampleVariants={[
          { label: "Карточка", value: "card", content: <div className={panelClass}>Компонент внутри карточки</div> },
          { label: "Список", value: "list", content: <div className={panelClass}>Компонент в строке списка</div> },
        ]}
        title="Варианты примера"
      />

      <ShowcaseSection
        description="Необязательные параметры размещаются под примером. Переключатель меняет содержимое панели."
        panels={[
          <div className={panelClass} key="setting-state">
            {settingEnabled ? "Дополнительная опция включена" : "Дополнительная опция выключена"}
          </div>,
        ]}
        settings={(
          <div className="bg-white px-4">
            <Switch checked={settingEnabled} onChange={(event) => setSettingEnabled(event.target.checked)} size="sm" switchPosition="left">
              Дополнительная опция
            </Switch>
          </div>
        )}
        title="Опциональная настройка"
      />

      <ShowcaseSection
        description="Размеры и интерактивные состояния не поддерживаются. Панели можно расположить вертикально и задать число строк через panelCount."
        direction="vertical"
        panelCount={2}
        panels={[
          <div className={panelClass} key="first">Первая строка</div>,
          <div className={panelClass} key="second">Вторая строка</div>,
        ]}
        title="Состав"
      />
    </div>
  )
}
