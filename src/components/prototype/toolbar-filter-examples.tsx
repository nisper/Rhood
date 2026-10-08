import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { ToolbarFilter } from "@/components/ui/toolbar-filter";

const properties = [
  ["contentWidth", "full · container", "full", "Ширина содержимого: по всей доступной области или в контейнере страницы."],
  ["empty", "true · false", "true", "Показывает пустые поля либо выбранные значения фильтров."],
  ["progressLinear", "true · false", "true", "Показывает индикатор загрузки в mobile-варианте с выбранными фильтрами."],
  ["resultCount", "number", "50", "Количество объектов в кнопке применения фильтров."],
  ["resp", "desk · mob", "desk", "Переключает desktop- и mobile-варианты панели."],
  ["…props", "ComponentProps&lt;\"section\"&gt;", "—", "Нативные свойства корневого section-элемента."],
] as const;

function CodeProp({ name, value }: { name: string; value?: string }) {
  return (
    <>
      {" "}
      <span className="text-[var(--rh-theme-text-info)]">{name}</span>
      {value && (
        <>
          <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
          <span className="text-[var(--rh-theme-text-success)]">{value}</span>
        </>
      )}
    </>
  );
}

function ToolbarFilterSnippet({ children }: { children?: React.ReactNode }) {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
      <span className="text-[var(--rh-palette-purple-700)]">ToolbarFilter</span>
      {children}
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    </code>
  );
}

function WidePanel({ children }: { children: React.ReactNode }) {
  return (
    <ShowcasePanel className="items-start justify-start overflow-x-auto p-0">
      {children}
    </ShowcasePanel>
  );
}

function PropertiesTable() {
  return (
    <section className="mb-10 grid gap-3">
      <div className="grid gap-1">
        <h2 className="rh-typography-h4">Свойства</h2>
        <p className="rh-typography-b1">Основные настройки ToolbarFilter для реализации.</p>
      </div>
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => (
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
          ))}
        </div>
        {properties.map((row) => (
          <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
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
    </section>
  );
}

function ToolbarFilterExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={
          <ToolbarFilterSnippet>
            <CodeProp name="resp" value='"mob"' />
          </ToolbarFilterSnippet>
        }
        description="ToolbarFilter использует единый стиль. desk показывает все основные фильтры в строке, а mob оставляет компактные управляющие элементы и открывает параметры в модальном окне."
        showcase={
          <ShowcaseSurface direction="vertical">
            <WidePanel>
              <ToolbarFilter className="min-w-[960px]" />
            </WidePanel>
            <ShowcasePanel className="min-h-0 w-[480px] max-w-none justify-start p-0">
              <ToolbarFilter className="w-full" resp="mob" />
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Размер"
      />

      <ShowcaseSection
        codeSnippet={
          <ToolbarFilterSnippet>
            <CodeProp name="empty" value="{false}" />
          </ToolbarFilterSnippet>
        }
        description="В пустом состоянии поля показывают подсказки. После выбора фильтров появляются значения и действие для сброса; элементы остаются интерактивными."
        showcase={
          <ShowcaseSurface direction="vertical">
            <WidePanel>
              <ToolbarFilter className="min-w-[960px]" />
            </WidePanel>
            <WidePanel>
              <ToolbarFilter className="min-w-[960px]" empty={false} />
            </WidePanel>
          </ShowcaseSurface>
        }
        title="Состояния"
      />

      <ShowcaseSection
        codeSnippet={
          <ToolbarFilterSnippet>
            <CodeProp name="contentWidth" value='"container"' />
            <CodeProp name="resultCount" value="{120}" />
          </ToolbarFilterSnippet>
        }
        description="contentWidth ограничивает содержимое контейнером страницы. В mobile-варианте кнопка «Фильтры» открывает форму, а resultCount отражается в действии применения."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel className="min-h-0 w-[480px] max-w-none justify-start p-0">
              <ToolbarFilter
                className="w-full"
                contentWidth="container"
                empty={false}
                resp="mob"
                resultCount={120}
              />
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Состав"
      />

      <PropertiesTable />
    </div>
  );
}

export { ToolbarFilterExamples };
