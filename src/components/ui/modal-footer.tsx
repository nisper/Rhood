import * as React from "react";

import { cn } from "@/lib/utils";

type ModalFooterProps = React.ComponentProps<"footer">;

function ModalFooter({ className, ...props }: ModalFooterProps) {
  return (
    <footer
      className={cn(
        "sticky bottom-0 z-10 flex flex-wrap justify-end gap-2 bg-[color-mix(in_srgb,var(--rh-theme-fill-contrast-static)_75%,transparent)] px-4 py-4 backdrop-blur-[12px] md:px-6",
        className,
      )}
      {...props}
    />
  );
}

export { ModalFooter };
export type { ModalFooterProps };
