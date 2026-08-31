import * as React from "react"
import { ImagePlus, LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const loadingPreviewSrc =
  "https://www.figma.com/api/mcp/asset/3cfe966f-3df7-4fef-b0c1-6b56d5baee6e"

type AddPhotosState = "default" | "hover"

type AddPhotosProps = React.ComponentProps<"div"> & {
  isLoad?: boolean
  state?: AddPhotosState
}

function AddPhotos({ className, isLoad = false, state = "default", ...props }: AddPhotosProps) {
  const isHover = state === "hover"

  return (
    <div
      className={cn(
        "relative flex size-[150px] items-center justify-center overflow-clip rounded-[8px] p-1",
        isLoad
          ? "bg-transparent"
          : isHover
            ? "flex-col gap-2 border border-[color:var(--parser-border-brand-light)] bg-[color:var(--parser-fill-brand-light-hover)]"
            : "flex-col gap-2 border border-[color:rgba(21,78,249,0.5)] bg-white",
        className,
      )}
      {...props}
    >
      {!isLoad && (
        <>
          <ImagePlus className="size-6 shrink-0 text-[color:var(--text-brand,#0f3bd6)]" strokeWidth={2} />
          <p
            className="w-[min-content] min-w-full text-center text-[14px] leading-[1.43] tracking-[0.0238px] text-[color:var(--text-brand,#0f3bd6)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Добавить фотографии
          </p>
        </>
      )}

      {isLoad && (
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[8px]">
            <img
              alt=""
              className="absolute size-full rounded-[8px] object-cover max-w-none"
              src={loadingPreviewSrc}
            />
            <div className="absolute inset-0 rounded-[8px] bg-[rgba(0,0,0,0.5)]" />
          </div>

          <div className="relative size-[30px] shrink-0 overflow-clip">
            <LoaderCircle
              className="absolute inset-[8.33%] size-full animate-spin text-white"
              strokeWidth={2}
            />
          </div>
        </>
      )}
    </div>
  )
}

export { AddPhotos }
export type { AddPhotosProps, AddPhotosState }
