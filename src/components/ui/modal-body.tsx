import * as React from "react";

import { cn } from "@/lib/utils";

type ModalBodyProps = React.ComponentProps<"div">;

function ModalBody({ className, ...props }: ModalBodyProps) {
  return (
    <div
      className={cn(
        "min-h-0 min-w-0 overflow-y-auto px-4 py-2 md:px-6",
        className,
      )}
      {...props}
    />
  );
}

export { ModalBody };
export type { ModalBodyProps };
