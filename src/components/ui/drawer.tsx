import * as React from "react";

import { ModalFooter } from "@/components/ui/modal-footer";
import { ModalHeader } from "@/components/ui/modal-header";
import { cn } from "@/lib/utils";

const DrawerDismissContext = React.createContext<
  ((requestClose?: () => void) => void) | null
>(null);

type DrawerProps = Omit<React.ComponentProps<"div">, "title"> & {
  closeButton?: boolean;
  defaultOpen?: boolean;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  hasFooter?: boolean;
  maxWidth?: React.CSSProperties["maxWidth"];
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  presentation?: DrawerPresentation;
  title: React.ReactNode;
};

type DrawerContainerAlignment = "right" | "bottom";
type DrawerContainerDisplay = "viewport" | "embedded";
type DrawerPresentation = "drawer" | "bottom-sheet";

type DrawerContainerProps = React.ComponentProps<"div"> & {
  alignment?: DrawerContainerAlignment;
  display?: DrawerContainerDisplay;
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

function DrawerContainer({
  alignment = "right",
  children,
  className,
  display = "viewport",
  onClick,
  ...props
}: DrawerContainerProps) {
  const requestCloseRef = React.useRef<(() => void) | undefined>(undefined);
  const registerClose = React.useCallback((requestClose?: () => void) => {
    requestCloseRef.current = requestClose;
  }, []);

  return (
    <DrawerDismissContext.Provider value={registerClose}>
      <div
        className={cn(
          "grid min-h-[360px] w-full overflow-hidden bg-[var(--rh-theme-surface-backdrop)] p-2",
          display === "viewport" && "fixed inset-0 z-50",
          display === "embedded" && "relative",
          alignment === "right" &&
            "items-stretch justify-items-end max-md:items-end max-md:justify-items-center",
          alignment === "bottom" && "items-end justify-items-center",
          className,
        )}
        data-slot="drawer-container"
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
    </DrawerDismissContext.Provider>
  );
}

function Drawer({
  children,
  className,
  closeButton = true,
  defaultOpen = true,
  description,
  footer,
  hasFooter = Boolean(footer),
  maxWidth = "var(--rh-sizing-drawer-comment-width)",
  onOpenChange,
  onTransitionEnd,
  open,
  presentation = "drawer",
  style,
  title,
  ...props
}: DrawerProps) {
  const registerClose = React.useContext(DrawerDismissContext);
  const isMobileViewport = useIsMobileViewport();
  const resolvedPresentation = isMobileViewport ? "bottom-sheet" : presentation;
  const titleId = React.useId();
  const swipeStartY = React.useRef<number | null>(null);
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const resolvedOpen = isControlled ? open : uncontrolledOpen;
  const [isRendered, setIsRendered] = React.useState(resolvedOpen);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isOpening, setIsOpening] = React.useState(resolvedOpen);

  React.useEffect(() => {
    if (resolvedOpen) {
      if (!isRendered) {
        setIsRendered(true);
        setIsOpening(true);
        return;
      }

      setIsClosing(false);
      const frameId = window.requestAnimationFrame(() => setIsOpening(false));
      return () => window.cancelAnimationFrame(frameId);
    }

    if (isRendered) setIsClosing(true);
  }, [isRendered, resolvedOpen]);

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

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (isClosing && event.target === event.currentTarget) {
      setIsClosing(false);
      setIsRendered(false);
    }

    onTransitionEnd?.(event);
  };

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

  if (!isRendered) return null;

  return (
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className={cn(
        "grid w-full rounded-[var(--rh-sizing-border-radius-modal)] bg-[var(--rh-theme-fill-contrast-static)] shadow-lg transition-transform duration-200 ease-in-out",
        resolvedPresentation === "drawer" && "h-full grid-rows-[auto_1fr_auto]",
        resolvedPresentation === "bottom-sheet" && "p-4",
        resolvedPresentation === "drawer" &&
          (isOpening || isClosing) &&
          "translate-x-full",
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
        closeButton={resolvedPresentation === "drawer" && closeButton !== false}
        description={description}
        onClose={requestClose}
        title={title}
        titleId={titleId}
      />

      {resolvedPresentation === "bottom-sheet" && children}

      {resolvedPresentation === "drawer" && children && (
        <div className="min-h-0 overflow-y-auto px-6">{children}</div>
      )}

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

export { Drawer, DrawerContainer };
export type {
  DrawerContainerAlignment,
  DrawerContainerDisplay,
  DrawerContainerProps,
  DrawerPresentation,
  DrawerProps,
};
