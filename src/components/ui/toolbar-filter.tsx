import * as React from "react";
import { Search, Settings2, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormBlock } from "@/components/ui/form-block";
import { FormSet } from "@/components/ui/form-set";
import { IconButton } from "@/components/ui/icon-button";
import { InputNumberRange } from "@/components/ui/input-number-range";
import { Menu } from "@/components/ui/menu";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { Modal, ModalContainer } from "@/components/ui/modal";
import { Segment } from "@/components/ui/segment";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Textfield } from "@/components/ui/text-field";
import { cn } from "@/lib/utils";

type ToolbarFilterResp = "desk" | "mob";

type ToolbarFilterProps = React.ComponentProps<"section"> & {
  empty?: boolean;
  /** Renders the toolbar as a self-contained surface on the island layout. */
  island?: boolean;
  progressLinear?: boolean;
  resultCount?: number;
  resp?: ToolbarFilterResp;
};

const roominessOptions = ["Студия", "1", "2", "3", "4+"];
const propertyTypeOptions = ["Квартиры", "Дома", "Участки"];

function FilterSelect({
  label,
  onValueChange,
  options = [label],
  value: controlledValue,
  widthClass,
}: {
  label: string;
  onValueChange?: (value: string) => void;
  options?: readonly string[];
  value?: string;
  widthClass?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState(label);
  const value = controlledValue ?? uncontrolledValue;

  return (
    <div>
      <Select
        className={widthClass}
        expanded={open}
        fullWidth={Boolean(widthClass)}
        label={false}
        onExpandedChange={setOpen}
        menu={
          open && (
            <Menu
              className="absolute left-0 top-full z-20 mt-1 min-w-full"
              role="listbox"
            >
              {options.map((option) => (
                <MenuItemSingleSelect
                  icon={false}
                  key={option}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (controlledValue === undefined) setUncontrolledValue(option);
                    onValueChange?.(option);
                    setOpen(false);
                  }}
                  rightSlot={false}
                  role="option"
                  secondaryText={false}
                  selected={option === value}
                >
                  {option}
                </MenuItemSingleSelect>
              ))}
            </Menu>
          )
        }
        onClick={() => setOpen((current) => !current)}
        size="sm"
        value={value}
      />
    </div>
  );
}

function FilterRange({
  endValue,
  groupThousands = false,
  onEndChange,
  onStartChange,
  suffix,
  startValue,
  widthClass,
}: {
  endValue: string;
  groupThousands?: boolean;
  onEndChange: (value: string) => void;
  onStartChange: (value: string) => void;
  suffix: string;
  startValue: string;
  widthClass: string;
}) {
  return (
    <InputNumberRange
      aria-label={`Диапазон ${suffix}`}
      className={widthClass}
      size="sm"
      startInputProps={{
        groupThousands,
        onChange: (event) => onStartChange(event.target.value),
        placeholder: "от",
        value: startValue,
      }}
      endInputProps={{
        groupThousands,
        onChange: (event) => onEndChange(event.target.value),
        placeholder: "до",
        value: endValue,
      }}
      unit={suffix}
    />
  );
}

function RoominessGroup({
  onValueChange,
  value,
}: {
  onValueChange: (value: string[]) => void;
  value: string[];
}) {
  return (
    <SegmentedControl
      color="contrast"
      onValueChange={(nextValue) => onValueChange(Array.isArray(nextValue) ? nextValue : [nextValue])}
      selectionMode="multiple"
      size="sm"
      value={value}
    >
      {roominessOptions.map((item) => (
        <Segment key={item} value={item}>
          {item}
        </Segment>
      ))}
    </SegmentedControl>
  );
}

function MobileFilterButton({
  empty,
  onClick,
}: {
  empty: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      appearance="contrast"
      className="shrink-0"
      counter={!empty}
      counterValue={1}
      endIcon={false}
      onClick={onClick}
      size="sm"
      startIcon={
        empty ? <SlidersHorizontal aria-hidden="true" strokeWidth={2} /> : false
      }
    >
      Фильтры
    </Button>
  );
}

