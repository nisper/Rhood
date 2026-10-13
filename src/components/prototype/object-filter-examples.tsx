import { ObjectFilter } from "@/components/ui/object-filter"
import { ShowcaseSection } from "@/components/ui/showcase-section"

function ObjectFilterExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={
          <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
            <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
            <span className="text-[var(--rh-palette-purple-700)]">ObjectFilter</span>
            <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
          </code>
        }
        description="Панель быстрых фильтров с кнопкой дополнительных параметров. Ненужные поля можно скрыть через filters."
        panels={[
          <div className="flex min-h-[136px] items-start justify-start overflow-visible rounded-xl bg-white px-6 py-4">
            <ObjectFilter contentWidth="full" modalDisplay="embedded" />
          </div>,
        ]}
        title="Состав"
      />
    </div>
  )
}

export { ObjectFilterExamples }
