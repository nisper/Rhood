import * as React from "react";

import tokenDataJson from "@/data/generated/tokens.generated.json";
import styleIgnoreJson from "@/tmp/style-ignore.json";
import { Search } from "@/components/ui/search";
import { Segment } from "@/components/ui/segment";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { matchesSearchTerms } from "@/lib/utils";

type SizingToken = {
  alias: { collection: string; name: string } | null;
  collection: string;
  cssValue: string;
  cssVariable: string;
  name: string;
  resolvedValue: string | null;
};

type TokenData = {
  summary: { warnings: string[] };
  tokens: SizingToken[];
};

type StyleIgnore = {
  tokens: Array<{
    collection: string;
    name: string;
    reason?: string;
  }>;
};

const tokenData = tokenDataJson as TokenData;
const styleIgnore = styleIgnoreJson as StyleIgnore;
const sizingGroups = {
  component: "Component sizing",
  tailwind: "Tailwind",
  styleIgnore: "Style Ignore",
} as const;

type SizingGroup = keyof typeof sizingGroups;

const tailwindSpacingTokens = [
  ["0.5", "2 px", "calc(var(--spacing) * 0.5)"],
  ["1", "4 px", "calc(var(--spacing) * 1)"],
  ["1.5", "6 px", "calc(var(--spacing) * 1.5)"],
  ["2", "8 px", "calc(var(--spacing) * 2)"],
  ["2.5", "10 px", "calc(var(--spacing) * 2.5)"],
  ["3", "12 px", "calc(var(--spacing) * 3)"],
  ["3.5", "14 px", "calc(var(--spacing) * 3.5)"],
  ["4", "16 px", "calc(var(--spacing) * 4)"],
  ["5", "20 px", "calc(var(--spacing) * 5)"],
  ["6", "24 px", "calc(var(--spacing) * 6)"],
  ["8", "32 px", "calc(var(--spacing) * 8)"],
  ["10", "40 px", "calc(var(--spacing) * 10)"],
  ["12", "48 px", "calc(var(--spacing) * 12)"],
  ["16", "64 px", "calc(var(--spacing) * 16)"],
] as const;

