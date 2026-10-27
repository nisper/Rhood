import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { IconButton } from "@/components/ui/icon-button";
import { ModalContainer } from "@/components/ui/modal";

type PhotoGalleryPhoto = {
  alt: string;
  src: string;
};

type PhotoGallerySidebarField = {
  label: string;
  numeric?: boolean;
  value: string;
};

type PhotoGallerySidebar = {
  title?: string;
  headline?: string;
  supportingText?: string;
  metadata?: readonly PhotoGallerySidebarField[];
  fields?: readonly PhotoGallerySidebarField[];
  description?: string;
};

type PhotoGalleryProps = {
  containerDisplay?: React.ComponentProps<typeof ModalContainer>["display"];
  initialPhotoIndex?: number;
  map?: PhotoGalleryMap;
  onClose?: () => void;
  photos: readonly PhotoGalleryPhoto[];
  sidebar?: PhotoGallerySidebar;
};

type PhotoGalleryMap = {
  latitude: number;
  longitude: number;
  imageSrc?: string;
  previewSrc?: string;
  title?: string;
};

function PhotoGalleryMapView({
  latitude,
  longitude,
  title,
}: PhotoGalleryMap) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const leafletMap = L.map(container, { scrollWheelZoom: false }).setView(
      [latitude, longitude],
      16,
    );
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(leafletMap);
    L.circleMarker([latitude, longitude], {
      color: "var(--rh-theme-surface-bg)",
      fillColor: "var(--rh-theme-fill-brand)",
      fillOpacity: 1,
      radius: 9,
      weight: 3,
    })
      .addTo(leafletMap)
      .bindPopup(title ?? "Расположение объекта");

    return () => {
      leafletMap.remove();
    };
  }, [latitude, longitude, title]);

  return (
    <div
      aria-label={title ?? "Карта OpenStreetMap"}
      className="size-full"
      ref={containerRef}
      role="region"
    />
  );
}

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

