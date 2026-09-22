import * as React from "react";
import { X } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

type ModalProps = Omit<React.ComponentProps<"div">, "title"> & {
  closeButton?: boolean;
  defaultOpen?: boolean;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  hasFooter?: boolean;
  maxWidth?: React.CSSProperties["maxWidth"];
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  presentation?: ModalPresentation;
  title: React.ReactNode;
};

type ModalContainerAlignment = "center" | "top" | "bottom";
type ModalContainerDisplay = "viewport" | "embedded";
type ModalPresentation = "dialog" | "bottom-sheet";

type ModalContainerProps = React.ComponentProps<"div"> & {
  alignment?: ModalContainerAlignment;
  display?: ModalContainerDisplay;
};

function useIsMobileViewport() {
  const [isMobileViewport, setIsMobileViewport] = React.useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches,
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  return isMobileViewport;
}

function ModalContainer({
  alignment = "center",
  children,
  className,
  display = "viewport",
  ...props
}: ModalContainerProps) {
  return (
    <div
      className={cn(
        "grid min-h-[360px] w-full overflow-hidden bg-[var(--rh-theme-surface-backdrop)] p-2",
        display === "viewport" && "fixed inset-0 z-50",
        display === "embedded" && "relative",
        alignment === "center" && "place-items-center max-md:items-end",
        alignment === "top" && "items-start justify-items-center",
        alignment === "bottom" && "items-end justify-items-center",
        className,
      )}
      data-slot="modal-container"
      {...props}
    >
      {children}
    </div>
  );
}

function Modal({
  children,
  className,
  closeButton,
  defaultOpen = true,
  description,
  footer,
  hasFooter = Boolean(footer),
  maxWidth = 480,
  onOpenChange,
  onTransitionEnd,
  open,
  presentation = "dialog",
  style,
  title,
  ...props
}: ModalProps) {
  const isMobileViewport = useIsMobileViewport();
  const resolvedPresentation = isMobileViewport ? "bottom-sheet" : presentation;
  const titleId = React.useId();
  const swipeStartY = React.useRef<number | null>(null);
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const resolvedOpen = isControlled ? open : uncontrolledOpen;
  const [isRendered, setIsRendered] = React.useState(resolvedOpen);
  const [isClosing, setIsClosing] = React.useState(false);
  const showCloseButton =
    resolvedPresentation === "dialog" && closeButton !== false;

  React.useEffect(() => {
    if (resolvedOpen) {
      setIsRendered(true);
      setIsClosing(false);
      return;
    }

    if (resolvedPresentation === "bottom-sheet" && isRendered) {
      setIsClosing(true);
      return;
    }

    setIsRendered(false);
  }, [isRendered, resolvedPresentation, resolvedOpen]);

  const changeOpen = (nextOpen: boolean) => {
    if (!isControlled) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const requestClose = () => changeOpen(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (resolvedPresentation === "bottom-sheet") {
      swipeStartY.current = event.clientY;
    }
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const startedAt = swipeStartY.current;
    swipeStartY.current = null;

    if (
      resolvedPresentation === "bottom-sheet" &&
      startedAt !== null &&
      event.clientY - startedAt >= 80
    ) {
      requestClose();
    }
  };

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (isClosing && event.target === event.currentTarget) {
      setIsClosing(false);
      setIsRendered(false);
    }

    onTransitionEnd?.(event);
  };

  if (!isRendered) return null;

  return (
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className={cn(
        "grid w-full gap-6 rounded-[var(--rh-sizing-border-radius-modal)] bg-[var(--rh-theme-fill-contrast-static)] p-6 shadow-lg",
        resolvedPresentation === "bottom-sheet" && "p-4",
        resolvedPresentation === "bottom-sheet" &&
          "transition-transform duration-200 ease-in-out",
        resolvedPresentation === "bottom-sheet" && isClosing && "translate-y-full",
        className,
      )}
      onPointerCancel={() => {
        swipeStartY.current = null;
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerEnd}
      role="dialog"
      style={{ ...style, maxWidth }}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-2">
          <h2
            className="rh-typography-headline-4 text-[var(--rh-theme-text-neutral-primary)]"
            id={titleId}
          >
            {title}
          </h2>
          {description && (
            <p className="rh-typography-body-1 text-[var(--rh-theme-text-neutral-primary)]">
              {description}
            </p>
          )}
          {children}
        </div>

        {showCloseButton && (
          <IconButton
            appearance="ghost"
            aria-label="Закрыть modal"
            className="-m-2"
            icon={<X aria-hidden="true" />}
            onClick={requestClose}
            size="md"
          />
        )}
      </div>

      {hasFooter && footer && (
        <div
          className={cn(
            "flex flex-wrap justify-end gap-2",
            resolvedPresentation === "bottom-sheet" &&
              "flex-col-reverse [&>button]:w-full",
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

export { Modal, ModalContainer };
export type {
  ModalContainerAlignment,
  ModalContainerDisplay,
  ModalContainerProps,
  ModalPresentation,
  ModalProps,
};
