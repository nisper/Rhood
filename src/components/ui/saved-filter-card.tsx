import * as React from "react"
import { CircleHelp, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { IconButton } from "@/components/ui/icon-button"
import { Textfield } from "@/components/ui/text-field"
import { Tooltip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type SavedFilterSubscription = "available" | "subscribed" | "unavailable"

type SavedFilterCardProps = Omit<React.ComponentProps<"article">, "onChange"> & {
  details: string
  name?: string
  onDelete?: () => void
  onEdit?: () => void
  onApply?: () => void
  onNameChange?: (name: string) => void
  onSave?: (name: string) => void
  onSubscriptionChange?: (subscribed: boolean) => void
  subscription?: SavedFilterSubscription
  variant?: "saved" | "new"
}

function SavedFilterCard({
  className,
  details,
  name: controlledName,
  onDelete,
  onEdit,
  onApply,
  onNameChange,
  onSave,
  onSubscriptionChange,
  subscription = "available",
  variant = "saved",
  ...props
}: SavedFilterCardProps) {
  const [draftName, setDraftName] = React.useState(controlledName ?? "")
  const name = controlledName ?? draftName

  function changeName(value: string) {
    if (controlledName === undefined) setDraftName(value)
    onNameChange?.(value)
  }

  function save() {
    const value = name.trim()
    if (value) onSave?.(value)
  }

  return (
    <article className={cn(
      "group/card relative grid min-w-0 gap-2 rounded-[var(--rh-sizing-border-radius-xlg)] border border-[var(--rh-theme-border-light)] px-4 py-3",
      variant === "saved" && "cursor-pointer",
      className,
    )} {...props}>
      {variant === "saved" && onApply && (
        <button
          aria-label={`Применить фильтр «${name}»`}
          className="absolute inset-0 z-0 cursor-pointer rounded-[inherit] border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)]"
          onClick={onApply}
          type="button"
        />
      )}
      {variant === "new" ? (
        <div className="grid min-w-0 gap-1">
          <div className="flex min-w-0 items-center gap-2">
            <Textfield appearance="neutral" aria-label="Название поиска" autoFocus className="min-w-0 flex-1" onChange={(event) => changeName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && save()} placeholder="Название поиска" size="lg" value={name} />
            <Button appearance="primary" endIcon={false} onClick={save} size="lg" startIcon={false}>Сохранить</Button>
          </div>
          <p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">{details}</p>
        </div>
      ) : (
        <>
          <div className="relative z-10 pointer-events-none grid min-w-0 gap-1">
            <p className="rh-typography-b1-med break-words text-[var(--rh-theme-text-neutral-primary)]">{name}</p>
            <p className="rh-typography-b1 break-words text-[var(--rh-theme-text-neutral-secondary)]">{details}</p>
          </div>
          <div className="relative z-10 pointer-events-none flex min-w-0 items-center gap-4">
            <div className="pointer-events-auto flex min-w-0 flex-1 items-center gap-2">
              <Checkbox
                aria-label={`${subscription === "subscribed" ? "Отписаться от" : "Подписаться на"} «${name}»`}
                checked={subscription === "subscribed"}
                disabled={subscription === "unavailable"}
                onChange={(event) => onSubscriptionChange?.(event.target.checked)}
                size="md"
              >
                Подписаться
              </Checkbox>
              {subscription === "unavailable" && (
                <span className="group relative inline-flex items-center">
                  <button aria-label="Почему нельзя подписаться" className="cursor-help text-[var(--rh-theme-text-neutral-secondary)]" type="button">
                    <CircleHelp aria-hidden="true" size={20} />
                  </button>
                  <Tooltip className="invisible absolute bottom-full left-0 z-20 mb-2 w-[350px] max-w-[calc(100vw-48px)] opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100" role="tooltip">
                    Подписаться на этот фильтр нельзя — он использует поля «Адрес», «Содержит слова» или «Исключить слова»
                  </Tooltip>
                </span>
              )}
            </div>
            <div className="pointer-events-none flex shrink-0 items-center gap-2 opacity-0 transition-opacity duration-150 group-hover/card:pointer-events-auto group-hover/card:opacity-100 group-focus-within/card:pointer-events-auto group-focus-within/card:opacity-100">
              <IconButton aria-label={`Переименовать «${name}»`} appearance="secondary" icon={<Pencil aria-hidden="true" />} onClick={onEdit} size="md" />
              <IconButton aria-label={`Удалить «${name}»`} appearance="secondary" icon={<Trash2 aria-hidden="true" />} onClick={onDelete} size="md" />
            </div>
          </div>
        </>
      )}
    </article>
  )
}

export { SavedFilterCard }
export type { SavedFilterCardProps, SavedFilterSubscription }
