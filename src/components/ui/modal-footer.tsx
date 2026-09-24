import * as React from "react";

import { cn } from "@/lib/utils";

type ModalFooterProps = React.ComponentProps<"footer">;

function ModalFooter({ className, ...props }: ModalFooterProps) {
  return (
    <footer
      className={cn("flex flex-wrap justify-end gap-2 px-6 py-4", className)}
      {...props}
    />
  );
}

export { ModalFooter };
export type { ModalFooterProps };