export function TokenSizingExamples() {
  const [group, setGroup] = React.useState<SizingGroup>("component");
  const [query, setQuery] = React.useState("");
  const allTokens = tokenData.tokens.filter(
    (token) => token.collection === "sizing",
  );
  const tokens = allTokens.filter((token) => {
    const belongsToGroup =
      group === "component" && !token.name.startsWith("base module/");
    const searchableText = [
      token.name,
      token.cssValue,
      token.cssVariable,
      token.alias ? `${token.alias.collection}/${token.alias.name}` : "",
    ]
      .join(" ")
      .toLowerCase();
    return (
      belongsToGroup &&
      matchesSearchTerms(searchableText, query)
    );
  });
  const filteredTailwindTokens = tailwindSpacingTokens.filter((token) =>
    matchesSearchTerms(token.join(" "), query),
  );
  const filteredStyleIgnoreTokens = styleIgnore.tokens.filter((token) =>
    matchesSearchTerms(
      [token.collection, token.name, token.reason ?? ""].join(" "),
      query,
    ),
  );

  return (
    <section className="grid min-w-0 gap-4">
      <div>
        <h2 className="rh-typography-headline-4">Токены размеров</h2>
      </div>

      <div className="flex items-center gap-3">
        <SegmentedControl
          aria-label="Группа токенов размеров"
          color="neutral"
          onValueChange={(value) => setGroup(value as SizingGroup)}
          size="sm"
          value={group}
        >
          {(Object.keys(sizingGroups) as SizingGroup[]).map((item) => (
            <Segment key={item} value={item}>
              {sizingGroups[item]}
            </Segment>
          ))}
        </SegmentedControl>
        <Search
          aria-label="Название токена"
          className="min-w-0 flex-1"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Название токена"
          size="sm"
          value={query}
        />
      </div>

      {group === "tailwind" ? (
        <Table className="min-w-[760px] border border-[color:var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)]">
          <div
            className="flex border-b border-[color:var(--rh-theme-border-light)]"
            role="row"
          >
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width={180}
            >
              Tailwind token
            </TableCell>
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width={160}
            >
              Значение
            </TableCell>
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width="fill"
            >
              CSS-выражение / назначение
            </TableCell>
          </div>
          {filteredTailwindTokens.map(([token, value, usage]) => (
            <div
              className="flex border-b border-[color:var(--rh-theme-border-light)] last:border-b-0"
              key={token}
              role="row"
            >
              <TableCell custom role="body" type="text" width={180}>
                <code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-primary)]">
                  {token}
                </code>
              </TableCell>
              <TableCell custom role="body" type="text" width={160}>
                <code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-primary)]">
                  {value}
                </code>
              </TableCell>
              <TableCell custom role="body" type="text" width="fill">
                <code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-secondary)]">
                  {usage}
                </code>
              </TableCell>
            </div>
          ))}
        </Table>
      ) : group === "styleIgnore" ? (
        <Table className="min-w-[760px] border border-[color:var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)]">
          <div
            className="flex border-b border-[color:var(--rh-theme-border-light)]"
            role="row"
          >
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width={220}
            >
              Collection
            </TableCell>
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width={300}
            >
              Token
            </TableCell>
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width="fill"
            >
              Причина
            </TableCell>
          </div>
          {filteredStyleIgnoreTokens.map((token) => (
            <div
              className="flex border-b border-[color:var(--rh-theme-border-light)] last:border-b-0"
              key={`${token.collection}/${token.name}`}
              role="row"
            >
              <TableCell custom role="body" type="text" width={220}>
                <code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-primary)]">
                  {token.collection}
                </code>
              </TableCell>
              <TableCell custom role="body" type="text" width={300}>
                <code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-primary)]">
                  {token.name}
                </code>
              </TableCell>
              <TableCell custom role="body" type="text" width="fill">
                {token.reason ?? "—"}
              </TableCell>
            </div>
          ))}
        </Table>
      ) : (
        <Table className="min-w-[760px] border border-[color:var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)]">
          <div
            className="flex border-b border-[color:var(--rh-theme-border-light)]"
            role="row"
          >
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width={"fill"}
            >
              CSS variable
            </TableCell>
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width={150}
            >
              Итоговое значение
            </TableCell>
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width={250}
            >
              CSS value
            </TableCell>
          </div>
          {tokens.map((token) => (
            <div
              className="flex border-b border-[color:var(--rh-theme-border-light)] last:border-b-0"
              key={`${token.collection}/${token.name}`}
              role="row"
            >
              <TableCell custom role="body" type="text" width="fill">
                <code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-primary)]">
                  {token.cssVariable}
                </code>
              </TableCell>
              <TableCell custom role="body" type="text" width={150}>
                <code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-primary)]">
                  {token.resolvedValue ?? "—"}
                </code>
              </TableCell>
              <TableCell custom role="body" type="text" width={250}>
                <code className="font-mono text-sm leading-5 text-[color:var(--rh-theme-text-neutral-primary)]">
                  {token.cssValue}
                </code>
              </TableCell>
            </div>
          ))}
        </Table>
      )}
      <p className="rh-typography-body-1">
        {group === "tailwind" &&
          "Базовая шкала, на которую позже будут ссылаться компоненты RHOOD."}
        {group === "component" && `${allTokens.length} токенов из sizing.json`}
        {group === "styleIgnore" &&
          "Токены из Figma, которые не попадают в приложение."}
      </p>
      {tokenData.summary.warnings.length > 0 && (
        <p className="text-sm leading-5 text-[color:var(--rh-theme-text-error)]">
          Проверь JSON: {tokenData.summary.warnings.join("; ")}
        </p>
      )}
    </section>
  );
}
