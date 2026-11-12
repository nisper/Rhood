import * as React from "react";
import { createPortal } from "react-dom";
import { CircleUser, Copy, MessageSquareText, MoreHorizontal, Phone, TriangleAlert } from "lucide-react";

import { ButtonFavorite } from "@/components/ui/button-favorite";
import { IconButton } from "@/components/ui/icon-button";
import { Menu } from "@/components/ui/menu";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { ObjectRow } from "@/components/ui/object-row";
import { Segment } from "@/components/ui/segment";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { TableRow } from "@/components/ui/table-row";

const columns = [
  { key: "selection", alignment: "left" as const },
  { key: "address", alignment: "left" as const },
  { key: "buyer", alignment: "right" as const },
  { key: "call", alignment: "center" as const },
  { key: "price", alignment: "right" as const },
  { key: "liquidity", alignment: "left" as const },
  { key: "source", alignment: "left" as const },
  { key: "publishedAt", alignment: "left" as const },
  { key: "status", alignment: "left" as const },
  { key: "defaultText", alignment: "left" as const },
];

const demoListings = [
  {
    propertyType: "Квартиры",
    id: "object-row-apartment",
    specs: "2 ком., 58,4 м², этаж 7/16",
    address: "Тюмень, улица Мельникайте, 144",
    buyerCount: 12,
    price: 9_850_000,
    pricePerArea: 168_664,
    liquidity: "Оцениваем",
    source: "Авито",
    sourceHref: "https://www.avito.ru/",
    author: "Частное лицо",
    publishedAt: "02.11.2026, 14:30",
    status: "Еще не звонили из Rhood",
  },
  {
    propertyType: "Дома",
    id: "object-row-house",
    specs: "Дом, 126,8 м², участок 8,5 сот.",
    address: "Тюменский район, деревня Патрушева",
    buyerCount: 4,
    price: 12_400_000,
    pricePerArea: 97_792,
    liquidity: "Высокая",
    source: "Циан",
    sourceHref: "https://www.cian.ru/",
    author: "Агентство недвижимости",
    publishedAt: "01.11.2026, 12:10",
    status: "В работе",
  },
  {
    propertyType: "Участки",
    id: "object-row-land",
    specs: "Участок, 9,6 сот.",
    address: "Тюмень, район Комарово",
    buyerCount: 2,
    price: 4_800_000,
    pricePerArea: 500_000,
    liquidity: "Оцениваем",
    source: "Авито",
    sourceHref: "https://www.avito.ru/",
    author: "Частное лицо",
    publishedAt: "30.10.2026, 09:45",
    status: "Еще не звонили из Rhood",
  },
];
const priceColorVariants = ["neutral", "success", "error"] as const;

