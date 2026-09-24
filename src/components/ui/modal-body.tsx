import * as React from "react";

import { cn } from "@/lib/utils";

type ModalBodyProps = React.ComponentProps<"div">;

function ModalBody({ className, ...props }: ModalBodyProps) {
  return <div className={cn("min-w-0 px-6 py-5", className)} {...props} />;
}

export { ModalBody };
export type { ModalBodyProps };
