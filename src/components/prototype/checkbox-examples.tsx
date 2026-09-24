import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";

const properties = [
  ["size", "md · sm", "md", "Размер control и текста label."],
  ["checked", "true · false", "false", "Значение в контролируемом режиме."],
  [
    "defaultChecked",
    "true · false",
    "false",
    "Начальное значение в неконтролируемом режиме.",
  ],
  [
    "indeterminate",
    "true · false",
    "false",
    "Частичный выбор группы; отображает знак минус.",
  ],
  [
    "disabled",
    "true · false",
    "false",
    "Блокирует взаимодействие и применяет disabled-состояние.",
  ],
  [
    "error",
    "true · false",
    "false",
    "Показывает ошибку для невыбранного Checkbox.",
  ],
  ["label", "true · false", "true", "Показывает текст рядом с control."],
  [
    "skeleton",
    "true · false",
    "false",
    "Показывает загрузочную заглушку вместо control и label.",
  ],
];

const selectionOptions = [
  { id: "apartment", label: "Квартира" },
  { id: "house", label: "Дом" },
  { id: "plot", label: "Участок" },
];

function Section({
  children,
  description,
  settings,
  title,
}: {
  children: React.ReactNode;
  description: string;
  settings?: string[];
  title: string;
}) {
  return (
    <section className="grid gap-3">
      <div className="grid gap-1">
        <h2 className="rh-typography-h4">{title}</h2>
        <p className="rh-typography-b1">{description}</p>
      </div>
      {children}
      {settings && (
        <div className="grid gap-0.5">
          {settings.map((setting) => (
            <p className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]" key={setting}>{setting}</p>
          ))}
        </div>
      )}
    </section>
  );
}

function StateRow({
  children,
  ...props
}: React.ComponentProps<typeof Checkbox>) {
  return <Checkbox {...props}>{children}</Checkbox>;
}

export function CheckboxExamples() {
  const [selectedOptionIds, setSelectedOptionIds] = React.useState<string[]>(
    [],
  );
  const allOptionsSelected =
    selectedOptionIds.length === selectionOptions.length;
  const someOptionsSelected =
    selectedOptionIds.length > 0 && !allOptionsSelected;

  function toggleAllOptions(checked: boolean) {
    setSelectedOptionIds(
      checked ? selectionOptions.map((option) => option.id) : [],
    );
  }

  function toggleOption(id: string, checked: boolean) {
    setSelectedOptionIds((current) =>
      checked
        ? [...current, id]
        : current.filter((optionId) => optionId !== id),
    );
  }

  return (
    <div className="grid min-w-0 gap-10">
      <Section
        description="md использует control 20 px, sm — 16 px; у обоих control внешний margin 2 px. В обоих размерах вертикальные отступы строки составляют 8 px."
        settings={["size: md · sm"]}
        title="Размер"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid gap-3">
              <StateRow size="md">Medium</StateRow>
              <StateRow size="sm">Small</StateRow>
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Checkbox поддерживает пустое, выбранное и частично выбранное состояния."
        settings={["checked: boolean", "indeterminate: boolean"]}
        title="Значение"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              <StateRow>Unchecked</StateRow>
              <StateRow checked>Checked</StateRow>
              <StateRow checked indeterminate>
                Indeterminate
              </StateRow>
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="При выборе части пунктов Checkbox «Выбрать все» переходит в промежуточное состояние."
        settings={["checked: boolean", "onChange: (event) => void"]}
        title="Выбор"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid">
              <StateRow
                checked={allOptionsSelected}
                indeterminate={someOptionsSelected}
                onChange={(event) => toggleAllOptions(event.target.checked)}
              >
                Все
              </StateRow>
              {selectionOptions.map((option) => (
                <StateRow
                  checked={selectedOptionIds.includes(option.id)}
                  key={option.id}
                  onChange={(event) =>
                    toggleOption(option.id, event.target.checked)
                  }
                >
                  {option.label}
                </StateRow>
              ))}
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Hover доступен для невыбранного и выбранного Checkbox. Disabled имеет приоритет над выбранным и частично выбранным состояниями."
        settings={["state: default · hovered", "error: boolean", "disabled: boolean"]}
        title="Состояния"
      >
        <ShowcaseSurface direction="vertical">
          <ShowcasePanel>
            <div className="grid w-full max-w-[640px] grid-cols-2 gap-x-8 gap-y-2">
              <StateRow state="hovered">Hovered</StateRow>
              <StateRow checked state="hovered">
                Checked hovered
              </StateRow>
              <StateRow error>Error</StateRow>
              <StateRow disabled>Disabled</StateRow>
            </div>
          </ShowcasePanel>
          <ShowcasePanel tone="transparent">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              <StateRow checked disabled>
                Checked disabled
              </StateRow>
              <StateRow checked disabled indeterminate>
                Indeterminate disabled
              </StateRow>
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Подпись можно скрыть для табличных строк и компактных интерфейсов. Skeleton занимает ширину 56 px."
        settings={["label: boolean", "skeleton: boolean"]}
        title="Состав"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              <StateRow label={false} />
              <StateRow skeleton />
              <StateRow size="sm" skeleton />
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Основные настройки Checkbox для реализации."
        title="Свойства"
      >
        <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
          <div
            className="flex border-b border-[var(--parser-border-light)]"
            role="row"
          >
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
      </Section>
    </div>
  );
}
