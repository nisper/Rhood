import * as React from "react"

type SnackbarNotice = {
  id: number
  message: string
  open: boolean
}

function useSnackbarQueue(limit = 3) {
  const [notices, setNotices] = React.useState<SnackbarNotice[]>([])
  const noticesRef = React.useRef<SnackbarNotice[]>([])
  const nextIdRef = React.useRef(0)
  const hideTimersRef = React.useRef(new Map<number, number>())
  const removeTimersRef = React.useRef(new Map<number, number>())

  const updateNotices = React.useCallback((nextNotices: SnackbarNotice[]) => {
    noticesRef.current = nextNotices
    setNotices(nextNotices)
  }, [])

  const dismiss = React.useCallback((id: number) => {
    const notice = noticesRef.current.find((item) => item.id === id)
    if (!notice?.open) return

    const hideTimer = hideTimersRef.current.get(id)
    if (hideTimer !== undefined) window.clearTimeout(hideTimer)
    hideTimersRef.current.delete(id)

    const removeTimer = removeTimersRef.current.get(id)
    if (removeTimer !== undefined) window.clearTimeout(removeTimer)

    updateNotices(noticesRef.current.map((item) => item.id === id ? { ...item, open: false } : item))
    const nextRemoveTimer = window.setTimeout(() => {
      removeTimersRef.current.delete(id)
      updateNotices(noticesRef.current.filter((item) => item.id !== id))
    }, 160)
    removeTimersRef.current.set(id, nextRemoveTimer)
  }, [updateNotices])

  const show = React.useCallback((message: string, duration = 3000) => {
    const id = ++nextIdRef.current
    const incomingNotice = { id, message, open: true }
    const currentNotices = noticesRef.current
    const overflowCount = Math.max(0, currentNotices.length + 1 - limit)
    const expiredNotices = currentNotices.slice(0, overflowCount)

    for (const expiredNotice of expiredNotices) {
      const hideTimer = hideTimersRef.current.get(expiredNotice.id)
      if (hideTimer !== undefined) window.clearTimeout(hideTimer)
      hideTimersRef.current.delete(expiredNotice.id)

      const removeTimer = removeTimersRef.current.get(expiredNotice.id)
      if (removeTimer !== undefined) window.clearTimeout(removeTimer)
      removeTimersRef.current.delete(expiredNotice.id)
    }

    updateNotices([...currentNotices.slice(overflowCount), incomingNotice])
    hideTimersRef.current.set(id, window.setTimeout(() => dismiss(id), duration))
  }, [dismiss, limit, updateNotices])

  React.useEffect(() => () => {
    for (const timer of hideTimersRef.current.values()) window.clearTimeout(timer)
    for (const timer of removeTimersRef.current.values()) window.clearTimeout(timer)
  }, [])

  return { notices, show, dismiss }
}

export { useSnackbarQueue }
export type { SnackbarNotice }