function RowActions({ id }: { id: string }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState<{ top: number; right: number } | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setIsMenuOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      return;
    }

    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMenuPosition({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    setIsMenuOpen(true);
  }

  return (
    <TableCell buttonSize="xsm" column="defaultText" compact role="body" type="button" width={118}>
      <ButtonFavorite aria-label="Добавить в избранное" size="xsm" />
      <IconButton aria-label="Комментарии" appearance="contrast" icon={<MessageSquareText aria-hidden="true" />} size="xsm" />
      <IconButton
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        aria-label="Дополнительные действия"
        appearance="contrast"
        icon={<MoreHorizontal aria-hidden="true" />}
        onClick={toggleMenu}
        ref={triggerRef}
        size="xsm"
      />
      {isMenuOpen && menuPosition && createPortal(
        <Menu
          align="right"
          aria-label="Действия с объектом"
          className="fixed z-50"
          ref={menuRef}
          role="menu"
          style={menuPosition}
        >
          <MenuItemSingleSelect
            icon={<Copy aria-hidden="true" className="size-5" />}
            onClick={() => {
              void navigator.clipboard?.writeText(id);
              setIsMenuOpen(false);
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
            onClick={() => setIsMenuOpen(false)}
            role="menuitem"
            rightSlot={false}
            secondaryText={false}
            selected={false}
          >
            Дубль
          </MenuItemSingleSelect>
        </Menu>,
        document.body,
      )}
    </TableCell>
  );
}

export function ObjectRowExamples() {
  const [propertyType, setPropertyType] = React.useState<(typeof demoListings)[number]["propertyType"]>("Квартиры");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const activeListing = demoListings.find((listing) => listing.propertyType === propertyType)!;

  return (
    <div className="min-w-0">
      <SegmentedControl
        aria-label="Тип недвижимости"
        className="mb-4"
        onValueChange={(value) => {
          if (typeof value === "string") setPropertyType(value as typeof propertyType);
        }}
        value={propertyType}
      >
        <Segment value="Квартиры">Квартиры</Segment>
        <Segment value="Дома">Дома</Segment>
        <Segment value="Участки">Участки</Segment>
      </SegmentedControl>
      <Table
        bordered
        columns={columns}
        minWidth={1600}
        selection={{
          rowIds: priceColorVariants.map((priceColor) => `${activeListing.id}-${priceColor}`),
          selectedIds,
          onSelectedIdsChange: setSelectedIds,
        }}
        verticalBorders
      >
        <TableRow>
          <TableCell column="selection" paddingX role="head" compact type="checkbox" width={36} />
          <TableCell className="min-w-[300px]" column="address" helpIcon={false} role="head" compact sort={false} type="text" width="fill">
            Адрес
          </TableCell>
          <TableCell column="buyer" aria-label="Покупатели" helpTooltip="Покупатели с точным совпадением потребности под этот объект в Космосе" role="head" compact sort={false} type="number" width={55}>
            <CircleUser aria-hidden="true" className="size-5" />
          </TableCell>
          <TableCell column="call" aria-label="Позвонить" helpTooltip="Звонок будет совершен из Rhood, мы его запишем и расшифруем" role="head" compact sort={false} type="text" width={56}>
            <Phone aria-hidden="true" className="size-5" />
          </TableCell>
          <TableCell column="price" helpIcon={false} role="head" compact sort={false} type="number" width={128}>
            <>Цена, ₽<br />{propertyType === "Участки" ? "Цена, ₽/сот." : "Цена, ₽/м²"}</>
          </TableCell>
          <TableCell column="liquidity" helpIcon={false} role="head" compact sort={false} type="text" width={152}>
            Ликвидность
          </TableCell>
          <TableCell column="source" helpIcon={false} role="head" compact sort={false} type="text" width={190}>
            Источник
          </TableCell>
          <TableCell column="publishedAt" helpIcon={false} role="head" compact sort={false} type="text" width={160}>
            Опубликован
          </TableCell>
          <TableCell column="status" helpIcon={false} role="head" compact sort={false} type="text" width={236}>
            Статус
          </TableCell>
          <TableCell column="defaultText" helpIcon={false} role="head" compact sort={false} type="text" width={118}>
            Действия
          </TableCell>
        </TableRow>
        {priceColorVariants.map((priceColor) => (
          <ObjectRow
            key={priceColor}
            id={`${activeListing.id}-${priceColor}`}
            specs={activeListing.specs}
            address={activeListing.address}
            buyerCount={activeListing.buyerCount}
            price={activeListing.price}
            pricePerArea={activeListing.pricePerArea}
            priceColor={priceColor}
            priceHistory={priceColor === "success"
              ? [
                  { createdAt: "2026-11-02T10:00:00.000Z", price: activeListing.price },
                  { createdAt: "2026-10-28T10:00:00.000Z", price: activeListing.price - 200_000 },
                ]
              : priceColor === "error"
                ? [
                    { createdAt: "2026-11-02T10:00:00.000Z", price: activeListing.price },
                    { createdAt: "2026-10-28T10:00:00.000Z", price: activeListing.price + 200_000 },
                  ]
                : []}
            liquidity={activeListing.liquidity}
            source={activeListing.source}
            sourceHref={activeListing.sourceHref}
            author={activeListing.author}
            publishedAt={activeListing.publishedAt}
            status={activeListing.status}
            onOpen={() => undefined}
          >
            <RowActions id={activeListing.id} />
          </ObjectRow>
        ))}
      </Table>
      <div className="mb-3 mt-10 grid gap-1">
        <h2 className="rh-typography-h4">Состояния</h2>
        <p className="rh-typography-b1">Наведись на строку, чтобы увидеть hover. Выбранная строка подсвечена, просмотренная отмечена в данных объекта.</p>
      </div>
      <Table bordered columns={columns} minWidth={1600} selection={{
        rowIds: ["listing-state-default", "listing-state-hover", "listing-state-selected", "listing-state-viewed"],
        selectedIds: ["listing-state-selected"],
        onSelectedIdsChange: () => undefined,
      }} verticalBorders>
              <TableRow>
                <TableCell column="selection" paddingX role="head" compact type="checkbox" width={36} />
                <TableCell className="min-w-[300px]" column="address" helpIcon={false} role="head" compact sort={false} type="text" width="fill">Адрес</TableCell>
                <TableCell column="buyer" aria-label="Покупатели" role="head" compact sort={false} type="number" width={55}><CircleUser aria-hidden="true" className="size-5" /></TableCell>
                <TableCell column="call" aria-label="Позвонить" role="head" compact sort={false} type="text" width={56}><Phone aria-hidden="true" className="size-5" /></TableCell>
                <TableCell column="price" helpIcon={false} role="head" compact sort={false} type="number" width={128}>Цена, ₽</TableCell>
                <TableCell column="liquidity" helpIcon={false} role="head" compact sort={false} type="text" width={152}>Ликвидность</TableCell>
                <TableCell column="source" helpIcon={false} role="head" compact sort={false} type="text" width={190}>Источник</TableCell>
                <TableCell column="publishedAt" helpIcon={false} role="head" compact sort={false} type="text" width={160}>Опубликован</TableCell>
                <TableCell column="status" helpIcon={false} role="head" compact sort={false} type="text" width={236}>Статус</TableCell>
                <TableCell column="defaultText" helpIcon={false} role="head" compact sort={false} type="text" width={118}>Действия</TableCell>
              </TableRow>
              {([
                { id: "listing-state-default" },
                { id: "listing-state-hover" },
                { id: "listing-state-selected", selected: true },
                { id: "listing-state-viewed", viewed: true },
              ]).map(({ id, selected, viewed }) => (
                <ObjectRow
                  key={id}
                  id={id}
                  specs={activeListing.specs}
                  address={activeListing.address}
                  buyerCount={activeListing.buyerCount}
                  price={activeListing.price}
                  pricePerArea={activeListing.pricePerArea}
                  liquidity={activeListing.liquidity}
                  source={activeListing.source}
                  sourceHref={activeListing.sourceHref}
                  author={activeListing.author}
                  publishedAt={activeListing.publishedAt}
                  status={activeListing.status}
                  onOpen={() => undefined}
                  selected={selected}
                  viewed={viewed}
                >
                  <RowActions id={id} />
                </ObjectRow>
              ))}
      </Table>
      <p className="mt-2 font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]">
        Строки сверху вниз: дефолт · ховер · выбран · просмотрен
      </p>
    </div>
  );
}
