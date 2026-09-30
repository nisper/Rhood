import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  MoreVertical,
  Pencil,
  Save,
  TrendingUp,
} from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ClientDemandStatus } from "@/components/ui/client-demand-status";
import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import { Menu } from "@/components/ui/menu";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { cn } from "@/lib/utils";

type ObjectInfoProps = React.ComponentProps<"article"> & {
  onClose?: () => void;
};

type ObjectComment = {
  author: string;
  avatar: string;
  body: string;
  time: string;
};

const galleryImages = [
  "/Rhood/assets/object-gallery-1.png",
  "/Rhood/assets/object-gallery-2.png",
  "/Rhood/assets/object-gallery-3.png",
  "/Rhood/assets/object-gallery-4.png",
];

const initialComments: ObjectComment[] = [
  {
    author: "Евгений Власов",
    avatar: "ЕВ",
    body: "Запросил актуальную стоимость и готовность собственника к торгу.",
    time: "15 мин. назад",
  },
  {
    author: "Ирина Петрова",
    avatar: "ИП",
    body: "У собственника есть время на показы после 18:00. Подъезд чистый, двор закрытый.",
    time: "1 ч назад",
  },
  {
    author: "Система",
    avatar: "СИ",
    body: "Объявление обновлено в источнике.",
    time: "15 ч назад",
  },
];

/**
 * Составная информация об объекте. Может быть помещена как в Drawer, так и на страницу объекта.
 * Figma: https://www.figma.com/design/a0woN7V2kVcvxLLABs6sSs/%25D0%2592%25D1%258B%25D0%25B4%25D0%25B0%25D1%2587%25D0%25B0?node-id=24335-23012
 */
function ObjectInfo({ className, onClose, ...props }: ObjectInfoProps) {
  const [activeImage, setActiveImage] = React.useState(0);
  const [checkedAt, setCheckedAt] = React.useState("Проверили только что");
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState(initialComments);
  const [callStatus, setCallStatus] = React.useState("Не выбрано");

  function submitComment() {
    const body = comment.trim();
    if (!body) return;

    setComments((items) => [
      { author: "Евгений Власов", avatar: "ЕВ", body, time: "только что" },
      ...items,
    ]);
    setComment("");
  }

  return (
    <article
      className={cn(
        "w-[884px] overflow-hidden rounded-[var(--rh-sizing-border-radius-modal)] bg-[var(--rh-theme-fill-contrast-static)]",
        className,
      )}
      {...props}
    >
      <ObjectInfoHeader onClose={onClose} />

      <div className="grid grid-cols-[minmax(0,564px)_320px] items-start">
        <main className="grid min-w-0 gap-6 px-4 pb-6 pt-3">
          <ObjectGallery activeIndex={activeImage} onSelect={setActiveImage} />
          <section className="grid gap-2" aria-labelledby="object-address">
            <img
              alt="Схема расположения объекта"
              className="h-[120px] w-full rounded-[var(--rh-sizing-border-radius-md)] object-cover"
              src="/Rhood/assets/object-gallery-3.png"
            />
            <p className="flex items-center gap-1 rh-typography-b1 text-[var(--rh-theme-text-neutral-primary)]">
              <MapPin aria-hidden="true" className="size-6 shrink-0" strokeWidth={2} />
              <span id="object-address">ул. Малышева, 12, Екатеринбург</span>
            </p>
          </section>
          <section className="grid gap-2" aria-labelledby="object-description">
            <h2 className="rh-typography-h4" id="object-description">Описание</h2>
            <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-primary)]">
              Светлая квартира с предчистовой отделкой. Окна выходят во двор, рядом парк и вся необходимая инфраструктура.
            </p>
          </section>
          <ObjectCommentThread
            comment={comment}
            comments={comments}
            onCommentChange={setComment}
            onSubmit={submitComment}
          />
        </main>

        <ObjectInfoSidebar
          callStatus={callStatus}
          checkedAt={checkedAt}
          onCallStatusChange={setCallStatus}
          onRefreshDemand={() => setCheckedAt("Проверили только что")}
        />
      </div>
    </article>
  );
}

