import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { ExpandableContent } from "@/components/ui/expandable-content";
import { IconButton } from "@/components/ui/icon-button";
import { ModalContainer } from "@/components/ui/modal";

type PhotoGalleryPhoto = {
  alt: string;
  src: string;
};

type PhotoGallerySidebarField = {
  label: string;
  value: string;
};

type PhotoGallerySidebar = {
  title?: string;
  headline?: string;
  supportingText?: string;
  metadata?: readonly string[];
  fields?: readonly PhotoGallerySidebarField[];
  description?: string;
};

type PhotoGalleryProps = {
  containerDisplay?: React.ComponentProps<typeof ModalContainer>["display"];
  initialPhotoIndex?: number;
  onClose?: () => void;
  photos: readonly PhotoGalleryPhoto[];
  sidebar?: PhotoGallerySidebar;
};

function isPointOnContainedImage(
  image: HTMLImageElement,
  clientX: number,
  clientY: number,
) {
  if (!image.naturalWidth || !image.naturalHeight) return true;

  const bounds = image.getBoundingClientRect();
  const scale = Math.min(
    bounds.width / image.naturalWidth,
    bounds.height / image.naturalHeight,
  );
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  const left = bounds.left + (bounds.width - renderedWidth) / 2;
  const top = bounds.top + (bounds.height - renderedHeight) / 2;

  return (
    clientX >= left &&
    clientX <= left + renderedWidth &&
    clientY >= top &&
    clientY <= top + renderedHeight
  );
}

