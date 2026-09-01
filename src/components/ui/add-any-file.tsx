import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AddAnyFileState = "default" | "active"

type AddAnyFileProps = React.ComponentProps<"div"> & {
  state?: AddAnyFileState
}

function AddAnyFile({ className, state = "default", ...props }: AddAnyFileProps) {
  const isActive = state === "active"

  return (
    <div
      className={cn(
        "flex w-[516px] flex-wrap items-center justify-center gap-4 overflow-clip rounded-[8px] border border-dashed px-4 py-6",
        isActive
          ? "border-[color:var(--parser-border-brand-light)] bg-[color:var(--parser-fill-brand-light-hover)]"
          : "border-[color:var(--parser-border-light)] bg-transparent",
        className,
      )}
      {...props}
    >
      <Button appearance="secondary" size="sm">
        Выберите файлы
      </Button>
      <p
        className="whitespace-nowrap text-center text-[14px] leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-secondary)]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Или перетащите их сюда
      </p>
    </div>
  )
}

export { AddAnyFile }
export type { AddAnyFileProps, AddAnyFileState }