function PhotoGallerySidebarRows({
  rows,
}: {
  rows: readonly PhotoGallerySidebarField[];
}) {
  return (
    <dl className="grid divide-y divide-[var(--parser-border-light)] border-b border-[var(--parser-border-light)]">
      {rows.map(({ label, numeric, value }) => (
        <div className="flex items-center justify-between gap-4 py-2" key={label}>
          <dt className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">
            {label}
          </dt>
          <dd className={`${numeric ? "rh-typography-b2-mono" : "rh-typography-b2"} text-right text-[var(--rh-theme-text-neutral-primary)]`}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function PhotoGallery({
  containerDisplay = "viewport",
  initialPhotoIndex = 0,
  map,
  onClose,
  photos,
  sidebar,
}: PhotoGalleryProps) {
  const slideCount = photos.length + (map ? 1 : 0);
  const [open, setOpen] = React.useState(true);
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(() =>
    Math.min(Math.max(initialPhotoIndex, 0), slideCount - 1),
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
        slideCount > 1 &&
        (event.key === "ArrowLeft" || event.key === "ArrowRight")
      ) {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setActivePhotoIndex((index) =>
          (index + direction + slideCount) % slideCount,
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, open, slideCount]);

  if (!open || slideCount === 0) return null;

  const isMapSlide = Boolean(map && activePhotoIndex === photos.length);
  const activePhoto = isMapSlide ? undefined : photos[activePhotoIndex];
  const showControls = slideCount > 1;
  const sidebarRows = [...(sidebar?.fields ?? []), ...(sidebar?.metadata ?? [])];

  return (
    <ModalContainer
      alignment="center"
      aria-label="Просмотр фотографий и карты"
      aria-modal={containerDisplay === "viewport" ? true : undefined}
      className={`!min-h-0 !grid-rows-[minmax(0,1fr)] !overflow-hidden bg-[var(--rh-theme-surface-bg)] ${
        containerDisplay === "embedded"
          ? "!h-[min(680px,calc(100dvh-32px))]"
          : ""
      }`}
      display={containerDisplay}
      role={containerDisplay === "viewport" ? "dialog" : "group"}
      onClick={(event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest("button") || target.closest("aside")) return;

        if (target.closest("[data-main-map]")) return;
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
            ? "grid-cols-[minmax(0,1fr)_minmax(240px,380px)] max-md:grid-cols-1 max-md:grid-rows-[minmax(220px,1fr)_minmax(0,auto)]"
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
            className="relative col-start-2 row-start-1 flex min-h-0 flex-col gap-6 overflow-y-auto p-6 max-md:col-start-1 max-md:row-start-2 max-md:border-t max-md:p-4"
          >
            {(sidebar.title || sidebar.headline || sidebar.supportingText) && (
              <div className="grid gap-3">
                {sidebar.title && (
                  <h2 className="rh-typography-b1-med max-w-[calc(100%-32px)] text-[var(--rh-theme-text-neutral-primary)]">
                    {sidebar.title}
                  </h2>
                )}
                {(sidebar.headline || sidebar.supportingText) && (
                  <div className="grid gap-1">
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
              </div>
            )}

            {sidebarRows.length > 0 && <PhotoGallerySidebarRows rows={sidebarRows} />}

            {sidebar.description && (
              <div className="grid gap-2">
                <h3 className="rh-typography-b1-med text-[var(--rh-theme-text-neutral-primary)]">
                  Описание
                </h3>
                <p className="rh-typography-b2 whitespace-pre-line text-[var(--rh-theme-text-neutral-primary)]">
                  {sidebar.description}
                </p>
              </div>
            )}
          </aside>
        )}

        <section
          aria-label="Слайды объекта"
          className={`group relative col-start-1 row-start-1 grid h-full min-h-0 min-w-0 grid-cols-1 grid-rows-[minmax(0,1fr)_52px] gap-y-4 p-4 max-md:p-2 ${
            sidebar ? "max-md:col-start-1 max-md:row-start-1" : ""
          }`}
        >
          <div className="col-start-1 row-start-1 grid min-h-0 min-w-0 place-items-center overflow-hidden">
            {isMapSlide ? (
              <div
                className="h-full w-full min-h-0 min-w-0 overflow-hidden"
                data-main-map
              >
                {map && (map.imageSrc ? (
                  <img
                    alt={map.title ?? "Карта расположения объекта"}
                    className="size-full object-cover"
                    src={map.imageSrc}
                  />
                ) : (
                  <PhotoGalleryMapView {...map} />
                ))}
              </div>
            ) : (
              <img
                alt={activePhoto?.alt ?? ""}
                className="h-full w-full min-h-0 min-w-0 object-contain"
                data-main-photo
                src={activePhoto?.src}
              />
            )}
          </div>
          {showControls && (
            <>
              <div className="pointer-events-none col-start-1 row-start-1 z-10 flex min-h-0 min-w-0 items-center justify-between px-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 max-md:pointer-events-auto max-md:opacity-100">
                <IconButton
                  appearance="contrast"
                  aria-label="Предыдущий слайд"
                  icon={<ChevronLeft aria-hidden="true" />}
                  onClick={() =>
                    setActivePhotoIndex((index) =>
                      (index + slideCount - 1) % slideCount,
                    )
                  }
                />
                <IconButton
                  appearance="contrast"
                  aria-label="Следующий слайд"
                  icon={<ChevronRight aria-hidden="true" />}
                  onClick={() =>
                    setActivePhotoIndex((index) => (index + 1) % slideCount)
                  }
                />
              </div>
              <div
                aria-label="Фотографии и карта"
                className="col-start-1 row-start-2 flex w-full min-w-0 justify-center gap-2 overflow-x-auto"
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
                {map && (
                  <button
                    aria-label="Показать карту расположения объекта"
                    aria-pressed={activePhotoIndex === photos.length}
                    className="relative size-[52px] shrink-0 cursor-pointer overflow-hidden"
                    key="map-slide"
                    onClick={() => setActivePhotoIndex(photos.length)}
                    type="button"
                  >
                    {map.previewSrc || map.imageSrc ? (
                      <img
                        alt=""
                        className="size-full object-cover"
                        src={map.previewSrc ?? map.imageSrc}
                      />
                    ) : (
                      <span aria-hidden="true" className="grid size-full place-items-center bg-[var(--rh-theme-surface-bg)] text-[var(--rh-theme-text-neutral-secondary)]">
                        <span className="rh-typography-b2">Карта</span>
                      </span>
                    )}
                    {activePhotoIndex !== photos.length && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[var(--rh-theme-fill-contrast-static)] opacity-60"
                      />
                    )}
                  </button>
                )}
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
  PhotoGalleryMap,
  PhotoGalleryProps,
  PhotoGallerySidebar,
  PhotoGallerySidebarField,
};
