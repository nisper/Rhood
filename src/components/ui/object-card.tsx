import * as React from "react";
import { CheckCircle2, MessageSquareText, Train, TriangleAlert, UserRound, TrendingDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonFavorite as FavoriteButton } from "@/components/ui/button-favorite";
import { cn } from "@/lib/utils";

type ObjectCardProps = React.ComponentProps<"article"> & {
  image?: string;
  imageAlt?: string;
  favorite?: boolean;
  notForClient?: boolean;
  pictures?: boolean;
  state?: "default" | "hovered";
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

function ObjectCard({
  className,
  image = showcaseImage,
  imageAlt = "Интерьер квартиры",
  favorite = true,
  notForClient = true,
  pictures = true,
  state = "default",
  subway = true,
  footer,
  onDetailsClick,
  onCommentsClick,
  onReportClick,
  price = "140 000 000 ₽",
  pricePerM2 = "88 000 ₽ / м²",
  details = "2 ком, 44 м², этаж 5/16",
  address = "Москва СЗАО р-н Южное Тушино м. Сходненская Сходненская улица 14",
  source = "Яндекс.Недвижимость",
  author = "Агентство недвижимости «СОВА»",
  publishedAt = "Опубликован: 17.08.2023, 17:00:58",
  sourceHref = "https://realty.yandex.ru",
  ...props
}: ObjectCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const isHovered = state === "hovered";

  return (
    <article
      className={cn(
        "group/card grid w-[260px] shrink-0 content-start rounded-[20px] p-2 text-[var(--rh-theme-text-neutral-primary)] transition-colors",
        isHovered ? "bg-[var(--rh-theme-fill-neutral-hover)]" : "bg-[var(--rh-theme-surface-bg)] hover:bg-[var(--rh-theme-fill-neutral-hover)]",
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
                size="md"
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
        <div className="flex items-center gap-1">
          <p className="text-[20px] font-medium leading-[1.28]">{price}</p>
          <span className="flex size-6 items-center justify-center rounded-[var(--rh-sizing-border-radius-md)] bg-[var(--rh-theme-fill-success-light)] text-[var(--rh-theme-icon-success)]" aria-label="Цена снизилась"><TrendingDown aria-hidden="true" className="size-4" /></span>
        </div>
        <p className="text-base leading-6">{pricePerM2}</p>
      </div>

      <div className="py-2 text-base leading-6">{details}</div>

      <div className="grid gap-2 pb-1 text-[14px] leading-5">
        <p>{address}</p>
        {subway && <p className="flex items-start gap-1"><Train aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[var(--rh-theme-text-error)]" /><span>Университет дружбы народов</span></p>}
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
        <Button appearance={isHovered ? "contrast" : "default"} className={cn("min-w-0 flex-1 group-hover/card:bg-[var(--rh-theme-fill-contrast-static)]", isHovered && "bg-[var(--rh-theme-fill-contrast-static)]")} onClick={onDetailsClick} size="sm" startIcon={false} endIcon={false}>Подробнее</Button>
        <IconButton aria-label="Комментарии к объекту" appearance={isHovered ? "contrast" : "secondary"} className="rounded-full group-hover/card:bg-[var(--rh-theme-fill-contrast-static)]" icon={<MessageSquareText aria-hidden="true" />} onClick={onCommentsClick} size="sm" />
        <IconButton aria-label="Пожаловаться на объект" appearance={isHovered ? "contrast" : "secondary"} className="rounded-full group-hover/card:bg-[var(--rh-theme-fill-contrast-static)]" icon={<TriangleAlert aria-hidden="true" />} onClick={onReportClick} size="sm" />
      </div>)}
    </article>
  );
}

export { ObjectCard };
export type { ObjectCardProps };
