import { Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { ObjectPriceCell, type ObjectPriceColor } from "@/components/ui/object-price-cell";
import type { PriceHistoryEntry } from "@/components/ui/price-history";
import { TableCell } from "@/components/ui/table-cell";
import { TableRow } from "@/components/ui/table-row";

type ObjectRowColumn =
  | "address"
  | "rooms"
  | "area"
  | "landArea"
  | "floor"
  | "buyer"
  | "call"
  | "price"
  | "pricePerM2"
  | "pricePerSotka"
  | "liquidity"
  | "source"
  | "author"
  | "publishedAt"
  | "actualizedAt"
  | "status"
  | "duplicates"
  | "savedAt"
  | "crmStatus"
  | "id";

type ObjectRowPriceColor = ObjectPriceColor;

type ObjectRowProps = {
  id: string;
  specs: string;
  address: string;
  buyerCount: number;
  price: number;
  pricePerArea: number;
  priceColor?: ObjectRowPriceColor;
  priceHistory?: readonly PriceHistoryEntry[];
  liquidity: string;
  source: string;
  sourceHref: string;
  author: string;
  publishedAt: string;
  status: string;
  selected?: boolean;
  viewed?: boolean;
  hiddenColumns?: ReadonlySet<ObjectRowColumn>;
  onOpen?: () => void;
  onCall?: () => void;
};

const CALL_COLUMN_WIDTH = 56;
const BUYER_COLUMN_WIDTH = 55;
const PUBLISHED_AT_COLUMN_WIDTH = 160;

function ObjectRow({
  id,
  specs,
  address,
  buyerCount,
  price,
  pricePerArea,
  priceColor = "neutral",
  priceHistory = [],
  liquidity,
  source,
  sourceHref,
  author,
  publishedAt,
  status,
  selected = false,
  viewed = false,
  hiddenColumns = new Set(),
  onOpen,
  onCall,
}: ObjectRowProps) {
  return (
      <TableRow
        aria-selected={selected || undefined}
        className={selected ? "bg-[var(--rh-theme-fill-brand-selected)] hover:bg-[var(--rh-theme-surface-neutral-hover)]" : undefined}
        hover={Boolean(onOpen)}
        onClick={onOpen}
      >
      <TableCell
        column="selection"
        onClick={(event) => event.stopPropagation()}
        paddingX
        role="body"
        rowId={id}
        compact
        type="checkbox"
        width={36}
      />

      <TableCell
        className="min-w-[300px]"
        column="address"
        custom
        role="body"
        compact
        type="text"
        width="fill"
      >
        <div className="flex min-h-5 flex-col text-sm leading-5 tracking-[0.17px]">
          <div className="flex min-h-5 items-center gap-2">
            <Link
              href="#object-info"
              onClick={(event) => {
                event.stopPropagation();
                if (onOpen) {
                  event.preventDefault();
                  onOpen();
                }
              }}
              className={viewed ? "text-[var(--rh-theme-text-neutral-primary)]" : undefined}
              size="b2"
            >
              {specs}
            </Link>
            {viewed && <Badge appearance="muted" className="shrink-0" color="neutral">Просмотрен</Badge>}
          </div>
          <p className={viewed ? "text-[var(--rh-theme-text-neutral-secondary)]" : "text-[var(--parser-text-neutral-primary)]"}>{address}</p>
        </div>
      </TableCell>

      {!hiddenColumns.has("buyer") && (
        <TableCell column="buyer" custom role="body" compact type="number" width={BUYER_COLUMN_WIDTH}>
          <p className="w-full rh-typography-b2-mono text-right">{buyerCount}</p>
        </TableCell>
      )}

      <TableCell buttonPadding="var(--spacing)" buttonSize="xsm" column="call" custom role="body" compact type="button" verticalAlign="top" width={CALL_COLUMN_WIDTH}>
        <div className="grid">
          <IconButton
            appearance="contrast"
            aria-label="Позвонить"
            className="col-start-1 row-start-1 justify-self-center p-[var(--spacing)]"
            icon={<Phone aria-hidden="true" strokeWidth={2} />}
            onClick={(event) => {
              event.stopPropagation();
              onCall?.();
            }}
            size="xsm"
          />
        </div>
      </TableCell>

      {!hiddenColumns.has("price") && (
        <ObjectPriceCell
          price={price}
          priceColor={priceColor}
          priceHistory={priceHistory}
          pricePerArea={pricePerArea}
        />
      )}

      {!hiddenColumns.has("liquidity") && (
        <TableCell column="liquidity" custom role="body" compact type="chip" width={152}>
          <Chip appearance="muted" className="self-start" color="neutral" icon={false} propDelete={false} size="sm">
            {liquidity}
          </Chip>
        </TableCell>
      )}

      {!hiddenColumns.has("source") && (
        <TableCell column="source" custom role="body" compact type="text" width={190}>
          <div className="flex min-h-5 min-w-0 flex-col text-sm leading-5 tracking-[0.17px]">
            <Link href={sourceHref} onClick={(event) => event.stopPropagation()} rel="noreferrer" size="b2" target="_blank">
              {source}
            </Link>
            <p className="truncate text-[var(--parser-text-neutral-secondary)]" title={author}>{author}</p>
          </div>
        </TableCell>
      )}

      {!hiddenColumns.has("publishedAt") && (
        <TableCell className="tabular-nums" column="publishedAt" custom role="body" compact type="text" width={PUBLISHED_AT_COLUMN_WIDTH}>
          <p className="whitespace-nowrap text-sm leading-5 tracking-[0.17px]">{publishedAt}</p>
        </TableCell>
      )}

      {!hiddenColumns.has("status") && (
        <TableCell column="status" custom role="body" compact type="chip" width={236}>
          <Chip appearance="muted" className="self-start" color="neutral" icon={false} propDelete={false} size="sm">
            {status}
          </Chip>
        </TableCell>
      )}
      </TableRow>
  );
}

export { ObjectRow };
export type { ObjectRowColumn, ObjectRowPriceColor, ObjectRowProps };
