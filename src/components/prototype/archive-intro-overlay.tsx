import * as React from "react";
import { X } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

function ArchiveIntroOverlay() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Об архиве объявлений"
      className="archive-overlay-enter fixed bottom-6 right-6 z-40 box-border flex h-[380px] w-[330px] max-w-[calc(100vw-32px)] flex-col items-center justify-end gap-[var(--rh-sizing-base-module-2)] overflow-hidden rounded-[var(--rh-sizing-border-radius-xlg)] px-[var(--rh-sizing-base-module-2-5)] pb-[var(--rh-sizing-base-module-3-5)] pt-[var(--rh-sizing-base-module-2-5)] text-center text-[var(--rh-theme-text-neutral-primary-contrast)]"
      style={{
        backgroundColor: "var(--rh-theme-surface-neutral-ultra-dark)",
        backgroundImage:
          "radial-gradient(ellipse 350px 328px at 50% 0%, #154ef9 0%, #1641c1 25%, #18348a 50%, #192752 75%, #192136 87.5%, #1a1a1a 100%)",
      }}
    >
      <div className="relative size-[417px] shrink-0">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 block size-full max-w-none"
          height={417}
          src="/Rhood/assets/archive-overlay-ellipse.png"
          width={417}
        />
      </div>
      <div className="relative flex w-full shrink-0 flex-col items-center justify-center gap-[var(--rh-sizing-base-module-2)] pt-[var(--rh-sizing-base-module-4)] pb-[var(--rh-sizing-base-module-8)] text-center leading-none">
        <h2 className="relative w-full shrink-0 font-[var(--rh-typography-font-family-sans)] text-[32px] font-bold tracking-[0.0544px]">
          Архив объявлений
        </h2>
        <p className="relative w-full shrink-0 font-[var(--rh-typography-font-family-sans)] text-[16px] font-normal leading-[1.2] tracking-[0.0306px]">
          Объявления, опубликованные за последние 6 месяцев
          <br />и уже снятые с публикации
        </p>
      </div>
      <IconButton
        appearance="inherit"
        aria-label="Закрыть баннер Архива"
        className="absolute right-2 top-2 z-10"
        icon={<X aria-hidden="true" />}
        onClick={() => setIsVisible(false)}
        size="md"
      />
    </aside>
  );
}

export { ArchiveIntroOverlay };
