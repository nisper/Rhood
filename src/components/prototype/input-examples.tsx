import * as React from "react";

import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";
import { Textfield } from "@/components/ui/text-field";
import { cn } from "@/lib/utils";

function Section({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section className="grid gap-3">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold leading-7">{title}</h2>
        <p className="text-base leading-6 tracking-[0.15px]">{description}</p>
      </div>
      {children}
    </section>
  );
}

function FieldCell({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="grid min-w-0 gap-2">
      <p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">
        {label}
      </p>
      {children}
    </div>
  );
}

function ContentCell({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="grid min-w-0 gap-2">
      <p className="text-base leading-6 tracking-[0.15px]">{label}</p>
      {children}
    </div>
  );
}

function ContentInput({
  endText = false,
  helperText = false,
  placeholder = false,
  required = false,
  startText = false,
}: {
  endText?: boolean;
  helperText?: boolean;
  placeholder?: boolean;
  required?: boolean;
  startText?: boolean;
}) {
  return (
    <div className="relative">
      <Textfield
        aria-label="Пример Input"
        className={cn(startText && "pl-8", endText && "pr-8")}
        placeholder={placeholder ? "Placeholder" : ""}
        required={required}
      />
      {startText && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-2 text-base leading-6 text-[var(--parser-text-neutral-secondary)]"
        >
          с
        </span>
      )}
      {endText && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-2 text-base leading-6"
        >
          ₽
        </span>
      )}
      {helperText && (
        <p className="pt-[3px] text-xs leading-5 text-[var(--parser-text-neutral-secondary)]">
          Helper text
        </p>
      )}
    </div>
  );
}

function ClearableInput({ size = "md" }: { size?: "md" | "sm" }) {
  const [value, setValue] = React.useState("Value");

  return (
    <Textfield
      aria-label="Пример значения"
      clearButton
      onChange={(event) => setValue(event.target.value)}
      onClear={() => setValue("")}
      placeholder="Placeholder"
      size={size}
      state="focused"
      value={value}
    />
  );
}

export function InputExamples() {
  return (
    <div className="grid min-w-0 gap-10">
      <Section
        description="md — основной размер для форм; sm — компактный вариант для плотных панелей и фильтров."
        title="Размер"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2">
              <FieldCell label="md">
                <Textfield
                  aria-label="Input md"
                  placeholder="Placeholder"
                  size="md"
                />
              </FieldCell>
              <FieldCell label="sm">
                <Textfield
                  aria-label="Input sm"
                  placeholder="Placeholder"
                  size="sm"
                />
              </FieldCell>
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Hover и focus работают у нативного input. Error и disabled имеют приоритет над обычными состояниями."
        title="Состояния"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full max-w-[920px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <FieldCell label="default">
                <Textfield
                  aria-label="Default input"
                  placeholder="Placeholder"
                />
              </FieldCell>
              <FieldCell label="hovered">
                <Textfield
                  aria-label="Hovered input"
                  placeholder="Placeholder"
                  state="hovered"
                />
              </FieldCell>
              <FieldCell label="focused">
                <Textfield
                  aria-label="Focused input"
                  placeholder="Placeholder"
                  state="focused"
                />
              </FieldCell>
              <FieldCell label="error">
                <Textfield
                  aria-label="Error input"
                  error
                  placeholder="Placeholder"
                />
              </FieldCell>
              <FieldCell label="error focused">
                <Textfield
                  aria-label="Focused error input"
                  error
                  placeholder="Placeholder"
                  state="focused"
                />
              </FieldCell>
              <FieldCell label="disabled">
                <Textfield
                  aria-label="Disabled input"
                  disabled
                  placeholder="Placeholder"
                />
              </FieldCell>
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Каждый дополнительный элемент показан отдельным вариантом: пустое поле, placeholder, prefix, suffix, обязательность и helper text."
        title="Наполнение"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full gap-5 sm:grid-cols-2">
              <ContentCell label="Пустой">
                <ContentInput />
              </ContentCell>
              <ContentCell label="placeholder: true">
                <ContentInput placeholder />
              </ContentCell>
              <ContentCell label="startText: true">
                <ContentInput startText />
              </ContentCell>
              <ContentCell label="endText: true">
                <ContentInput endText />
              </ContentCell>
              <ContentCell label="required: true">
                <ContentInput required />
              </ContentCell>
              <ContentCell label="helperText: true">
                <ContentInput helperText />
              </ContentCell>
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Обязательное поле отмечается красной звёздочкой в правой части Input."
        title="Обязательное поле"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="w-full max-w-[298px]">
              <ContentInput required />
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Опциональный крестик появляется только у заполненного Input в состоянии focused. Нажми на него, чтобы очистить значение."
        title="Очистка ввода"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2">
              <FieldCell label="md">
                <ClearableInput />
              </FieldCell>
              <FieldCell label="sm">
                <ClearableInput size="sm" />
              </FieldCell>
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>
    </div>
  );
}
