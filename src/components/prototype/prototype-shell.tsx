import * as React from "react"

import { AlertDefault } from "@/components/ui/alert-default"
import { AddAnyFile } from "@/components/ui/add-any-file"
import { AddPhotos } from "@/components/ui/add-photos"
import { Avatar } from "@/components/ui/avatar"
import { PageTitle } from "@/components/ui/page-title"
import { PaginationButton } from "@/components/ui/pagination-button"
import { PaginationAlt } from "@/components/ui/pagination-alt"
import { Pagination } from "@/components/ui/pagination"
import { Select } from "@/components/ui/select"
import { SelectGhost } from "@/components/ui/select-ghost"
import { SearchInput } from "@/components/ui/search-input"
import { ShowMore } from "@/components/ui/show-more"
import { Snackbar } from "@/components/ui/snackbar"
import { UploadedDocument } from "@/components/ui/uploaded-document"
import { TableCellHead } from "@/components/ui/table-cell-head"
import { TableCell } from "@/components/ui/table-cell"
import { Table } from "@/components/ui/table"
import { ProgressLinear } from "@/components/ui/progress-linear"
import { MenuDivider } from "@/components/ui/menu-divider"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect"
import { MenuSingleSelect } from "@/components/ui/menu-single-select"
import { MenuMultiselect } from "@/components/ui/menu-multiselect"
import { Indicator } from "@/components/ui/indicator"
import { List } from "@/components/ui/list"
import { ListItem } from "@/components/ui/list-item"
import { ListItemSmall } from "@/components/ui/list-item-small"
import { ListSmall } from "@/components/ui/list-small"
import { LikeButton } from "@/components/ui/like-button"
import { Tag } from "@/components/ui/tag"
import { IconButton } from "@/components/ui/icon-button"
import { HelpIcon } from "@/components/ui/help-icon"
import { InfoIcon } from "@/components/ui/info-icon"
import { ButtonFavorite } from "@/components/ui/button-favorite"
import { Chip } from "@/components/ui/chip"
import { FormHelperText } from "@/components/ui/form-helper-text"
import { FormControlLabel } from "@/components/ui/form-control-label"
import { DateInput } from "@/components/ui/date-input"
import { PasswordField } from "@/components/ui/password-field"
import { RangeInput } from "@/components/ui/range-input"
import { TextField } from "@/components/ui/text-field"
import { TextFieldMultiline } from "@/components/ui/text-field-multiline"
import { ToggleButton } from "@/components/ui/toggle-button"
import { ToggleChip } from "@/components/ui/toggle-chip"
import { Tooltip } from "@/components/ui/tooltip"
import { OnboardingTooltip } from "@/components/ui/onboarding-tooltip"
import { Button } from "@/components/ui/button"
import { Tab } from "@/components/ui/tab"
import { TabBar } from "@/components/ui/tab-bar"
import { ConfirmCode } from "@/components/ui/confirm-code"

type SectionLink = {
  href: string
  label: string
}

