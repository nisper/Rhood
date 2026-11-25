import * as React from "react";
import {
  BookmarkPlus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonFavorite } from "@/components/ui/button-favorite";
import { Chip } from "@/components/ui/chip";
import { Comments } from "@/components/ui/comments";
import { Drawer, DrawerContainer } from "@/components/ui/drawer";
import { ExpandableContent } from "@/components/ui/expandable-content";
import { ObjectBuyersV2 } from "@/components/ui/object-buyers";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { cn } from "@/lib/utils";

type ExperimentObjectInfoProps = React.ComponentProps<"article"> & {
  data?: ExperimentObjectInfoData;
  onClose?: () => void;
  presentation?: "inline" | "drawer";
};

type ExperimentObjectInfoData = {
  address: string;
  author: string;
  buyerCount: number;
  commentCount: number;
  constructionYear?: number | null;
  description?: string | null;
  imageSrc: string;
  phone?: string | null;
  price: number;
  pricePerArea: number;
  pricePerAreaUnit: "м²" | "сот.";
  priceTrend?: "up" | "down" | null;
  publishedAt: string;
  renovationType?: string | null;
  source: string;
  sourceHref: string;
  specs: string;
  status: string;
};

function formatRubles(value: number) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const nationalNumber = digits.length === 11 && (digits[0] === "7" || digits[0] === "8")
    ? digits.slice(1)
    : digits.length === 10 ? digits : null;

  if (!nationalNumber) return phone;
  return `+7 ${nationalNumber.slice(0, 3)} ${nationalNumber.slice(3, 6)} ${nationalNumber.slice(6, 8)} ${nationalNumber.slice(8)}`;
}

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
function ExperimentObjectInfo({ className, data, onClose, presentation = "inline", ...props }: ExperimentObjectInfoProps) {
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
          <ExperimentObjectInfo
            {...props}
            className={cn("min-h-full w-full rounded-none", className)}
            data={data}
            onClose={() => setDrawerOpen(false)}
          />
        </Drawer>
      </DrawerContainer>
    );
  }

  return (
    <article
      className={cn(
        "w-[884px] overflow-hidden bg-[var(--rh-theme-fill-contrast-static)]",
        className,
      )}
      {...props}
    >
      <ExperimentObjectInfoHeader />

      <div className="grid grid-cols-[minmax(0,1fr)_320px] items-start gap-6">
        <main className="grid min-w-0 gap-8 pb-6 pt-3">
          <ObjectGallery data={data} />
          {data ? <ExperimentObjectBuyers buyerCount={data.buyerCount} /> : <ObjectBuyersV2 />}
          <section className="grid gap-4" aria-labelledby="object-description">
            <h2 className="rh-typography-h4" id="object-description">Описание</h2>
            <ExpandableContent collapsedHeight={100}>
              <p className="rh-typography-b1 whitespace-pre-wrap text-[var(--rh-theme-text-neutral-primary)]">
                {data ? data.description || "Описание не указано" : objectDescription}
              </p>
            </ExpandableContent>
          </section>
          <Comments comments={data ? [] : undefined} title={data ? `Комментарии (${data.commentCount})` : undefined} />
        </main>

        <ExperimentObjectInfoSidebar
          callStatus={callStatus}
          data={data}
          onCallStatusChange={setCallStatus}
        />
      </div>
    </article>
  );
}

function ExperimentObjectInfoHeader() {
  return (
    <header className="flex items-center gap-2">
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
    </header>
  );
}

