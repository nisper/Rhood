import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExpandableContent } from "@/components/ui/expandable-content";
import { FormBlock } from "@/components/ui/form-block";
import { FormSet } from "@/components/ui/form-set";
import { InputNumberRange } from "@/components/ui/input-number-range";
import { Menu } from "@/components/ui/menu";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { Modal, ModalContainer } from "@/components/ui/modal";
import { createDefaultFilterModalValues, type FilterModalValues } from "@/components/ui/filter-modal-values";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Textfield } from "@/components/ui/text-field";
import { Tab } from "@/components/ui/tab";
import { TabBar } from "@/components/ui/tab-bar";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { useMenuOpen } from "@/hooks/use-menu-open";

function ModalSelect({
  allowDeselect = true,
  defaultValue,
  label,
  options,
  toggleOptions = false,
  multipleOptions = false,
  selectedValue: controlledValue,
  selectedValues: controlledSelectedValues,
  onValueChange,
  onSelectedValuesChange,
}: {
  allowDeselect?: boolean;
  defaultValue?: string;
  label: string;
  options: readonly string[];
  toggleOptions?: boolean;
  multipleOptions?: boolean;
  selectedValue?: string;
  selectedValues?: string[];
  onValueChange?: (value: string) => void;
  onSelectedValuesChange?: (values: string[]) => void;
}) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useMenuOpen(menuRef);
  const [value, setValue] = React.useState(defaultValue ?? "Не выбрано");
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const resolvedValue = controlledValue ?? value;
  const resolvedSelectedValues = controlledSelectedValues ?? selectedValues;

  if (toggleOptions) {
    return (
      <FormBlock controlSize="md" direction="row" label={label}>
        <div className={cn("flex flex-wrap", multipleOptions ? "gap-[var(--rh-sizing-base-module-0-75)]" : "gap-1")}>
          {options.map((option) => (
            <ToggleChip
              checked={multipleOptions ? resolvedSelectedValues.includes(option) : option === resolvedValue}
              icon={false}
              key={option}
              onCheckedChange={(checked) => {
                if (multipleOptions) {
                  const nextValues = checked
                    ? [...resolvedSelectedValues, option]
                    : resolvedSelectedValues.filter((selectedOption) => selectedOption !== option);
                  if (controlledSelectedValues === undefined) setSelectedValues(nextValues);
                  onSelectedValuesChange?.(nextValues);
                } else if (checked || allowDeselect) {
                  const nextValue = checked ? option : "Не выбрано";
                  if (controlledValue === undefined) setValue(nextValue);
                  onValueChange?.(nextValue);
                }
              }}
              size="md"
            >
              {option}
            </ToggleChip>
          ))}
        </div>
      </FormBlock>
    );
  }

  return (
    <div ref={menuRef}>
    <FormBlock controlSize="lg" direction="row" label={label}>
      <Select
        appearance="neutral"
        expanded={expanded}
        fullWidth
        label={false}
        size="lg"
        menu={
          expanded && (
            <Menu className="absolute left-0 top-full z-20 mt-1 min-w-full" role="listbox">
              {options.map((option) => (
                <MenuItemSingleSelect
                  icon={false}
                  key={option}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (controlledValue === undefined) setValue(option);
                    onValueChange?.(option);
                    setExpanded(false);
                  }}
                  rightSlot={false}
                  role="option"
                  secondaryText={false}
                  selected={option === resolvedValue}
                >
                  {option}
                </MenuItemSingleSelect>
              ))}
            </Menu>
          )
        }
        onClick={() => setExpanded((current) => !current)}
        onExpandedChange={setExpanded}
        value={resolvedValue}
      />
    </FormBlock>
    </div>
  );
}

function ModalRangeField({
  label,
  unit,
  startValue,
  endValue,
  onChange,
}: {
  label: string;
  unit?: string;
  startValue: string;
  endValue: string;
  onChange: (startValue: string, endValue: string) => void;
}) {
  return (
    <FormBlock direction="row" label={label}>
      <InputNumberRange
        appearance="neutral"
        endInputProps={{ onChange: (event) => onChange(startValue, event.target.value), placeholder: "до", value: endValue }}
        size="lg"
        startInputProps={{ onChange: (event) => onChange(event.target.value, endValue), placeholder: "от", value: startValue }}
        unit={unit}
      />
    </FormBlock>
  );
}

