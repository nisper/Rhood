import { ShowcaseSection } from "@/components/ui/showcase-section"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["title", "ReactNode", "обязательное", "Заголовок секции."],
  ["description", "ReactNode", "обязательное", "Описание примера."],
  ["panels", "ReactNode[]", "—", "Содержимое панелей примера."],
  ["panelFrame", "boolean", "true", "Показывает общую подложку, скругление и отступ вокруг панелей."],
  ["direction", "horizontal · vertical", "horizontal", "Расположение панелей в строку или столбец."],
  ["panelCount", "number", "авто", "Количество колонок или строк в сетке панелей."],
  ["settings", "string[]", "—", "Список параметров, изменённых в примере."],
  ["usedComponents", "{ href, title }[]", "—", "Ссылки на компоненты, использованные в примере."],
  ["codeSnippet", "ReactNode", "—", "Блок кода под примером для демонстрации композиции."],
]

const panelClass = "flex min-h-24 items-center justify-center rounded-xl bg-white px-6 py-4 text-center rh-typography-b2"

export function ShowcaseSectionExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Стандартная подложка, скругление и внутренний отступ вокруг панелей."
        panels={[<div className={panelClass}>Содержимое примера</div>]}
        settings={["panelFrame: true (по умолчанию)"]}
        title="Панель с рамкой"
      />

      <ShowcaseSection
        description="Отключает общую подложку, скругление и внутренний отступ вокруг панелей."
        panelFrame={false}
        panels={[
          <Table bordered className="w-full !min-w-0" key="properties">
            <div className="flex border-b border-[var(--parser-border-light)]" role="row">
              <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">Свойство</TableCell>
              <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">Значения</TableCell>
              <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">По умолчанию</TableCell>
            </div>
            {[["Направление", "horizontal · vertical", "horizontal"], ["Количество панелей", "число", "авто"]].map(([property, values, defaultValue]) => (
              <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={property} role="row">
                <TableCell role="body" type="text" width="fill">{property}</TableCell>
                <TableCell role="body" type="text" width="fill">{values}</TableCell>
                <TableCell role="body" type="text" width="fill">{defaultValue}</TableCell>
              </div>
            ))}
          </Table>,
        ]}
        settings={["panelFrame: false"]}
        title="Панель без рамки"
      />

      <ShowcaseSection
        description="Размеры и интерактивные состояния не поддерживаются. Панели можно расположить вертикально и задать число строк через panelCount."
        direction="vertical"
        panelCount={2}
        panels={[
          <div className={panelClass} key="first">Первая строка</div>,
          <div className={panelClass} key="second">Вторая строка</div>,
        ]}
        settings={["direction: vertical", "panelCount: 2"]}
        title="Состав"
      />

      <section className="mb-10 grid gap-3">
        <div className="grid gap-1">
          <h2 className="rh-typography-h4">Свойства</h2>
          <p className="rh-typography-b1">Публичные свойства ShowcaseSection. Дополнительно компонент принимает стандартные атрибуты HTML section.</p>
        </div>
        <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
          <div className="flex border-b border-[var(--parser-border-light)]" role="row">
            {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => (
              <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>
                {title}
              </TableCell>
            ))}
          </div>
          {properties.map((row) => (
            <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
              {row.map((cell, index) => (
                <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>
                  {cell}
                </TableCell>
              ))}
            </div>
          ))}
        </Table>
      </section>
    </div>
  )
}
