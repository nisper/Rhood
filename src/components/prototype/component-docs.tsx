import { ListExamples } from "./list-examples";
import { MenuExamples } from "./menu-examples";
import { TableExamples } from "./table-examples";
import "./component-docs.css";
import * as React from "react";
import { Search } from "lucide-react";

import { AddAnyFile } from "@/components/ui/add-any-file";
import { AddPhotos } from "@/components/ui/add-photos";
import { AlertDefault } from "@/components/ui/alert-default";
import { Avatar } from "@/components/ui/avatar";
import { Button, type ButtonSize } from "@/components/ui/button";
import { ButtonFavorite } from "@/components/ui/button-favorite";
import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";
import { ConfirmCode } from "@/components/ui/confirm-code";
import { DateInput } from "@/components/ui/date-input";
import { FormControlLabel } from "@/components/ui/form-control-label";
import { FormHelperText } from "@/components/ui/form-helper-text";
import { HelpCenter } from "@/components/ui/help-center";
import { HelpIcon } from "@/components/ui/help-icon";
import {
  IconButton,
  type IconButtonAppearance,
  type IconButtonSize,
} from "@/components/ui/icon-button";
import { Indicator } from "@/components/ui/indicator";
import { InfoIcon } from "@/components/ui/info-icon";
import { LikeButton } from "@/components/ui/like-button";
import { ListItem } from "@/components/ui/list-item";
import { MainHeader } from "@/components/ui/main-header";
import { MainHeaderMenuButton } from "@/components/ui/main-header-menu-button";
import { OnboardingTooltip } from "@/components/ui/onboarding-tooltip";
import { PageTitle } from "@/components/ui/page-title";
import { Pagination } from "@/components/ui/pagination";
import { PaginationAlt } from "@/components/ui/pagination-alt";
import { PaginationButton } from "@/components/ui/pagination-button";
import { PasswordField } from "@/components/ui/password-field";
import { ProgressLinear } from "@/components/ui/progress-linear";
import { RangeInput } from "@/components/ui/range-input";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { SelectGhost } from "@/components/ui/select-ghost";
import { ShowMore } from "@/components/ui/show-more";
import { Snackbar } from "@/components/ui/snackbar";
import { Tab } from "@/components/ui/tab";
import { TabBar } from "@/components/ui/tab-bar";
import { Tag } from "@/components/ui/tag";
import { TextField } from "@/components/ui/text-field";
import { TextFieldMultiline } from "@/components/ui/text-field-multiline";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { ToolbarFilter } from "@/components/ui/toolbar-filter";
import { Tooltip } from "@/components/ui/tooltip";
import { UploadedDocument } from "@/components/ui/uploaded-document";
import { cn } from "@/lib/utils";

