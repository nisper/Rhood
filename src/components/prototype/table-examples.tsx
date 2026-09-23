import * as React from "react";

import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";

type SortColumn = "object" | "city" | "price";
type SortState = { column: SortColumn; direction: "asc" | "desc" } | null;

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
  [
    "selection",
    "TableSelection",
    "—",
    "Включает выбор строк и всех строк текущей страницы.",
  ],
  ["role", "head / body", "head", "Ячейка заголовка или данных."],
  [
    "type",
    "text / number / skeleton / checkbox / placeholder",
    "checkbox",
    "Содержимое, выравнивание и состояние загрузки.",
  ],
  [
    "rowId",
    "string",
    "—",
    "ID строки для встроенного выбора через Table.selection.",
  ],
  [
    "paddingX",
    "true / false",
    "true",
    "Стандартные горизонтальные отступы ячейки.",
  ],
  [
    "sizeSmall",
    "true / false",
    "false",
    "Компактная высота для плотных таблиц.",
  ],
  ["sort", "true / false", "false", "Делает заголовок сортируемым."],
  [
    "sortDirection",
    "asc / desc",
    "—",
    "Показывает направление активной сортировки.",
  ],
  [
    "width",
    "content / fill / number",
    "content",
    "Ширина колонки: по содержимому, поровну или в пикселях.",
  ],
  [
    "children",
    "ReactNode",
    "Head / Cell",
    "Содержимое текстовой или числовой ячейки.",
  ],
];

function CodeProp({ name, value }: { name: string; value?: string }) {
  return (
    <>
      <span className="text-[var(--rh-theme-text-info)]">{name}</span>
      {value && (
        <>
          <span className="text-[var(--rh-theme-text-neutral-secondary)]">
            =
          </span>
          <span className="text-[var(--rh-theme-text-success)]">{value}</span>
        </>
      )}
    </>
  );
}

function Snippet({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      {children}
    </code>
  );
}

const syntax = "text-[var(--rh-theme-text-neutral-secondary)]";
const component = "text-[var(--rh-palette-purple-700)]";

const borderSnippet = (
  <Snippet>
    <span className={syntax}>{`<`}</span>
    <span className={component}>Table</span>{" "}
    <CodeProp name="bordered" value="{true}" />
    <span className={syntax}>{`>`}</span>
    {"\n  …\n"}
    <span className={syntax}>{`</`}</span>
    <span className={component}>Table</span>
    <span className={syntax}>{`>`}</span>
  </Snippet>
);
const sizeSnippet = (
  <Snippet>
    <span className={syntax}>{`<`}</span>
    <span className={component}>TableCell</span>{" "}
    <CodeProp name="sizeSmall" value="{true}" />{" "}
    <CodeProp name="width" value={'"fill"'} />
    <span className={syntax}>{`>`}</span>Космос
    <span className={syntax}>{`</`}</span>
    <span className={component}>TableCell</span>
    <span className={syntax}>{`>`}</span>
  </Snippet>
);
const stateSnippet = (
  <Snippet>
    <span className={syntax}>{`<`}</span>
    <span className={component}>Table</span>
    {"\n  "}
    <CodeProp name="selection" />
    <span className={syntax}>{`={{\n    `}</span>
    <CodeProp name="rowIds" />
    <span className={syntax}>{`: `}</span>
    listings.map(row <span className={syntax}>{`=>`}</span> row.id),
    {"\n    "}
    <CodeProp name="selectedIds" />
    <span className={syntax}>{`,\n    `}</span>
    <CodeProp name="onSelectedIdsChange" />
    <span className={syntax}>{`: setSelectedIds,\n  }}\n`}</span>
    <span className={syntax}>{`>`}</span>
    {"\n  "}
    <span className={syntax}>{`<`}</span>
    <span className={component}>TableCell</span>{" "}
    <CodeProp name="role" value={'"head"'} />{" "}
    <CodeProp name="type" value={'"checkbox"'} />
    <span className={syntax}>{` />\n  <`}</span>
    <span className={component}>TableCell</span>{" "}
    <CodeProp name="role" value={'"body"'} />{" "}
    <CodeProp name="type" value={'"checkbox"'} />{" "}
    <CodeProp name="rowId" value="{row.id}" />
    <span className={syntax}>{` />\n</`}</span>
    <span className={component}>Table</span>
    <span className={syntax}>{`>`}</span>
  </Snippet>
);
const compositionSnippet = (
  <Snippet>
    <span className={syntax}>{`<`}</span>
    <span className={component}>TableCell</span>{" "}
    <CodeProp name="role" value={'"head"'} />{" "}
    <CodeProp name="type" value={'"number"'} />
    <span className={syntax}>{`>`}</span>Стоимость, ₽
    <span className={syntax}>{`</`}</span>
    <span className={component}>TableCell</span>
    <span className={syntax}>{`>`}</span>
  </Snippet>
);
const sortingSnippet = (
  <Snippet>
    <span className={syntax}>{`<`}</span>
    <span className={component}>TableCell</span>
    {"\n  "}
    <CodeProp name="role" value={'"head"'} />
    {"\n  "}
    <CodeProp name="sort" />
    {"\n  "}
    <span className="text-[var(--rh-theme-text-info)]">sortDirection</span>
    <span className={syntax}>{`={`}</span>
    {"\n    "}
    <span>sort?.column === </span>
    <span className="text-[var(--rh-theme-text-success)]">"price"</span>
    {"\n      ? sort.direction\n      : undefined\n  "}
    <span className={syntax}>{`}`}</span>
    {"\n  "}
    <CodeProp name="onClick" value={'{() => toggleSort("price")}'} />
    {"\n"}
    <span className={syntax}>{`>`}</span>
    Стоимость, ₽
    <span className={syntax}>{`</`}</span>
    <span className={component}>TableCell</span>
    <span className={syntax}>{`>`}</span>
  </Snippet>
);

