import * as React from "react"

const menuSetters = new Map<string, React.Dispatch<React.SetStateAction<boolean>>>()
let activeMenuId: string | null = null

/** Coordinates popup menus so only one may be open in the interface at a time. */
function useMenuOpen(
  containerRef?: React.RefObject<HTMLElement | null>,
  initialOpen = false,
) {
  const menuId = React.useId()
  const [isOpen, setIsOpen] = React.useState(initialOpen)

  const setOpen = React.useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (next) => {
      setIsOpen((current) => {
        const nextOpen = typeof next === "function" ? next(current) : next

        if (nextOpen) {
          if (activeMenuId && activeMenuId !== menuId) {
            menuSetters.get(activeMenuId)?.(false)
          }
          activeMenuId = menuId
        } else if (activeMenuId === menuId) {
          activeMenuId = null
        }

        return nextOpen
      })
    },
    [menuId],
  )

  React.useEffect(() => {
    menuSetters.set(menuId, setOpen)

    if (isOpen) setOpen(true)

    return () => {
      menuSetters.delete(menuId)
      if (activeMenuId === menuId) activeMenuId = null
    }
  }, [isOpen, menuId, setOpen])

  React.useEffect(() => {
    if (!isOpen || !containerRef) return

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef?.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [containerRef, isOpen, setOpen])

  return [isOpen, setOpen] as const
}

export { useMenuOpen }
