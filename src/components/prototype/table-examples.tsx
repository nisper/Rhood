import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Copy } from "lucide-react";
import * as React from "react";

import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { TableRow } from "@/components/ui/table-row";
import { Switch } from "@/components/ui/switch";

const listings = [
  { id: "cosmos", object: "Космос", city: "Екатеринбург", price: 12500000 },
  { id: "mayak", object: "Маяк", city: "Верхняя Пышма", price: 8900000 },
  { id: "orbit", object: "Орбита", city: "Екатеринбург", price: 10300000 },
];

const cellProperties = [
  [
    "bordered",
    "true / false",
    "false",
    "Добавляет стандартную обводку таблицы.",
  ],
  ["children", "ReactNode", "Head / Cell", "Содержимое текстовой или числовой ячейки."],
  ["compact", "true / false", "false", "Компактная высота для плотных таблиц."],
  ["hover", "true / false", "false", "Меняет фон строки при наведении."],
  [
    "minWidth",
    "number / CSS length",
    "—",
    "Минимальная ширина таблицы; при недостатке места появляется горизонтальный скролл.",
  ],
  ["paddingX", "true / false", "true", "Стандартные горизонтальные отступы ячейки."],
  ["role", "head / body", "head", "Ячейка заголовка или данных."],
  [
    "rowId",
    "string",
    "—",
    "ID строки для встроенного выбора через Table.selection.",
  ],
  ["selection", "TableSelection", "—", "Включает выбор строк и всех строк текущей страницы."],
  ["sort", "true / false", "false", "Делает заголовок сортируемым."],
  ["sortDirection", "asc / desc", "—", "Показывает направление активной сортировки."],
  [
    "textSize",
    "b2 / b1",
    "b2",
    "Размер текста body-ячейки; заголовки таблицы не меняются.",
  ],
  ["type", "text / number / skeleton / checkbox / placeholder / chip / button", "checkbox", "Содержимое ячейки; для chip и button уменьшает вертикальные отступы ячейки на внутренний padding содержимого."],
  ["verticalAlign", "top / center / bottom", "top", "Выравнивает содержимое ячейки по вертикали."],
  ["verticalBorders", "true / false", "false", "Добавляет вертикальные границы между ячейками."],
  [
    "width",
    "content / fill / number",
    "content",
    "Ширина колонки: по содержимому, поровну или в пикселях.",
  ],
];

