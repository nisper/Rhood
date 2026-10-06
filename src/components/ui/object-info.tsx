import * as React from "react";
import {
  BookmarkPlus,
  ChevronUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonFavorite } from "@/components/ui/button-favorite";
import { Chip } from "@/components/ui/chip";
import { Drawer, DrawerContainer } from "@/components/ui/drawer";
import { ExpandableContent } from "@/components/ui/expandable-content";
import { IconButton } from "@/components/ui/icon-button";
import { ObjectBuyers } from "@/components/ui/object-buyers";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { cn } from "@/lib/utils";

type ObjectInfoProps = React.ComponentProps<"article"> & {
  onClose?: () => void;
  presentation?: "inline" | "drawer";
};

const galleryImage = "/Rhood/assets/object-gallery-1.png";
const objectDescription = `✨ Квартира-мечта с дизайнерским ремонтом в ЖК закрытого типа! ✨
Продается роскошная квартира в Тюмени по адресу: ул. Невская, 109. Это идеальное сочетание стиля, комфорта и продуманной до мелочей эргономики.
🏙 О КВАРТИРЕ: Общая концепция интерьера выполнена в современном стиле с использованием премиальных материалов. Площадь квартиры 80 кв.м. + 9 кв.м. балкон
Кухня-гостиная (30 кв.м): Сердце дома с кухонным островом, отдельной обеденной зоной и трехметровым диваном. Установлен встроенный шкаф и парящая мебель.
Мастер-спальня: Просторная зона отдыха с кроватью 2х2 (подъемный механизм) и вместительным шкафом.
Две детские комнаты: Полностью укомплектованы встроенными шкафами-купе и оборудованными рабочими местами для учебы и компьютеров.
Утепленный балкон (9 кв.м): Полноценная комната, зонированная под кабинет и место для отдыха.
Удобства: Два санузла в керамограните, отдельная постирочная со стиральной и сушильной машинами Bosch.
🛠 ТЕХНИЧЕСКОЕ ОСНАЩЕНИЕ И ОТДЕЛКА:
Техника: Полный комплект встроенной техники Bosch (посудомоечная машина, холодильник, варочная панель, микроволновка, духовой шкаф), робот пылесос.
Стены, пол и двери: Стены — высококачественная покраска и декоративная штукатурка. На полу — износостойкий кварцвинил единым контуром. Двери скрытого монтажа на алюминиевом профиле премиум уровня.
Климат: Теплые полы (прихожая, санузлы, балкон). Установлен кондиционер в гостиной, во всех комнатах подготовлены трассы под сплит-системы.
Мебель: Все позиции изготовлены на заказ.
📍 ИНФРАСТРУКТУРА И ЛОКАЦИЯ: Квартира расположена в закрытом жилом комплексе с безопасной территорией.
Для детей: Детский сад всего в 100 метрах, школа — в 500 метрах.
Шопинг: Магазины прямо в доме, в шаговой доступности ТРЦ «Колумб».
Транспорт: Удобная развязка, быстрый выезд на окружную дорогу и всего 10 минут до центра города.
🎁 БОНУС: Вся мебель и техника (кроме телевизоров) остаются новым владельцам.`;

/**
 * Составная информация об объекте. В presentation="drawer" самостоятельно открывается в боковой панели.
 * Figma: https://www.figma.com/design/a0woN7V2kVcvxLLABs6sSs/%25D0%2592%25D1%258B%25D0%25B4%25D0%25B0%25D1%2587%25D0%25B0?node-id=24335-23012
 */
function ObjectInfo({ className, onClose, presentation = "inline", ...props }: ObjectInfoProps) {
  const [callStatus, setCallStatus] = React.useState("Не выбрано");
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  if (presentation === "drawer") {
    return (
      <DrawerContainer>
        <Drawer
          closeButton={false}
          header={false}
          maxWidth={884}
          onOpenChange={setDrawerOpen}
          onTransitionEnd={() => {
            if (!drawerOpen) onClose?.();
          }}
          open={drawerOpen}
          title="Информация об объекте"
        >
          <ObjectInfo
            {...props}
            className={cn("min-h-full w-full rounded-none", className)}
            onClose={() => setDrawerOpen(false)}
          />
        </Drawer>
      </DrawerContainer>
    );
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
          <ObjectGallery />
          <ObjectBuyers />
          <section className="grid gap-2" aria-labelledby="object-description">
            <h2 className="rh-typography-h4" id="object-description">Описание</h2>
            <ExpandableContent collapsedHeight={100}>
              <p className="rh-typography-b1 whitespace-pre-wrap text-[var(--rh-theme-text-neutral-primary)]">
                {objectDescription}
              </p>
            </ExpandableContent>
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

      <section className="grid gap-2" aria-labelledby="object-summary">
        <h2 className="rh-typography-b2" id="object-summary">41,9 м², 1к квартира, этаж 15/16, 2015 год</h2>
        <div className="flex flex-wrap items-start gap-2">
          <div>
            <p className="text-[24px] font-semibold leading-8 tracking-[-0.24px] text-[var(--rh-theme-text-neutral-primary)]">5 700 000 ₽</p>
            <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">136 038 ₽/м²</p>
          </div>
          <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-[var(--rh-sizing-border-radius-md)] bg-[var(--rh-theme-fill-error-light)] text-[var(--rh-theme-text-error)]" title="Цена выросла">
            <ChevronUp aria-hidden="true" className="size-5" strokeWidth={2} />
          </span>
        </div>
      </section>

      <section className="grid gap-3" aria-label="Контакт продавца">
        <div className="grid gap-0.5">
          <p className="rh-typography-b1"><a className="cursor-pointer text-[var(--rh-theme-text-brand)] underline" href="https://domclick.ru" rel="noreferrer" target="_blank">Домклик</a>, Частное лицо</p>
          <p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Последний звонок 15 ч 20 мин назад</p>
        </div>
        <Button className="w-full" endIcon={false} startIcon={false}>+7 922 007 6761</Button>
      </section>

      <section className="grid gap-2" aria-labelledby="call-status">
        <p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]" id="call-status">Статус последнего звонка</p>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <ToggleChip checked={callStatus === status} icon={false} key={status} onClick={() => onCallStatusChange(status)} size="md">{status}</ToggleChip>
          ))}
        </div>
      </section>

      <div className="grid gap-1 rounded-[var(--rh-sizing-border-radius-lg)] bg-[var(--rh-theme-surface-under-islands)] p-1">
        <Button appearance="contrast" className="w-full" endIcon={false} startIcon={<BookmarkPlus aria-hidden="true" strokeWidth={2} />}>Сохранить в космос</Button>
        <p className="text-center rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Мы сразу создадим заявку и объект</p>
      </div>
    </aside>
  );
}

export { ObjectInfo };
export type { ObjectInfoProps };
