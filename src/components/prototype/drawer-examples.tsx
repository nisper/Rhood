import * as React from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContainer } from "@/components/ui/drawer";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";

const properties = [
  ["title", "ReactNode", "—", "Заголовок drawer."],
  ["description", "ReactNode", "—", "Поясняющий текст под заголовком."],
  [
    "children",
    "ReactNode",
    "—",
    "Содержимое Drawer; на мобильном viewport располагается под описанием, как у Modal.",
  ],
  ["footer", "ReactNode", "—", "Набор действий в нижней части drawer."],
  [
    "hasFooter",
    "boolean",
    "true, если передан footer",
    "Показывает или скрывает область footer.",
  ],
  [
    "maxWidth",
    "number · CSS length",
    "var(--rh-sizing-drawer-comment-width)",
    "Максимальная ширина; drawer сохраняет width: 100%.",
  ],
  [
    "presentation",
    "drawer · bottom-sheet",
    "drawer",
    "Вид на desktop; на мобильном viewport Drawer всегда становится bottom sheet.",
  ],
  [
    "open",
    "boolean",
    "true",
    "Управляет видимостью: на desktop drawer выезжает и скрывается вправо за 200ms.",
  ],
  [
    "defaultOpen",
    "boolean",
    "true",
    "Начальная видимость в неконтролируемом режиме.",
  ],
  [
    "closeButton",
    "boolean",
    "true для drawer",
    "Показывает кнопку закрытия на desktop; у bottom sheet по умолчанию скрыта.",
  ],
  [
    "onOpenChange",
    "(open) => void",
    "—",
    "Вызывается при закрытии крестиком или при изменении open.",
  ],
  [
    "DrawerContainer.display",
    "viewport · embedded",
    "viewport",
    "Растягивает backdrop на весь viewport; клик по backdrop закрывает Drawer. embedded используй внутри Витрины.",
  ],
  [
    "DrawerContainer.alignment",
    "right · bottom",
    "right",
    "Положение на desktop; right автоматически становится нижним на мобильном viewport.",
  ],
];

type DrawerPreviewProps = Pick<
  React.ComponentProps<typeof Drawer>,
  "closeButton" | "onOpenChange" | "open" | "presentation"
>;

function ObjectDrawer({
  closeButton,
  onOpenChange,
  open,
  presentation,
}: DrawerPreviewProps) {
  return (
    <Drawer
      closeButton={closeButton}
      description="Все детали объекта собраны в одной панели, не прерывая работу с выдачей."
      footer={
        <>
          <Button
            appearance="default"
            endIcon={false}
            onClick={() => onOpenChange?.(false)}
            startIcon={false}
          >
            Закрыть
          </Button>
          <Button endIcon={false} startIcon={false}>
            Сохранить
          </Button>
        </>
      }
      onOpenChange={onOpenChange}
      open={open}
      presentation={presentation}
      title="Информация об объекте"
    >
      <div className="grid gap-4">
        <p className="rh-typography-body-1 text-[var(--rh-theme-text-neutral-primary)]">
          Пространство между шапкой и действиями прокручивается, поэтому drawer
          всегда занимает всю высоту экрана.
        </p>
        <div className="grid gap-2">
          {["Адрес", "Стоимость", "Контакт", "Комментарий"].map((label) => (
            <div
              className="rounded-[var(--rh-sizing-border-radius-md)] bg-[var(--rh-theme-fill-neutral)] p-4"
              key={label}
            >
              <p className="rh-typography-body-2 text-[var(--rh-theme-text-neutral-secondary)]">
                {label}
              </p>
              <p className="rh-typography-body-1 text-[var(--rh-theme-text-neutral-primary)]">
                Значение поля
              </p>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
}

function DesktopDrawerPreview() {
  const [open, setOpen] = React.useState(true);

  return (
    <DrawerContainer className="h-full" display="embedded">
      {!open && (
        <Button
          appearance="contrast"
          endIcon={false}
          onClick={() => setOpen(true)}
          startIcon={false}
        >
          Открыть drawer
        </Button>
      )}
      <ObjectDrawer onOpenChange={setOpen} open={open} />
    </DrawerContainer>
  );
}

function MobileDrawerPreview() {
  const [open, setOpen] = React.useState(true);

  return (
    <DrawerContainer
      alignment="bottom"
      className="mx-auto h-[844px] max-w-[390px]"
      display="embedded"
    >
      {!open && (
        <Button
          appearance="contrast"
          endIcon={false}
          onClick={() => setOpen(true)}
          startIcon={false}
        >
          Открыть drawer
        </Button>
      )}
      <ObjectDrawer
        closeButton={false}
        onOpenChange={setOpen}
        open={open}
        presentation="bottom-sheet"
      />
    </DrawerContainer>
  );
}

export function DrawerExamples() {
  return (
    <div className="grid min-w-0 gap-10">
      <ShowcaseSection
        description="До 767px включительно Drawer отображается как bottom sheet, полностью повторяя мобильный Modal; от 768px — как боковая панель на всю высоту экрана."
        showcase={
          <ShowcaseSurface
            className="bg-[var(--rh-palette-neutral-600)] p-0"
            direction="vertical"
          >
            <ShowcasePanel className="h-[844px] p-0" tone="transparent">
              <DesktopDrawerPreview />
            </ShowcasePanel>
            <ShowcasePanel className="p-0" tone="transparent">
              <MobileDrawerPreview />
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Стиль"
      />

      <ShowcaseSection
        description="Публичные свойства Drawer и DrawerContainer для реализации."
        showcase={
          <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
            <div className="flex border-b border-[var(--parser-border-light)]" role="row">
              {["Свойство", "Значения", "По умолчанию", "Назначение"].map(
                (title, index) => (
                  <TableCell
                    helpIcon={false}
                    key={title}
                    role="head"
                    sort={false}
                    type="text"
                    width={index === 3 ? "fill" : index === 0 ? 160 : 140}
                  >
                    {title}
                  </TableCell>
                ),
              )}
            </div>
            {properties.map((row) => (
              <div
                className="flex border-b border-[var(--parser-border-light)] last:border-b-0"
                key={row[0]}
                role="row"
              >
                {row.map((cell, index) => (
                  <TableCell
                    key={index}
                    role="body"
                    type="text"
                    width={index === 3 ? "fill" : index === 0 ? 160 : 140}
                  >
                    {cell}
                  </TableCell>
                ))}
              </div>
            ))}
          </Table>
        }
        title="Свойства"
      />
    </div>
  );
}