function FilterFields({
  values,
  onValuesChange,
}: {
  values: FilterModalValues;
  onValuesChange: (values: FilterModalValues) => void;
}) {
  const update = (patch: Partial<FilterModalValues>) => onValuesChange({ ...values, ...patch });

  return (
    <div>
      <FormSet gap="calc(var(--spacing) * 5)" labelWidth="200px">
        <FormBlock controlSize="lg" direction="row" label="Расположение">
        <Textfield appearance="neutral" id="filter-location" onChange={(event) => update({ location: event.target.value })} placeholder="Введите расположение" size="lg" value={values.location} />
        </FormBlock>
        <ModalSelect
          label="Комнатность"
          options={["Студия", "1", "2", "3", "4+"]}
          toggleOptions
          multipleOptions
          selectedValues={values.roominess}
          onSelectedValuesChange={(roominess) => update({ roominess })}
        />
        <ModalRangeField endValue={values.areaEnd} label="Площадь" onChange={(areaStart, areaEnd) => update({ areaStart, areaEnd })} startValue={values.areaStart} unit="м²" />
        <ModalRangeField endValue={values.priceEnd} label="Цена" onChange={(priceStart, priceEnd) => update({ priceStart, priceEnd })} startValue={values.priceStart} unit="₽" />
        <ModalRangeField endValue={values.floorEnd} label="Этаж" onChange={(floorStart, floorEnd) => update({ floorStart, floorEnd })} startValue={values.floorStart} />
        <ModalSelect
          label="Источники"
          options={["Авито", "Циан", "Юла", "Яндекс.Недвижимость", "ДомКлик"]}
          toggleOptions
          multipleOptions
          selectedValues={values.source}
          onSelectedValuesChange={(source) => update({ source })}
        />
        <ModalSelect label="Автор" options={["Частное лицо", "Агентство"]} selectedValue={values.author} onValueChange={(author) => update({ author })} toggleOptions />
        <ModalSelect
          label="Тип сделки"
          options={["Продажа", "Аренда долгосрочная"]}
          toggleOptions
          selectedValue={values.dealType}
          onValueChange={(dealType) => update({ dealType })}
        />
        <ModalSelect allowDeselect={false} defaultValue="Все" label="Объекты в выдаче" options={["Все", "Уникальные"]} selectedValue={values.listingType} onValueChange={(listingType) => update({ listingType })} toggleOptions />
        <ModalSelect allowDeselect={false} defaultValue="Все" label="Есть клиент" options={["Все", "Есть"]} selectedValue={values.hasClient} onValueChange={(hasClient) => update({ hasClient })} toggleOptions />
        <ExpandableContent
          collapseLabel="Дополнительные параметры"
          collapsedHeight={0}
          className="w-full"
          expandLabel="Дополнительные параметры"
          triggerClassName="mt-4"
        >
          <FormSet gap="calc(var(--spacing) * 5)" labelWidth="200px">
            <ModalSelect
              label="Подтип недвижимости"
              options={["Студия", "Свободная планировка", "Апартаменты", "Гостинка"]}
              toggleOptions
              multipleOptions
              selectedValues={values.propertySubtype}
              onSelectedValuesChange={(propertySubtype) => update({ propertySubtype })}
            />
            <ModalSelect label="Ликвидность" options={["Высокая", "Средняя"]} selectedValue={values.liquidity} onValueChange={(liquidity) => update({ liquidity })} toggleOptions />
            <ModalSelect
              label="Статус"
              options={["Не выбран", "Отказ", "Не отвечает", "Думает", "Другое АН"]}
              toggleOptions
              multipleOptions
              selectedValues={values.status}
              onSelectedValuesChange={(status) => update({ status })}
            />
            <ModalRangeField endValue={values.publishedEnd} label="Опубликован" onChange={(publishedStart, publishedEnd) => update({ publishedStart, publishedEnd })} startValue={values.publishedStart} />
            <FormBlock controlSize="lg" direction="row" label="Содержит слова в объявлении">
              <Textarea appearance="neutral" id="filter-contains-words" onChange={(event) => update({ containsWords: event.target.value })} placeholder="Введите слова" size="lg" value={values.containsWords} />
            </FormBlock>
            <FormBlock controlSize="lg" direction="row" label="Исключить слова в объявлении">
              <Textarea appearance="neutral" id="filter-exclude-words" onChange={(event) => update({ excludeWords: event.target.value })} placeholder="Введите слова" size="lg" value={values.excludeWords} />
            </FormBlock>
            <ModalRangeField endValue={values.yearEnd} label="Год постройки" onChange={(yearStart, yearEnd) => update({ yearStart, yearEnd })} startValue={values.yearStart} />
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
              toggleOptions
              multipleOptions
              selectedValues={values.renovation}
              onSelectedValuesChange={(renovation) => update({ renovation })}
            />
          </FormSet>
        </ExpandableContent>
      </FormSet>
    </div>
  );
}

type FilterModalProps = {
  onClear?: () => void;
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  resultCount?: number;
  containerDisplay?: React.ComponentProps<typeof ModalContainer>["display"];
  containerClassName?: string;
  onSave?: () => void;
  onApply?: () => void;
  savedFilterLimitReached?: boolean;
  values?: FilterModalValues;
  onValuesChange?: (values: FilterModalValues) => void;
  savedSearchesContent?: React.ReactNode;
};