function ModalSelect({
  label,
  options,
}: {
  label: string;
  options: readonly string[];
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState("Не выбрано");

  return (
    <FormBlock direction="row" label={label}>
      <Select
        expanded={expanded}
        fullWidth
        label={false}
        menu={
          expanded && (
            <Menu className="absolute left-0 top-full z-20 mt-1 min-w-full" role="listbox">
              {options.map((option) => (
                <MenuItemSingleSelect
                  icon={false}
                  key={option}
                  onClick={(event) => {
                    event.stopPropagation();
                    setValue(option);
                    setExpanded(false);
                  }}
                  rightSlot={false}
                  role="option"
                  secondaryText={false}
                  selected={option === value}
                >
                  {option}
                </MenuItemSingleSelect>
              ))}
            </Menu>
          )
        }
        onClick={() => setExpanded((current) => !current)}
        onExpandedChange={setExpanded}
        value={value}
      />
    </FormBlock>
  );
}

function ModalRangeField({ label, unit }: { label: string; unit?: string }) {
  return (
    <FormBlock direction="row" label={label}>
      <InputNumberRange
        endInputProps={{ placeholder: "до" }}
        size="md"
        startInputProps={{ placeholder: "от" }}
        unit={unit}
      />
    </FormBlock>
  );
}

function ModalFilters() {
  return (
    <form>
      <FormSet labelWidth="200px">
        <FormBlock direction="row" label="Расположение">
        <Textfield id="filter-location" placeholder="Введите расположение" />
        </FormBlock>
        <ModalSelect
          label="Подтип недвижимости"
          options={["Студия", "Свободная планировка", "Апартаменты", "Гостинка"]}
        />
        <FormBlock direction="row" label="Комнатность">
        <SegmentedControl
          className="w-full"
          color="contrast"
          selectionMode="multiple"
          size="md"
        >
          {roominessOptions.map((room) => (
            <Segment className="flex-1" key={room} value={room}>{room}</Segment>
          ))}
        </SegmentedControl>
        </FormBlock>
        <ModalRangeField label="Площадь" unit="м²" />
        <ModalRangeField label="Цена" unit="₽" />
        <ModalRangeField label="Этаж" />
        <ModalSelect
          label="Источники"
          options={["Авито", "Циан", "Юла", "Яндекс.Недвижимость", "ДомКлик"]}
        />
        <ModalSelect label="Автор" options={["Частное лицо", "Агентство"]} />
        <ModalRangeField label="Опубликован" />
        <ModalSelect
          label="Статус"
          options={["Не выбранОтказ", "Не отвечает", "Думает", "Другое АН"]}
        />
        <ModalSelect
          label="Тип сделки"
          options={["Продажа", "Аренда долгосрочная"]}
        />
        <ModalSelect label="Объекты в выдаче" options={["Уникальные", "Все"]} />
        <ModalSelect label="Есть клиент" options={["Есть", "Все"]} />
        <ModalSelect label="Ликвидность" options={["Высокая", "Средняя"]} />
        <FormBlock direction="row" label="Содержит слова в объявлении">
        <Textarea id="filter-contains-words" placeholder="Введите слова" />
        </FormBlock>
        <FormBlock direction="row" label="Исключить слова в объявлении">
        <Textarea id="filter-exclude-words" placeholder="Введите слова" />
        </FormBlock>
        <ModalRangeField label="Год постройки" />
        <ModalSelect
          label="Тип ремонта"
          options={[
            "Косметический",
            "Требуется",
            "Дизайнерский",
            "Чистовая отделка",
            "Черновая отделка",
            "Без ремонта",
            "Предчистовая отделка",
            "Евроремонт",
          ]}
        />
      </FormSet>
    </form>
  );
}

function ToolbarFilter({
  className,
  empty = true,
  island = false,
  progressLinear = true,
  resultCount = 50,
  resp = "desk",
  ...props
}: ToolbarFilterProps) {
  const isMobile = resp === "mob";
  const [filterVersion, setFilterVersion] = React.useState(0);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = React.useState(false);
  const [modalFiltersKey, setModalFiltersKey] = React.useState(0);
  const initialRooms = empty ? [] : [roominessOptions[0]];
  const [area, setArea] = React.useState({ from: "", to: "" });
  const [price, setPrice] = React.useState({ from: "", to: "" });
  const [propertyType, setPropertyType] = React.useState(propertyTypeOptions[0]);
  const [rooms, setRooms] = React.useState<string[]>(initialRooms);
  const [wasReset, setWasReset] = React.useState(false);
  const hasChangedFilters =
    propertyType !== propertyTypeOptions[0] ||
    rooms.length !== initialRooms.length ||
    rooms.some((room) => !initialRooms.includes(room)) ||
    Boolean(area.from || area.to || price.from || price.to);
  const showClearButton = (!empty && !wasReset) || hasChangedFilters;

  function clearModalFilters() {
    setModalFiltersKey((key) => key + 1);
  }

  const filtersModal = isFiltersModalOpen && (
    <ModalContainer>
      <Modal
        footer={
          <>
            <Button
              appearance="default"
              endIcon={false}
              onClick={clearModalFilters}
              size="md"
              startIcon={false}
            >
              Очистить
            </Button>
            <Button
              appearance="primary"
              endIcon={false}
              onClick={() => setIsFiltersModalOpen(false)}
              size="md"
              startIcon={false}
            >
              Показать {new Intl.NumberFormat("ru-RU").format(resultCount)} объектов
            </Button>
          </>
        }
        maxWidth={720}
        onOpenChange={setIsFiltersModalOpen}
        open={isFiltersModalOpen}
        title="Фильтры"
      >
        <ModalFilters key={modalFiltersKey} />
      </Modal>
    </ModalContainer>
  );

  function resetFilters() {
    setFilterVersion((version) => version + 1);
    setArea({ from: "", to: "" });
    setPrice({ from: "", to: "" });
    setPropertyType(propertyTypeOptions[0]);
    setRooms(initialRooms);
    setWasReset(true);
  }

  if (isMobile) {
    return (
      <>
        <section
          key={filterVersion}
          className={cn(
            "rhood-page-gutter relative flex items-center gap-1",
            island
              ? "rounded-[var(--rh-sizing-island-border-radius)] border border-[color:var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)] py-2"
              : "border-y border-[color:var(--rh-theme-border-light)] py-2",
            className,
          )}
          {...props}
        >
        <MobileFilterButton
          empty={empty}
          onClick={() => setIsFiltersModalOpen(true)}
        />
        {showClearButton && (
          <IconButton
            appearance="ghost"
            aria-label="Сбросить фильтры"
            icon={<X aria-hidden="true" strokeWidth={2} />}
            onClick={resetFilters}
            size="sm"
          />
        )}
        <FilterSelect
          label="Квартиры"
          onValueChange={(value) => {
            setPropertyType(value);
            setWasReset(false);
          }}
          options={propertyTypeOptions}
          value={propertyType}
        />
        <FilterSelect label={empty ? "Комнаты" : "1 ком."} />
        <FilterSelect label={empty ? "Площадь" : "50–70 м²"} />
        <FilterSelect label={empty ? "Цена" : "8–12,5 млн. ₽"} />

        {!empty && progressLinear && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
            <div className="h-full w-1/2 bg-[var(--parser-fill-brand)]" />
          </div>
        )}
        </section>
        {filtersModal}
      </>
    );
  }

  return (
    <>
      <section
        className={cn(
          "rhood-page-gutter relative flex flex-wrap items-center gap-4 overflow-visible",
          island
            ? "rounded-[var(--rh-sizing-island-border-radius)] border border-[color:var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)] py-3"
            : "border-y border-[color:var(--rh-theme-border-light)] py-3",
          className,
        )}
        {...props}
      >
      <div
        key={filterVersion}
        className="flex flex-wrap items-start gap-2 overflow-visible"
      >
        <FilterSelect
          label="Квартиры"
          onValueChange={(value) => {
            setPropertyType(value);
            setWasReset(false);
          }}
          options={propertyTypeOptions}
          value={propertyType}
          widthClass="w-[150px]"
        />
        <RoominessGroup
          onValueChange={(value) => {
            setRooms(value);
            setWasReset(false);
          }}
          value={rooms}
        />
        <FilterRange
          endValue={area.to}
          onEndChange={(value) => {
            setArea((current) => ({ ...current, to: value }));
            setWasReset(false);
          }}
          onStartChange={(value) => {
            setArea((current) => ({ ...current, from: value }));
            setWasReset(false);
          }}
          suffix="м²"
          startValue={area.from}
          widthClass="w-[152px]"
        />
        <FilterRange
          groupThousands
          endValue={price.to}
          onEndChange={(value) => {
            setPrice((current) => ({ ...current, to: value }));
            setWasReset(false);
          }}
          onStartChange={(value) => {
            setPrice((current) => ({ ...current, from: value }));
            setWasReset(false);
          }}
          suffix="₽"
          startValue={price.from}
          widthClass="w-[240px]"
        />

        <Button
          appearance="default"
          counter={!empty}
          counterValue={8}
          endIcon={false}
          onClick={() => setIsFiltersModalOpen(true)}
          size="sm"
          startIcon={
            empty ? <Settings2 aria-hidden="true" strokeWidth={2} /> : false
          }
        >
          Фильтры
        </Button>
        {showClearButton && (
          <IconButton
            appearance="ghost"
            aria-label="Сбросить фильтры"
            icon={<X aria-hidden="true" strokeWidth={2} />}
            onClick={resetFilters}
            size="sm"
          />
        )}
      </div>

      {!empty && (
        <div className="flex items-center gap-1">
          <Button
            appearance="ghost"
            endIcon={false}
            size="sm"
            startIcon={<Search aria-hidden="true" strokeWidth={2} />}
          >
            Сохранить фильтры
          </Button>
        </div>
      )}

      {!empty && progressLinear && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
          <div className="h-full w-1/2 bg-[var(--parser-fill-brand)]" />
        </div>
      )}
      </section>
      {filtersModal}
    </>
  );
}

export { ToolbarFilter };
export type { ToolbarFilterProps, ToolbarFilterResp };
