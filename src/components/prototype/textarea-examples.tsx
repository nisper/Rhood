import * as React from "react";

import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";
import { Textarea } from "@/components/ui/textarea";

function Section({
  children,
  description,
  settings,
  title,
}: {
  children: React.ReactNode;
  description: React.ReactNode;
  settings: string[];
  title: string;
}) {
  return (
    <section className="grid gap-3">
      <div className="grid gap-1">
        <h2 className="rh-typography-h4">{title}</h2>
        <p className="rh-typography-b1">{description}</p>
      </div>
      {children}
      <div className="grid gap-0.5">
        {settings.map((setting) => (
          <p
            className="font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]"
            key={setting}
          >
            {setting}
          </p>
        ))}
      </div>
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

export function TextareaExamples() {
  return (
    <div className="grid min-w-0 gap-10">
      <Section
        description={
          <>
            md — основной размер для форм.
            <br />
            Высота фиксирована по rows, если autoResize не задана; с autoResize поле растёт по тексту, а maxRows ограничивает рост и включает нативный скролл.
          </>
        }
        settings={[
          "size: md · sm",
          "rows: number (default: 2)",
          "autoResize: boolean",
          "maxRows: number",
        ]}
        title="Размер"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2">
              <FieldCell label="md">
                <Textarea
                  aria-label="Textarea md"
                  autoResize
                  placeholder="Комментарий"
                  rows={1}
                  size="md"
                />
              </FieldCell>
              <FieldCell label="sm">
                <Textarea
                  aria-label="Textarea sm"
                  autoResize
                  placeholder="Комментарий"
                  rows={1}
                  size="sm"
                />
              </FieldCell>
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>

      <Section
        description="Hover и focus работают у нативного textarea. Error и disabled имеют приоритет над обычными состояниями."
        settings={[
          "state: default · hovered · focused",
          "error: boolean",
          "disabled: boolean",
        ]}
        title="Состояния"
      >
        <ShowcaseSurface>
          <ShowcasePanel>
            <div className="grid w-full max-w-[920px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <FieldCell label="default">
                <Textarea
                  aria-label="Default textarea"
                  placeholder="Комментарий"
                />
              </FieldCell>
              <FieldCell label="hovered">
                <Textarea
                  aria-label="Hovered textarea"
                  placeholder="Комментарий"
                  state="hovered"
                />
              </FieldCell>
              <FieldCell label="focused">
                <Textarea
                  aria-label="Focused textarea"
                  placeholder="Комментарий"
                  state="focused"
                />
              </FieldCell>
              <FieldCell label="error">
                <Textarea
                  aria-label="Error textarea"
                  error
                  placeholder="Комментарий"
                />
              </FieldCell>
              <FieldCell label="error focused">
                <Textarea
                  aria-label="Focused error textarea"
                  error
                  placeholder="Комментарий"
                  state="focused"
                />
              </FieldCell>
              <FieldCell label="disabled">
                <Textarea
                  aria-label="Disabled textarea"
                  disabled
                  placeholder="Комментарий"
                />
              </FieldCell>
            </div>
          </ShowcasePanel>
        </ShowcaseSurface>
      </Section>
    </div>
  );
}
