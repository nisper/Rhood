import { ListExamples } from "./list-examples";
import { InputExamples } from "./input-examples";
import { TextareaExamples } from "./textarea-examples";
import { InputNumberExamples } from "./input-number-examples";
import { InputNumberRangeExamples } from "./input-number-range-examples";
import { ClearButtonExamples } from "./clear-button-examples";
import { IconButtonExamples } from "./icon-button-examples";
import { ButtonFavoriteExamples } from "./button-favorite-examples";
import { ChipExamples } from "./chip-examples";
import { ToggleChipExamples } from "./toggle-chip-examples";
import { TokenColorsExamples } from "./token-colors-examples";
import { TokenSizingExamples } from "./token-sizing-examples";
import { ButtonExamples } from "./button-examples";
import { LikeButtonExamples } from "./like-button-examples";
import { LinkExamples } from "./link-examples";
import { ShowcaseExamples } from "./showcase-examples";
import { ShowcaseSectionExamples } from "./showcase-section-examples";
import { CheckboxExamples } from "./checkbox-examples";
import { MenuExamples } from "./menu-examples";
import { TableExamples } from "./table-examples";
import { SelectExamples } from "./select-examples";
import { SegmentedControlExamples } from "./segmented-control-examples";
import { SearchExamples } from "./search-input-examples";
import { TabExamples } from "./tab-examples";
import { TypographyExamples } from "./typography-examples";
import { ModalExamples } from "./modal-examples";
import { ModalHeaderExamples } from "./modal-header-examples";
import { ModalFooterExamples } from "./modal-footer-examples";
import { DrawerExamples } from "./drawer-examples";
import { ObjectInfoExamples } from "./object-info-examples";
import { ObjectBuyersExamples, ObjectBuyersV2Examples } from "./object-buyers-examples";
import { AdaptiveExamples } from "./adaptive-examples";
import { FormExamples } from "./form-examples";
import { ExpandableContentExamples } from "./expandable-content-examples";
import { AvatarExamples } from "./avatar-examples";
import { CommentsExamples } from "./comments-examples";
import { MainHeaderExamples } from "./main-header-examples";
import "./component-docs.css";
import * as React from "react";
import { CodeXml, Copy, Dot } from "lucide-react";

import { AlertDefault } from "@/components/ui/alert-default";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form-label";
import { FormHelperText } from "@/components/ui/form-helper-text";
import { HelpCenter } from "@/components/ui/help-center";
import { HelpIcon } from "@/components/ui/help-icon";
import { InfoIcon } from "@/components/ui/info-icon";
import { Island } from "@/components/ui/island";
import { ListItem } from "@/components/ui/list-item";
import { MainHeader } from "@/components/ui/main-header";
import { OnboardingTooltip } from "@/components/ui/onboarding-tooltip";
import { Search } from "@/components/ui/search";
import { Snackbar } from "@/components/ui/snackbar";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { Tooltip } from "@/components/ui/tooltip";
import { ToolbarFilterExamples } from "./toolbar-filter-examples";
import { cn, matchesSearchTerms } from "@/lib/utils";

type ComponentDoc = {
  id: string;
  title: string;
  description?: string;
  figmaUrl?: string;
  group: string;
  properties?: Array<{
    name: string;
    values: string;
    defaultValue: string;
    description: string;
  }>;
  source: string;
  render: () => React.ReactNode;
};

type ComponentNavigationGroup =
  | "Foundations"
  | "Components"
  | "Layout"
  | "Features";

const componentNavigationGroups: ComponentNavigationGroup[] = [
  "Foundations",
  "Components",
  "Layout",
  "Features",
];

function getComponentNavigationGroup(
  group: string,
): ComponentNavigationGroup {
  if (group === "Foundations" || group === "Layout") return group;
  if (
    group === "Features" ||
    group === "Выдача объектов" ||
    group === "Коммуникации"
  ) return "Features";
  return "Components";
}

