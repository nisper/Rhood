import * as React from "react"

import tokenDataJson from "@/data/generated/tokens.generated.json"
import { Search } from "@/components/ui/search"
import { Segment } from "@/components/ui/segment"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

type SizingToken = {
  alias: { collection: string; name: string } | null
  collection: string
  cssVariable: string
  name: string
  resolvedValue: string | null
}

type TokenData = {
  summary: { warnings: string[] }
  tokens: SizingToken[]
}

const tokenData = tokenDataJson as TokenData
const sizingGroups = {
  base: "Base module",
  component: "Component sizing",
} as const

type SizingGroup = keyof typeof sizingGroups

export function TokenSizingExamples() {
  const [group, setGroup] = React.useState<SizingGroup>("base")
  const [query, setQuery] = React.useState("")
  const allTokens = tokenData.tokens.filter((token) => token.collection === "sizing")
  const normalizedQuery = query.trim().toLowerCase()
  const tokens = allTokens.filter((token) => {
    const belongsToGroup = group === "base" ? token.name.startsWith("base module/") : !token.name.startsWith("base module/")
    const searchableText = [token.name, token.cssVariable, token.alias ? `${token.alias.collection}/${token.alias.name}` : ""].join(" ").toLowerCase()
    return belongsToGroup && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })

  return (
    <section className="grid min-w-0 gap-4">
      <div>
        <h2 className="text-xl font-semibold leading-7">Токены размеров</h2>
        <p className="text-sm leading-5 text-[color:var(--rh-theme-text-neutral-secondary)]">{allTokens.length} токенов из sizing.json</p>
      </div>

      <div className="flex items-center gap-3">
        <SegmentedControl aria-label="Группа токенов размеров" color="neutral" onValueChange={(value) => setGroup(value as SizingGroup)} size="sm" value={group}>
          {(Object.keys(sizingGroups) as SizingGroup[]).map((item) => <Segment key={item} value={item}>{sizingGroups[item]}</Segment>)}
        </SegmentedControl>
        <Search aria-label="Название токена" className="min-w-0 flex-1" onChange={(event) => setQuery(event.target.value)} placeholder="Название токена" size="sm" value={query} />
      </div>

      <Table className="min-w-[760px] border border-[color:var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)]">
        <div className="flex border-b border-[color:var(--rh-theme-border-light)]" role="row">
          <TableCell helpIcon={false} role="head" sort={false} type="text" width={230}>Figma token</TableCell>
          <TableCell helpIcon={false} role="head" sort={false} type="text" width={150}>Итоговое значение</TableCell>
          <TableCell helpIcon={false} role="head" sort={false} type="text" width={220}>Alias</TableCell>
          <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">CSS variable</TableCell>
        </div>
        {tokens.map((token) => <div className="flex border-b border-[color:var(--rh-theme-border-light)] last:border-b-0" key={`${token.collection}/${token.name}`} role="row">
          <TableCell custom role="body" type="text" width={230}><code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-primary)]">{token.name}</code></TableCell>
          <TableCell custom role="body" type="text" width={150}><code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-primary)]">{token.resolvedValue ?? "—"}</code></TableCell>
          <TableCell custom role="body" type="text" width={220}><code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-secondary)]">{token.alias ? `${token.alias.collection}/${token.alias.name}` : "—"}</code></TableCell>
          <TableCell custom role="body" type="text" width="fill"><code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-secondary)]">{token.cssVariable}</code></TableCell>
        </div>)}
      </Table>
      {tokenData.summary.warnings.length > 0 && <p className="text-sm leading-5 text-[color:var(--rh-theme-text-error)]">Проверь JSON: {tokenData.summary.warnings.join("; ")}</p>}
    </section>
  )
}