function toSectionId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function PrototypeShell() {
  const sectionsRef = React.useRef<HTMLDivElement | null>(null)
  const [sectionLinks, setSectionLinks] = React.useState<SectionLink[]>([])
  const sizes = ["lg", "md", "sm", "xsm"] as const
  const avatarSizes = ["40px", "32px", "24px", "20px"] as const
  const alertColors = ["error", "warning", "info", "neutral", "brand"] as const
  const alertStyles = ["muted", "outlined", "contrast"] as const
  const dividerExamples = ["default"] as const
  const pageTitleExamples = ["default"] as const
  const tabExamples = [
    {
      key: "horizontal-default",
      props: { direction: "horizontal" as const, startIcon: true },
    },
    {
      key: "horizontal-hovered",
      props: { direction: "horizontal" as const, startIcon: true, state: "hovered" as const },
    },
    {
      key: "horizontal-selected",
      props: {
        direction: "horizontal" as const,
        secondaryText: true,
        selected: true,
        startIcon: true,
      },
    },
    {
      key: "vertical-default",
      props: { direction: "vertical" as const, startIcon: true },
    },
    {
      key: "vertical-hovered",
      props: { direction: "vertical" as const, secondaryText: true, startIcon: true, state: "hovered" as const },
    },
    {
      key: "vertical-selected",
      props: {
        direction: "vertical" as const,
        secondaryText: true,
        selected: true,
        startIcon: true,
      },
    },
  ]
  const tabBarExamples = ["default", "disGutters"] as const
  const confirmCodeExamples = ["default", "hovered", "focused"] as const
  const paginationButtonStates = ["default", "hover", "checked"] as const
  const paginationAltExamples = ["default"] as const
  const paginationExamples = ["default"] as const
  const progressLinearPositions = ["start", "medium", "full", "end"] as const
  const selectSizes = ["md", "sm"] as const
  const selectGhostSizes = ["md", "sm"] as const
  const searchInputSizes = ["md", "sm"] as const
  const textFieldMultilineSizes = ["md", "sm"] as const
  const toggleButtonSizes = ["lg", "md", "sm"] as const
  const toggleButtonColors = ["contrast", "neutral-dark", "neutral"] as const
  const tooltipExamples = ["Typography", "Longer tooltip text"] as const
  const onboardingTooltipExamples = ["top", "left", "right", "bottom"] as const
  const addPhotosExamples = ["default", "hover", "load"] as const
  const addAnyFileExamples = ["default", "active"] as const
  const uploadedDocumentStates = ["default", "hovered", "focused"] as const
  const uploadedDocumentWeights = ["regular", "medium"] as const
  const showMoreSizes = ["lg", "md", "sm"] as const
  const showMoreAppearances = ["brand", "neutral"] as const
  const snackbarExamples = ["default"] as const
  const tableCellSizes = ["default", "small"] as const
  const tableExamples = ["default"] as const
  const menuSingleSelectExamples = ["default"] as const
  const menuMultiselectExamples = ["default"] as const
  const menuItemSingleSelectStates = ["default", "hovered", "selected", "disabled"] as const
  const menuItemMultiselectStates = ["default", "hovered", "selected", "disabled"] as const
  const indicatorColors = ["primary", "error", "info", "success", "warning"] as const
  const listWidths = ["default"] as const
  const listSmallWidths = ["default"] as const
  const listItemSizes = ["regular", "medium"] as const
  const listItemSmallSizes = ["regular", "medium"] as const
  const likeStates = ["default", "hover"] as const
  const iconButtonBrandSizes = ["lg", "md", "sm"] as const
  const iconButtonContrastSizes = ["lg", "md", "sm"] as const
  const iconButtonDarkSizes = ["lg", "md", "sm"] as const
  const iconButtonErrorSizes = ["lg", "md", "sm"] as const
  const iconButtonNeutralSizes = ["lg", "md", "sm"] as const
  const helpIconSizes = ["lg", "md", "sm"] as const
  const infoIconSizes = ["lg", "md", "sm"] as const
  const favoriteSizes = ["md", "sm", "xsm"] as const
  const chipSizes = ["lg", "md", "sm"] as const
  const chipColors = ["neutral", "brand", "error", "warning", "success", "contrast"] as const
  const chipAppearances = ["muted", "outlined", "contrast"] as const
  const tagColors = ["neutral", "brand", "error", "warning", "success", "contrast"] as const
  const tagStyles = ["outlined", "muted", "contrast"] as const
  const toggleChipSizes = ["lg", "md", "sm"] as const
  const textFieldSizes = ["lg", "md", "sm"] as const
  const passwordFieldSizes = ["lg", "md", "sm"] as const
  const dateInputSizes = ["md", "sm"] as const
  const rangeInputSizes = ["lg", "md", "sm"] as const
  const variants = ["contained", "outlined", "text"] as const
  const avatarExamples = [
    { key: "text", props: { content: "text" as const } },
    { key: "icon", props: { content: "icon" as const } },
    { key: "image", props: { content: "image" as const } },
    { key: "skeleton", props: { content: "image" as const, skeleton: true } },
  ]
  const rangeInputExamples = [
    {
      key: "static-default",
      props: { empty: false, topLabel: "static" as const },
    },
    {
      key: "static-empty",
      props: { empty: true, topLabel: "static" as const },
    },
    {
      key: "static-hovered",
      props: { empty: true, state: "hovered" as const, topLabel: "static" as const },
    },
    {
      key: "static-focused",
      props: { empty: true, state: "focused" as const, topLabel: "static" as const },
    },
    {
      key: "static-error",
      props: {
        empty: false,
        error: true,
        state: "focused" as const,
        topLabel: "static" as const,
      },
    },
    {
      key: "static-disabled",
      props: { disabled: true, empty: false, topLabel: "static" as const },
    },
    {
      key: "dynamic-default",
      props: { empty: false, topLabel: "dynamic" as const },
    },
    {
      key: "dynamic-empty",
      props: { empty: true, topLabel: "dynamic" as const },
    },
    {
      key: "dynamic-hovered",
      props: {
        empty: true,
        state: "hovered" as const,
        topLabel: "dynamic" as const,
      },
    },
    {
      key: "dynamic-focused",
      props: {
        empty: true,
        state: "focused" as const,
        topLabel: "dynamic" as const,
      },
    },
    {
      key: "dynamic-error",
      props: {
        empty: false,
        error: true,
        state: "focused" as const,
        topLabel: "dynamic" as const,
      },
    },
    {
      key: "dynamic-disabled",
      props: { disabled: true, empty: false, topLabel: "dynamic" as const },
    },
  ]
  const textFieldExamples = [
    {
      key: "static-default",
      props: { empty: true, placeholder: "Placeholder", topLabel: "static" as const },
    },
    {
      key: "static-value",
      props: {
        defaultValue: "Value",
        empty: false,
        placeholder: "Placeholder",
        topLabel: "static" as const,
      },
    },
    {
      key: "dynamic-empty",
      props: {
        empty: true,
        placeholder: "Placeholder",
        topLabel: "dynamic" as const,
      },
    },
    {
      key: "static-hovered",
      props: {
        empty: true,
        placeholder: "Placeholder",
        state: "hovered" as const,
        topLabel: "static" as const,
      },
    },
    {
      key: "dynamic-value",
      props: {
        defaultValue: "Value",
        empty: false,
        placeholder: "Placeholder",
        topLabel: "dynamic" as const,
      },
    },
    {
      key: "dynamic-error",
      props: {
        defaultValue: "Value",
        empty: false,
        placeholder: "Placeholder",
        error: true,
        topLabel: "dynamic" as const,
      },
    },
    {
      key: "dynamic-focused",
      props: {
        defaultValue: "Value",
        empty: false,
        placeholder: "Placeholder",
        state: "focused" as const,
        topLabel: "dynamic" as const,
      },
    },
    {
      key: "disabled",
      props: {
        disabled: true,
        empty: true,
        placeholder: "Placeholder",
        topLabel: "static" as const,
      },
    },
  ]

  React.useEffect(() => {
    const container = sectionsRef.current

    if (!container) {
      return
    }

    const headings = Array.from(container.querySelectorAll("section > h4"))
    const nextLinks = headings
      .map((heading) => {
        const label = heading.textContent?.trim()
        const section = heading.closest("section")

        if (!label || !section) {
          return null
        }

        const id = toSectionId(label)
        section.id = id
        section.classList.add("scroll-mt-6")

        return {
          href: `#${id}`,
          label,
        }
      })
      .filter((item): item is SectionLink => item !== null)

    setSectionLinks(nextLinks)
  }, [])

  return (
    <main className="min-h-svh bg-background px-6 py-8 text-foreground">
      <section className="mx-auto grid max-w-[1440px] gap-8 xl:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <div className="sticky top-6 rounded-2xl border border-[color:var(--parser-border-light)] bg-white p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              Components
            </h3>
            <nav className="mt-4 max-h-[calc(100svh-96px)] overflow-y-auto pr-1">
              <ul className="grid gap-1">
                {sectionLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      className="block rounded-lg px-3 py-2 text-sm leading-5 text-[var(--parser-text-neutral-primary)] transition-colors hover:bg-[var(--parser-fill-neutral)]"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">
              Parser Components
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Figma component nodes implemented as reusable React components.
            </p>
          </div>
          <Button type="button" variant="secondary">
            Baseline button
          </Button>
        </header>

        <div className="grid gap-6" ref={sectionsRef}>
          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              menu divider
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {dividerExamples.map((example) => (
                <div key={example} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {example}
                  </div>
                  <MenuDivider />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              menu single select
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {menuSingleSelectExamples.map((example) => (
                <div key={example} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {example}
                  </div>
                  <MenuSingleSelect />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              page title
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {pageTitleExamples.map((example) => (
                <div key={example} className="grid gap-3 overflow-x-auto rounded-xl bg-[color:#c7dbff]">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {example}
                  </div>
                  <PageTitle className="min-w-[1100px]" />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              tab
            </h4>
            <div className="grid gap-6 rounded-xl bg-[color:#c7dbff] p-4">
              <div className="grid gap-3">
                <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                  matrix
                </div>
                <div className="grid gap-3">
                  {tabExamples.map((example) => (
                    <div key={example.key} className="flex flex-wrap items-start gap-6">
                      <Tab {...example.props} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              tab bar
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {tabBarExamples.map((example) => (
                <div key={example} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {example}
                  </div>
                  <div className="overflow-x-auto rounded-xl bg-[color:#c7dbff]">
                    <TabBar className="min-w-[320px]" disGutters={example === "disGutters"} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              confirm code
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {confirmCodeExamples.map((state) => (
                <div key={state} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {state}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <ConfirmCode empty state={state} />
                    <ConfirmCode empty={false} state={state} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              pagination button
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              <div className="grid gap-3">
                <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                  number
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {paginationButtonStates.map((state) => (
                    <PaginationButton key={`number-${state}`} state={state} />
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                  icon
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <PaginationButton state="default" type="icon" />
                  <PaginationButton state="hover" type="icon" />
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              pagination alt
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {paginationAltExamples.map((example) => (
                <div key={example} className="grid gap-3 overflow-x-auto">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {example}
                  </div>
                  <PaginationAlt className="min-w-[640px]" />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              pagination
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {paginationExamples.map((example) => (
                <div key={example} className="grid gap-3 overflow-x-auto">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {example}
                  </div>
                  <Pagination className="min-w-[384px]" />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              progress linear
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {progressLinearPositions.map((position) => (
                <div key={position} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {position}
                  </div>
                  <div className="rounded-2xl bg-[color:#f6f9ff] p-4">
                    <ProgressLinear position={position} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              select
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {selectSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3">
                    <Select
                      content="text"
                      helperText="Helper text"
                      label="Label"
                      size={size}
                      value="Value"
                    />
                    <Select
                      content="chips"
                      helperText="Helper text"
                      label="Label"
                      size={size}
                    />
                    <Select
                      content="text"
                      error
                      helperText="Helper text"
                      label="Label"
                      size={size}
                      state="focused"
                      value="Value"
                    />
                    <Select
                      content="text"
                      disabled
                      helperText="Helper text"
                      label="Label"
                      size={size}
                      value="Value"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              select ghost
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {selectGhostSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3">
                    <SelectGhost size={size} />
                    <SelectGhost error size={size} state="focused" />
                    <SelectGhost disabled size={size} />
                    <SelectGhost expanded size={size} state="focused" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              search input
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {searchInputSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <SearchInput empty placeholder="Поиск" size={size} state="default" />
                    <SearchInput empty placeholder="Поиск" size={size} state="hovered" />
                    <SearchInput empty placeholder="Поиск" size={size} state="focused" />
                    <SearchInput empty={false} placeholder="Поиск" size={size} state="default" value="Value" />
                    <SearchInput empty={false} placeholder="Поиск" size={size} state="hovered" value="Value" />
                    <SearchInput empty={false} placeholder="Поиск" size={size} state="focused" value="Value" />
                    <SearchInput disabled empty placeholder="Поиск" size={size} state="default" />
                    <SearchInput disabled empty={false} placeholder="Поиск" size={size} state="default" value="Value" />
                    <SearchInput error empty placeholder="Поиск" size={size} state="default" />
                    <SearchInput error empty={false} placeholder="Поиск" size={size} state="focused" value="Value" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              show more
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {showMoreSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3">
                    {showMoreAppearances.map((appearance) => (
                      <div key={`${size}-${appearance}`} className="flex flex-wrap items-center gap-4">
                        <ShowMore appearance={appearance} size={size} />
                        <ShowMore appearance={appearance} size={size} state="hover" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              snackbar
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {snackbarExamples.map((example) => (
                <div key={example} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {example}
                  </div>
                  <div className="rounded-2xl bg-[color:#121212] p-3">
                    <Snackbar />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              table cell head
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              <div className="grid gap-3">
                <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                  default
                </div>
                <div className="flex flex-wrap items-start gap-8">
                  <TableCellHead type="text" />
                  <TableCellHead type="number" />
                  <TableCellHead type="checkbox" />
                  <TableCellHead type="placeholder" />
                </div>
              </div>
              <div className="grid gap-3">
                <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                  small
                </div>
                <div className="flex flex-wrap items-start gap-8">
                  <TableCellHead secondaryText sizeSmall type="text" />
                  <TableCellHead secondaryText sizeSmall type="number" />
                  <TableCellHead sizeSmall type="checkbox" />
                  <TableCellHead sizeSmall type="placeholder" />
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              table cell
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {tableCellSizes.map((size) => {
                const sizeSmall = size === "small"

                return (
                  <div key={size} className="grid gap-3">
                    <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                      {size}
                    </div>
                    <div className="flex flex-wrap items-start gap-8">
                      <TableCell type="text" />
                      <TableCell type="number" />
                      <TableCell type="skeleton" />
                      <TableCell type="checkbox" />
                      <TableCell type="placeholder" />
                      <TableCell custom type="text">
                        <div className="h-5 w-full rounded bg-[color:#e8e8e8]" />
                      </TableCell>
                      <TableCell instance2 type="text" />
                      <TableCell instance2 type="number" />
                    </div>
                    {sizeSmall && (
                      <div className="text-xs text-muted-foreground">
                        The Figma export only distinguishes the small layout through spacing; we mirror that here with the same component set.
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              table
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {tableExamples.map((example) => (
                <div key={example} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {example}
                  </div>
                  <div className="overflow-x-auto">
                    <Table />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              menu item single select
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {menuItemSingleSelectStates.map((state) => (
                <div key={state} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {state}
                  </div>
                  <MenuItemSingleSelect
                    disabled={state === "disabled"}
                    rightSlot
                    rightSlotChip
                    rightSlotText
                    secondaryText
                    selected={state === "selected"}
                    state={state === "hovered" ? "hovered" : "default"}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              menu multiselect
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {menuMultiselectExamples.map((example) => (
                <div key={example} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {example}
                  </div>
                  <MenuMultiselect />
                </div>
              ))}
            </div>
          </section>



          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              menu item multiselect
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {menuItemMultiselectStates.map((state) => (
                <div key={state} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {state}
                  </div>
                  <MenuItemMultiselect
                    caption={false}
                    disabled={state === "disabled"}
                    selected={state === "selected"}
                    startIcon={false}
                    state={state === "hovered" ? "hovered" : "default"}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              list small
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {listSmallWidths.map((width) => (
                <div key={width} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {width}
                  </div>
                  <ListSmall />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              list item small
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {listItemSmallSizes.map((fontWeight) => (
                <div key={fontWeight} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {fontWeight}
                  </div>
                  <div className="grid gap-2">
                    <ListItemSmall fontWeight={fontWeight === "medium" ? "medium" : "regular"} />
                    <ListItemSmall
                      fontWeight={fontWeight === "medium" ? "medium" : "regular"}
                      secondaryText
                      state="hovered"
                    />
                    <ListItemSmall
                      fontWeight={fontWeight === "medium" ? "medium" : "regular"}
                      secondaryText
                      selected
                    />
                    <ListItemSmall
                      disabled
                      fontWeight={fontWeight === "medium" ? "medium" : "regular"}
                      secondaryText
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              list
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {listWidths.map((width) => (
                <div key={width} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {width}
                  </div>
                  <List />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              list item
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {listItemSizes.map((fontWeight) => (
                <div key={fontWeight} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {fontWeight}
                  </div>
                  <div className="grid gap-2">
                    <ListItem fontWeight={fontWeight === "medium" ? "medium" : "regular"} />
                    <ListItem
                      fontWeight={fontWeight === "medium" ? "medium" : "regular"}
                      secondaryText
                      state="hovered"
                    />
                    <ListItem
                      fontWeight={fontWeight === "medium" ? "medium" : "regular"}
                      secondaryText
                      selected
                    />
                    <ListItem
                      disabled
                      fontWeight={fontWeight === "medium" ? "medium" : "regular"}
                      secondaryText
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              like button
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {(["unchecked", "checked"] as const).map((checkedState) => (
                <div key={checkedState} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {checkedState}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {likeStates.map((state) => (
                      <LikeButton
                        checked={checkedState === "checked"}
                        key={`${checkedState}-${state}`}
                        state={state}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              indicator
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {([false, true] as const).map((border) => (
                <div key={String(border)} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {border ? "border" : "solid"}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {indicatorColors.map((color) => (
                      <div
                        className="flex items-center gap-2 text-xs uppercase tracking-[0.15px] text-muted-foreground"
                        key={`${border}-${color}`}
                      >
                        <Indicator border={border} color={color} />
                        <span>{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              icon button error
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {iconButtonErrorSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <IconButton appearance="ghost" size={size} />
                    <IconButton appearance="ghost" size={size} state="hovered" />
                    <IconButton appearance="filled" size={size} />
                    <IconButton appearance="filled" size={size} state="hovered" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              icon button dark
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {iconButtonDarkSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 bg-[color:#ffffff] p-4">
                    <IconButton size={size} />
                    <IconButton size={size} state="hovered" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              icon button contrast
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {iconButtonContrastSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 bg-[color:#d8e6ff] p-4">
                    <IconButton appearance="ghost" size={size} />
                    <IconButton appearance="ghost" size={size} state="hovered" />
                    <IconButton appearance="filled" size={size} />
                    <IconButton appearance="filled" size={size} state="hovered" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              icon button neutral
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {iconButtonNeutralSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <IconButton appearance="ghost" size={size} />
                    <IconButton appearance="ghost" size={size} state="hovered" />
                    <IconButton appearance="ghost" disabled size={size} />
                    <IconButton appearance="filled" size={size} />
                    <IconButton appearance="filled" size={size} state="hovered" />
                    <IconButton appearance="filled" disabled size={size} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              icon button brand
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {iconButtonBrandSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <IconButton appearance="ghost" size={size} />
                    <IconButton appearance="ghost" size={size} state="hovered" />
                    <IconButton appearance="ghost" disabled size={size} />
                    <IconButton appearance="filled" size={size} />
                    <IconButton appearance="filled" size={size} state="hovered" />
                    <IconButton appearance="filled" disabled size={size} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              help icon
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {helpIconSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="flex flex-wrap items-center gap-8 pl-1">
                    <HelpIcon size={size} />
                    <HelpIcon size={size} state="hovered" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              info icon
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {infoIconSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="flex flex-wrap items-center gap-8 pl-1">
                    <InfoIcon size={size} />
                    <InfoIcon size={size} state="hovered" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              button favorite
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {favoriteSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <ButtonFavorite size={size} />
                    <ButtonFavorite checked size={size} />
                    <ButtonFavorite size={size} state="hovered" />
                    <ButtonFavorite checked size={size} state="hovered" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              toggle chip
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {toggleChipSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <ToggleChip size={size} />
                    <ToggleChip checked size={size} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              toggle button
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {toggleButtonSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-9">
                    {toggleButtonColors.map((color) => (
                      <ToggleButton
                        color={color}
                        key={`${size}-${color}-default`}
                        label
                        size={size}
                        state="default"
                      />
                    ))}
                    {toggleButtonColors.map((color) => (
                      <ToggleButton
                        color={color}
                        key={`${size}-${color}-hover`}
                        label
                        size={size}
                        state="hover"
                      />
                    ))}
                    {toggleButtonColors.map((color) => (
                      <ToggleButton
                        color={color}
                        key={`${size}-${color}-selected`}
                        label
                        selected
                        size={size}
                        state="default"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              tooltip
            </h4>
            <div className="rounded-xl bg-white p-4">
              <div className="flex flex-wrap items-start gap-4">
                {tooltipExamples.map((text) => (
                  <Tooltip key={text}>{text}</Tooltip>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              onboarding tooltip
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {onboardingTooltipExamples.map((example) => (
                <OnboardingTooltip
                  bottomArrow={example === "bottom"}
                  key={example}
                  leftArrow={example === "left"}
                  rightArrow={example === "right"}
                  topArrow={example === "top"}
                />
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              add photos
            </h4>
            <div className="rounded-xl bg-white p-4">
              <div className="flex flex-wrap items-center gap-3">
                {addPhotosExamples.map((state) => (
                  <AddPhotos
                    isLoad={state === "load"}
                    key={state}
                    state={state === "hover" ? "hover" : "default"}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              add any file
            </h4>
            <div className="grid gap-3 rounded-xl bg-white p-4">
              {addAnyFileExamples.map((state) => (
                <AddAnyFile key={state} state={state} />
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              uploaded document
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {uploadedDocumentWeights.map((fontWeight) => (
                <div key={fontWeight} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {fontWeight}
                  </div>
                  <div className="grid gap-3">
                    {uploadedDocumentStates.map((state) => (
                      <UploadedDocument
                        dense={false}
                        fontWeight={fontWeight}
                        key={`${fontWeight}-${state}`}
                        secondaryText
                        state={state}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              chip
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {chipSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3">
                    {chipColors.map((color) => (
                      <div
                        className="flex flex-wrap items-center gap-3"
                        key={`${size}-${color}`}
                      >
                        <div className="w-20 shrink-0 text-xs uppercase tracking-[0.15px] text-muted-foreground">
                          {color}
                        </div>
                        {chipAppearances.map((appearance) => (
                          <Chip
                            appearance={appearance}
                            color={color}
                            key={`${size}-${color}-${appearance}`}
                            size={size}
                            thumbnailLabel="EB"
                          >
                            Chip
                          </Chip>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              tag
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {tagStyles.map((tagStyle) => (
                <div key={tagStyle} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {tagStyle}
                  </div>
                  <div className="grid gap-3">
                    {tagColors.map((color) => (
                      <div
                        className="flex flex-wrap items-center gap-3"
                        key={`${tagStyle}-${color}`}
                      >
                        <div className="w-20 shrink-0 text-xs uppercase tracking-[0.15px] text-muted-foreground">
                          {color}
                        </div>
                        <Tag color={color} style={tagStyle} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              alert default
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {(["desk", "mob"] as const).map((resp) => (
                <div key={resp} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {resp}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {alertColors.map((color) =>
                      alertStyles.map((style) => (
                        <AlertDefault
                          action
                          bigIcon
                          color={color}
                          key={`${resp}-${color}-${style}`}
                          resp={resp}
                          style={style}
                          title
                          description
                        />
                      )),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              avatar
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              <div className="grid gap-3">
                <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                  circular
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {avatarSizes.map((size) =>
                    avatarExamples.map(({ key, props }) => (
                      <Avatar
                        {...props}
                        badge={key !== "skeleton"}
                        key={`circular-${size}-${key}`}
                        size={size}
                        variant="Circular"
                      />
                    )),
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                  rounded
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {avatarSizes.map((size) =>
                    avatarExamples.map(({ key, props }) => (
                      <Avatar
                        {...props}
                        badge={key !== "skeleton"}
                        key={`rounded-${size}-${key}`}
                        size={size}
                        variant="Rounded"
                      />
                    )),
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              range input
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {rangeInputSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3 xl:grid-cols-2">
                    {rangeInputExamples.map(({ key, props }) => (
                      <RangeInput
                        {...props}
                        key={`${size}-${key}`}
                        label="Label"
                        size={size}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              date input
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {dateInputSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <DateInput empty label="Дата" placeholder="Placeholder" size={size} topLabel="dynamic" />
                    <DateInput defaultValue="24.08.2023" empty={false} label="Дата" placeholder="Placeholder" size={size} topLabel="dynamic" />
                    <DateInput defaultValue="24.08.2023" empty={false} label="Дата" placeholder="Placeholder" size={size} topLabel="dynamic" error />
                    <DateInput empty label="Дата" placeholder="Placeholder" size={size} topLabel="static" />
                    <DateInput defaultValue="24.08.2023" empty={false} label="Дата" placeholder="Placeholder" size={size} topLabel="static" />
                    <DateInput defaultValue="24.08.2023" empty={false} label="Дата" placeholder="Placeholder" size={size} topLabel="static" error />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              textfield
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {textFieldSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {textFieldExamples.map(({ key, props }) => (
                      <TextField
                        {...props}
                        key={`${size}-${key}`}
                        label="Label"
                        size={size}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              textfield multiline
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {textFieldMultilineSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <TextFieldMultiline
                      empty
                      helperText="Helper text"
                      label="Label"
                      minLines="2"
                      placeholder="Placeholder"
                      size={size}
                      topLabel="dynamic"
                    />
                    <TextFieldMultiline
                      defaultValue={"Value\nValue"}
                      empty={false}
                      helperText="Helper text"
                      label="Label"
                      minLines="2"
                      placeholder="Placeholder"
                      size={size}
                      topLabel="dynamic"
                    />
                    <TextFieldMultiline
                      defaultValue={"Value\nValue"}
                      empty={false}
                      error
                      helperText="Helper text"
                      label="Label"
                      minLines="2"
                      placeholder="Placeholder"
                      size={size}
                      state="focused"
                      topLabel="dynamic"
                    />
                    <TextFieldMultiline
                      empty
                      helperText="Helper text"
                      label="Label"
                      minLines="1"
                      placeholder="Placeholder"
                      size={size}
                      topLabel="static"
                    />
                    <TextFieldMultiline
                      defaultValue={"Value\nValue"}
                      empty={false}
                      helperText="Helper text"
                      label="Label"
                      minLines="1"
                      placeholder="Placeholder"
                      size={size}
                      topLabel="static"
                    />
                    <TextFieldMultiline
                      defaultValue={"Value\nValue"}
                      empty={false}
                      error
                      helperText="Helper text"
                      label="Label"
                      minLines="1"
                      placeholder="Placeholder"
                      size={size}
                      state="focused"
                      topLabel="static"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              password field
            </h4>
            <div className="grid gap-6 rounded-xl bg-white p-4">
              {passwordFieldSizes.map((size) => (
                <div key={size} className="grid gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.15px] text-muted-foreground">
                    {size}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <PasswordField
                      empty
                      label="Пароль"
                      placeholder="Placeholder"
                      size={size}
                      topLabel="dynamic"
                    />
                    <PasswordField
                      defaultValue="123456"
                      empty={false}
                      label="Пароль"
                      placeholder="Placeholder"
                      size={size}
                      topLabel="dynamic"
                    />
                    <PasswordField
                      defaultValue="123456"
                      empty={false}
                      label="Пароль"
                      placeholder="Placeholder"
                      showPassword
                      size={size}
                      topLabel="dynamic"
                    />
                    <PasswordField
                      empty
                      label="Пароль"
                      placeholder="Placeholder"
                      size={size}
                      topLabel="static"
                    />
                    <PasswordField
                      defaultValue="123456"
                      empty={false}
                      label="Пароль"
                      placeholder="Placeholder"
                      size={size}
                      topLabel="static"
                    />
                    <PasswordField
                      defaultValue="123456"
                      empty={false}
                      label="Пароль"
                      placeholder="Placeholder"
                      showPassword
                      size={size}
                      topLabel="static"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              form helper text
            </h4>
            <div className="rounded-xl bg-white p-4">
              <div className="grid gap-3">
                <FormHelperText>Helper text</FormHelperText>
                <FormHelperText color="disabled">Helper text</FormHelperText>
                <FormHelperText color="error">Helper text</FormHelperText>
                <FormHelperText color="warning">Helper text</FormHelperText>
              </div>
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              form control label
            </h4>
            <div className="rounded-xl bg-white p-4">
              <div className="flex flex-wrap gap-x-6 gap-y-5">
                <FormControlLabel size="md">Label</FormControlLabel>
                <FormControlLabel color="error" size="md">
                  Label
                </FormControlLabel>
                <FormControlLabel color="disabled" size="md">
                  Label
                </FormControlLabel>
                <FormControlLabel fontWeight="medium" size="md">
                  Label
                </FormControlLabel>
                <FormControlLabel color="error" fontWeight="medium" size="md">
                  Label
                </FormControlLabel>
                <FormControlLabel color="disabled" fontWeight="medium" size="md">
                  Label
                </FormControlLabel>
              </div>
            </div>
          </section>

          {sizes.map((size) => (
            <section key={size} className="grid gap-3">
              <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
                {size}
              </h4>
              <div className="flex flex-wrap items-center gap-5">
                {variants.map((variant) => (
                  <Button appearance="primary" key={variant} size={size} variant={variant}>
                    Label
                  </Button>
                ))}
                {variants.map((variant) => (
                  <Button appearance="primary"
                    aria-label={`${variant} icon button`}
                    iconOnly
                    key={`${variant}-icon`}
                    size={size}
                    variant={variant}
                  />
                ))}
                <Button appearance="primary" loading size={size} variant="contained">
                  Label
                </Button>
                <Button appearance="primary" disabled size={size} variant="contained">
                  Label
                </Button>
                <Button appearance="primary" disabled size={size} variant="outlined">
                  Label
                </Button>
              </div>
            </section>
          ))}

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              error
            </h4>
            <div className="flex flex-wrap items-center gap-5">
              {variants.map((variant) => (
                <Button appearance="destructive" key={variant} size="lg" variant={variant}>
                  Label
                </Button>
              ))}
              <Button appearance="destructive" loading size="lg" variant="contained">
                Label
              </Button>
              <Button appearance="destructive" disabled size="lg" variant="contained">
                Label
              </Button>
              <Button appearance="destructive" disabled size="lg" variant="outlined">
                Label
              </Button>
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              neutral
            </h4>
            <div className="flex flex-wrap items-center gap-5">
              {variants.map((variant) => (
                <Button appearance="secondary" key={variant} size="lg" variant={variant}>
                  Label
                </Button>
              ))}
              <Button appearance="secondary" loading size="lg" variant="contained">
                Label
              </Button>
              <Button appearance="secondary" disabled size="lg" variant="contained">
                Label
              </Button>
              <Button appearance="secondary" disabled size="lg" variant="outlined">
                Label
              </Button>
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              contrast
            </h4>
            <div className="flex flex-wrap items-center gap-5 rounded-xl bg-[#0b57ff] p-4 text-white">
              {variants.map((variant) => (
                <Button appearance="contrast" key={variant} size="lg" variant={variant}>
                  Label
                </Button>
              ))}
              <Button appearance="contrast" loading size="lg" variant="contained">
                Label
              </Button>
              <Button appearance="contrast" disabled size="lg" variant="contained">
                Label
              </Button>
              <Button appearance="contrast" disabled size="lg" variant="outlined">
                Label
              </Button>
            </div>
          </section>

          <section className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15px] text-muted-foreground">
              dark
            </h4>
            <div className="flex flex-wrap items-center gap-5 rounded-xl bg-[#0f0f0f] p-4 text-white">
              {variants.map((variant) => (
                <Button appearance="ghost"
                  key={variant}
                  size="lg"
                  variant={variant === "outlined" ? "outline" : variant}
                >
                  Label
                </Button>
              ))}
              <Button appearance="ghost" loading size="lg" variant="contained">
                Label
              </Button>
              <Button appearance="ghost" disabled size="lg" variant="contained">
                Label
              </Button>
              <Button appearance="ghost" disabled size="lg" variant="outline">
                Label
              </Button>
            </div>
          </section>
        </div>
      </section>
      </section>
    </main>
  )
}
