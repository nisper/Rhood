import { ShowcaseSection } from "@/components/ui/showcase-section";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { PhotoGallery } from "@/components/ui/photo-gallery";

const photos = [
  { alt: "Гостиная объекта", src: "/Rhood/assets/obj-livingroom.jpg" },
  { alt: "Спальня объекта", src: "/Rhood/assets/obj-badroom.jpg" },
  { alt: "Фасад дома", src: "/Rhood/assets/obj-outside.jpg" },
];

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
  const details = {
    title: "Тюмень, улица Раушана Абдуллина, 6",
    headline: "7 900 000 ₽",
    supportingText: "224 432 ₽/м²",
    metadata: [
      { label: "Где", value: "Авито" },
      { label: "Автор", value: "Частное лицо" },
      { label: "Когда размещался", value: "08.01.2024–08.01.2026" },
    ],
    fields: [
      { label: "Комнаты", value: "1 комната" },
      { label: "Площадь", value: "35,2 м²" },
      { label: "Этаж", value: "9 из 17" },
    ],
    description:
      "Продаётся однокомнатная квартира улучшенной планировки с дизайнерским ремонтом, в современном жилом комплексе. В шаговой доступности находятся торговые центры, магазины и остановки общественного транспорта.",
  };

  return open ? (
    <PhotoGallery
      containerDisplay="embedded"
      onClose={() => setOpen(false)}
      photos={photos}
      sidebar={details}
    />
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
