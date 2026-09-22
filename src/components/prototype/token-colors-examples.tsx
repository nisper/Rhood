import * as React from "react"

import tokenDataJson from "@/data/generated/tokens.generated.json"
import { Search } from "@/components/ui/search"
import { Segment } from "@/components/ui/segment"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

type TokenCollection = "palette" | "theme"

type ColorToken = {
  alias: { collection: string; name: string; source: "dtcg" | "figma" } | null
  collection: TokenCollection
  cssVariable: string
  name: string
  resolvedValue: string | null
  type: string
}

type TokenData = {
  summary: {
    aliases: number
    byCollection: Record<TokenCollection, number>
    total: number
    warnings: string[]
  }
  tokens: ColorToken[]
}

const tokenData = tokenDataJson as TokenData
const collectionLabels: Record<TokenCollection, string> = {
  palette: "Palette",
  theme: "Theme",
}

export function TokenColorsExamples() {
  const [collection, setCollection] = React.useState<TokenCollection>("palette")
  const [query, setQuery] = React.useState("")
  const normalizedQuery = query.trim().toLowerCase()
  const tokens = tokenData.tokens.filter((token) => {
    const searchableText = [token.name, token.cssVariable, token.resolvedValue ?? "", token.alias ? `${token.alias.collection}/${token.alias.name}` : ""].join(" ").toLowerCase()
    return token.type === "color" && token.collection === collection && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })

  return (
    <div className="grid min-w-0 gap-8">
      <section className="grid gap-4">
        <div>
          <div>
            <h2 className="rh-typography-headline-4">Цветовые токены</h2>
            <p className="text-sm leading-5 text-[color:var(--rh-theme-text-neutral-secondary)]">{tokens.length} токенов в выбранной коллекции</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SegmentedControl aria-label="Коллекция токенов" color="neutral" onValueChange={(value) => setCollection(value as TokenCollection)} size="sm" value={collection}>
            {(Object.keys(collectionLabels) as TokenCollection[]).map((item) => <Segment key={item} value={item}>{collectionLabels[item]}</Segment>)}
          </SegmentedControl>
          <Search aria-label="Поиск цветового токена" className="min-w-0 flex-1" onChange={(event) => setQuery(event.target.value)} placeholder="Поиск токена" size="sm" value={query} />
        </div>

        <Table className="min-w-[940px] border border-[color:var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)]">
          <div className="flex border-b border-[color:var(--rh-theme-border-light)]" role="row">
            <TableCell helpIcon={false} role="head" sort={false} type="text" width={72}>Цвет</TableCell>
            <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">CSS variable</TableCell>
            <TableCell helpIcon={false} role="head" sort={false} type="text" width={180}>Итоговое значение</TableCell>
            <TableCell helpIcon={false} role="head" sort={false} type="text" width={220}>Alias</TableCell>
          </div>
          {tokens.map((token) => <div className="flex border-b border-[color:var(--rh-theme-border-light)] last:border-b-0" key={`${token.collection}/${token.name}`} role="row">
            <TableCell custom role="body" type="text" width={72}><span aria-label={token.resolvedValue ?? token.name} className="block size-8 rounded border border-black/10" style={{ backgroundColor: token.resolvedValue ?? "transparent" }} /></TableCell>
            <TableCell custom role="body" type="text" width="fill"><code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-secondary)]">{token.cssVariable}</code></TableCell>
            <TableCell custom role="body" type="text" width={180}><code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-primary)]">{token.resolvedValue ?? "—"}</code></TableCell>
            <TableCell custom role="body" type="text" width={220}><code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-secondary)]">{token.alias ? `${token.alias.collection}/${token.alias.name}` : "—"}</code></TableCell>
          </div>)}
        </Table>
        {tokenData.summary.warnings.length > 0 && <p className="text-sm leading-5 text-[color:var(--rh-theme-text-error)]">Проверь JSON: {tokenData.summary.warnings.join("; ")}</p>}
      </section>
    </div>
  )
}
