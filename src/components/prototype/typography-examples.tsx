import * as React from "react";

import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";

type TextStyle = {
  className: string;
  name: string;
  settings: string;
};

const styles: TextStyle[] = [
  {
    className: "rh-typography-headline-1",
    name: "headline/headline1",
    settings: "Unbounded Bold · 40 / 48 · 0",
  },
  {
    className: "rh-typography-headline-2",
    name: "headline/headline2",
    settings: "Unbounded Bold · 32 / 40 · 0",
  },
  {
    className: "rh-typography-headline-3",
    name: "headline/headline3",
    settings: "Unbounded Bold · 24 / 32 · 0",
  },
  {
    className: "rh-typography-headline-4",
    name: "headline/headline4",
    settings: "Unbounded Bold · 20 / 28 · 0",
  },
  {
    className: "rh-typography-body-1",
    name: "body/body1",
    settings: "Roboto Regular · 16 / 24 · 0.15",
  },
  {
    className: "rh-typography-body-1-medium",
    name: "body/body1 medium",
    settings: "Roboto SemiBold · 16 / 24 · 0.15",
  },
  {
    className: "rh-typography-body-2",
    name: "body/body2",
    settings: "Roboto Regular · 14 / 20 · 0.17",
  },
  {
    className: "rh-typography-body-2-medium",
    name: "body/body2 medium",
    settings: "Roboto SemiBold · 14 / 20 · 0.17",
  },
  {
    className: "rh-typography-body-1-mono",
    name: "body/body1 mono",
    settings: "Roboto Mono Regular · 16 / 24 · 0.15",
  },
  {
    className: "rh-typography-body-1-mono-medium",
    name: "body/body1 mono medium",
    settings: "Roboto Mono Medium · 16 / 24 · 0.15",
  },
  {
    className: "rh-typography-body-2-mono",
    name: "body/body2 mono",
    settings: "Roboto Mono Regular · 14 / 20 · 0.17",
  },
  {
    className: "rh-typography-body-2-mono-medium",
    name: "body/body2 mono medium",
    settings: "Roboto Mono Medium · 14 / 20 · 0.17",
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

function TypeSample({
  compactLabel = false,
  sample = "Типографика",
  style,
}: {
  compactLabel?: boolean;
  sample?: string;
  style: TextStyle;
}) {
  const name = style.name.split("/").pop() ?? style.name;
  const fontSize = style.settings.split(" · ")[1]?.split(" / ")[0];
  const label = compactLabel && fontSize ? `${name} · ${fontSize}px` : style.name;

  if (compactLabel) {
    return (
      <div className="flex min-w-0 items-baseline gap-4">
        <p className={`${style.className} shrink-0`}>{sample}</p>
        <p className="min-w-0 flex-1 text-right text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">
          {label}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">
        {label}
      </p>
      <p className={style.className}>Типографика</p>
    </div>
  );
}

function ListSample({ ordered }: { ordered: boolean }) {
  const items = (
    <>
      <li>Адрес объекта</li>
      <li>Основные характеристики</li>
      <li>
        Фотографии
        {ordered ? (
          <ol className="mt-1 list-[lower-alpha] pl-6">
            <li>Планировка</li>
            <li>Вид из окна</li>
          </ol>
        ) : (
          <ul className="mt-1 list-[circle] pl-6">
            <li>Планировка</li>
            <li>Вид из окна</li>
          </ul>
        )}
      </li>
      <li>Описание</li>
      <li>Контакты</li>
    </>
  );

  return (
    <div className="min-w-0">
      <p className="mb-3 text-sm font-medium leading-5">
        {ordered ? "Нумерованный список" : "Маркированный список"}
      </p>
      {ordered ? (
        <ol className="rh-typography-body-1 list-decimal space-y-1 pl-6">
          {items}
        </ol>
      ) : (
        <ul className="rh-typography-body-1 list-disc space-y-1 pl-6">{items}</ul>
      )}
    </div>
  );
}

export function TypographyExamples() {
  const headlines = styles.filter((style) => style.name.startsWith("headline/"));
  const bodyStyles = styles.filter(
    (style) => style.name.startsWith("body/") && !style.name.includes(" mono"),
  );
  const monoStyles = styles.filter((style) => style.name.includes(" mono"));

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
                <TypeSample compactLabel key={style.name} style={style} />
              ))}
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Списки помогают объединять связанные пункты и показывать их порядок, когда он важен."
        title="Списки"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full gap-8 md:grid-cols-2">
              <ListSample ordered={false} />
              <ListSample ordered />
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Body задаёт ритм основного и вторичного текста интерфейса."
        title="Основной текст"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full gap-5">
              {bodyStyles.map((style) => (
                <TypeSample compactLabel key={style.name} style={style} />
              ))}
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Моноширинные стили подходят для кода и технических значений."
        title="Моноширинный текст"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full gap-5">
              {monoStyles.map((style) => (
                <TypeSample
                  compactLabel
                  key={style.name}
                  sample="0 152 088"
                  style={style}
                />
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
            {["Стиль", "Параметры"].map((title, index) => (
              <TableCell
                helpIcon={false}
                key={title}
                role="head"
                sort={false}
                type="text"
                width={index === 0 ? 220 : "fill"}
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
              <TableCell role="body" type="text" width="fill">
                {style.settings}
              </TableCell>
            </div>
          ))}
        </Table>
      </Section>
    </div>
  );
}
