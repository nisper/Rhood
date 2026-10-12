import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Avatar, type AvatarSize, type AvatarType } from "@/components/ui/avatar";

const sizes: AvatarSize[] = ["20px", "24px", "32px", "40px"];
const types: AvatarType[] = ["image", "text", "icon", "skeleton"];

function AvatarSnippet({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
      <span className="text-[var(--rh-palette-purple-700)]">Avatar</span>
      {children}
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    </code>
  );
}

function AvatarExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={<AvatarSnippet> <span className="text-[var(--rh-theme-text-info)]">size</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">&quot;32px&quot;</span></AvatarSnippet>}
        description="Визуальных стилей и состояний нет. Размер задаёт диаметр аватара."
        panels={[sizes.map((size) => <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white items-start" key={size}><div className="grid w-full justify-items-center gap-3"><span className="rh-typography-b2-med text-[var(--rh-theme-text-neutral-secondary)]">{size}</span>{types.map((type) => <Avatar key={type} size={size} type={type}>ЕВ</Avatar>)}</div></div>)]}
        title="Размер"
      />
      <ShowcaseSection
        codeSnippet={<AvatarSnippet> <span className="text-[var(--rh-theme-text-info)]">type</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">&quot;text&quot;</span></AvatarSnippet>}
        description="Аватар показывает изображение, инициалы, иконку пользователя или скелетон. badge добавляет индикатор статуса."
        panels={[types.map((type) => <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white" key={type}><div className="grid justify-items-center gap-2"><Avatar badge={type === "image"} type={type}>ЕВ</Avatar><span className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">{type}</span></div></div>)]}
        title="Состав"
      />
    </div>
  );
}

export { AvatarExamples };