function Canvas({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "blue" | "dark";
}) {
  return (
    <div
      className={cn(
        "h-auto min-h-0 overflow-visible py-5",
        tone === "default" && "bg-white",
        tone === "blue" && "bg-[#c7dbff]",
        tone === "dark" && "bg-[var(--parser-fill-neutral-dark-ultra)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Matrix({
  children,
  columns = false,
}: {
  children: React.ReactNode;
  columns?: boolean;
}) {
  return (
    <div
      className={
        columns
          ? "grid gap-4 md:grid-cols-2"
          : "flex flex-wrap items-center gap-3"
      }
    >
      {children}
    </div>
  );
}

const componentDocs: ComponentDoc[] = [
  {
    id: "colors",
    title: "Colors",
    group: "Foundations",
    source: "src/tmp/palette.json · src/tmp/theme.json",
    render: () => <TokenColorsExamples />,
  },
  {
    id: "sizing",
    title: "Sizing",
    group: "Foundations",
    source: "src/tmp/sizing.json · src/tmp/style-ignore.json",
    render: () => <TokenSizingExamples />,
  },
  {
    id: "typography",
    title: "Typography",
    description:
      "Текстовые стили из Figma, доступные в коде как семантические CSS-классы.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=0-1&p=f&t=fFqfPGDMPXDzmfVo-11",
    group: "Foundations",
    source: "src/styles/typography.css · docs/tokens.md#Typography",
    render: () => <TypographyExamples />,
  },
  {
    id: "adaptive",
    title: "Adaptive",
    description: "Диапазоны ширины viewport для адаптивных интерфейсов.",
    group: "Foundations",
    source: "src/components/prototype/adaptive-examples.tsx",
    render: () => <AdaptiveExamples />,
  },
  {
    id: "showcase-surface",
    title: "Showcase surface",
    description: "Поверхность для композиции примеров в Витрине компонентов.",
    group: "Showcase",
    properties: [
      {
        name: "ShowcaseSurface.background",
        values: "muted · white",
        defaultValue: "muted",
        description:
          "Фон общей поверхности; transparent-панели показывают его.",
      },
      {
        name: "ShowcaseSurface radius",
        values: "16 px",
        defaultValue: "16 px",
        description:
          "Скругление общей поверхности, как у парных блоков Button.",
      },
      {
        name: "ShowcaseSurface padding",
        values: "4 px",
        defaultValue: "4 px",
        description: "Внутренний отступ и зазор между панелями.",
      },
      {
        name: "ShowcaseSurface.direction",
        values: "horizontal · vertical",
        defaultValue: "horizontal",
        description: "Расположение вложенных панелей в строку или столбец.",
      },
      {
        name: "ShowcaseSurface.children",
        values: "ReactNode",
        defaultValue: "—",
        description:
          "Один или несколько ShowcasePanel; число панелей задаётся их количеством.",
      },
      {
        name: "ShowcaseSurface.usedComponents",
        values: "{ title, href }[]",
        defaultValue: "—",
        description:
          "Опциональный список ссылок на компоненты, использованные в примере.",
      },
      {
        name: "ShowcasePanel.tone",
        values: "white · transparent",
        defaultValue: "white",
        description:
          "Белая карточка или прозрачная панель на фоне ShowcaseSurface.",
      },
      {
        name: "ShowcasePanel padding",
        values: "24 px по горизонтали",
        defaultValue: "24 px",
        description:
          "Внутренние горизонтальные отступы панели; вертикальные — 16 px.",
      },
      {
        name: "ShowcasePanel radius",
        values: "12 px",
        defaultValue: "12 px",
        description: "Скругление панели, как в демонстрационных блоках Button.",
      },
    ],
    source:
      "src/components/ui/showcase-surface.tsx · src/components/ui/showcase-panel.tsx",
    render: () => <ShowcaseExamples />,
  },
  {
    id: "showcase-section",
    title: "Showcase section",
    description:
      "Секция Витрины, которая объединяет заголовок, описание и пример компонента.",
    group: "Showcase",
    properties: [
      {
        name: "title",
        values: "ReactNode",
        defaultValue: "—",
        description: "Заголовок секции.",
      },
      {
        name: "description",
        values: "ReactNode",
        defaultValue: "—",
        description: "Текст, который поясняет назначение примера.",
      },
      {
        name: "showcase",
        values: "ReactNode",
        defaultValue: "—",
        description: "ShowcaseSurface с демонстрацией компонента.",
      },
      {
        name: "codeSnippet",
        values: "ReactNode",
        defaultValue: "—",
        description: "Необязательный блок кода под Showcase.",
      },
    ],
    source: "src/components/ui/showcase-section.tsx",
    render: () => <ShowcaseSectionExamples />,
  },
  {
    id: "button",
    title: "Button",
    description: "Единая кнопка из обновленного Figma-компонента.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10647-1326",
    group: "Actions",
    source: "src/components/ui/button.tsx",
    render: () => <ButtonExamples />,
  },
  {
    id: "button-favorite",
    title: "ButtonFavorite",
    description: "Кнопка добавления в избранное — компактная или с подписью.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10103-2350",
    group: "Actions",
    source: "src/components/ui/button-favorite.tsx",
    render: () => <ButtonFavoriteExamples />,
  },
  {
    id: "like-button",
    title: "LikeButton",
    description: "Круглая кнопка для отметки понравившегося объекта.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=8555-1158&t=qgpeAUwfz0SYZxkD-11",
    group: "Actions",
    source: "src/components/ui/like-button.tsx",
    render: () => <LikeButtonExamples />,
  },
  {
    id: "link",
    title: "Link",
    description: "Текстовая ссылка для перехода к связанному контенту.",
    group: "Navigation",
    source: "src/components/ui/link.tsx",
    render: () => <LinkExamples />,
  },
  {
    id: "expandable-content",
    title: "ExpandableContent",
    description: "Контейнер, который скрывает часть содержимого и раскрывает его по нажатию.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-17934",
    group: "Data display",
    properties: [
      {
        name: "collapsedHeight",
        values: "number",
        defaultValue: "—",
        description: "Обязательная высота свёрнутого содержимого в пикселях.",
      },
      {
        name: "defaultExpanded",
        values: "boolean",
        defaultValue: "false",
        description: "Начальное состояние в неконтролируемом режиме.",
      },
      {
        name: "expanded",
        values: "boolean",
        defaultValue: "—",
        description: "Текущее состояние в контролируемом режиме.",
      },
      {
        name: "onExpandedChange",
        values: "(expanded: boolean) => void",
        defaultValue: "—",
        description: "Вызывается после переключения состояния.",
      },
      {
        name: "expandLabel / collapseLabel",
        values: "ReactNode",
        defaultValue: "Читать полностью / Свернуть",
        description: "Подписи кнопки в свёрнутом и раскрытом состояниях.",
      },
      {
        name: "children",
        values: "ReactNode",
        defaultValue: "—",
        description: "Содержимое, для которого проверяется переполнение.",
      },
    ],
    source: "src/components/ui/expandable-content.tsx",
    render: () => <ExpandableContentExamples />,
  },
  {
    id: "icon-button",
    title: "IconButton",
    description: "Икон-кнопка для компактных действий.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10742-281",
    group: "Actions",
    source: "src/components/ui/icon-button.tsx",
    render: () => <IconButtonExamples />,
  },
  {
    id: "segmented-control",
    title: "Segmented control",
    description:
      "Группа взаимоисключающих сегментов для выбора одного варианта.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=8827-1349",
    group: "Actions",
    properties: [
      {
        name: "appearance",
        values: "neutral · contrast",
        defaultValue: "neutral",
        description: "Оформление поверхности и сегментов.",
      },
      {
        name: "size",
        values: "lg · md · sm",
        defaultValue: "md",
        description: "Размер всего контрола и вложенных Segment.",
      },
      {
        name: "selectionMode",
        values: "single · multiple",
        defaultValue: "single",
        description: "Выбор одного или нескольких вариантов.",
      },
      {
        name: "defaultValue",
        values: "string · string[]",
        defaultValue: "—",
        description: "Начальное значение в неконтролируемом режиме.",
      },
      {
        name: "value",
        values: "string · string[]",
        defaultValue: "—",
        description: "Текущее значение в контролируемом режиме.",
      },
      {
        name: "onValueChange",
        values: "(value) => void",
        defaultValue: "—",
        description: "Вызывается после изменения выбора.",
      },
      {
        name: "children",
        values: "ReactNode",
        defaultValue: "2 × Segment",
        description: "Вложенные варианты выбора.",
      },
    ],
    source:
      "src/components/ui/segmented-control.tsx · src/components/ui/segment.tsx",
    render: () => <SegmentedControlExamples />,
  },
  {
    id: "toggle-chip",
    title: "ToggleChip",
    description: "Переключаемый чип.",
    group: "Actions",
    source: "src/components/ui/toggle-chip.tsx",
    render: () => <ToggleChipExamples />,
  },
  {
    id: "object-buyers",
    title: "ObjectBuyers v1",
    description: "Покупатели с точным совпадением для объекта и их потребности.",
    figmaUrl:
      "https://www.figma.com/design/a0woN7V2kVcvxLLABs6sSs/%25D0%2592%25D1%258B%25D0%25B4%25D0%25B0%25D1%2587%25D0%25B0?node-id=26647-8829",
    group: "Выдача объектов",
    properties: [
      {
        name: "defaultExpanded",
        values: "boolean",
        defaultValue: "false",
        description: "Открывает список потребностей при первом рендере.",
      },
      {
        name: "isLoading",
        values: "boolean",
        defaultValue: "false",
        description: "Показывает состояние проверки покупателей.",
      },
    ],
    source: "src/components/ui/object-buyers.tsx",
    render: () => <ObjectBuyersExamples />,
  },
  {
    id: "object-buyers-v2",
    title: "ObjectBuyers v2",
    description: "Покупатели с точным совпадением в секционном представлении.",
    figmaUrl:
      "https://www.figma.com/design/a0woN7V2kVcvxLLABs6sSs/%25D0%2592%25D1%258B%25D0%25B4%25D0%25B0%25D1%2587%25D0%25B0?node-id=26647-8829",
    group: "Выдача объектов",
    properties: [
      {
        name: "isLoading",
        values: "boolean",
        defaultValue: "false",
        description: "Показывает состояние проверки покупателей.",
      },
    ],
    source: "src/components/ui/object-buyers.tsx",
    render: () => <ObjectBuyersV2Examples />,
  },
  {
    id: "object-info",
    title: "ObjectInfo",
    description:
      "Композиция информации об объекте для страницы объекта или Drawer.",
    figmaUrl:
      "https://www.figma.com/design/a0woN7V2kVcvxLLABs6sSs/%25D0%2592%25D1%258B%25D0%25B4%25D0%25B0%25D1%2587%25D0%25B0?node-id=24335-23012",
    group: "Выдача объектов",
    properties: [
      {
        name: "onClose",
        values: "() => void",
        defaultValue: "—",
        description: "Обработчик кнопки закрытия в header компонента.",
      },
    ],
    source: "src/components/ui/object-info.tsx",
    render: () => <ObjectInfoExamples />,
  },
  {
    id: "select",
    title: "Select",
    description:
      "Select используется для выбора одного или нескольких значений из списка. Подпись находится над полем и не перекрывает его содержимое.",
    group: "Forms",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=348-8648",
    source: "src/components/ui/select.tsx",
    render: () => <SelectExamples />,
  },
  {
    id: "search",
    title: "Search",
    description: "Search — поле поиска с фиксированной иконкой слева.",
    group: "Forms",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=11269-12350",
    properties: [
      {
        name: "appearance",
        values: "neutral · default",
        defaultValue: "neutral",
        description: "Нейтральный фон по умолчанию или белое поле с рамкой.",
      },
    ],
    source: "src/components/ui/search.tsx",
    render: () => <SearchExamples />,
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description: "Выбор одного элемента или нескольких элементов в группе.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=405-3391",
    group: "Forms",
    source: "src/components/ui/checkbox.tsx",
    render: () => <CheckboxExamples />,
  },
  {
    id: "clear-button",
    title: "ClearButton",
    description: "Кнопка очистки значения в однострочных текстовых полях.",
    group: "Forms",
    properties: [
      {
        name: "size",
        values: "md · sm",
        defaultValue: "md",
        description: "Размер области нажатия и иконки.",
      },
      {
        name: "state",
        values: "default · hovered",
        defaultValue: "default",
        description: "Визуальное состояние для витрины.",
      },
      {
        name: "disabled",
        values: "boolean",
        defaultValue: "false",
        description: "Блокирует действие.",
      },
      {
        name: "onClick",
        values: "MouseEventHandler",
        defaultValue: "—",
        description: "Вызывается при очистке значения.",
      },
      {
        name: "aria-label",
        values: "string",
        defaultValue: "Очистить поле",
        description: "Доступное имя кнопки.",
      },
    ],
    source: "src/components/ui/clear-button.tsx",
    render: () => <ClearButtonExamples />,
  },
  {
    id: "text-field",
    title: "Textfield",
    description: "Textfield — компонент для ввода текста в одну строку",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=505-4164",
    group: "Forms",
    properties: [
      {
        name: "appearance",
        values: "default · neutral",
        defaultValue: "default",
        description: "Белый фон с рамкой или нейтральный фон без рамки в default-состоянии.",
      },
      {
        name: "size",
        values: "md · sm",
        defaultValue: "md",
        description: "Высота, типографика и отступы поля.",
      },
      {
        name: "placeholder",
        values: "string",
        defaultValue: "Placeholder",
        description: "Подсказка внутри пустого поля.",
      },
      {
        name: "value",
        values: "string · number",
        defaultValue: "—",
        description: "Текущее значение в контролируемом режиме.",
      },
      {
        name: "defaultValue",
        values: "string · number",
        defaultValue: "—",
        description: "Начальное значение в неконтролируемом режиме.",
      },
      {
        name: "state",
        values: "default · hovered · focused",
        defaultValue: "default",
        description:
          "Визуальное состояние для витрины; hover и focus работают нативно.",
      },
      {
        name: "error",
        values: "boolean",
        defaultValue: "false",
        description: "Красная граница и focus-обводка ошибки.",
      },
      {
        name: "disabled",
        values: "boolean",
        defaultValue: "false",
        description: "Блокирует ввод и отключает интерактивные состояния.",
      },
      {
        name: "required",
        values: "boolean",
        defaultValue: "false",
        description: "Добавляет HTML-валидацию и красную звёздочку в поле.",
      },
      {
        name: "clearButton",
        values: "boolean",
        defaultValue: "false",
        description:
          "Показывает кнопку очистки только для заполненного поля в состоянии focused.",
      },
      {
        name: "onClear",
        values: "() => void",
        defaultValue: "—",
        description:
          "Вызывается после нажатия на кнопку очистки; для контролируемого поля обнови value в обработчике.",
      },
    ],
    source: "src/components/ui/text-field.tsx",
    render: () => <InputExamples />,
  },
  {
    id: "input-number",
    title: "InputNumber",
    description: "InputNumber — поле для ввода числовых значений.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=11269-12380",
    group: "Forms",
    properties: [
      {
        name: "appearance",
        values: "default · neutral",
        defaultValue: "default",
        description: "Белый фон с рамкой или нейтральный фон без рамки в default-состоянии.",
      },
      {
        name: "size",
        values: "md · sm",
        defaultValue: "md",
        description: "Высота, типографика и размер кнопки очистки.",
      },
      {
        name: "value",
        values: "string · number",
        defaultValue: "—",
        description: "Текущее числовое значение в контролируемом режиме.",
      },
      {
        name: "defaultValue",
        values: "string · number",
        defaultValue: "—",
        description: "Начальное значение в неконтролируемом режиме.",
      },
      {
        name: "inputMode",
        values: "numeric",
        defaultValue: "numeric",
        description: "Показывает цифровую клавиатуру на мобильных устройствах.",
      },
      {
        name: "Ввод",
        values: "0–9",
        defaultValue: "—",
        description:
          "Буквы, пробелы и специальные символы блокируются; вставленный текст очищается до цифр.",
      },
      {
        name: "groupThousands",
        values: "boolean",
        defaultValue: "false",
        description:
          "Отделяет группы разрядов в целой части значения пробелами.",
      },
      {
        name: "startText / endText",
        values: "ReactNode",
        defaultValue: "—",
        description: "Префикс и суффикс: например, «с» и «м²».",
      },
      {
        name: "required",
        values: "boolean",
        defaultValue: "false",
        description: "Добавляет HTML-валидацию и красную звёздочку.",
      },
      {
        name: "clearButton",
        values: "boolean",
        defaultValue: "false",
        description: "Показывает очистку заполненного focused-поля.",
      },
    ],
    source: "src/components/ui/input-number.tsx",
    render: () => <InputNumberExamples />,
  },
  {
    id: "input-number-range",
    title: "InputNumberRange",
    description:
      "Диапазон из двух InputNumber с единой внешней обводкой группы.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=11270-13059",
    group: "Forms",
    properties: [
      {
        name: "appearance",
        values: "default · neutral",
        defaultValue: "default",
        description: "Белый фон с рамкой или нейтральный фон без рамки в default-состоянии.",
      },
      {
        name: "startInputProps / endInputProps",
        values: "InputNumberProps без startText / endText",
        defaultValue: "—",
        description:
          "Props для начального и конечного значений; стили border и state управляются группой.",
      },
      {
        name: "state",
        values: "default · hovered · focused",
        defaultValue: "native",
        description:
          "Preview-состояние группы; без него hover и focus определяются по взаимодействию.",
      },
      {
        name: "error",
        values: "boolean",
        defaultValue: "false",
        description: "Показывает error-обводку на группе.",
      },
      {
        name: "disabled",
        values: "boolean",
        defaultValue: "false",
        description: "Одновременно отключает оба числовых поля.",
      },
      {
        name: "separator",
        values: "ReactNode",
        defaultValue: "–",
        description: "Разделитель между начальным и конечным значениями.",
      },
      {
        name: "unit",
        values: "ReactNode",
        defaultValue: "—",
        description: "Необязательная секция единицы измерения после конечного поля.",
      },
      {
        name: "size",
        values: "md · sm",
        defaultValue: "md",
        description: "Единый размер двух вложенных InputNumber.",
      },
    ],
    source: "src/components/ui/input-number-range.tsx",
    render: () => <InputNumberRangeExamples />,
  },
  {
    id: "textarea",
    title: "Textarea",
    description: "Многострочное текстовое поле.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=734-6530&t=Z265nVfuUs3IusXh-11",
    group: "Forms",
    properties: [
      {
        name: "appearance",
        values: "default · neutral",
        defaultValue: "default",
        description: "Белый фон с рамкой или нейтральный фон без рамки в default-состоянии.",
      },
      {
        name: "size",
        values: "md · sm",
        defaultValue: "md",
        description: "Минимальная высота, типографика и отступы поля.",
      },
      {
        name: "placeholder",
        values: "string",
        defaultValue: "Placeholder",
        description: "Подсказка внутри пустого поля.",
      },
      {
        name: "value",
        values: "string",
        defaultValue: "—",
        description: "Текущее значение в контролируемом режиме.",
      },
      {
        name: "defaultValue",
        values: "string",
        defaultValue: "—",
        description: "Начальное значение в неконтролируемом режиме.",
      },
      {
        name: "rows",
        values: "1 · 2",
        defaultValue: "1",
        description: "Высота поля для одного или двух рядов текста.",
      },
      {
        name: "state",
        values: "default · hovered · focused",
        defaultValue: "default",
        description:
          "Визуальное состояние для витрины; hover и focus работают нативно.",
      },
      {
        name: "error",
        values: "boolean",
        defaultValue: "false",
        description: "Красная граница и focus-обводка ошибки.",
      },
      {
        name: "disabled",
        values: "boolean",
        defaultValue: "false",
        description: "Блокирует ввод и отключает интерактивные состояния.",
      },
      {
        name: "required",
        values: "boolean",
        defaultValue: "false",
        description: "Добавляет HTML-валидацию поля.",
      },
      {
        name: "onChange",
        values: "ChangeEventHandler<HTMLTextAreaElement>",
        defaultValue: "—",
        description: "Вызывается при изменении текста.",
      },
    ],
    source: "src/components/ui/textarea.tsx",
    render: () => <TextareaExamples />,
  },
  {
    id: "form-label",
    title: "FormLabel",
    description: "Лейбл контрола формы.",
    group: "Forms",
    properties: [
      {
        name: "children",
        values: "ReactNode",
        defaultValue: "Label",
        description: "Текст или другое содержимое лейбла.",
      },
      {
        name: "color",
        values: "default · error · disabled",
        defaultValue: "default",
        description: "Цвет текста лейбла по его состоянию.",
      },
      {
        name: "fontWeight",
        values: "regular · medium",
        defaultValue: "regular",
        description: "Начертание текста лейбла.",
      },
      {
        name: "required",
        values: "boolean",
        defaultValue: "false",
        description: "Показывает обязательность поля звёздочкой.",
      },
      {
        name: "startIcon",
        values: "boolean",
        defaultValue: "false",
        description: "Показывает иконку перед текстом лейбла.",
      },
    ],
    source: "src/components/ui/form-label.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <FormLabel>Label</FormLabel>
          <FormLabel color="error">Label</FormLabel>
          <FormLabel color="disabled">Label</FormLabel>
          <FormLabel fontWeight="medium">Label</FormLabel>
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "form",
    title: "Form",
    description: "FormBlock объединяет лейбл с контролом, а FormSet собирает блоки формы в общий layout.",
    group: "Forms",
    properties: [
      {
        name: "FormBlock.direction",
        values: "column · row",
        defaultValue: "column",
        description: "Располагает лейбл и контрол в столбец или строку.",
      },
      {
        name: "FormBlock.gap",
        values: "CSS gap value",
        defaultValue: "4 px (column) · 16 px (row)",
        description: "Расстояние между лейблом и контролом.",
      },
      {
        name: "FormBlock.label",
        values: "ReactNode",
        defaultValue: "Label",
        description: "Содержимое FormLabel.",
      },
      {
        name: "FormBlock.labelWidth",
        values: "CSS width value",
        defaultValue: "—",
        description: "Ширина лейбла; переопределяет значение FormSet.labelWidth.",
      },
      {
        name: "FormBlock.labelProps",
        values: "FormLabelProps",
        defaultValue: "—",
        description: "Настройки FormLabel, кроме children.",
      },
      {
        name: "FormSet.direction",
        values: "column · row",
        defaultValue: "column",
        description: "Располагает вложенные FormBlock в столбец или строку.",
      },
      {
        name: "FormSet.gap",
        values: "CSS gap value",
        defaultValue: "16 px",
        description: "Расстояние между FormBlock.",
      },
      {
        name: "FormSet.labelWidth",
        values: "CSS width value",
        defaultValue: "—",
        description: "Общая ширина лейблов для всех вложенных FormBlock.",
      },
    ],
    source: "src/components/ui/form-block.tsx · src/components/ui/form-set.tsx",
    render: () => <FormExamples />,
  },
  {
    id: "form-helper-text",
    title: "FormHelperText",
    description: "Подсказка под полем.",
    group: "Forms",
    source: "src/components/ui/form-helper-text.tsx",
    render: () => (
      <Canvas>
        <div className="grid gap-2">
          <FormHelperText>Helper text</FormHelperText>
          <FormHelperText color="error">Helper text</FormHelperText>
          <FormHelperText color="warning">Helper text</FormHelperText>
          <FormHelperText color="disabled">Helper text</FormHelperText>
        </div>
      </Canvas>
    ),
  },
  {
    id: "menu",
    title: "Menu",
    description:
      "Выпадающий контейнер с пунктами одиночного и множественного выбора и разделителями.",
    group: "Forms",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-Components?node-id=436-1556",
    source:
      "src/components/ui/menu.tsx · src/components/ui/menu-item-single-select.tsx · src/components/ui/menu-item-multiselect.tsx",
    render: () => <MenuExamples />,
  },
  {
    id: "tab",
    title: "Tab",
    description:
      "Вкладка и группа вкладок с горизонтальной или вертикальной активной границей.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=464-3585",
    group: "Navigation",
    source: "src/components/ui/tab.tsx · src/components/ui/tab-bar.tsx",
    render: () => <TabExamples />,
  },
  {
    id: "island",
    title: "Island",
    description: "Белая поверхность со скруглением и внешним отступом 24 px для размещения над фоном страницы.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=11636-153",
    group: "Surfaces",
    properties: [
      {
        name: "children",
        values: "ReactNode",
        defaultValue: "—",
        description: "Содержимое поверхности.",
      },
      {
        name: "className",
        values: "string",
        defaultValue: "—",
        description: "Дополнительные классы для размера и компоновки.",
      },
      {
        name: "maxWidth",
        values: "CSSProperties[\"maxWidth\"]",
        defaultValue: "—",
        description: "Ограничивает максимальную ширину поверхности.",
      },
      {
        name: "…props",
        values: "ComponentProps&lt;\"div\"&gt;",
        defaultValue: "—",
        description: "Нативные свойства div-элемента.",
      },
    ],
    source: "src/components/ui/island.tsx",
    render: () => (
      <Canvas>
        <div className="bg-[var(--rh-theme-surface-under-islands)]">
          <Island className="h-[300px]" maxWidth={300} />
        </div>
      </Canvas>
    ),
  },
  {
    id: "main-header",
    title: "MainHeader",
    description: "Главный хедер продукта.",
    group: "Layout",
    properties: [
      {
        name: "button",
        values: "boolean",
        defaultValue: "true",
        description: "Показывает кнопку меню в mobile-варианте.",
      },
      {
        name: "contentWidth",
        values: "full · container",
        defaultValue: "full",
        description: "Ширина внутреннего содержимого хедера.",
      },
      {
        name: "controls",
        values: "boolean",
        defaultValue: "true",
        description: "Показывает help и меню профиля.",
      },
      {
        name: "logoHref",
        values: "string",
        defaultValue: "—",
        description: "Адрес перехода по логотипу.",
      },
      {
        name: "navAlign",
        values: "start · end",
        defaultValue: "start",
        description: "Выравнивание навигации внутри хедера.",
      },
      {
        name: "navItems",
        values: "MainHeaderNavItem[]",
        defaultValue: "Стандартная навигация",
        description: "Пункты навигации и их состояния.",
      },
      {
        name: "resp",
        values: "desk · mob",
        defaultValue: "desk",
        description: "Вариант хедера для desktop или mobile.",
      },
      {
        name: "…props",
        values: "ComponentProps&lt;\"header\"&gt;",
        defaultValue: "—",
        description: "Нативные свойства header-элемента.",
      },
    ],
    source: "src/components/ui/main-header.tsx",
    render: () => <MainHeaderExamples />,
  },
  {
    id: "toolbar-filter",
    title: "ToolbarFilter",
    description: "Панель фильтров.",
    group: "Выдача объектов",
    source: "src/components/ui/toolbar-filter.tsx",
    render: () => <ToolbarFilterExamples />,
  },
  {
    id: "list",
    title: "List",
    description:
      "Навигационный список с обычными и компактными строками ListItem.",
    group: "Navigation",
    source: "src/components/ui/list.tsx · src/components/ui/list-item.tsx",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-Components?node-id=654-8330",
    render: () => <ListExamples />,
  },
  {
    id: "table",
    title: "Table",
    description:
      "Table показывает сопоставимые данные в строках и колонках. Контейнер Table, строки TableRow и ячейки TableCell отвечают за вид, а данные, выбор, пагинация и сортировка принадлежат конкретному экрану.",
    group: "Data display",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-Components?node-id=416-3328",
    source: "src/components/ui/table.tsx · src/components/ui/table-row.tsx · src/components/ui/table-cell.tsx",
    render: () => <TableExamples />,
  },
  {
    id: "chip",
    title: "Chip",
    description: "Чип значения или статуса.",
    group: "Data display",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=1653-28207",
    source: "src/components/ui/chip.tsx",
    render: () => <ChipExamples />,
  },
  {
    id: "avatar",
    title: "Avatar",
    group: "Data display",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=351-8845",
    source: "src/components/ui/avatar.tsx",
    properties: [
      { name: "type", values: "image · text · icon · skeleton", defaultValue: "image", description: "Содержимое аватара." },
      { name: "imageSrc", values: "string", defaultValue: "демо-изображение", description: "Источник изображения для типа image." },
      { name: "size", values: "20px · 24px · 32px · 40px", defaultValue: "40px", description: "Диаметр аватара." },
      { name: "badge", values: "boolean", defaultValue: "false", description: "Показывает индикатор статуса." },
      { name: "children", values: "ReactNode", defaultValue: "EB", description: "Инициалы для типа text." },
    ],
    render: () => <AvatarExamples />,
  },
  {
    id: "comments",
    title: "Comments",
    description: "Статичный список комментариев с полем для нового сообщения.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=11162-3561",
    group: "Коммуникации",
    properties: [
      { name: "title", values: "string", defaultValue: "Комментарии", description: "Заголовок блока." },
      { name: "placeholder", values: "string", defaultValue: "Ваш комментарий", description: "Текст в статичном поле." },
      { name: "comments", values: "Comment[]", defaultValue: "демо-список", description: "Сообщения, отображаемые в ленте." },
      { name: "userAvatarSrc", values: "string", defaultValue: "демо-аватар", description: "Источник аватара рядом с полем." },
    ],
    source: "src/components/ui/comments.tsx",
    render: () => <CommentsExamples />,
  },
  {
    id: "alert-default",
    title: "AlertDefault",
    description: "Алерт.",
    group: "Feedback",
    source: "src/components/ui/alert-default.tsx",
    render: () => (
      <Canvas>
        <div className="grid gap-3">
          <AlertDefault color="brand" />
          <AlertDefault color="warning" />
          <AlertDefault color="error" />
        </div>
      </Canvas>
    ),
  },
  {
    id: "snackbar",
    title: "Snackbar",
    description: "Всплывающее уведомление.",
    group: "Feedback",
    source: "src/components/ui/snackbar.tsx",
    render: () => (
      <Canvas tone="dark">
        <Snackbar />
      </Canvas>
    ),
  },
  {
    id: "modal",
    title: "Modal",
    description: "Диалог для действий, которые требуют решения пользователя.",
    group: "Feedback",
    properties: [
      {
        name: "title",
        values: "ReactNode",
        defaultValue: "—",
        description: "Заголовок диалога.",
      },
      {
        name: "description",
        values: "ReactNode",
        defaultValue: "—",
        description: "Поясняющий текст под заголовком.",
      },
      {
        name: "footer",
        values: "ReactNode",
        defaultValue: "—",
        description: "Набор действий в нижней части modal.",
      },
      {
        name: "hasFooter",
        values: "boolean",
        defaultValue: "true, если передан footer",
        description: "Показывает или скрывает область footer.",
      },
      {
        name: "maxWidth",
        values: "number · CSS length",
        defaultValue: "480",
        description: "Максимальная ширина; modal сохраняет width: 100%.",
      },
      {
        name: "presentation",
        values: "dialog · bottom-sheet",
        defaultValue: "dialog",
        description:
          "Вид на desktop; на мобильном viewport modal всегда становится bottom sheet.",
      },
      {
        name: "open",
        values: "boolean",
        defaultValue: "true",
        description:
          "Управляет видимостью Modal; bottom-sheet скрывается слайдом вниз за 200 мс, ease-in-out.",
      },
      {
        name: "defaultOpen",
        values: "boolean",
        defaultValue: "true",
        description: "Начальная видимость для неконтролируемого Modal.",
      },
      {
        name: "closeButton",
        values: "boolean",
        defaultValue: "true для dialog",
        description:
          "Показывает кнопку закрытия; у bottom-sheet по умолчанию скрыта.",
      },
      {
        name: "onOpenChange",
        values: "(open: boolean) => void",
        defaultValue: "—",
        description:
          "Вызывается при закрытии крестиком или свайпом вниз; передай её в действия footer.",
      },
      {
        name: "ModalContainer.display",
        values: "viewport · embedded",
        defaultValue: "viewport",
        description:
          "Растягивает backdrop на весь viewport; клик по backdrop закрывает Modal. embedded используй внутри Showcase.",
      },
      {
        name: "ModalContainer.alignment",
        values: "center · top · bottom",
        defaultValue: "center",
        description:
          "Положение на desktop; center автоматически становится нижним на мобильном viewport.",
      },
    ],
    source: "src/components/ui/modal.tsx · src/components/ui/modal-header.tsx",
    render: () => <ModalExamples />,
  },
  {
    id: "modal-header",
    title: "ModalHeader",
    description: "Шапка modal или drawer с заголовком и кнопкой закрытия.",
    group: "Feedback",
    properties: [
      {
        name: "title",
        values: "ReactNode",
        defaultValue: "—",
        description: "Заголовок панели.",
      },
      {
        name: "closeButton",
        values: "boolean",
        defaultValue: "true",
        description: "Показывает кнопку закрытия.",
      },
      {
        name: "onClose",
        values: "() => void",
        defaultValue: "—",
        description: "Вызывается по нажатию на кнопку закрытия.",
      },
      {
        name: "description",
        values: "ReactNode",
        defaultValue: "—",
        description: "Поясняющий текст под заголовком.",
      },
    ],
    source: "src/components/ui/modal-header.tsx",
    render: () => <ModalHeaderExamples />,
  },
  {
    id: "modal-footer",
    title: "ModalFooter",
    description: "Нижняя панель действий modal или drawer.",
    group: "Feedback",
    properties: [
      {
        name: "children",
        values: "ReactNode",
        defaultValue: "—",
        description: "Кнопки и другие действия в footer.",
      },
      {
        name: "className",
        values: "string",
        defaultValue: "—",
        description: "Дополнительная компоновка, например mobile-раскладка действий.",
      },
    ],
    source: "src/components/ui/modal-footer.tsx",
    render: () => <ModalFooterExamples />,
  },
  {
    id: "drawer",
    title: "Drawer",
    description:
      "Боковая панель для работы с деталями без перехода с текущего экрана.",
    group: "Feedback",
    source: "src/components/ui/drawer.tsx",
    render: () => <DrawerExamples />,
  },
  {
    id: "tooltip",
    title: "Tooltip",
    description: "Тултип.",
    group: "Feedback",
    source: "src/components/ui/tooltip.tsx",
    render: () => (
      <Canvas>
        <Tooltip>Typography</Tooltip>
      </Canvas>
    ),
  },
  {
    id: "onboarding-tooltip",
    title: "OnboardingTooltip",
    description: "Onboarding-подсказка.",
    group: "Feedback",
    source: "src/components/ui/onboarding-tooltip.tsx",
    render: () => (
      <Canvas tone="blue">
        <Matrix columns>
          <OnboardingTooltip topArrow />
          <OnboardingTooltip bottomArrow topArrow={false} />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "help-icon",
    title: "HelpIcon",
    description: "Иконка помощи.",
    group: "Feedback",
    source: "src/components/ui/help-icon.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <HelpIcon />
          <HelpIcon state="hovered" />
          <HelpIcon size="sm" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "info-icon",
    title: "InfoIcon",
    description: "Иконка информации.",
    group: "Feedback",
    source: "src/components/ui/info-icon.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <InfoIcon />
          <InfoIcon state="hovered" />
          <InfoIcon size="sm" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "help-center",
    title: "HelpCenter",
    description: "Блок ссылок помощи.",
    group: "Feedback",
    source: "src/components/ui/help-center.tsx",
    render: () => (
      <Canvas>
        <HelpCenter />
      </Canvas>
    ),
  },
];

function getActiveComponentId() {
  const id =
    new URLSearchParams(window.location.search).get("component") ??
    componentDocs[0].id;
  if (["list-small", "list-item", "list-item-small"].includes(id))
    return "list";
  if (["table-cell", "table-row"].includes(id)) return "table";
  if (id === "segment-control") return "segmented-control";
  return [
    "menu-divider",
    "menu-single-select",
    "menu-multiselect",
    "menu-item-single-select",
    "menu-item-multiselect",
  ].includes(id)
    ? "menu"
    : id;
}

function setActiveComponentId(id: string) {
  const params = new URLSearchParams(window.location.search);

  params.set("view", "components");
  params.set("component", id);
  window.history.pushState(null, "", `?${params.toString()}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function groupDocs(items: ComponentDoc[]) {
  const groups = items.reduce<Record<string, ComponentDoc[]>>((result, item) => {
    result[item.group] = [...(result[item.group] ?? []), item];
    return result;
  }, {});

  Object.values(groups).forEach((group) =>
    group.sort((first, second) => first.title.localeCompare(second.title)),
  );

  return groups;
}

function ComponentPage({
  doc,
  onCopy,
}: {
  doc: ComponentDoc;
  onCopy?: (value: string) => void;
}) {
  return (
    <article className="min-w-0">
      <header className="bg-[var(--parser-surface-under-islands)] py-10">
        <div className="rhood-layout-container flex items-start justify-between gap-5">
          <div className="grid min-w-0 gap-2">
            <h1 className="rh-typography-h1 break-words">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="rh-typography-b1 text-[var(--parser-text-neutral-secondary)]">
                {doc.description}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-[var(--rh-sizing-base-module-0-25)] text-base leading-6">
            {doc.figmaUrl && (
              <Button
                appearance="inherit"
                endIcon={false}
                onClick={() => onCopy?.(doc.figmaUrl!)}
                size="sm"
                startIcon={
                  <span
                    aria-hidden="true"
                    className="figma-link-icon size-5 shrink-0"
                  />
                }
              >
                Figma
              </Button>
            )}
            <Button
              appearance="inherit"
              aria-label={`Скопировать адрес компонента ${doc.source}`}
              endIcon={false}
              onClick={() => onCopy?.(`\`${doc.source}\``)}
              size="sm"
              startIcon={<CodeXml aria-hidden="true" />}
            >
              Source
            </Button>
          </div>
        </div>
      </header>

      <div className="rhood-layout-container grid gap-8 py-5">
        <section className="grid min-w-0 gap-4">
          <div className="min-w-0 overflow-x-auto">{doc.render()}</div>
        </section>

        {doc.properties && (
          <section className="grid gap-4">
            <h2 className="rh-typography-h4">Свойства</h2>
            <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
              <div
                className="flex border-b border-[var(--parser-border-light)]"
                role="row"
              >
                {["Свойство", "Значения", "По умолчанию", "Назначение"].map(
                  (title, index) => (
                    <TableCell
                      helpIcon={false}
                      key={title}
                      role="head"
                      sort={false}
                      type="text"
                      width={index === 0 ? 160 : index === 2 ? 140 : "fill"}
                    >
                      {title}
                    </TableCell>
                  ),
                )}
              </div>
              {doc.properties.map((property) => (
                <div
                  className="flex border-b border-[var(--parser-border-light)] last:border-b-0"
                  key={property.name}
                  role="row"
                >
                  <TableCell role="body" type="text" width={160}>
                    {property.name}
                  </TableCell>
                  <TableCell role="body" type="text" width="fill">
                    {property.values}
                  </TableCell>
                  <TableCell role="body" type="text" width={140}>
                    {property.defaultValue}
                  </TableCell>
                  <TableCell role="body" type="text" width="fill">
                    {property.description}
                  </TableCell>
                </div>
              ))}
            </Table>
          </section>
        )}
      </div>
    </article>
  );
}

export function ComponentDocs() {
  const [activeId, setActiveId] = React.useState(getActiveComponentId);
  const [query, setQuery] = React.useState("");
  const [mobileNavigationOpen, setMobileNavigationOpen] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const mobileNavigationRef = React.useRef<HTMLElement | null>(null);
  const desktopNavigationRef = React.useRef<HTMLElement | null>(null);
  const snackbarTimer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    return () => {
      if (snackbarTimer.current !== undefined) {
        window.clearTimeout(snackbarTimer.current);
      }
    };
  }, []);

  const handleCopy = React.useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      setSnackbarVisible(true);
      if (snackbarTimer.current !== undefined) {
        window.clearTimeout(snackbarTimer.current);
      }
      snackbarTimer.current = window.setTimeout(
        () => setSnackbarVisible(false),
        2500,
      );
    },
    [],
  );

  React.useEffect(() => {
    const handlePopState = () => setActiveId(getActiveComponentId());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredDocs = componentDocs.filter((doc) =>
    matchesSearchTerms(
      `${doc.title} ${doc.group} ${doc.source} ${doc.id === "list" ? "ListItem" : ""} ${doc.id === "menu" ? "MenuSingleSelect MenuMultiselect MenuItemSingleSelect MenuItemMultiselect MenuDivider" : ""} ${doc.id === "table" ? "TableRow TableCell" : ""}`,
      query,
    ),
  );
  const activeDoc =
    componentDocs.find((doc) => doc.id === activeId) ?? componentDocs[0];
  const activeNavigationGroup = getComponentNavigationGroup(activeDoc.group);
  const visibleDocs = normalizedQuery
    ? filteredDocs
    : componentDocs.filter(
        (doc) => getComponentNavigationGroup(doc.group) === activeNavigationGroup,
      );
  const groupedDocs = groupDocs(visibleDocs);

  const handleNavigationGroupChange = (
    nextGroup: ComponentNavigationGroup,
  ) => {
    const firstDoc = componentDocs.find(
      (doc) => getComponentNavigationGroup(doc.group) === nextGroup,
    );
    if (firstDoc) setActiveComponentId(firstDoc.id);
  };

  React.useEffect(() => {
    document.title = `Design system — ${activeDoc.title}`;
  }, [activeDoc.title]);

  const focusFirstNavigationItem = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== "Tab" || event.shiftKey) return;

    const isMobileNavigation = window.matchMedia("(max-width: 767px)").matches;
    const navigation = isMobileNavigation
      ? mobileNavigationRef.current
      : desktopNavigationRef.current;
    const firstItem = navigation?.querySelector<HTMLButtonElement>(
      "button:not(:disabled)",
    );

    if (!firstItem) return;

    event.preventDefault();
    if (isMobileNavigation) setMobileNavigationOpen(true);
    window.requestAnimationFrame(() => firstItem.focus());
  };

  return (
    <div className="min-h-svh bg-[var(--parser-surface-bg)] text-[var(--parser-text-neutral-primary)]">
      <MainHeader
        controls={false}
        contentWidth="full"
        logoHref={window.location.pathname}
        navAlign="end"
        navItems={componentNavigationGroups.map((group) => ({
          active: group === activeNavigationGroup,
          label: group,
          onClick: () => handleNavigationGroupChange(group),
        }))}
      />
      <div className="grid w-full md:grid-cols-[minmax(150px,300px)_minmax(0,1fr)]">
        <aside className="w-full border-b border-[var(--parser-border-light)] md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-b-0 md:border-r">
          <div className="px-6 pt-4">
            <Search
              aria-label="Найти компонент"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={focusFirstNavigationItem}
              placeholder="Найти компонент"
              size="sm"
              value={query}
            />
          </div>
          <details
            className="group md:hidden"
            onToggle={(event) =>
              setMobileNavigationOpen(event.currentTarget.open)
            }
            open={mobileNavigationOpen || Boolean(normalizedQuery)}
          >
            <summary className="cursor-pointer px-6 py-3 text-sm">
              {activeNavigationGroup} — {activeDoc.title}
            </summary>
            <ComponentNavigation
              activeId={activeDoc.id}
              groups={groupedDocs}
              ref={mobileNavigationRef}
              showGroupHeadings={
                Boolean(normalizedQuery) ||
                activeNavigationGroup === "Components" ||
                activeNavigationGroup === "Features"
              }
            />
          </details>
          <div className="hidden md:block">
            <ComponentNavigation
              activeId={activeDoc.id}
              groups={groupedDocs}
              ref={desktopNavigationRef}
              showGroupHeadings={
                Boolean(normalizedQuery) ||
                activeNavigationGroup === "Components" ||
                activeNavigationGroup === "Features"
              }
            />
          </div>
        </aside>
        <main className="min-w-0 w-full">
          <ComponentPage
            doc={activeDoc}
            key={activeDoc.id}
            onCopy={handleCopy}
          />
        </main>
      </div>
      {snackbarVisible && (
        <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-5">
          <Snackbar
            button={false}
            close={false}
            icon={
              <Copy
                className="size-4 shrink-0 text-[color:var(--parser-text-primary-contrast)]"
                strokeWidth={2}
              />
            }
            message="Скопировано в буфер обмена"
          />
        </div>
      )}
    </div>
  );
}