function ObjectInfoHeader({ onClose }: { onClose?: () => void }) {
  return (
    <header className="flex items-center gap-2 px-4 pt-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Button appearance="ghost" className="px-[var(--rh-sizing-common-input-padding-text-btn-px-sm)]" endIcon={false} size="sm" startIcon={<img alt="" className="size-5 max-w-none shrink-0" src="/Rhood/assets/object-info-header-heart.svg" />}>
          В избранное
        </Button>
        <Button appearance="ghost" className="px-[var(--rh-sizing-common-input-padding-text-btn-px-sm)]" endIcon={false} size="sm" startIcon={<img alt="" className="size-5 max-w-none shrink-0" src="/Rhood/assets/object-info-header-layers.svg" />}>
          В подборку
        </Button>
        <Button appearance="ghost" className="px-[var(--rh-sizing-common-input-padding-text-btn-px-sm)]" endIcon={false} size="sm" startIcon={<img alt="" className="size-5 max-w-none shrink-0" src="/Rhood/assets/object-info-header-duplicate.svg" />}>
          Это дубль
        </Button>
        <Button appearance="ghost" className="px-[var(--rh-sizing-common-input-padding-text-btn-px-sm)]" endIcon={false} size="sm" startIcon={<img alt="" className="size-5 max-w-none shrink-0" src="/Rhood/assets/object-info-header-external-link.svg" />}>
          В отдельном окне
        </Button>
      </div>
      <IconButton aria-label="Закрыть информацию об объекте" appearance="ghost" icon={<img alt="" src="/Rhood/assets/object-info-header-close.svg" />} onClick={onClose} />
    </header>
  );
}

function ObjectGallery({ activeIndex, onSelect }: { activeIndex: number; onSelect: (index: number) => void }) {
  const image = galleryImages[activeIndex];

  return (
    <section className="grid gap-2" aria-label="Галерея объекта">
      <div className="relative h-[216px] overflow-hidden rounded-[var(--rh-sizing-border-radius-lg)] bg-[var(--rh-theme-fill-neutral)]">
        <img alt="Фотография объекта" className="size-full object-cover" src={image} />
        <div className="absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
          <IconButton aria-label="Предыдущее фото" appearance="contrast" icon={<ChevronLeft aria-hidden="true" />} onClick={() => onSelect((activeIndex - 1 + galleryImages.length) % galleryImages.length)} size="sm" />
          <IconButton aria-label="Следующее фото" appearance="contrast" icon={<ChevronRight aria-hidden="true" />} onClick={() => onSelect((activeIndex + 1) % galleryImages.length)} size="sm" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {galleryImages.map((source, index) => (
          <button
            aria-label={`Показать фото ${index + 1}`}
            aria-pressed={activeIndex === index}
            className={cn(
              "h-16 overflow-hidden rounded-[var(--rh-sizing-border-radius-md)] border-2 transition-colors",
              activeIndex === index ? "border-[var(--rh-theme-border-focus)]" : "border-transparent",
            )}
            key={source}
            onClick={() => onSelect(index)}
            type="button"
          >
            <img alt="" className="size-full object-cover" src={source} />
          </button>
        ))}
      </div>
    </section>
  );
}

