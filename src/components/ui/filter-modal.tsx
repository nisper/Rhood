import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormBlock } from "@/components/ui/form-block";
import { FormSet } from "@/components/ui/form-set";
import { InputNumberRange } from "@/components/ui/input-number-range";
import { Menu } from "@/components/ui/menu";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { Modal, ModalContainer } from "@/components/ui/modal";
import { Segment } from "@/components/ui/segment";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Textfield } from "@/components/ui/text-field";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { useMenuOpen } from "@/hooks/use-menu-open";

function ModalSelect({
  label,
  options,
  toggleOptions = false,
  multipleOptions = false,
}: {
  label: string;
  options: readonly string[];
  toggleOptions?: boolean;
  multipleOptions?: boolean;
}) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useMenuOpen(menuRef);
  const [value, setValue] = React.useState("Не выбрано");
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  if (toggleOptions) {
    return (
      <FormBlock direction="row" label={label}>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <ToggleChip
              checked={multipleOptions ? selectedValues.includes(option) : option === value}
              icon={false}
              key={option}
              onCheckedChange={(checked) => {
                if (multipleOptions) {
                  setSelectedValues((current) => checked
                    ? [...current, option]
                    : current.filter((selectedOption) => selectedOption !== option));
                } else {
                  setValue(checked ? option : "Не выбрано");
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
    <FormBlock direction="row" label={label}>
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
    </div>
  );
}

function ModalRangeField({ label, unit }: { label: string; unit?: string }) {
  return (
    <FormBlock direction="row" label={label}>
      <InputNumberRange
        appearance="neutral"
        endInputProps={{ placeholder: "до" }}
        size="lg"
        startInputProps={{ placeholder: "от" }}
        unit={unit}
      />
    </FormBlock>
  );
}

function FilterFields() {
  return (
    <form>
      <FormSet gap="calc(var(--spacing) * 6)" labelWidth="200px">
        <FormBlock direction="row" label="Расположение">
        <Textfield appearance="neutral" id="filter-location" placeholder="Введите расположение" size="lg" />
        </FormBlock>
        <ModalSelect
          label="Подтип недвижимости"
          options={["Студия", "Свободная планировка", "Апартаменты", "Гостинка"]}
          toggleOptions
        />
        <FormBlock direction="row" label="Комнатность">
        <SegmentedControl
          className="w-full"
          appearance="neutral"
          selectionMode="multiple"
          size="lg"
        >
          {["Студия", "1", "2", "3", "4+"].map((room) => (
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
          toggleOptions
          multipleOptions
        />
        <ModalSelect label="Автор" options={["Частное лицо", "Агентство"]} toggleOptions />
        <ModalRangeField label="Опубликован" />
        <ModalSelect
          label="Статус"
          options={["Не выбран", "Отказ", "Не отвечает", "Думает", "Другое АН"]}
          toggleOptions
          multipleOptions
        />
        <ModalSelect
          label="Тип сделки"
          options={["Продажа", "Аренда долгосрочная"]}
          toggleOptions
        />
        <ModalSelect label="Объекты в выдаче" options={["Уникальные", "Все"]} toggleOptions />
        <ModalSelect label="Есть клиент" options={["Есть", "Все"]} toggleOptions />
        <ModalSelect label="Ликвидность" options={["Высокая", "Средняя"]} toggleOptions />
        <FormBlock direction="row" label="Содержит слова в объявлении">
        <Textarea appearance="neutral" id="filter-contains-words" placeholder="Введите слова" size="lg" />
        </FormBlock>
        <FormBlock direction="row" label="Исключить слова в объявлении">
        <Textarea appearance="neutral" id="filter-exclude-words" placeholder="Введите слова" size="lg" />
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
          toggleOptions
          multipleOptions
        />
      </FormSet>
    </form>
  );
}

type FilterModalProps = {
  onClear?: () => void;
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  resultCount?: number;
  containerDisplay?: React.ComponentProps<typeof ModalContainer>["display"];
  containerClassName?: string;
};

function FilterModal({
  containerClassName,
  containerDisplay = "viewport",
  onClear,
  onOpenChange,
  open,
  resultCount = 50,
}: FilterModalProps) {
  const [fieldsKey, setFieldsKey] = React.useState(0);

  return (
    <ModalContainer
      className={cn(
        containerDisplay === "embedded" && "bg-transparent",
        containerClassName,
      )}
      display={containerDisplay}
    >
      <Modal
        footer={
          <>
            <Button appearance="default" endIcon={false} onClick={() => { setFieldsKey((key) => key + 1); onClear?.(); }} size="md" startIcon={false}>Очистить</Button>
            <Button appearance="primary" endIcon={false} onClick={() => onOpenChange?.(false)} size="md" startIcon={false}>Показать {new Intl.NumberFormat("ru-RU").format(resultCount)} объектов</Button>
          </>
        }
        maxWidth={720}
        onOpenChange={onOpenChange}
        open={open}
        title="Фильтры"
      >
        <FilterFields key={fieldsKey} />
      </Modal>
    </ModalContainer>
  );
}

export { FilterModal };
export type { FilterModalProps };
