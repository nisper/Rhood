import * as React from "react";
import {
  BookmarkPlus,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonFavorite } from "@/components/ui/button-favorite";
import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { cn } from "@/lib/utils";

type ObjectInfoProps = React.ComponentProps<"article"> & {
  onClose?: () => void;
};

const galleryImage = "/Rhood/assets/object-gallery-1.png";

/**
 * Составная информация об объекте. Может быть помещена как в Drawer, так и на страницу объекта.
 * Figma: https://www.figma.com/design/a0woN7V2kVcvxLLABs6sSs/%25D0%2592%25D1%258B%25D0%25B4%25D0%25B0%25D1%2587%25D0%25B0?node-id=24335-23012
 */
function ObjectInfo({ className, onClose, ...props }: ObjectInfoProps) {
  const [callStatus, setCallStatus] = React.useState("Не выбрано");

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
          <ObjectGallery />
          <section className="grid gap-2" aria-labelledby="object-description">
            <h2 className="rh-typography-h4" id="object-description">Описание</h2>
            <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-primary)]">
              Светлая квартира с предчистовой отделкой. Окна выходят во двор, рядом парк и вся необходимая инфраструктура.
            </p>
          </section>
        </main>

        <ObjectInfoSidebar
          callStatus={callStatus}
          onCallStatusChange={setCallStatus}
        />
      </div>
    </article>
  );
}

function ObjectInfoHeader({ onClose }: { onClose?: () => void }) {
  return (
    <header className="flex items-center gap-2 px-4 pt-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <ButtonFavorite appearance="ghost" iconOnly={false} size="sm" />
        <Button appearance="ghost" endIcon={false} size="sm" startIcon={<img alt="" className="size-5 max-w-none shrink-0" src="/Rhood/assets/object-info-header-layers.svg" />}>
          В подборку
        </Button>
        <Button appearance="ghost" endIcon={false} size="sm" startIcon={<img alt="" className="size-5 max-w-none shrink-0" src="/Rhood/assets/object-info-header-duplicate.svg" />}>
          Это дубль
        </Button>
        <Button appearance="ghost" endIcon={false} size="sm" startIcon={<img alt="" className="size-5 max-w-none shrink-0" src="/Rhood/assets/object-info-header-external-link.svg" />}>
          В отдельном окне
        </Button>
      </div>
      <IconButton aria-label="Закрыть информацию об объекте" appearance="ghost" icon={<img alt="" src="/Rhood/assets/object-info-header-close.svg" />} onClick={onClose} />
    </header>
  );
}

function ObjectGallery() {
  return (
    <section className="grid gap-2" aria-label="Галерея объекта">
      <div className="aspect-video overflow-hidden rounded-[var(--rh-sizing-border-radius-lg)] bg-[var(--rh-theme-fill-neutral)]">
        <img alt="Фотография объекта" className="size-full object-cover" src={galleryImage} />
      </div>
    </section>
  );
}

function ObjectInfoSidebar({ callStatus, onCallStatusChange }: { callStatus: string; onCallStatusChange: (status: string) => void }) {
  const statuses = ["Не выбрано", "Не отвечает", "Думает", "Отказ", "Другое АН"];

  return (
    <aside className="sticky top-0 grid min-w-0 gap-5 px-3 pb-5" aria-label="Сводка объекта">
      <div className="flex flex-wrap gap-2 pt-3">
        <Chip appearance="muted" color="success" icon={false} remove={false} size="sm">Уникальный</Chip>
        <Chip appearance="muted" color="warning" icon={false} remove={false} size="sm">Средняя ликвидность</Chip>
        <Chip appearance="muted" color="neutral" icon={false} remove={false} size="sm">Предчистовая отделка</Chip>
      </div>

      <section className="grid gap-1" aria-labelledby="object-summary">
        <h2 className="rh-typography-b1" id="object-summary">41,9 м², 1к квартира, этаж 15/16, 2015 год</h2>
        <div className="flex flex-wrap items-start gap-2">
          <div>
            <p className="text-[24px] font-semibold leading-8 tracking-[-0.24px] text-[var(--rh-theme-text-neutral-primary)]">5 700 000 ₽</p>
            <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">136 038 ₽/м²</p>
          </div>
          <span className="mt-1 rounded-[var(--rh-sizing-border-radius-md)] bg-[var(--rh-theme-fill-error-light)] p-1 text-[var(--rh-theme-text-error)]" title="Цена выросла">
            <TrendingUp aria-hidden="true" className="size-6" strokeWidth={2} />
          </span>
        </div>
      </section>

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
            <ToggleChip checked={callStatus === status} icon={false} key={status} onClick={() => onCallStatusChange(status)} size="sm">{status}</ToggleChip>
          ))}
        </div>
      </section>

      <div className="grid gap-1 rounded-[var(--rh-sizing-border-radius-lg)] bg-[var(--rh-theme-surface-under-islands)] p-1">
        <Button appearance="contrast" className="w-full" endIcon={false} startIcon={<BookmarkPlus aria-hidden="true" strokeWidth={2} />}>Сохранить в космос</Button>
        <p className="text-center text-xs leading-4 tracking-[0.3px] text-[var(--rh-theme-text-neutral-secondary)]">Мы сразу создадим заявку и объект</p>
      </div>
    </aside>
  );
}

export { ObjectInfo };
export type { ObjectInfoProps };
