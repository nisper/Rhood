import * as React from "react";
import { createPortal } from "react-dom";
import { Copy, MessageSquareText, MoreHorizontal, Phone, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { ButtonFavorite } from "@/components/ui/button-favorite";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { Menu } from "@/components/ui/menu";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
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
  | "id"
  | "actions";

type ObjectRowPriceColor = ObjectPriceColor;

type ObjectRowProps = {
  children?: React.ReactNode;
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
  showActions?: boolean;
  commentsCount?: number;
  onCommentsClick?: () => void;
};

const CALL_COLUMN_WIDTH = 56;
const BUYER_COLUMN_WIDTH = 55;
const PUBLISHED_AT_COLUMN_WIDTH = 160;

function ObjectRow({
  children,
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
  showActions = false,
  commentsCount,
  onCommentsClick,
}: ObjectRowProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isDuplicate, setIsDuplicate] = React.useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = React.useState(false);
  const [actionsMenuPosition, setActionsMenuPosition] = React.useState<{ top: number; right: number } | null>(null);
  const actionsTriggerRef = React.useRef<HTMLButtonElement>(null);
  const actionsMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isActionsMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (actionsTriggerRef.current?.contains(target) || actionsMenuRef.current?.contains(target)) return;
      setIsActionsMenuOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsActionsMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActionsMenuOpen]);

  function toggleActionsMenu() {
    if (isActionsMenuOpen) {
      setIsActionsMenuOpen(false);
      return;
    }

    const rect = actionsTriggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setActionsMenuPosition({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    setIsActionsMenuOpen(true);
  }

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

      <TableCell buttonSize="xsm" column="call" custom role="body" compact type="button" verticalAlign="top" width={CALL_COLUMN_WIDTH}>
        <div className="grid">
          <IconButton
            appearance="contrast"
            aria-label="Позвонить"
            className="col-start-1 row-start-1 justify-self-center"
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
      {showActions && (
        <TableCell column="actions" custom role="body" compact type="button" width={118}>
          <ButtonFavorite
            aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
            checked={isFavorite}
            iconOnly
            onClick={(event) => {
              event.stopPropagation();
              setIsFavorite((value) => !value);
            }}
            size="xsm"
          />
          <IconButton
            aria-label={commentsCount === undefined ? "Посмотреть комментарии" : `Посмотреть комментарии: ${commentsCount}`}
            appearance="contrast"
            counter={commentsCount !== undefined}
            counterValue={commentsCount}
            className="p-[var(--spacing)]"
            icon={<MessageSquareText aria-hidden="true" />}
            onClick={(event) => {
              event.stopPropagation();
              onCommentsClick?.();
            }}
            size="xsm"
          />
          <IconButton
            aria-expanded={isActionsMenuOpen}
            aria-haspopup="menu"
            aria-label="Дополнительные действия"
            appearance="contrast"
            className="p-[var(--spacing)]"
            icon={<MoreHorizontal aria-hidden="true" />}
            onClick={(event) => {
              event.stopPropagation();
              toggleActionsMenu();
            }}
            ref={actionsTriggerRef}
            size="xsm"
          />
          {isActionsMenuOpen && actionsMenuPosition && createPortal(
            <Menu
              align="right"
              aria-label="Действия с объектом"
              className="fixed z-50"
              ref={actionsMenuRef}
              role="menu"
              style={actionsMenuPosition}
            >
              <MenuItemSingleSelect
                icon={<Copy aria-hidden="true" className="size-5" />}
                onClick={() => {
                  void navigator.clipboard?.writeText(id);
                  setIsActionsMenuOpen(false);
                }}
                role="menuitem"
                rightSlot={false}
                secondaryText={false}
                selected={false}
              >
                Скопировать код
              </MenuItemSingleSelect>
              <MenuItemSingleSelect
                icon={<TriangleAlert aria-hidden="true" className="size-5" />}
                onClick={() => {
                  setIsDuplicate((value) => !value);
                  setIsActionsMenuOpen(false);
                }}
                role="menuitem"
                rightSlot={false}
                secondaryText={false}
                selected={false}
              >
                {isDuplicate ? "Убрать отметку дубля" : "Дубль"}
              </MenuItemSingleSelect>
            </Menu>,
            document.body,
          )}
        </TableCell>
      )}
      {children}
      </TableRow>
  );
}

export { ObjectRow };
export type { ObjectRowColumn, ObjectRowPriceColor, ObjectRowProps };
