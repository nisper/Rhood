import * as React from "react";

import { ModalHeader } from "@/components/ui/modal-header";
import { ModalBody } from "@/components/ui/modal-body";
import { ModalFooter } from "@/components/ui/modal-footer";

import { cn } from "@/lib/utils";

const ModalDismissContext = React.createContext<
  ((requestClose?: () => void) => void) | null
>(null);

const mobileViewportQuery = "(max-width: 767px)";

type ModalProps = Omit<React.ComponentProps<"div">, "title"> & {
  bodyClassName?: string;
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
  titleAs?: "h1" | "h2";
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
      window.matchMedia(mobileViewportQuery).matches,
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(mobileViewportQuery);
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
  onClick,
  ...props
}: ModalContainerProps) {
  const isMobileViewport = useIsMobileViewport();
  const resolvedAlignment = isMobileViewport ? "bottom" : alignment;
  const requestCloseRef = React.useRef<(() => void) | undefined>(undefined);
  const registerClose = React.useCallback((requestClose?: () => void) => {
    requestCloseRef.current = requestClose;
  }, []);

  return (
    <ModalDismissContext.Provider value={registerClose}>
      <div
        className={cn(
          "grid min-h-[360px] w-full grid-rows-[minmax(0,1fr)] overflow-hidden bg-[var(--rh-theme-surface-backdrop)] p-2",
          display === "viewport" && "fixed inset-0 z-50",
          display === "embedded" && "relative",
          resolvedAlignment === "center" && "place-items-center",
          resolvedAlignment === "top" && "items-start justify-items-center",
          resolvedAlignment === "bottom" && "items-end justify-items-center",
          className,
        )}
        data-slot="modal-container"
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && event.target === event.currentTarget) {
            requestCloseRef.current?.();
          }
        }}
        {...props}
      >
        {children}
      </div>
    </ModalDismissContext.Provider>
  );
}

function Modal({
  bodyClassName,
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
  titleAs,
  ...props
}: ModalProps) {
  const registerClose = React.useContext(ModalDismissContext);
  const isMobileViewport = useIsMobileViewport();
  const resolvedPresentation = isMobileViewport ? "bottom-sheet" : presentation;
  const titleId = React.useId();
  const swipeStartY = React.useRef<number | null>(null);
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const resolvedOpen = isControlled ? open : uncontrolledOpen;
  const [isRendered, setIsRendered] = React.useState(resolvedOpen);
  const [isClosing, setIsClosing] = React.useState(false);
  const showCloseButton = closeButton !== false;

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

  const changeOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const requestClose = React.useCallback(() => changeOpen(false), [changeOpen]);

  React.useEffect(() => {
    registerClose?.(requestClose);
    return () => registerClose?.();
  }, [registerClose, requestClose]);

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

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
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
        "grid max-h-full w-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[var(--rh-sizing-border-radius-modal)] bg-[var(--rh-theme-fill-contrast-static)] shadow-lg",
        resolvedPresentation === "bottom-sheet" &&
          "transition-transform duration-200 ease-in-out",
        resolvedPresentation === "bottom-sheet" &&
          isClosing &&
          "translate-y-full",
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
      <ModalHeader
        closeButton={showCloseButton}
        description={description}
        onClose={requestClose}
        title={title}
        titleAs={titleAs}
        titleId={titleId}
      />

      {children && <ModalBody className={bodyClassName}>{children}</ModalBody>}

      {hasFooter && footer && (
        <ModalFooter
          className={cn(
            resolvedPresentation === "bottom-sheet" &&
              "flex-col-reverse [&>button]:w-full",
          )}
        >
          {footer}
        </ModalFooter>
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
