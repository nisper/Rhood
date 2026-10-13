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
import { useMenuOpen } from "@/hooks/use-menu-open";

function ModalSelect({
  label,
  options,
}: {
  label: string;
  options: readonly string[];
}) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useMenuOpen(menuRef);
  const [value, setValue] = React.useState("Не выбрано");

  return (
    <div ref={menuRef}>
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
    </div>
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

function FilterFields() {
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
          appearance="contrast"
          selectionMode="multiple"
          size="md"
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
