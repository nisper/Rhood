import * as React from "react";
import { CheckCircle2, MessageSquareText, TriangleAlert, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonFavorite as FavoriteButton } from "@/components/ui/button-favorite";
import { PriceWithTrend } from "@/components/ui/price-with-trend";
import { cn } from "@/lib/utils";

type ObjectCardProps = React.ComponentProps<"article"> & {
  image?: string;
  imageAlt?: string;
  favorite?: boolean;
  notForClient?: boolean;
  pictures?: boolean;
  subway?: boolean;
  footer?: React.ReactNode;
  onDetailsClick?: () => void;
  onCommentsClick?: () => void;
  onReportClick?: () => void;
  price?: string;
  pricePerM2?: string;
  details?: string;
  address?: string;
  source?: string;
  author?: string;
  publishedAt?: string;
  sourceHref?: string;
};

const showcaseImage = "/Rhood/assets/object-gallery-2.png";

function renderTabularNumber(value: string) {
  const match = value.match(/^([\d][\d\s.,]*\d|[\d])(.*)$/u);

  if (!match) {
    return value;
  }

  return <><span className="tabular-nums">{match[1]}</span>{match[2]}</>;
}

function ObjectCard({
  className,
  image = showcaseImage,
  imageAlt = "Интерьер квартиры",
  favorite = true,
  notForClient = true,
  pictures = true,
  subway = true,
  footer,
  onDetailsClick,
  onCommentsClick,
  onReportClick,
  price = "140 000 000 ₽",
  pricePerM2 = "88 000 ₽/м²",
  details = "2 ком, 44 м², этаж 5/16",
  address = "Москва СЗАО р-н Южное Тушино м. Сходненская Сходненская улица 14",
  source = "Яндекс.Недвижимость",
  author = "Агентство недвижимости «СОВА»",
  publishedAt = "Опубликован: 17.08.2023, 17:00:58",
  sourceHref = "https://realty.yandex.ru",
  ...props
}: ObjectCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  return (
    <article
      className={cn(
        "grid w-[260px] shrink-0 content-start rounded-[20px] bg-[var(--rh-theme-surface-bg)] text-[var(--rh-theme-text-neutral-primary)]",
        className,
      )}
      {...props}
    >
      {pictures && (
        <div className="relative h-[200px] w-full overflow-hidden rounded-[var(--rh-sizing-border-radius-lg)] border border-[var(--rh-theme-border-light)]">
          <img alt={imageAlt} className="size-full object-cover" src={image} />
          {favorite && (
            <div className="absolute right-2 top-2">
              <FavoriteButton
                aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                checked={isFavorite}
                onCheckedChange={setIsFavorite}
                size="sm"
              />
            </div>
          )}
        </div>
      )}

      {notForClient && (
        <div className="flex flex-wrap items-start gap-1 pb-1 pt-2" aria-label="Статусы объекта">
          <span className="flex items-center rounded-[var(--rh-sizing-border-radius-sm)] bg-[var(--rh-theme-fill-neutral)] px-[3px] text-[var(--rh-theme-icon-neutral-primary)]" aria-label="Продавец не указан"><UserRound aria-hidden="true" className="size-5" /></span>
          <span className="flex items-center rounded-[var(--rh-sizing-border-radius-sm)] bg-[var(--rh-theme-fill-success-light)] px-[3px] text-[var(--rh-theme-icon-success)]" aria-label="Объект уникальный"><CheckCircle2 aria-hidden="true" className="size-5" /></span>
          <span className="rounded-[var(--rh-sizing-border-radius-sm)] bg-[var(--rh-theme-fill-success-light)] px-1 text-[14px] leading-5 text-[var(--rh-theme-text-success)]">Высокая ликвидность</span>
          <span className="rounded-[var(--rh-sizing-border-radius-sm)] bg-[var(--rh-theme-fill-neutral)] px-1 text-[14px] leading-5">Еще не звонили из Rhood</span>
        </div>
      )}

      <div className="grid justify-start pt-2">
        <PriceWithTrend price={price} />
        <p className="text-base leading-6">{renderTabularNumber(pricePerM2)}</p>
      </div>

      <div className="py-2 text-base leading-6">{details}</div>

      <div className="grid gap-2 pb-1 text-[14px] leading-5">
        <p>{address}</p>
        {subway && <p className="flex items-start gap-1"><span aria-hidden="true" className="mt-1 size-3 shrink-0 rounded-full bg-[var(--rh-theme-text-error)]" /><span>Университет дружбы народов</span></p>}
      </div>

      {notForClient && (
        <>
          <div className="grid py-1 text-[14px] leading-5">
            <a className="cursor-pointer text-[var(--rh-theme-text-link)] underline" href={sourceHref}>{source}</a>
            <span className="truncate text-[var(--rh-theme-text-neutral-secondary)]">{author}</span>
          </div>
          <p className="text-[14px] leading-5 text-[var(--rh-theme-text-neutral-secondary)]">{publishedAt}</p>
        </>
      )}

      {(footer ?? <div className="flex items-end gap-1 pt-3">
        <Button appearance="default" className="min-w-0 flex-1" onClick={onDetailsClick} size="sm" startIcon={false} endIcon={false}>Подробнее</Button>
        <IconButton aria-label="Комментарии к объекту" appearance="secondary" icon={<MessageSquareText aria-hidden="true" />} onClick={onCommentsClick} size="sm" />
        <IconButton aria-label="Пожаловаться на объект" appearance="secondary" icon={<TriangleAlert aria-hidden="true" />} onClick={onReportClick} size="sm" />
      </div>)}
    </article>
  );
}

export { ObjectCard };
export type { ObjectCardProps };
