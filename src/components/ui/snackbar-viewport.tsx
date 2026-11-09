import * as React from "react"

import { Snackbar } from "@/components/ui/snackbar"
import type { SnackbarNotice } from "@/hooks/use-snackbar-queue"

type SnackbarViewportProps = {
  button?: boolean
  close?: boolean
  icon?: boolean | React.ReactNode
  notices: SnackbarNotice[]
  onAction?: (id: number) => void
  onClose?: (id: number) => void
}

function SnackbarViewport({
  button = false,
  close = false,
  icon = false,
  notices,
  onAction,
  onClose,
}: SnackbarViewportProps) {
  const itemRefs = React.useRef(new Map<number, HTMLDivElement>())
  const previousPositions = React.useRef(new Map<number, number>())
  const animationFrames = React.useRef<number[]>([])

  React.useLayoutEffect(() => {
    for (const frameId of animationFrames.current) window.cancelAnimationFrame(frameId)
    animationFrames.current = []

    const positions = new Map<number, number>()
    const currentElements = notices.flatMap((notice) => {
      const element = itemRefs.current.get(notice.id)
      if (!element) return []

      element.style.transition = "none"
      element.style.transform = "none"
      const top = element.getBoundingClientRect().top
      positions.set(notice.id, top)
      return [{ id: notice.id, element, top }]
    })

    for (const { id, element, top } of currentElements) {
      const previousTop = previousPositions.current.get(id)
      if (previousTop === undefined || previousTop === top) {
        element.style.transition = ""
        element.style.transform = ""
        continue
      }

      element.style.transform = `translateY(${previousTop - top}px)`
      void element.offsetHeight
      const frameId = window.requestAnimationFrame(() => {
        element.style.transition = ""
        element.style.transform = ""
      })
      animationFrames.current.push(frameId)
    }

    previousPositions.current = positions
  }, [notices])

  React.useEffect(() => () => {
    for (const frameId of animationFrames.current) window.cancelAnimationFrame(frameId)
  }, [])

  return (
    <div aria-live="polite" className="pointer-events-none fixed right-6 top-6 z-[70] flex flex-col items-end gap-2">
      {notices.slice().reverse().map((notice) => (
        <div
          className="transition-transform duration-150 ease-out motion-reduce:transition-none"
          key={notice.id}
          ref={(element) => {
            if (element) itemRefs.current.set(notice.id, element)
            else itemRefs.current.delete(notice.id)
          }}
        >
          <Snackbar
            button={button}
            className="pointer-events-auto"
            close={close}
            icon={icon}
            message={notice.message}
            onAction={() => onAction?.(notice.id)}
            onClose={() => onClose?.(notice.id)}
            open={notice.open}
          />
        </div>
      ))}
    </div>
  )
}

export { SnackbarViewport }
export type { SnackbarViewportProps }