function ListingTable({
  bordered = true,
  compact = false,
}: {
  bordered?: boolean;
  compact?: boolean;
}) {
  return (
    <Table
      bordered={bordered}
      className="w-full !min-w-0 bg-[var(--rh-theme-surface-bg)]"
    >
      <div
        className="flex border-b border-[var(--parser-border-light)]"
        role="row"
      >
        <TableCell
          role="head"
          sizeSmall={compact}
          type="text"
          width="fill"
        >
          Объект
        </TableCell>
        <TableCell
          helpIcon={false}
          role="head"
          sizeSmall={compact}
          type="text"
          width="fill"
        >
          Город
        </TableCell>
        <TableCell
          helpIcon={false}
          role="head"
          sizeSmall={compact}
          type="number"
          width={150}
        >
          Стоимость, ₽
        </TableCell>
      </div>
      {listings.slice(0, 2).map((row) => (
        <div
          className="flex border-b border-[var(--parser-border-light)] last:border-b-0"
          key={row.id}
          role="row"
        >
          <TableCell role="body" sizeSmall={compact} type="text" width="fill">
            {row.object}
          </TableCell>
          <TableCell role="body" sizeSmall={compact} type="text" width="fill">
            {row.city}
          </TableCell>
          <TableCell role="body" sizeSmall={compact} type="number" width={150}>
            {row.price.toLocaleString("ru-RU")}
          </TableCell>
        </div>
      ))}
    </Table>
  );
}

function SortingTable() {
  const [sort, setSort] = React.useState<SortState>(null);
  const sortedRows = [...listings].sort((first, second) => {
    if (!sort) return 0;
    const result =
      sort.column === "price"
        ? first.price - second.price
        : sort.column === "city"
          ? first.city.localeCompare(second.city, "ru")
        : first.object.localeCompare(second.object, "ru");
    return sort.direction === "asc" ? result : -result;
  });

  function toggleSort(column: SortColumn) {
    setSort((current) =>
      current?.column === column
        ? { column, direction: current.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" },
    );
  }

  return (
    <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-[var(--rh-theme-surface-bg)]">
      <div className="flex border-b border-[var(--parser-border-light)]" role="row">
        <TableCell
          helpIcon={false}
          onClick={() => toggleSort("object")}
          role="head"
          sort
          sortDirection={sort?.column === "object" ? sort.direction : undefined}
          type="text"
          width="fill"
        >
          Объект
        </TableCell>
        <TableCell
          helpIcon={false}
          onClick={() => toggleSort("city")}
          role="head"
          sort
          sortDirection={sort?.column === "city" ? sort.direction : undefined}
          type="text"
          width="fill"
        >
          Город
        </TableCell>
        <TableCell
          helpIcon={false}
          onClick={() => toggleSort("price")}
          role="head"
          sort
          sortDirection={sort?.column === "price" ? sort.direction : undefined}
          type="number"
          width={150}
        >
          Стоимость, ₽
        </TableCell>
      </div>
      {sortedRows.map((row) => (
        <div
          className="flex border-b border-[var(--parser-border-light)] last:border-b-0"
          key={row.id}
          role="row"
        >
          <TableCell role="body" type="text" width="fill">{row.object}</TableCell>
          <TableCell role="body" type="text" width="fill">{row.city}</TableCell>
          <TableCell role="body" type="number" width={150}>{row.price.toLocaleString("ru-RU")}</TableCell>
        </div>
      ))}
    </Table>
  );
}

function Properties() {
  const widths = [160, "fill", 140, "fill"] as const;

  return (
    <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-[var(--rh-theme-surface-bg)]">
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
              type="text"
              width={widths[index]}
            >
              {title}
            </TableCell>
          ),
        )}
      </div>
      {cellProperties.map((row) => (
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
              width={widths[index]}
            >
              {cell}
            </TableCell>
          ))}
        </div>
      ))}
    </Table>
  );
}

