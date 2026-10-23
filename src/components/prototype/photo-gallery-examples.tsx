import { ShowcaseSection } from "@/components/ui/showcase-section";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { Segment } from "@/components/ui/segment";
import { SegmentedControl } from "@/components/ui/segmented-control";

const photos = [
  { alt: "Гостиная объекта", src: "/Rhood/assets/obj-livingroom.jpg" },
  { alt: "Спальня объекта", src: "/Rhood/assets/obj-badroom.jpg" },
  { alt: "Фасад дома", src: "/Rhood/assets/obj-outside.jpg" },
];

type PropertyType = "apartment" | "house" | "land";

const propertyDetails = {
  apartment: {
    title: "Тюмень, ул. Раушана Абдуллина, 6",
    headline: "7 900 000 ₽",
    supportingText: "224 432 ₽/м²",
    metadata: [
      { label: "Где", value: "Авито" },
      { label: "Автор", value: "Частное лицо" },
      { label: "Когда размещался", value: "08.01.2024–08.01.2026", numeric: true },
    ],
    fields: [
      { label: "Комнаты", value: "1 комната", numeric: true },
      { label: "Площадь", value: "35,2 м²", numeric: true },
      { label: "Этаж", value: "9 из 17", numeric: true },
    ],
    description:
      "Продаётся однокомнатная квартира улучшенной планировки с дизайнерским ремонтом, в современном жилом комплексе. В шаговой доступности находятся торговые центры, магазины и остановки общественного транспорта.",
  },
  house: {
    title: "Тюменский район, ул. Центральная, 18",
    headline: "12 500 000 ₽",
    supportingText: "104 167 ₽/м²",
    metadata: [
      { label: "Где", value: "Циан" },
      { label: "Автор", value: "Агентство" },
      { label: "Когда размещался", value: "12.02.2025–18.10.2026", numeric: true },
    ],
    fields: [
      { label: "Площадь дома", value: "120 м²", numeric: true },
      { label: "Участок", value: "8 соток", numeric: true },
      { label: "Этажность", value: "2 этажа", numeric: true },
    ],
    description:
      "Двухэтажный дом с просторной кухней-гостиной, террасой и благоустроенным участком. Рядом лес, остановка и продуктовый магазин.",
  },
  land: {
    title: "Тюменский район, посёлок Березняки",
    headline: "3 200 000 ₽",
    supportingText: "400 000 ₽/сотка",
    metadata: [
      { label: "Где", value: "Домклик" },
      { label: "Автор", value: "Собственник" },
      { label: "Когда размещался", value: "05.06.2025–20.10.2026", numeric: true },
    ],
    fields: [
      { label: "Площадь участка", value: "8 соток", numeric: true },
      { label: "Категория", value: "Земли населённых пунктов" },
      { label: "Использование", value: "ИЖС" },
    ],
    description:
      "Ровный участок правильной формы в обжитом районе. Электричество проходит по границе, подъезд к участку — по асфальтированной дороге.",
  },
} satisfies Record<PropertyType, React.ComponentProps<typeof PhotoGallery>["sidebar"]>;

const codeSnippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{"<"}</span>
    <span className="text-[var(--rh-palette-purple-700)]">PhotoGallery</span>
    {"\n  "}<span className="text-[var(--rh-theme-text-info)]">photos</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">{"{photos}"}</span>
    {",\n  "}<span className="text-[var(--rh-theme-text-info)]">sidebar</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">{"{details}"}</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{" />"}</span>
  </code>
);

function PhotoGalleryDemo() {
  const [open, setOpen] = React.useState(true);
  const [propertyType, setPropertyType] = React.useState<PropertyType>("apartment");
  const details = propertyDetails[propertyType];

  return open ? (
    <div className="grid min-w-0 gap-3">
      <SegmentedControl
        aria-label="Тип недвижимости"
        appearance="contrast"
        onValueChange={(value) => setPropertyType(value as PropertyType)}
        size="sm"
        value={propertyType}
      >
        <Segment value="apartment">Квартира</Segment>
        <Segment value="house">Дом</Segment>
        <Segment value="land">Участок</Segment>
      </SegmentedControl>
      <PhotoGallery
        containerDisplay="embedded"
        onClose={() => setOpen(false)}
        photos={photos}
        sidebar={details}
      />
    </div>
  ) : (
    <Button
      appearance="default"
      endIcon={false}
      onClick={() => setOpen(true)}
      size="sm"
      startIcon={false}
    >
      Открыть просмотр фото
    </Button>
  );
}

function PhotoGalleryExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={codeSnippet}
        description="Передавай фотографии и, при необходимости, данные для боковой панели. Галерея не зависит от типа сущности. Переключай фотографии миниатюрами, кнопками или стрелками на клавиатуре."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 w-full items-center overflow-x-auto p-0">
              <PhotoGalleryDemo />
            </div>]}
        title="Состав"
      />

    </div>
  );
}

export { PhotoGalleryExamples };