function ExperimentObjectBuyers({ buyerCount }: { buyerCount: number }) {
  const lastTwoDigits = buyerCount % 100;
  const lastDigit = buyerCount % 10;
  const buyerLabel = lastTwoDigits >= 11 && lastTwoDigits <= 14
    ? "покупателей"
    : lastDigit === 1 ? "покупатель" : lastDigit >= 2 && lastDigit <= 4 ? "покупателя" : "покупателей";

  return (
    <section aria-labelledby="object-buyers" className="grid gap-4">
      <h2 className="rh-typography-h4" id="object-buyers">
        {buyerCount ? `${buyerCount} ${buyerLabel} с точным совпадением` : "Покупателей с точным совпадением нет"}
      </h2>
      {buyerCount > 0 && <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">Детали потребностей недоступны</p>}
    </section>
  );
}

function ObjectGallery({ data }: { data?: ExperimentObjectInfoData }) {
  return (
    <section className="grid gap-2" aria-label="Галерея объекта">
      <div className="aspect-video overflow-hidden bg-[var(--rh-theme-fill-neutral)]">
        <img alt={data ? `Фото объекта: ${data.address}` : "Фотография объекта"} className="size-full object-cover" src={data?.imageSrc ?? galleryImage} />
      </div>
    </section>
  );
}

function ExperimentObjectInfoSidebar({ callStatus, data, onCallStatusChange }: { callStatus: string; data?: ExperimentObjectInfoData; onCallStatusChange: (status: string) => void }) {
  const statuses = ["Не выбрано", "Не отвечает", "Думает", "Отказ", "Другое АН"];

  return (
    <aside className="sticky top-0 grid min-w-0 gap-5 px-3 pb-5" aria-label="Сводка объекта">
      <div className="flex flex-wrap gap-2 pt-3">
        {data ? (
          <>
            <Chip appearance="muted" color="neutral" icon={false} remove={false} size="sm">{data.status}</Chip>
            {data.renovationType && <Chip appearance="muted" color="neutral" icon={false} remove={false} size="sm">{data.renovationType}</Chip>}
          </>
        ) : (
          <>
            <Chip appearance="muted" color="success" icon={false} remove={false} size="sm">Уникальный</Chip>
            <Chip appearance="muted" color="warning" icon={false} remove={false} size="sm">Средняя ликвидность</Chip>
            <Chip appearance="muted" color="neutral" icon={false} remove={false} size="sm">Предчистовая отделка</Chip>
          </>
        )}
      </div>

      <section className="grid gap-2" aria-labelledby="object-summary">
        <h2 className="rh-typography-b1" id="object-summary">{data ? `${data.specs}${data.constructionYear ? `, ${data.constructionYear} год` : ""}` : "41,9 м², 1к квартира, этаж 15/16, 2015 год"}</h2>
        {data && <p className="rh-typography-b1">{data.address}</p>}
        <div className="flex flex-wrap items-start gap-2">
          <div>
            <p className="text-[24px] font-semibold leading-8 tracking-[-0.24px] text-[var(--rh-theme-text-neutral-primary)]">{data ? formatRubles(data.price) : "5 700 000 ₽"}</p>
            <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">{data ? `${formatRubles(data.pricePerArea)}/${data.pricePerAreaUnit}` : "136 038 ₽/м²"}</p>
          </div>
          {(!data || data.priceTrend) && <span className="mt-1 flex size-6 shrink-0 items-center justify-center bg-[var(--rh-theme-fill-error-light)] text-[var(--rh-theme-text-error)]" title={data?.priceTrend === "down" ? "Цена снизилась" : "Цена выросла"}>
            {data?.priceTrend === "down" ? <ChevronDown aria-hidden="true" className="size-5" strokeWidth={2} /> : <ChevronUp aria-hidden="true" className="size-5" strokeWidth={2} />}
          </span>}
        </div>
      </section>

      <section className="grid gap-3" aria-label="Контакт продавца">
        <div className="grid gap-0.5">
          <p className="rh-typography-b1"><a className="cursor-pointer text-[var(--rh-theme-text-brand)] underline" href={data?.sourceHref ?? "https://domclick.ru"} rel="noreferrer" target="_blank">{data?.source ?? "Домклик"}</a>, {data?.author ?? "Частное лицо"}</p>
          <p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">{data ? `Опубликован: ${data.publishedAt}` : "Последний звонок 15 ч 20 мин назад"}</p>
        </div>
        <Button
          className="w-full"
          endIcon={false}
          onClick={data && !data.phone ? () => window.open(data.sourceHref, "_blank", "noopener,noreferrer") : undefined}
          startIcon={false}
        >
          {data ? data.phone ? formatPhone(data.phone) : "Посмотреть на агрегаторе" : "+7 922 007 67 61"}
        </Button>
      </section>

      <section className="grid gap-2" aria-labelledby="call-status">
        <p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]" id="call-status">Статус последнего звонка</p>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <ToggleChip checked={callStatus === status} icon={false} key={status} onClick={() => onCallStatusChange(status)} size="md">{status}</ToggleChip>
          ))}
        </div>
      </section>

      <div className="grid gap-1 rounded-[calc(var(--rh-sizing-common-input-shape-border-radius)+var(--spacing))] bg-[var(--rh-theme-surface-under-islands)] p-1">
        <Button appearance="contrast" className="w-full" endIcon={false} startIcon={<BookmarkPlus aria-hidden="true" strokeWidth={2} />}>Сохранить в космос</Button>
        <p className="text-center rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Мы сразу создадим заявку и объект</p>
      </div>
    </aside>
  );
}

export { ExperimentObjectInfo };
export type { ExperimentObjectInfoProps };
