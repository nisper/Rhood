import * as React from "react";

import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";

type TextStyle = {
  className: string;
  name: string;
  settings: string;
  usage: string;
};

const styles: TextStyle[] = [
  {
    className: "rh-typography-headline-1",
    name: "headline/headline1",
    settings: "Unbounded Bold · 36 / 42 · −0.01",
    usage: "Главный заголовок.",
  },
  {
    className: "rh-typography-headline-2",
    name: "headline/headline2",
    settings: "Unbounded Bold · 60 / 72 · 0",
    usage: "Крупный акцентный заголовок.",
  },
  {
    className: "rh-typography-headline-3",
    name: "headline/headline3",
    settings: "Unbounded Bold · 48 / 56 · 0",
    usage: "Заголовок раздела.",
  },
  {
    className: "rh-typography-headline-3-medium",
    name: "headline/headline3 medium",
    settings: "Unbounded Bold · 48 / 56 · 0",
    usage: "Акцентный заголовок раздела.",
  },
  {
    className: "rh-typography-headline-4",
    name: "headline/headline4",
    settings: "Unbounded Bold · 34 / 42 · 0",
    usage: "Заголовок блока.",
  },
  {
    className: "rh-typography-headline-5",
    name: "headline/headline5",
    settings: "Unbounded Bold · 24 / 32 · 0",
    usage: "Заголовок карточки или секции.",
  },
  {
    className: "rh-typography-headline-5-regular",
    name: "headline/headline5 reg",
    settings: "Unbounded Bold · 24 / 32 · 0",
    usage: "Заголовок карточки или секции.",
  },
  {
    className: "rh-typography-headline-6",
    name: "headline/headline6",
    settings: "Unbounded Bold · 20 / 26 · 0",
    usage: "Заголовок элемента.",
  },
  {
    className: "rh-typography-headline-6-regular",
    name: "headline/headline6 reg",
    settings: "Unbounded Bold · 20 / 26 · 0",
    usage: "Заголовок элемента.",
  },
  {
    className: "rh-typography-body-1",
    name: "body/body1",
    settings: "Roboto Regular · 16 / 24 · 0.15",
    usage: "Основной текст.",
  },
  {
    className: "rh-typography-body-1-medium",
    name: "body/body1 medium",
    settings: "Roboto SemiBold · 16 / 24 · 0.15",
    usage: "Акцент в основном тексте.",
  },
  {
    className: "rh-typography-link-1",
    name: "link/link1",
    settings: "Roboto Regular · 16 / 24 · 0.15",
    usage: "Ссылка в основном тексте.",
  },
  {
    className: "rh-typography-link-1-medium",
    name: "link/link1 medium",
    settings: "Roboto SemiBold · 16 / 24 · 0.15",
    usage: "Акцентная ссылка в основном тексте.",
  },
  {
    className: "rh-typography-body-2",
    name: "body/body2",
    settings: "Roboto Regular · 14 / 20 · 0.17",
    usage: "Вторичный текст.",
  },
  {
    className: "rh-typography-body-2-medium",
    name: "body/body2 medium",
    settings: "Roboto SemiBold · 14 / 20 · 0.17",
    usage: "Акцент во вторичном тексте.",
  },
  {
    className: "rh-typography-link-2",
    name: "link/link2",
    settings: "Roboto Regular · 14 / 20 · 0.17",
    usage: "Ссылка во вторичном тексте.",
  },
  {
    className: "rh-typography-link-2-medium",
    name: "link/link2 medium",
    settings: "Roboto SemiBold · 14 / 20 · 0.17",
    usage: "Акцентная ссылка во вторичном тексте.",
  },
  {
    className: "rh-typography-body-1-mono",
    name: "body/body1 mono",
    settings: "Roboto Mono Regular · 16 / 24 · 0.15",
    usage: "Код и технические значения.",
  },
  {
    className: "rh-typography-body-1-mono-medium",
    name: "body/body1 mono medium",
    settings: "Roboto Mono Medium · 16 / 24 · 0.15",
    usage: "Акцентный код и технические значения.",
  },
  {
    className: "rh-typography-body-2-mono",
    name: "body/body2 mono",
    settings: "Roboto Mono Regular · 14 / 20 · 0.17",
    usage: "Компактный код и технические значения.",
  },
  {
    className: "rh-typography-body-2-mono-medium",
    name: "body/body2 mono medium",
    settings: "Roboto Mono Medium · 14 / 20 · 0.17",
    usage: "Акцентный компактный код.",
  },
  {
    className: "rh-typography-subtitle-1",
    name: "subtitle1",
    settings: "Roboto Regular · 16 / 28 · 0.15",
    usage: "Подзаголовок или вводный текст.",
  },
  {
    className: "rh-typography-subtitle-2",
    name: "subtitle2",
    settings: "Roboto Medium · 14 / 22 · 0",
    usage: "Компактный подзаголовок.",
  },
];

function Section({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section className="grid gap-3">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold leading-7">{title}</h2>
        <p className="text-base leading-6 tracking-[0.15px]">{description}</p>
      </div>
      {children}
    </section>
  );
}

function TypeSample({ style }: { style: TextStyle }) {
  return (
    <div className="grid gap-2">
      <p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">
        {style.name}
      </p>
      <p className={style.className}>Типографика</p>
    </div>
  );
}

export function TypographyExamples() {
  const headlines = styles.slice(0, 9);
  const bodyStyles = styles.slice(9, 17);
  const supportingStyles = styles.slice(17);

  return (
    <div className="grid min-w-0 gap-10">
      <Section
        description="Заголовки выстраивают иерархию экрана. Используй один уровень заголовка для одной смысловой глубины."
        title="Заголовки"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full gap-6">
              {headlines.map((style) => (
                <TypeSample key={style.name} style={style} />
              ))}
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Body задаёт ритм интерфейсного текста, а Link повторяет его метрики и получает цвет ссылки от контекста."
        title="Основной текст и ссылки"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full gap-5 sm:grid-cols-2">
              {bodyStyles.map((style) => (
                <TypeSample key={style.name} style={style} />
              ))}
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Моноширинные стили подходят для технических значений. Subtitle1 и subtitle2 существуют в Figma как локальные настройки и зафиксированы здесь теми же метриками."
        title="Моноширинный и вспомогательный текст"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full gap-5 sm:grid-cols-2">
              {supportingStyles.map((style) => (
                <TypeSample key={style.name} style={style} />
              ))}
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Семантические классы повторяют параметры текстовых стилей Figma. Формат значений: семейство и начертание · размер / line-height · letter-spacing."
        title="Свойства"
      >
        <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
          <div
            className="flex border-b border-[var(--parser-border-light)]"
            role="row"
          >
            {["Стиль", "Параметры", "Назначение"].map((title, index) => (
              <TableCell
                helpIcon={false}
                key={title}
                role="head"
                sort={false}
                type="text"
                width={index === 0 ? 220 : index === 1 ? 280 : "fill"}
              >
                {title}
              </TableCell>
            ))}
          </div>
          {styles.map((style) => (
            <div
              className="flex border-b border-[var(--parser-border-light)] last:border-b-0"
              key={style.name}
              role="row"
            >
              <TableCell role="body" type="text" width={220}>
                <code className="font-mono text-sm leading-5">
                  .{style.className}
                </code>
              </TableCell>
              <TableCell role="body" type="text" width={280}>
                {style.settings}
              </TableCell>
              <TableCell role="body" type="text" width="fill">
                {style.usage}
              </TableCell>
            </div>
          ))}
        </Table>
      </Section>
    </div>
  );
}