type ComponentDoc = {
  id: string;
  title: string;
  description: string;
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

const buttonSizes: ButtonSize[] = ["md", "sm", "xsm"];
const iconButtonAppearances: IconButtonAppearance[] = [
  "primary",
  "secondary",
  "ghost",
  "contrast",
  "inherit",
];
const iconButtonSizes: IconButtonSize[] = ["md", "sm", "xsm"];

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

function PreviewItem({
  label,
  labelClassName,
  children,
}: {
  label: string;
  labelClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex w-fit flex-col pt-5">
      <p
        className={cn(
          "absolute left-0 top-0 whitespace-nowrap text-xs leading-4 text-[var(--parser-text-neutral-secondary)]",
          labelClassName,
        )}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

const componentDocs: ComponentDoc[] = [
  {
    id: "button",
    title: "Button",
    description: "Единая кнопка из обновленного Figma-компонента.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10647-1326",
    group: "Actions",
    properties: [
      {
        name: "appearance",
        values:
          "primary · secondary · ghost · destructive · inherit · contrast",
        defaultValue: "primary",
        description: "Визуальный стиль и допустимый контекст применения.",
      },
      {
        name: "size",
        values: "md · sm · xsm",
        defaultValue: "md",
        description: "Размер кнопки, текста и иконок.",
      },
      {
        name: "state",
        values: "default · hover",
        defaultValue: "default",
        description: "Визуальное состояние для витрины и тестирования.",
      },
      {
        name: "disabled",
        values: "true · false",
        defaultValue: "false",
        description: "Блокирует взаимодействие и применяет disabled-состояние.",
      },
      {
        name: "children / label",
        values: "ReactNode",
        defaultValue: "Label",
        description: "Текст действия.",
      },
      {
        name: "startIcon",
        values: "ReactNode · true · false",
        defaultValue: "true",
        description: "Иконка слева от label.",
      },
      {
        name: "endIcon",
        values: "ReactNode · true · false",
        defaultValue: "true",
        description: "Иконка справа от label.",
      },
      {
        name: "counter",
        values: "true · false",
        defaultValue: "false",
        description: "Счётчик рядом с label.",
      },
    ],
    source: "src/components/ui/button.tsx",
    render: () => (
      <div className="grid gap-6">
        <section className="grid gap-3">
          <h3 className="text-sm font-semibold leading-5">
            Стиль · appearance
          </h3>
          <Canvas className="rounded-xl p-4">
            <Matrix>
              <PreviewItem label="primary">
                <Button appearance="primary">Label</Button>
              </PreviewItem>
              <PreviewItem label="secondary">
                <Button appearance="secondary">Label</Button>
              </PreviewItem>
              <PreviewItem label="ghost">
                <Button appearance="ghost">Label</Button>
              </PreviewItem>
              <PreviewItem label="destructive">
                <Button appearance="destructive">Label</Button>
              </PreviewItem>
            </Matrix>
          </Canvas>
          <Canvas className="rounded-xl p-4" tone="blue">
            <div className="text-[var(--parser-text-brand)]">
              <PreviewItem label="inherit">
                <Button appearance="inherit">Label</Button>
              </PreviewItem>
            </div>
          </Canvas>
          <Canvas className="rounded-xl p-4" tone="dark">
            <PreviewItem
              label="contrast"
              labelClassName="text-[var(--parser-text-primary-contrast)]"
            >
              <Button appearance="contrast">Label</Button>
            </PreviewItem>
          </Canvas>
        </section>

        <section className="grid gap-3">
          <h3 className="text-sm font-semibold leading-5">Размер · size</h3>
          <Canvas className="rounded-xl p-4">
            <Matrix>
              {buttonSizes.map((size) => (
                <PreviewItem key={size} label={size}>
                  <Button size={size}>Label</Button>
                </PreviewItem>
              ))}
            </Matrix>
          </Canvas>
        </section>

        <section className="grid gap-3">
          <h3 className="text-sm font-semibold leading-5">
            Состояние · state, disabled
          </h3>
          <Canvas className="rounded-xl p-4">
            <Matrix>
              <PreviewItem label="default">
                <Button>Label</Button>
              </PreviewItem>
              <PreviewItem label="hover">
                <Button state="hover">Label</Button>
              </PreviewItem>
              <PreviewItem label="disabled">
                <Button disabled>Label</Button>
              </PreviewItem>
            </Matrix>
          </Canvas>
          <Canvas className="rounded-xl p-4" tone="dark">
            <PreviewItem
              label="contrast + disabled"
              labelClassName="text-[var(--parser-text-primary-contrast)]"
            >
              <Button appearance="contrast" disabled>
                Label
              </Button>
            </PreviewItem>
          </Canvas>
        </section>

        <section className="grid gap-3">
          <h3 className="text-sm font-semibold leading-5">
            Состав · startIcon, endIcon, counter
          </h3>
          <Canvas className="rounded-xl p-4">
            <Matrix>
              <PreviewItem label="без иконок">
                <Button endIcon={false} startIcon={false}>
                  Label
                </Button>
              </PreviewItem>
              <PreviewItem label="startIcon">
                <Button endIcon={false}>Label</Button>
              </PreviewItem>
              <PreviewItem label="endIcon">
                <Button startIcon={false}>Label</Button>
              </PreviewItem>
              <PreviewItem label="counter">
                <Button counter endIcon={false} startIcon={false}>
                  Label
                </Button>
              </PreviewItem>
            </Matrix>
          </Canvas>
        </section>
      </div>
    ),
  },
  {
    id: "button-favorite",
    title: "ButtonFavorite",
    description: "Кнопка добавления в избранное.",
    group: "Actions",
    source: "src/components/ui/button-favorite.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <ButtonFavorite />
          <ButtonFavorite checked />
          <ButtonFavorite size="sm" />
          <ButtonFavorite checked size="sm" state="hovered" />
          <ButtonFavorite size="xsm" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "like-button",
    title: "LikeButton",
    description: "Кнопка лайка.",
    group: "Actions",
    source: "src/components/ui/like-button.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <LikeButton />
          <LikeButton checked />
          <LikeButton state="hover" />
          <LikeButton checked state="hover" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "icon-button",
    title: "IconButton",
    description: "Единая икон-кнопка из обновленного Figma-компонента.",
    group: "Actions",
    source: "src/components/ui/icon-button.tsx",
    render: () => (
      <div className="grid gap-5">
        {iconButtonAppearances.map((appearance) => (
          <div className="grid gap-2" key={appearance}>
            <h3 className="text-sm font-semibold uppercase text-[var(--parser-text-neutral-secondary)]">
              {appearance}
            </h3>
            <Canvas tone={appearance === "contrast" ? "dark" : "default"}>
              <Matrix>
                {iconButtonSizes.map((size) => (
                  <IconButton
                    appearance={appearance}
                    key={`${appearance}-${size}`}
                    size={size}
                  />
                ))}
                <IconButton appearance={appearance} state="hovered" />
                <IconButton appearance={appearance} disabled />
              </Matrix>
            </Canvas>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "toggle-button",
    title: "ToggleButton",
    description: "Переключатель в виде кнопки.",
    group: "Actions",
    source: "src/components/ui/toggle-button.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <ToggleButton size="lg" />
          <ToggleButton selected size="md" />
          <ToggleButton size="sm" state="hover" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "toggle-button-group",
    title: "ToggleButtonGroup",
    description: "Группа переключателей.",
    group: "Actions",
    source: "src/components/ui/toggle-button-group.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <ToggleButtonGroup size="lg" />
          <ToggleButtonGroup size="md" />
          <ToggleButtonGroup color="contrast" size="sm" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "toggle-chip",
    title: "ToggleChip",
    description: "Переключаемый чип.",
    group: "Actions",
    source: "src/components/ui/toggle-chip.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <ToggleChip size="lg" />
          <ToggleChip checked size="md" />
          <ToggleChip size="sm" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "select",
    title: "Select",
    description: "Поле выбора.",
    group: "Forms",
    source: "src/components/ui/select.tsx",
    render: () => (
      <Canvas>
        <div className="grid max-w-[520px] gap-3">
          <Select
            content="text"
            helperText="Helper text"
            label="Label"
            topLabel="dynamic"
            value="Value"
          />
          <Select
            content="chips"
            helperText="Helper text"
            label="Label"
            topLabel="dynamic"
          />
          <Select
            content="text"
            error
            helperText="Helper text"
            label="Label"
            state="focused"
            topLabel="dynamic"
            value="Value"
          />
          <Select
            content="text"
            disabled
            helperText="Helper text"
            label="Label"
            topLabel="dynamic"
            value="Value"
          />
        </div>
      </Canvas>
    ),
  },
  {
    id: "select-ghost",
    title: "SelectGhost",
    description: "Легкое поле выбора для компактных поверхностей.",
    group: "Forms",
    source: "src/components/ui/select-ghost.tsx",
    render: () => (
      <Canvas>
        <div className="grid max-w-[360px] gap-3">
          <SelectGhost />
          <SelectGhost error state="focused" />
          <SelectGhost expanded state="focused" />
          <SelectGhost disabled />
        </div>
      </Canvas>
    ),
  },
  {
    id: "search-input",
    title: "SearchInput",
    description: "Поисковое поле.",
    group: "Forms",
    source: "src/components/ui/search-input.tsx",
    render: () => (
      <Canvas>
        <div className="grid max-w-[520px] gap-3">
          <SearchInput empty placeholder="Поиск" />
          <SearchInput empty={false} placeholder="Поиск" value="Value" />
          <SearchInput error empty placeholder="Поиск" />
          <SearchInput disabled empty placeholder="Поиск" />
        </div>
      </Canvas>
    ),
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description: "Выбор одного элемента или нескольких элементов в группе.",
    figmaUrl:
      "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=405-3391",
    group: "Forms",
    properties: [
      {
        name: "size",
        values: "md · sm",
        defaultValue: "md",
        description: "Размер control и текста label.",
      },
      {
        name: "checked",
        values: "true · false",
        defaultValue: "false",
        description:
          "Значение в контролируемом режиме; используй вместе с onChange.",
      },
      {
        name: "defaultChecked",
        values: "true · false",
        defaultValue: "false",
        description: "Начальное значение в неконтролируемом режиме.",
      },
      {
        name: "indeterminate",
        values: "true · false",
        defaultValue: "false",
        description:
          "Частичный выбор группы; используй только вместе с checked=true.",
      },
      {
        name: "disabled",
        values: "true · false",
        defaultValue: "false",
        description: "Блокирует взаимодействие и применяет disabled-состояние.",
      },
      {
        name: "error",
        values: "true · false",
        defaultValue: "false",
        description: "Показывает ошибку для невыбранного Checkbox.",
      },
      {
        name: "label",
        values: "true · false",
        defaultValue: "true",
        description: "Показывает текст рядом с control.",
      },
      {
        name: "skeleton",
        values: "true · false",
        defaultValue: "false",
        description: "Показывает загрузочную заглушку вместо control и label.",
      },
    ],
    source: "src/components/ui/checkbox.tsx",
    render: () => (
      <Canvas>
        <div className="grid gap-6">
          <section className="grid gap-3">
            <h3 className="text-sm font-semibold leading-5">Размер · size</h3>
            <Matrix>
              <PreviewItem label="md">
                <Checkbox size="md" />
              </PreviewItem>
              <PreviewItem label="sm">
                <Checkbox size="sm" />
              </PreviewItem>
            </Matrix>
          </section>
          <section className="grid gap-3">
            <h3 className="text-sm font-semibold leading-5">
              Значение · checked, indeterminate
            </h3>
            <Matrix>
              <PreviewItem label="checked=false">
                <Checkbox />
              </PreviewItem>
              <PreviewItem label="checked=true">
                <Checkbox checked />
              </PreviewItem>
              <PreviewItem label="checked + indeterminate">
                <Checkbox checked indeterminate />
              </PreviewItem>
            </Matrix>
          </section>
          <section className="grid gap-3">
            <h3 className="text-sm font-semibold leading-5">
              Состояние · state, error, disabled
            </h3>
            <Matrix>
              <PreviewItem label="default">
                <Checkbox />
              </PreviewItem>
              <PreviewItem label="hovered">
                <Checkbox state="hovered" />
              </PreviewItem>
              <PreviewItem label="error">
                <Checkbox error />
              </PreviewItem>
              <PreviewItem label="disabled">
                <Checkbox disabled />
              </PreviewItem>
            </Matrix>
          </section>
          <section className="grid gap-3">
            <h3 className="text-sm font-semibold leading-5">
              Состав · label, skeleton
            </h3>
            <Matrix>
              <PreviewItem label="label=true">
                <Checkbox />
              </PreviewItem>
              <PreviewItem label="label=false">
                <Checkbox label={false} />
              </PreviewItem>
              <PreviewItem label="skeleton">
                <Checkbox skeleton />
              </PreviewItem>
            </Matrix>
          </section>
        </div>
      </Canvas>
    ),
  },
  {
    id: "text-field",
    title: "TextField",
    description: "Текстовое поле.",
    group: "Forms",
    source: "src/components/ui/text-field.tsx",
    render: () => (
      <Canvas>
        <div className="grid max-w-[520px] gap-3">
          <TextField empty placeholder="Placeholder" topLabel="static" />
          <TextField
            defaultValue="Value"
            empty={false}
            placeholder="Placeholder"
            topLabel="dynamic"
          />
          <TextField
            defaultValue="Value"
            empty={false}
            error
            placeholder="Placeholder"
            topLabel="dynamic"
          />
          <TextField
            disabled
            empty
            placeholder="Placeholder"
            topLabel="static"
          />
        </div>
      </Canvas>
    ),
  },
  {
    id: "text-field-multiline",
    title: "TextFieldMultiline",
    description: "Многострочное текстовое поле.",
    group: "Forms",
    source: "src/components/ui/text-field-multiline.tsx",
    render: () => (
      <Canvas>
        <div className="grid max-w-[520px] gap-3">
          <TextFieldMultiline empty placeholder="Комментарий" />
          <TextFieldMultiline empty={false} value="Текст комментария" />
          <TextFieldMultiline empty={false} error value="Текст комментария" />
        </div>
      </Canvas>
    ),
  },
  {
    id: "password-field",
    title: "PasswordField",
    description: "Поле пароля.",
    group: "Forms",
    source: "src/components/ui/password-field.tsx",
    render: () => (
      <Canvas>
        <div className="grid max-w-[520px] gap-3">
          <PasswordField empty placeholder="Password" topLabel="static" />
          <PasswordField
            defaultValue="Value"
            empty={false}
            placeholder="Password"
            topLabel="dynamic"
          />
          <PasswordField
            defaultValue="Value"
            empty={false}
            error
            placeholder="Password"
            topLabel="dynamic"
          />
        </div>
      </Canvas>
    ),
  },
  {
    id: "date-input",
    title: "DateInput",
    description: "Поле даты.",
    group: "Forms",
    source: "src/components/ui/date-input.tsx",
    render: () => (
      <Canvas>
        <div className="grid max-w-[520px] gap-3">
          <DateInput
            empty
            label="Дата"
            placeholder="Placeholder"
            topLabel="dynamic"
          />
          <DateInput
            defaultValue="24.08.2023"
            empty={false}
            label="Дата"
            placeholder="Placeholder"
            topLabel="dynamic"
          />
          <DateInput
            defaultValue="24.08.2023"
            empty={false}
            error
            label="Дата"
            placeholder="Placeholder"
            topLabel="dynamic"
          />
        </div>
      </Canvas>
    ),
  },
  {
    id: "range-input",
    title: "RangeInput",
    description: "Поле диапазона.",
    group: "Forms",
    source: "src/components/ui/range-input.tsx",
    render: () => (
      <Canvas>
        <div className="grid max-w-[520px] gap-3">
          <RangeInput empty={false} topLabel="static" />
          <RangeInput empty topLabel="dynamic" />
          <RangeInput empty={false} error topLabel="dynamic" />
        </div>
      </Canvas>
    ),
  },
  {
    id: "confirm-code",
    title: "ConfirmCode",
    description: "Поле подтверждения кода.",
    group: "Forms",
    source: "src/components/ui/confirm-code.tsx",
    render: () => (
      <Canvas>
        <Matrix columns>
          <ConfirmCode empty />
          <ConfirmCode empty={false} />
          <ConfirmCode empty state="focused" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "form-control-label",
    title: "FormControlLabel",
    description: "Лейбл контрола формы.",
    group: "Forms",
    source: "src/components/ui/form-control-label.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <FormControlLabel>Label</FormControlLabel>
          <FormControlLabel color="error">Label</FormControlLabel>
          <FormControlLabel color="disabled">Label</FormControlLabel>
          <FormControlLabel fontWeight="medium">Label</FormControlLabel>
        </Matrix>
      </Canvas>
    ),
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
    description: "Выпадающий контейнер с пунктами одиночного и множественного выбора и разделителями.",
    group: "Navigation",
    figmaUrl: "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-Components?node-id=436-1556",
    source: "src/components/ui/menu.tsx",
    render: () => <MenuExamples />,
  },
  {
    id: "tab",
    title: "Tab",
    description: "Вкладка.",
    group: "Navigation",
    source: "src/components/ui/tab.tsx",
    render: () => (
      <Canvas tone="blue">
        <Matrix>
          <Tab />
          <Tab selected secondaryText />
          <Tab direction="vertical" />
          <Tab direction="vertical" selected secondaryText />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "tab-bar",
    title: "TabBar",
    description: "Группа вкладок.",
    group: "Navigation",
    source: "src/components/ui/tab-bar.tsx",
    render: () => (
      <Canvas tone="blue">
        <TabBar className="min-w-[320px]" />
      </Canvas>
    ),
  },
  {
    id: "pagination-button",
    title: "PaginationButton",
    description: "Кнопка пагинации.",
    group: "Navigation",
    source: "src/components/ui/pagination-button.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <PaginationButton />
          <PaginationButton state="hover" />
          <PaginationButton state="checked" />
          <PaginationButton type="icon" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "pagination",
    title: "Pagination",
    description: "Пагинация.",
    group: "Navigation",
    source: "src/components/ui/pagination.tsx",
    render: () => (
      <Canvas>
        <Pagination className="min-w-[384px]" />
      </Canvas>
    ),
  },
  {
    id: "pagination-alt",
    title: "PaginationAlt",
    description: "Альтернативная пагинация.",
    group: "Navigation",
    source: "src/components/ui/pagination-alt.tsx",
    render: () => (
      <Canvas>
        <PaginationAlt className="min-w-[640px]" />
      </Canvas>
    ),
  },
  {
    id: "main-header",
    title: "MainHeader",
    description: "Главный хедер продукта.",
    group: "Layout",
    source: "src/components/ui/main-header.tsx",
    render: () => (
      <Canvas>
        <div className="grid gap-6">
          <MainHeader />
          <MainHeader resp="mob" />
        </div>
      </Canvas>
    ),
  },
  {
    id: "main-header-menu-button",
    title: "MainHeaderMenuButton",
    description: "Кнопка меню в хедере.",
    group: "Layout",
    source: "src/components/ui/main-header-menu-button.tsx",
    render: () => (
      <Canvas>
        <MainHeaderMenuButton />
      </Canvas>
    ),
  },
  {
    id: "page-title",
    title: "PageTitle",
    description: "Заголовок страницы.",
    group: "Layout",
    source: "src/components/ui/page-title.tsx",
    render: () => (
      <Canvas tone="blue">
        <PageTitle className="min-w-[960px]" />
      </Canvas>
    ),
  },
  {
    id: "toolbar-filter",
    title: "ToolbarFilter",
    description: "Панель фильтров.",
    group: "Layout",
    source: "src/components/ui/toolbar-filter.tsx",
    render: () => (
      <Canvas>
        <ToolbarFilter className="min-w-[960px]" />
      </Canvas>
    ),
  },
  {
    id: "show-more",
    title: "ShowMore",
    description: "Кнопка раскрытия дополнительного контента.",
    group: "Layout",
    source: "src/components/ui/show-more.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <ShowMore appearance="brand" />
          <ShowMore appearance="neutral" />
          <ShowMore appearance="brand" state="hover" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "list",
    title: "List",
    description: "Навигационный список с обычными и компактными строками ListItem.",
    group: "Navigation",
    source: "src/components/ui/list.tsx · src/components/ui/list-item.tsx",
    figmaUrl: "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-Components?node-id=654-8330",
    render: () => <ListExamples />,
  },
  {
    id: "table",
    title: "Table",
    description: "Table показывает сопоставимые данные в строках и колонках. Контейнер Table и ячейки TableCell отвечают за вид, а данные, выбор, пагинация и сортировка принадлежат конкретному экрану.",
    group: "Data display",
    figmaUrl: "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-Components?node-id=416-3328",
    source: "src/components/ui/table.tsx · src/components/ui/table-cell.tsx",
    render: () => <TableExamples />,
  },
  {
    id: "chip",
    title: "Chip",
    description: "Чип значения или статуса.",
    group: "Data display",
    source: "src/components/ui/chip.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <Chip color="neutral" />
          <Chip color="brand" />
          <Chip color="warning" />
          <Chip color="success" />
          <Chip color="error" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "tag",
    title: "Tag",
    description: "Метка.",
    group: "Data display",
    source: "src/components/ui/tag.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <Tag color="neutral" />
          <Tag color="brand" />
          <Tag color="warning" />
          <Tag color="success" />
          <Tag color="error" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "avatar",
    title: "Avatar",
    description: "Аватар.",
    group: "Data display",
    source: "src/components/ui/avatar.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <Avatar content="text" />
          <Avatar content="icon" />
          <Avatar content="image" />
          <Avatar content="image" skeleton />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "indicator",
    title: "Indicator",
    description: "Цветовой индикатор.",
    group: "Data display",
    source: "src/components/ui/indicator.tsx",
    render: () => (
      <Canvas>
        <Matrix>
          <Indicator color="primary" />
          <Indicator color="success" />
          <Indicator color="warning" />
          <Indicator color="error" />
          <Indicator color="info" />
        </Matrix>
      </Canvas>
    ),
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
    id: "progress-linear",
    title: "ProgressLinear",
    description: "Линейный прогресс.",
    group: "Feedback",
    source: "src/components/ui/progress-linear.tsx",
    render: () => (
      <Canvas>
        <div className="grid gap-4">
          <ProgressLinear position="start" />
          <ProgressLinear position="medium" />
          <ProgressLinear position="full" />
        </div>
      </Canvas>
    ),
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
  {
    id: "add-photos",
    title: "AddPhotos",
    description: "Загрузка фотографий.",
    group: "Files",
    source: "src/components/ui/add-photos.tsx",
    render: () => (
      <Canvas>
        <Matrix columns>
          <AddPhotos />
          <AddPhotos isLoad />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "add-any-file",
    title: "AddAnyFile",
    description: "Загрузка файла.",
    group: "Files",
    source: "src/components/ui/add-any-file.tsx",
    render: () => (
      <Canvas>
        <Matrix columns>
          <AddAnyFile />
          <AddAnyFile state="active" />
        </Matrix>
      </Canvas>
    ),
  },
  {
    id: "uploaded-document",
    title: "UploadedDocument",
    description: "Загруженный документ.",
    group: "Files",
    source: "src/components/ui/uploaded-document.tsx",
    render: () => (
      <Canvas>
        <div className="grid max-w-[520px] gap-3">
          <UploadedDocument />
          <UploadedDocument state="hovered" />
          <UploadedDocument fontWeight="medium" />
        </div>
      </Canvas>
    ),
  },
];

function getActiveComponentId() {
  const id = new URLSearchParams(window.location.search).get("component") ?? componentDocs[0].id;
  if (["list-small", "list-item", "list-item-small"].includes(id)) return "list";
  if (["table-cell", "table-cell-head"].includes(id)) return "table";
  return ["menu-divider", "menu-single-select", "menu-multiselect", "menu-item-single-select", "menu-item-multiselect"].includes(id) ? "menu" : id;
}

function setActiveComponentId(id: string) {
  const params = new URLSearchParams(window.location.search);

  params.set("view", "components");
  params.set("component", id);
  window.history.pushState(null, "", `?${params.toString()}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function groupDocs(items: ComponentDoc[]) {
  return items.reduce<Record<string, ComponentDoc[]>>((groups, item) => {
    groups[item.group] = [...(groups[item.group] ?? []), item];
    return groups;
  }, {});
}

function ComponentPage({ doc }: { doc: ComponentDoc }) {
  return (
    <article className="min-w-0">
      <header className="bg-[var(--parser-surface-under-islands)] px-6 py-10">
        <div className="mx-auto grid max-w-[980px] gap-5">
          <div className="grid gap-2">
            <h1 className="break-words font-['Unbounded',sans-serif] text-3xl font-bold leading-[1.16] sm:text-4xl">
              {doc.title}
            </h1>
            <p className="font-['Rhood_Inter',sans-serif] text-base leading-6 tracking-[0.15px] text-[var(--parser-text-neutral-secondary)]">
              {doc.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base leading-6">
            {doc.figmaUrl && (
              <a
                className="group flex w-fit items-center gap-1 rounded text-base leading-6 hover:text-[var(--parser-text-link-hovered)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]"
                href={doc.figmaUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="figma-link-icon size-6 shrink-0" />
                {doc.title} в Figma
              </a>
            )}
            <p className="break-words text-base leading-6 text-[var(--parser-text-neutral-secondary)]">
              Source: <code>{doc.source}</code>
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1028px] gap-8 px-6 py-5">
        <section className="grid min-w-0 gap-4">
          {!["menu", "list", "table"].includes(doc.id) && (
            <h2 className="font-['Rhood_Inter',sans-serif] text-xl font-semibold leading-7">
              Preview
            </h2>
          )}
          <div className="min-w-0 overflow-x-auto">{doc.render()}</div>
        </section>

        {doc.properties && (
          <section className="grid gap-4">
            <h2 className="text-xl font-semibold leading-7 tracking-normal">
              Свойства
            </h2>
            <div className="overflow-x-auto rounded-xl border border-[var(--parser-border-light)]">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm leading-5">
                <thead className="bg-[var(--parser-fill-neutral)] text-[var(--parser-text-neutral-secondary)]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Свойство</th>
                    <th className="px-4 py-3 font-semibold">Значения</th>
                    <th className="px-4 py-3 font-semibold">По умолчанию</th>
                    <th className="px-4 py-3 font-semibold">Назначение</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.properties.map((property) => (
                    <tr
                      className="border-t border-[var(--parser-border-light)]"
                      key={property.name}
                    >
                      <td className="px-4 py-3 font-mono text-[var(--parser-text-neutral-primary)]">
                        {property.name}
                      </td>
                      <td className="px-4 py-3 text-[var(--parser-text-neutral-secondary)]">
                        {property.values}
                      </td>
                      <td className="px-4 py-3 text-[var(--parser-text-neutral-secondary)]">
                        {property.defaultValue}
                      </td>
                      <td className="px-4 py-3 text-[var(--parser-text-neutral-secondary)]">
                        {property.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

export function ComponentDocs() {
  const [activeId, setActiveId] = React.useState(getActiveComponentId);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const handlePopState = () => setActiveId(getActiveComponentId());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredDocs = componentDocs.filter((doc) =>
    `${doc.title} ${doc.group} ${doc.source} ${doc.id === "list" ? "ListItem ListSmall ListItemSmall" : ""} ${doc.id === "menu" ? "MenuSingleSelect MenuMultiselect MenuItemSingleSelect MenuItemMultiselect MenuDivider" : ""} ${doc.id === "table" ? "TableCell TableCellHead" : ""}`
      .toLowerCase()
      .includes(normalizedQuery),
  );
  const groupedDocs = groupDocs(filteredDocs);
  const activeDoc =
    componentDocs.find((doc) => doc.id === activeId) ?? componentDocs[0];

  return (
    <div className="min-h-svh bg-[var(--parser-surface-bg)] text-[var(--parser-text-neutral-primary)]">
      <header className="sticky top-0 z-50 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[var(--parser-border-light)] bg-[var(--parser-surface-bg)] px-6 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <a aria-label="RHOOD — все разделы" className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]" href={window.location.pathname}>
            <img alt="RHOOD" className="h-[30px] w-[118px]" height="30" src="/Rhood/assets/rhood-logo.svg" width="118" />
          </a>
          <span className="whitespace-nowrap text-base leading-6">Design system</span>
        </div>
        <label className="flex h-9 w-full items-center gap-2 rounded-lg border border-[var(--parser-border-light)] px-3 focus-within:border-[var(--parser-border-focus)] sm:w-[298px]">
          <Search aria-hidden="true" className="size-5 shrink-0 text-[var(--parser-text-neutral-secondary)]" strokeWidth={2} />
          <input
            aria-label="Найти компонент"
            className="min-w-0 flex-1 bg-transparent text-sm leading-5 outline-none placeholder:text-[var(--parser-text-neutral-secondary)]"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти компонент"
            type="search"
            value={query}
          />
        </label>
      </header>
      <div className="grid md:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="border-b border-[var(--parser-border-light)] md:sticky md:top-[53px] md:h-[calc(100svh-53px)] md:overflow-y-auto md:border-b-0 md:border-r">
          <details className="group md:hidden" open={normalizedQuery ? true : undefined}>
            <summary className="cursor-pointer px-6 py-3 text-sm">Компоненты — {activeDoc.title}</summary>
            <ComponentNavigation activeId={activeDoc.id} groups={groupedDocs} />
          </details>
          <div className="hidden md:block">
            <ComponentNavigation activeId={activeDoc.id} groups={groupedDocs} />
          </div>
        </aside>
        <main className="min-w-0">
          <ComponentPage doc={activeDoc} key={activeDoc.id} />
        </main>
      </div>
    </div>
  );
}

function ComponentNavigation({ activeId, groups }: {
  activeId: string;
  groups: Record<string, ComponentDoc[]>;
}) {
  return (
    <nav aria-label="Компоненты" className="grid gap-5 px-6 py-4">
      {Object.entries(groups).map(([group, items]) => (
        <section key={group}>
          <h2 className="text-xs font-normal uppercase leading-8 tracking-[0.83px] text-[var(--parser-text-neutral-secondary)]">{group}</h2>
          <ul>
            {items.map((doc) => (
              <li key={doc.id}>
                <button
                  aria-current={doc.id === activeId ? "page" : undefined}
                  className="block w-full cursor-pointer rounded-lg text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]"
                  onClick={() => setActiveComponentId(doc.id)}
                  type="button"
                >
                  <ListItem
                    button={false}
                    endIcon={false}
                    iconButton={false}
                    secondaryText={false}
                    selected={doc.id === activeId}
                    startIcon={false}
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
        <p role="status" className="text-sm leading-5 text-[var(--parser-text-neutral-secondary)]">Ничего не найдено. Попробуй другое название.</p>
      )}
    </nav>
  );
}