function PhotoGallery({
  containerDisplay = "viewport",
  initialPhotoIndex = 0,
  onClose,
  photos,
  sidebar,
}: PhotoGalleryProps) {
  const [open, setOpen] = React.useState(true);
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(() =>
    Math.min(Math.max(initialPhotoIndex, 0), photos.length - 1),
  );
  const handleClose = React.useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  React.useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
      if (
        photos.length > 1 &&
        (event.key === "ArrowLeft" || event.key === "ArrowRight")
      ) {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setActivePhotoIndex((index) =>
          (index + direction + photos.length) % photos.length,
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, open, photos.length]);

  if (!open || photos.length === 0) return null;

  const activePhoto = photos[activePhotoIndex];
  const showControls = photos.length > 1;

  return (
    <ModalContainer
      alignment="center"
      className={`!min-h-0 !grid-rows-[minmax(0,1fr)] !overflow-hidden bg-[var(--rh-theme-surface-bg)] ${
        containerDisplay === "embedded"
          ? "!h-[min(680px,calc(100dvh-32px))]"
          : ""
      }`}
      display={containerDisplay}
      onClick={(event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest("button") || target.closest("aside")) return;

        const mainPhoto = target.closest("[data-main-photo]");
        if (
          mainPhoto instanceof HTMLImageElement &&
          isPointOnContainedImage(mainPhoto, event.clientX, event.clientY)
        ) return;

        handleClose();
      }}
    >
      <div
        className={`relative grid h-full min-h-0 w-full min-w-0 overflow-hidden ${
          sidebar
            ? "grid-cols-[minmax(240px,320px)_minmax(0,1fr)] max-md:grid-cols-1 max-md:grid-rows-[minmax(220px,1fr)_minmax(0,auto)]"
            : "grid-cols-1"
        }`}
      >
        <IconButton
          appearance="contrast"
          aria-label="Закрыть просмотр фото"
          className="absolute right-4 top-4 z-10"
          icon={<X aria-hidden="true" />}
          onClick={handleClose}
        />
        {sidebar && (
          <aside
            aria-label="Дополнительная информация"
            className="relative flex min-h-0 flex-col gap-6 overflow-y-auto p-6 max-md:row-start-2 max-md:border-t max-md:p-4"
          >
            {(sidebar.title || sidebar.headline || sidebar.supportingText) && (
              <div className="grid gap-3">
                {sidebar.title && (
                  <h2 className="rh-typography-b1-med text-[var(--rh-theme-text-neutral-primary)]">
                    {sidebar.title}
                  </h2>
                )}
                {sidebar.headline && (
                  <p className="rh-typography-h3 text-[var(--rh-theme-text-neutral-primary)]">
                    {sidebar.headline}
                  </p>
                )}
                {sidebar.supportingText && (
                  <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-primary)]">
                    {sidebar.supportingText}
                  </p>
                )}
              </div>
            )}

            {sidebar.metadata && sidebar.metadata.length > 0 && (
              <div className="grid border-y border-[var(--parser-border-light)] py-3">
                {sidebar.metadata.map((item) => (
                  <p
                    className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]"
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}

            {sidebar.fields && sidebar.fields.length > 0 && (
              <dl className="grid gap-3 border-b border-[var(--parser-border-light)] pb-4">
                {sidebar.fields.map(({ label, value }) => (
                  <div className="flex justify-between gap-4" key={label}>
                    <dt className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">
                      {label}
                    </dt>
                    <dd className="rh-typography-b2-med text-right text-[var(--rh-theme-text-neutral-primary)]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {sidebar.description && (
              <div className="grid gap-2">
                <h3 className="rh-typography-b1-med text-[var(--rh-theme-text-neutral-primary)]">
                  Описание
                </h3>
                <ExpandableContent
                  buttonSize="sm"
                  collapsedHeight={96}
                  expandLabel="Читать полностью"
                >
                  <p className="rh-typography-b2 whitespace-pre-line text-[var(--rh-theme-text-neutral-primary)]">
                    {sidebar.description}
                  </p>
                </ExpandableContent>
              </div>
            )}
          </aside>
        )}

        <section
          aria-label="Фотографии объекта"
          className={`grid h-full min-h-0 min-w-0 grid-cols-[48px_minmax(0,1fr)_48px] grid-rows-[minmax(0,1fr)_52px] gap-x-2 gap-y-4 p-4 max-md:p-2 ${
            sidebar ? "max-md:col-start-1 max-md:row-start-1" : ""
          }`}
        >
          <div className="col-start-2 row-start-1 grid min-h-0 min-w-0 place-items-center overflow-hidden">
            <img
              alt={activePhoto.alt}
              className="h-full w-full min-h-0 min-w-0 object-contain"
              data-main-photo
              src={activePhoto.src}
            />
          </div>
          {showControls && (
            <>
              <div className="col-start-1 row-start-1 grid place-items-center">
                <IconButton
                  appearance="contrast"
                  aria-label="Предыдущее фото"
                  icon={<ChevronLeft aria-hidden="true" />}
                  onClick={() =>
                    setActivePhotoIndex((index) =>
                      (index + photos.length - 1) % photos.length,
                    )
                  }
                />
              </div>
              <div className="col-start-3 row-start-1 grid place-items-center">
                <IconButton
                  appearance="contrast"
                  aria-label="Следующее фото"
                  icon={<ChevronRight aria-hidden="true" />}
                  onClick={() =>
                    setActivePhotoIndex((index) => (index + 1) % photos.length)
                  }
                />
              </div>
              <div
                aria-label="Фотографии"
                className="col-start-2 row-start-2 flex w-full min-w-0 justify-center gap-2 overflow-x-auto"
              >
                {photos.map((photo, index) => (
                  <button
                    aria-label={`Выбрать фото: ${photo.alt}`}
                    aria-pressed={activePhotoIndex === index}
                    className="relative size-[52px] shrink-0 cursor-pointer overflow-hidden"
                    key={`${photo.src}-${index}`}
                    onClick={() => setActivePhotoIndex(index)}
                    type="button"
                  >
                    <img alt="" className="size-full object-cover" src={photo.src} />
                    {activePhotoIndex !== index && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[var(--rh-theme-fill-contrast-static)] opacity-60"
                      />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </ModalContainer>
  );
}

export { PhotoGallery };
export type {
  PhotoGalleryPhoto,
  PhotoGalleryProps,
  PhotoGallerySidebar,
  PhotoGallerySidebarField,
};