function FilterModal({
  containerClassName,
  containerDisplay = "viewport",
  onClear,
  onOpenChange,
  open,
  resultCount = 50,
  onSave,
  onApply,
  savedFilterLimitReached = false,
  values: controlledValues,
  onValuesChange,
  savedSearchesContent,
}: FilterModalProps) {
  const [activeTab, setActiveTab] = React.useState<"filter" | "saved-searches">("filter");
  const [savedSearchesModalHeight, setSavedSearchesModalHeight] = React.useState<number>();
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const filterPanelRef = React.useRef<HTMLDivElement>(null);
  const [uncontrolledValues, setUncontrolledValues] = React.useState(createDefaultFilterModalValues);
  const values = controlledValues ?? uncontrolledValues;
  const updateValues = (next: FilterModalValues) => {
    if (controlledValues === undefined) setUncontrolledValues(next);
    onValuesChange?.(next);
  };
  const isModified = Object.entries(values).some(([key, value]) => {
    const initialValue = createDefaultFilterModalValues()[key as keyof FilterModalValues];
    return Array.isArray(value) ? value.length > 0 : value !== initialValue;
  });
  const tabs = [
    { id: "filter", label: "Фильтр" },
    { id: "saved-searches", label: "Сохранённые поиски" },
  ] as const;

  function selectTab(tabId: (typeof tabs)[number]["id"]) {
    if (tabId === "saved-searches") {
      const dialog = filterPanelRef.current?.closest<HTMLElement>('[role="dialog"]');
      setSavedSearchesModalHeight(dialog?.getBoundingClientRect().height);
    } else {
      setSavedSearchesModalHeight(undefined);
    }

    setActiveTab(tabId);
  }

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const nextIndex = event.key === "ArrowRight"
      ? (index + 1) % tabs.length
      : event.key === "ArrowLeft"
        ? (index - 1 + tabs.length) % tabs.length
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : -1;

    if (nextIndex < 0) return;
    event.preventDefault();
    selectTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <ModalContainer
      className={cn(
        containerDisplay === "embedded" && "bg-transparent",
        containerClassName,
      )}
      display={containerDisplay}
    >
      <Modal
        headerContent={(
          <TabBar aria-label="Раздел фильтра" indicator={false} role="tablist">
            {tabs.map((tab, index) => {
              const selected = activeTab === tab.id;

              return (
                <button
                  aria-controls={`filter-modal-panel-${tab.id}`}
                  aria-selected={selected}
                  className="border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)]"
                  id={`filter-modal-tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => selectTab(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  role="tab"
                  tabIndex={selected ? 0 : -1}
                  type="button"
                >
                  <Tab indicator={false} label={tab.label} selected={selected} size="h4" />
                </button>
              );
            })}
          </TabBar>
        )}
        footer={activeTab === "filter" ? (
          <>
            {onSave && isModified && !savedFilterLimitReached && <Button appearance="ghost" className="mr-auto" endIcon={false} onClick={onSave} size="md" startIcon={false}>Сохранить фильтр</Button>}
            <Button appearance="default" endIcon={false} onClick={() => { updateValues(createDefaultFilterModalValues()); onClear?.(); }} size="md" startIcon={false}>Очистить</Button>
            <Button appearance="primary" endIcon={false} onClick={() => { onApply?.(); onOpenChange?.(false); }} size="md" startIcon={false}>Показать {new Intl.NumberFormat("ru-RU").format(resultCount)} объектов</Button>
          </>
        ) : undefined}
        maxWidth={720}
        onOpenChange={onOpenChange}
        open={open}
        style={activeTab === "saved-searches" && savedSearchesModalHeight
          ? { height: savedSearchesModalHeight }
          : undefined}
        title="Фильтры"
      >
        <div className="grid gap-5">
          <div
            aria-labelledby="filter-modal-tab-filter"
            className={activeTab === "filter" ? "grid" : "hidden"}
            id="filter-modal-panel-filter"
            ref={filterPanelRef}
            role="tabpanel"
            tabIndex={0}
          >
            <FilterFields onValuesChange={updateValues} values={values} />
          </div>
          <div
            aria-labelledby="filter-modal-tab-saved-searches"
            className={activeTab === "saved-searches" ? "grid min-h-0" : "hidden"}
            id="filter-modal-panel-saved-searches"
            role="tabpanel"
            tabIndex={0}
          >
            {savedSearchesContent ?? <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">Пока нет сохранённых поисков.</p>}
          </div>
        </div>
      </Modal>
    </ModalContainer>
  );
}

export { FilterModal };
export type { FilterModalProps };