function ListingTable({
  bordered = true,
  compact = false,
  textSize = "b2",
  verticalBorders = false,
}: {
  bordered?: boolean;
  compact?: boolean;
  textSize?: "b2" | "b1";
  verticalBorders?: boolean;
}) {
  return (
    <Table
      bordered={bordered}
      className="w-full !min-w-0 bg-[var(--rh-theme-surface-bg)]"
      verticalBorders={verticalBorders}
    >
      <TableRow>
        <TableCell
          role="head"
          compact={compact}
          type="text"
          width="fill"
        >
          Объект
        </TableCell>
        <TableCell
          helpIcon={false}
          role="head"
          compact={compact}
          type="text"
          width="fill"
        >
          Город
        </TableCell>
        <TableCell
          helpIcon={false}
          role="head"
          compact={compact}
          type="number"
          width={150}
        >
          Стоимость, ₽
        </TableCell>
      </TableRow>
      {listings.slice(0, 2).map((row) => (
        <TableRow key={row.id}>
          <TableCell compact={compact} role="body" textSize={textSize} type="text" width="fill">
            {row.object}
          </TableCell>
          <TableCell compact={compact} role="body" textSize={textSize} type="text" width="fill">
            {row.city}
          </TableCell>
          <TableCell compact={compact} role="body" textSize={textSize} type="number" width={150}>
            {row.price.toLocaleString("ru-RU")}
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

function Properties() {
  const widths = [160, "fill", 140, "fill"] as const;

  return (
    <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-[var(--rh-theme-surface-bg)]">
      <TableRow>
        {["Свойство", "Значения", "По умолчанию", "Назначение"].map(
          (title, index) => (
            <TableCell
              helpIcon={false}
              key={title}
              role="head"
              type="text"
              width={widths[index]}
            >
              {title}
            </TableCell>
          ),
        )}
      </TableRow>
      {cellProperties.map((row) => (
        <TableRow key={row[0]}>
          {row.map((cell, index) => (
            <TableCell
              key={index}
              role="body"
              type="text"
              width={widths[index]}
            >
              {cell}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Table>
  );
}

function CellExamples({ compact }: { compact: boolean }) {
  const [checked, setChecked] = React.useState(true);

  return (
    <Table
      bordered
      className="w-full !min-w-0"
      verticalBorders
      columns={[
        { key: "text", alignment: "left" },
        { key: "number", alignment: "right" },
        { key: "checkbox", alignment: "center" },
        { key: "chip", alignment: "left" },
        { key: "button", alignment: "center" },
        { key: "defaultText", alignment: "left" },
      ]}
    >
      <TableRow>
        <TableCell column="text" compact={compact} helpIcon={false} role="head" type="text" width={150}>Текст</TableCell>
        <TableCell column="number" compact={compact} helpIcon={false} role="head" type="number" width={120}>Число</TableCell>
        <TableCell column="checkbox" compact={compact} helpIcon={false} role="head" type="text" width={88}>Флажок</TableCell>
        <TableCell column="chip" compact={compact} helpIcon={false} role="head" type="text" width={140}>Статус</TableCell>
        <TableCell column="button" compact={compact} helpIcon={false} role="head" type="text" width={88}>Кнопка</TableCell>
        <TableCell column="defaultText" compact={compact} helpIcon={false} role="head" type="text" width={152}>Обычный текст</TableCell>
      </TableRow>
      <TableRow>
        <TableCell column="text" compact={compact} role="body" type="text" width={150}>Объявление</TableCell>
        <TableCell column="number" compact={compact} role="body" type="number" width={120}>12 500 000</TableCell>
        <TableCell checked={checked} className="justify-center" column="checkbox" compact={compact} onCheckedChange={setChecked} paddingX={false} role="body" type="checkbox" width={88} />
        <TableCell column="chip" compact={compact} role="body" type="chip" width={140}>
          <Chip appearance="muted" color="brand" icon={false} propDelete={false} size="sm">Активный</Chip>
        </TableCell>
        <TableCell buttonSize="sm" column="button" compact={compact} role="body" type="button" width={88}>
          <IconButton aria-label="Скопировать ID объекта" appearance="inherit" icon={<Copy aria-hidden="true" strokeWidth={2} />} size="sm" />
        </TableCell>
        <TableCell column="defaultText" compact={compact} role="body" type="text" width={152}>Обычная ячейка</TableCell>
      </TableRow>
    </Table>
  );
}

export function TableExamples() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(["mayak"]);
  const [compact, setCompact] = React.useState(false);

  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        props={["bordered: false · true", "verticalBorders: false · true"]}
        description="Table поддерживает стандартную обводку и вертикальные границы между ячейками. Сочетания помогают подобрать оформление под плотность и структуру данных."
        direction="vertical"
        panelCount={3}
        panels={[
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4">
            <div className="grid w-full gap-2"><span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">Без обводки</span><ListingTable bordered={false} /></div>
          </div>,
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4">
            <div className="grid w-full gap-2"><span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">С обводкой</span><ListingTable /></div>
          </div>,
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4">
            <div className="grid w-full gap-2"><span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">С вертикальными границами</span><ListingTable verticalBorders /></div>
          </div>,
        ]}
        title="Стиль"
      />

      <ShowcaseSection
        props={["compact: false · true", "textSize: b2 · b1"]}
        description='compact уменьшает вертикальные отступы ячеек, а textSize меняет размер текста строк с данными. Ширину колонок задавай через width="fill" или фиксированное значение в пикселях.'
        direction="vertical"
        panelCount={3}
        panels={[
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4"><div className="grid w-full gap-2"><span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">Обычная плотность</span><ListingTable /></div></div>,
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4"><div className="grid w-full gap-2"><span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">Компактная плотность</span><ListingTable compact /></div></div>,
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4"><div className="grid w-full gap-2"><span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">Крупный текст строк</span><ListingTable textSize="b1" /></div></div>,
        ]}
        title="Размер"
      />

      <ShowcaseSection
        description="Строки могут реагировать на наведение и поддерживать выбор. Наведи курсор на строки справа и переключи чекбоксы в таблице слева — выбранные строки синхронизируются с состоянием примера."
        direction="vertical"
        panelCount={2}
        panels={[
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4">
            <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-[var(--rh-theme-surface-bg)]" selection={{ onSelectedIdsChange: setSelectedIds, rowIds: listings.map((row) => row.id), selectedIds }}>
              <TableRow><TableCell role="head" type="checkbox" width={40} /><TableCell role="head" type="text" width="fill">Объект</TableCell><TableCell helpIcon={false} role="head" type="text" width="fill">Город</TableCell><TableCell helpIcon={false} role="head" type="number" width={150}>Стоимость, ₽</TableCell></TableRow>
              {listings.map((row) => <TableRow key={row.id}><TableCell role="body" rowId={row.id} type="checkbox" width={40} /><TableCell role="body" type="text" width="fill">{row.object}</TableCell><TableCell role="body" type="text" width="fill">{row.city}</TableCell><TableCell role="body" type="number" width={150}>{row.price.toLocaleString("ru-RU")}</TableCell></TableRow>)}
            </Table>
          </div>,
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4">
            <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-[var(--rh-theme-surface-bg)]">
              <TableRow><TableCell helpIcon={false} role="head" type="text" width="fill">Объект</TableCell><TableCell helpIcon={false} role="head" type="text" width="fill">Город</TableCell><TableCell helpIcon={false} role="head" type="number" width={150}>Стоимость, ₽</TableCell></TableRow>
              {listings.map((row) => <TableRow hover key={row.id}><TableCell role="body" type="text" width="fill">{row.object}</TableCell><TableCell role="body" type="text" width="fill">{row.city}</TableCell><TableCell role="body" type="number" width={150}>{row.price.toLocaleString("ru-RU")}</TableCell></TableRow>)}
            </Table>
          </div>,
        ]}
        title="Состояния"
      />

      <ShowcaseSection
        description="Показываю ячейки с текстом, числом, флажком, статусом и кнопкой, а в конце — обычную текстовую ячейку. Переключи compact, чтобы сравнить вертикальные отступы."
        panelFrame={false}
        panels={[<CellExamples compact={compact} key="cells" />]}
        settings={(
          <div className="bg-white px-4">
            <Switch checked={compact} onChange={(event) => setCompact(event.target.checked)} size="sm" switchPosition="left">
              compact
            </Switch>
          </div>
        )}
        usedComponents={[
          { href: "?view=components&component=chip", title: "Chip" },
          { href: "?view=components&component=icon-button", title: "IconButton" },
        ]}
        title="Ячейки"
      />

      <section className="mt-10 grid gap-4">
        <div className="grid gap-1">
          <h2 className="rh-typography-h4">Свойства</h2>
          <p className="rh-typography-b1">Публичные свойства Table, TableCell и TableRow. Пагинация, данные и обработчики сортировки принадлежат экрану, который использует таблицу.</p>
        </div>
        <Properties />
      </section>
    </div>
  );
}