export function TableExamples() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(["mayak"]);

  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={borderSnippet}
        description="bordered добавляет стандартную обводку Table. По умолчанию prop выключен; включай его, когда таблицу нужно отделить от фона."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <div className="grid w-full gap-2">
                <span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">
                  bordered=false
                </span>
                <ListingTable bordered={false} />
              </div>
            </ShowcasePanel>
            <ShowcasePanel>
              <div className="grid w-full gap-2">
                <span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">
                  bordered=true
                </span>
                <ListingTable />
              </div>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Стиль"
      />

      <ShowcaseSection
        codeSnippet={sizeSnippet}
        description='sizeSmall уменьшает высоту всех ячеек таблицы. Для колонок используй width="fill" для равного распределения, число — для фиксированной ширины.'
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <div className="grid w-full gap-2">
                <span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">
                  Стандартный
                </span>
                <ListingTable />
              </div>
            </ShowcasePanel>
            <ShowcasePanel>
              <div className="grid w-full gap-2">
                <span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">
                  Компактный
                </span>
                <ListingTable compact />
              </div>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Размер"
      />

      <ShowcaseSection
        codeSnippet={stateSnippet}
        description="Выбор работает через Table.selection: передай ID всех строк, выбранные ID и обработчик изменения. Для checkbox в строке обязательно укажи соответствующий rowId; checkbox в шапке выберет все строки."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <Table
                className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-[var(--rh-theme-surface-bg)]"
                selection={{
                  onSelectedIdsChange: setSelectedIds,
                  rowIds: listings.map((row) => row.id),
                  selectedIds,
                }}
              >
                <div
                  className="flex border-b border-[var(--parser-border-light)]"
                  role="row"
                >
                  <TableCell
                    role="head"
                    type="checkbox"
                    width={40}
                  />
                  <TableCell role="head" type="text" width="fill">
                    Объект
                  </TableCell>
                  <TableCell
                    helpIcon={false}
                    role="head"
                    type="text"
                    width="fill"
                  >
                    Город
                  </TableCell>
                  <TableCell helpIcon={false} role="head" type="number" width={150}>
                    Стоимость, ₽
                  </TableCell>
                </div>
                {listings.map((row) => (
                  <div
                    className="flex border-b border-[var(--parser-border-light)] last:border-b-0"
                    key={row.id}
                    role="row"
                  >
                    <TableCell
                      role="body"
                      rowId={row.id}
                      type="checkbox"
                      width={40}
                    />
                    <TableCell role="body" type="text" width="fill">
                      {row.object}
                    </TableCell>
                    <TableCell role="body" type="text" width="fill">
                      {row.city}
                    </TableCell>
                    <TableCell role="body" type="number" width={150}>
                      {row.price.toLocaleString("ru-RU")}
                    </TableCell>
                  </div>
                ))}
              </Table>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Выбор строк"
      />

      <ShowcaseSection
        codeSnippet={sortingSnippet}
        description="Передай sort и обработчик клика каждому сортируемому заголовку. sortDirection показывает направление активной сортировки; состояние и сортировку данных хранит экран."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <SortingTable />
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Сортировка"
      />

      <ShowcaseSection
        codeSnippet={compositionSnippet}
        description="Table собирается из строк и TableCell. Заголовки описывают колонку, числовые ячейки выравниваются по правому краю, а skeleton показывает загрузку данных."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <div className="grid w-full gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">
                    Заголовок и данные
                  </span>
                  <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-[var(--rh-theme-surface-bg)]">
                    <div
                      className="flex border-b border-[var(--parser-border-light)]"
                      role="row"
                    >
                      <TableCell
                        role="head"
                        type="text"
                        width="fill"
                      >
                        Название
                      </TableCell>
                      <TableCell
                        helpIcon={false}
                        role="head"
                        type="number"
                        width="fill"
                      >
                        Стоимость, ₽
                      </TableCell>
                    </div>
                    <div className="flex" role="row">
                      <TableCell role="body" type="text" width="fill">
                        Космос
                      </TableCell>
                      <TableCell role="body" type="number" width="fill">
                        12 500 000
                      </TableCell>
                    </div>
                  </Table>
                </div>
                <div className="grid gap-2">
                  <span className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">
                    Загрузка
                  </span>
                  <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-[var(--rh-theme-surface-bg)]">
                    <div className="flex" role="row">
                      <TableCell role="body" type="skeleton" width="fill" />
                      <TableCell role="body" type="skeleton" width="fill" />
                    </div>
                  </Table>
                </div>
              </div>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Состав"
      />

      <ShowcaseSection
        description="Публичные свойства Table и TableCell. Пагинация, данные и обработчики сортировки принадлежат экрану, который использует таблицу."
        showcase={<Properties />}
        title="Свойства"
      />
    </div>
  );
}