function ObjectInfoSidebar({ callStatus, checkedAt, onCallStatusChange, onRefreshDemand }: { callStatus: string; checkedAt: string; onCallStatusChange: (status: string) => void; onRefreshDemand: () => void }) {
  const statuses = ["Не выбрано", "Не отвечает", "Думает", "Отказ", "Другое АН"];

  return (
    <aside className="sticky top-0 grid min-w-0 gap-5 px-3 pb-5" aria-label="Сводка объекта">
      <div className="flex flex-wrap gap-2 pt-3">
        <Chip appearance="muted" color="success" icon={false} propDelete={false} size="sm" thumbnail={false}>Уникальный</Chip>
        <Chip appearance="muted" color="warning" icon={false} propDelete={false} size="sm" thumbnail={false}>Средняя ликвидность</Chip>
        <Chip appearance="muted" color="neutral" icon={false} propDelete={false} size="sm" thumbnail={false}>Предчистовая отделка</Chip>
      </div>

      <section className="grid gap-1" aria-labelledby="object-summary">
        <h2 className="rh-typography-b1-med" id="object-summary">41,9 м², 1к квартира, этаж 15/16, 2015 год</h2>
        <div className="flex flex-wrap items-start gap-2">
          <div>
            <p className="text-[24px] font-semibold leading-8 tracking-[-0.24px] text-[var(--rh-theme-text-neutral-primary)]">5 700 000 ₽</p>
            <p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">136 038 ₽/м²</p>
          </div>
          <span className="mt-1 rounded-[var(--rh-sizing-border-radius-md)] bg-[var(--rh-theme-fill-error-light)] p-1 text-[var(--rh-theme-text-error)]" title="Цена выросла">
            <TrendingUp aria-hidden="true" className="size-6" strokeWidth={2} />
          </span>
        </div>
      </section>

      <ClientDemandStatus checkedAt={checkedAt} count={38} onRefresh={onRefreshDemand} status="found" />

      <section className="grid gap-3" aria-label="Контакт продавца">
        <div className="grid gap-0.5">
          <p className="rh-typography-b1"><a className="cursor-pointer text-[var(--rh-theme-text-brand)] underline" href="https://domclick.ru" rel="noreferrer" target="_blank">Домклик</a>, Частное лицо</p>
          <p className="text-xs leading-4 tracking-[0.3px] text-[var(--rh-theme-text-neutral-secondary)]">Последний звонок 15 ч 20 мин назад</p>
        </div>
        <Button className="w-full" endIcon={false} startIcon={false}>+7 922 007 6761</Button>
      </section>

      <section className="grid gap-2" aria-labelledby="call-status">
        <p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]" id="call-status">Статус последнего звонка</p>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <ToggleChip checked={callStatus === status} className="h-9 px-2 py-2" key={status} onClick={() => onCallStatusChange(status)} size="sm" startIcon={false} thumbnail={false}>{status}</ToggleChip>
          ))}
        </div>
      </section>

      <div className="grid gap-1 rounded-[var(--rh-sizing-border-radius-lg)] bg-[var(--rh-theme-surface-under-islands)] p-1">
        <Button appearance="contrast" className="w-full" endIcon={false} startIcon={<Save aria-hidden="true" strokeWidth={2} />}>Сохранить в космос</Button>
        <p className="text-center text-xs leading-4 tracking-[0.3px] text-[var(--rh-theme-text-neutral-secondary)]">Мы сразу создадим заявку и объект</p>
      </div>
    </aside>
  );
}

function ObjectCommentThread({ comment, comments, onCommentChange, onSubmit }: { comment: string; comments: ObjectComment[]; onCommentChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <section className="grid gap-4" aria-labelledby="object-comments">
      <h2 className="rh-typography-h4" id="object-comments">Комментарии</h2>
      <div className="flex items-start gap-3">
        <Avatar content="text" size="40px">ЕВ</Avatar>
        <div className="grid min-w-0 flex-1 gap-2">
          <Textarea aria-label="Ваш комментарий" onChange={(event) => onCommentChange(event.target.value)} placeholder="Ваш комментарий" rows={1} value={comment} />
          <Button className="justify-self-end" disabled={!comment.trim()} endIcon={false} onClick={onSubmit} size="sm" startIcon={false}>Отправить</Button>
        </div>
      </div>
      <div className="grid gap-4">
        {comments.map((item, index) => (
          <article className="flex gap-3" key={`${item.author}-${index}`}>
            <Avatar content="text" size="40px">{item.avatar}</Avatar>
            <div className="grid min-w-0 flex-1 gap-0.5">
              <div className="flex items-center gap-2">
                <p className="rh-typography-b2-med">{item.author}</p>
                <p className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">{item.time}</p>
                <div className="ml-auto relative">
                  <IconButton aria-label={`Действия комментария ${item.author}`} appearance="ghost" icon={<MoreVertical aria-hidden="true" />} size="xsm" />
                  {index === 1 && <Menu className="absolute right-0 top-8 z-10"><MenuItemSingleSelect icon={false} rightSlot={false} secondaryText={false} startIcon={false}><span className="flex items-center gap-2"><Pencil className="size-5" />Редактировать</span></MenuItemSingleSelect><MenuItemSingleSelect icon={false} rightSlot={false} secondaryText={false} startIcon={false}>Удалить</MenuItemSingleSelect></Menu>}
                </div>
              </div>
              <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-primary)]">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export { ObjectInfo };
export type { ObjectInfoProps };
