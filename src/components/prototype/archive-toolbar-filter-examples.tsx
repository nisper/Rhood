import { ArchiveToolbarFilter } from "@/components/ui/archive-toolbar-filter"
import { ShowcaseSection } from "@/components/ui/showcase-section"

function ArchiveToolbarFilterExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={
          <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
            <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
            <span className="text-[var(--rh-palette-purple-700)]">ArchiveToolbarFilter</span>
            <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
          </code>
        }
        description="Панель фильтров архива. Комнатность работает как мультиселект; меню площади, цены и этажа пока пустые."
        panels={[
          <div className="flex min-h-[136px] items-start justify-start overflow-visible rounded-xl bg-white px-6 py-4">
            <ArchiveToolbarFilter contentWidth="container" />
          </div>,
        ]}
        title="Состав"
      />
    </div>
  )
}

export { ArchiveToolbarFilterExamples }
