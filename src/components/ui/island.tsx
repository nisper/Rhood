import * as React from "react";

import { cn } from "@/lib/utils";

type IslandProps = React.ComponentProps<"div"> & {
  /** Maximum width of the surface. */
  maxWidth?: React.CSSProperties["maxWidth"];
};

/** A white rounded surface placed on top of the page background. */
function Island({
  children,
  className,
  maxWidth,
  style,
  ...props
}: IslandProps) {
  return (
    <div
      {...props}
      className={cn(
        "mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)] flex flex-col gap-4 overflow-hidden rounded-[var(--rh-sizing-island-border-radius)] bg-[var(--rh-theme-surface-bg)] p-4",
        className,
      )}
      style={{ ...style, maxWidth: maxWidth ?? style?.maxWidth }}
    >
      {children}
    </div>
  );
}

export { Island };
export type { IslandProps };
