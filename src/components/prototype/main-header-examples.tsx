import { ShowcaseSection } from "@/components/ui/showcase-section";
import type { MainHeaderNavItem } from "@/components/ui/main-header";
import { MainHeader } from "@/components/ui/main-header";
import type { ReactNode } from "react";

const defaultNavigation: MainHeaderNavItem[] = [
  { active: true, label: "Набор базы" },
  { label: "Мои объекты" },
  { label: "Подборки" },
  { label: "Избранное" },
];

const hoveredNavigation: MainHeaderNavItem[] = [
  { active: true, label: "Набор базы" },
  { label: "Мои объекты", state: "hovered" },
  { label: "Подборки" },
  { label: "Избранное" },
];

function MainHeaderSnippet({ children }: { children?: ReactNode }) {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
      <span className="text-[var(--rh-palette-purple-700)]">MainHeader</span>
      {children}
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    </code>
  );
}

function CodeProp({ name, value }: { name: string; value: string }) {
  return (
    <>
      {" "}
      <span className="text-[var(--rh-theme-text-info)]">{name}</span>
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
      <span className="text-[var(--rh-theme-text-success)]">{value}</span>
    </>
  );
}

function HeaderPanel({ children }: { children: ReactNode }) {
  return <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white min-h-0 p-0">{children}</div>;
}

function MainHeaderExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={<MainHeaderSnippet />}
        description="У MainHeader нет визуальных вариантов: он использует единый стиль для навигации и управляющих элементов продукта."
        panels={[<HeaderPanel>
              <MainHeader navItems={defaultNavigation} />
            </HeaderPanel>]}
        title="Стиль"
      />

      <ShowcaseSection
        codeSnippet={
          <MainHeaderSnippet>
            <CodeProp name="resp" value='"mob"' />
          </MainHeaderSnippet>
        }
        description="Размер не настраивается отдельно. resp переключает desktop- и mobile-варианты хедера."
        panels={[<HeaderPanel>
              <MainHeader navItems={defaultNavigation} />
            </HeaderPanel>, <HeaderPanel>
              <MainHeader resp="mob" />
            </HeaderPanel>]}
        title="Размер"
      />

      <ShowcaseSection
        codeSnippet={
          <MainHeaderSnippet>
            <CodeProp name="navItems" value="{[{ state: &quot;hovered&quot; }]}" />
          </MainHeaderSnippet>
        }
        description="Активный пункт отмечает текущий раздел. Для демонстрации состояния наведения передай state: hovered в соответствующий элемент navItems; нативный hover работает при наведении."
        panels={[<HeaderPanel>
              <MainHeader navItems={defaultNavigation} />
            </HeaderPanel>, <HeaderPanel>
              <MainHeader navItems={hoveredNavigation} />
            </HeaderPanel>]}
        title="Состояния"
      />

      <ShowcaseSection
        codeSnippet={
          <MainHeaderSnippet>
            <CodeProp name="controls" value="{false}" />
            <CodeProp name="contentWidth" value='"container"' />
          </MainHeaderSnippet>
        }
        description="Состав включает логотип, навигацию и управляющие элементы. controls скрывает help и профиль, а contentWidth ограничивает содержимое контейнером страницы."
        panels={[<HeaderPanel>
              <MainHeader controls={false} contentWidth="container" navAlign="end" navItems={defaultNavigation} />
            </HeaderPanel>, <HeaderPanel>
              <MainHeader navItems={defaultNavigation} />
            </HeaderPanel>]}
        title="Состав"
      />
    </div>
  );
}

export { MainHeaderExamples };