const ComponentNavigation = React.forwardRef<
  HTMLElement,
  {
    activeId: string;
    groups: Record<string, ComponentDoc[]>;
    showGroupHeadings: boolean;
  }
>(function ComponentNavigation({ activeId, groups, showGroupHeadings }, ref) {
  const [focusedId, setFocusedId] = React.useState<string | undefined>();
  const celebratoryComponentIds = new Set([
    "adaptive",
    "avatar",
    "colors",
    "sizing",
    "button",
    "button-favorite",
    "chip",
    "icon-button",
    "like-button",
    "link",
    "select",
    "segmented-control",
    "toggle-chip",
    "menu",
    "tab",
    "list",
    "typography",
    "table",
    "checkbox",
    "clear-button",
    "text-field",
    "search",
    "input-number",
    "input-number-range",
    "textarea",
    "modal",
    "modal-header",
    "drawer",
    "expandable-content",
    "form",
    "form-helper-text",
    "form-label",
  ]);

  const handleItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const navigation = event.currentTarget.closest("nav");
    const items = navigation
      ? Array.from(
          navigation.querySelectorAll<HTMLButtonElement>(
            "button:not(:disabled)",
          ),
        )
      : [];
    const currentIndex = items.indexOf(event.currentTarget);

    if (currentIndex === -1) return;

    const nextIndex =
      event.key === "ArrowDown"
        ? Math.min(currentIndex + 1, items.length - 1)
        : event.key === "ArrowUp"
          ? Math.max(currentIndex - 1, 0)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? items.length - 1
              : event.key === "Tab"
                ? currentIndex + (event.shiftKey ? -1 : 1)
                : currentIndex;

    if (
      nextIndex < 0 ||
      nextIndex >= items.length ||
      nextIndex === currentIndex
    ) {
      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
      }
      return;
    }

    event.preventDefault();
    items[nextIndex].focus();
  };

  return (
    <nav aria-label="Компоненты" className="grid gap-5 px-6 py-4" ref={ref}>
      {Object.entries(groups).map(([group, items]) => (
        <section key={group}>
          {showGroupHeadings && (
            <h2 className="text-xs font-normal uppercase leading-8 tracking-[0.83px] text-[var(--parser-text-neutral-secondary)]">
              {group}
            </h2>
          )}
          <ul>
            {items.map((doc) => (
              <li key={doc.id}>
                <button
                  aria-current={doc.id === activeId ? "page" : undefined}
                  className="block w-full cursor-pointer rounded-lg text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]"
                  onBlur={() => setFocusedId(undefined)}
                  onClick={() => setActiveComponentId(doc.id)}
                  onFocus={() => setFocusedId(doc.id)}
                  onKeyDown={handleItemKeyDown}
                  type="button"
                >
                  <ListItem
                    button={false}
                    dense
                    iconButton={false}
                    secondaryText={false}
                    selected={doc.id === activeId}
                    startIcon={false}
                    state={doc.id === focusedId ? "focused" : "default"}
                    endIcon={
                      doc.group !== "Showcase" &&
                      getComponentNavigationGroup(doc.group) === "Components" &&
                      !celebratoryComponentIds.has(doc.id) ? (
                        <Dot aria-hidden="true" className="size-5" strokeWidth={2} />
                      ) : false
                    }
                  >
                    {doc.title}
                  </ListItem>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {Object.keys(groups).length === 0 && (
        <p
          role="status"
          className="text-sm leading-5 text-[var(--parser-text-neutral-secondary)]"
        >
          Ничего не найдено. Попробуй другое название.
        </p>
      )}
    </nav>
  );
});
