import * as React from 'react'
import { CheckCircle2, LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

type ContrastButtonSize = 'lg' | 'md' | 'sm' | 'xsm'
type ContrastButtonVariant = 'contained' | 'outlined' | 'text'

type ContrastButtonProps = React.ComponentProps<'button'> & {
  counter?: boolean
  counterValue?: React.ReactNode
  endIcon?: React.ReactNode | boolean
  iconOnly?: boolean
  loading?: boolean
  size?: ContrastButtonSize
  startIcon?: React.ReactNode | boolean
  variant?: ContrastButtonVariant
}

const sizeClasses: Record<ContrastButtonSize, string> = {
  lg: 'min-h-14 gap-2 px-4 py-4 text-base leading-6 tracking-normal [&_svg]:size-6',
  md: 'min-h-10 gap-2 px-3 py-2 text-base leading-6 tracking-[0.15px] [&_svg]:size-6',
  sm: 'min-h-[30px] gap-2 px-3 py-[5px] text-sm leading-5 tracking-[0.15px] [&_svg]:size-5',
  xsm: 'min-h-6 gap-1 px-2 py-1 text-xs leading-4 tracking-[0.15px] [&_svg]:size-4',
}

const textSizeClasses: Record<ContrastButtonSize, string> = {
  lg: 'px-2 py-4',
  md: 'px-2 py-2',
  sm: 'px-2 py-[5px]',
  xsm: 'px-2 py-1',
}

const iconOnlyClasses: Record<ContrastButtonSize, string> = {
  lg: 'size-14 p-0',
  md: 'h-10 w-11 p-0',
  sm: 'size-[30px] p-0',
  xsm: 'size-6 p-0',
}

const iconSlotClasses: Record<ContrastButtonSize, string> = {
  lg: 'w-6',
  md: 'w-6',
  sm: 'w-4',
  xsm: 'w-4',
}

const counterClasses: Record<ContrastButtonSize, string> = {
  lg: 'min-w-6 px-1.5 text-base leading-6 tracking-normal',
  md: 'min-w-6 px-1.5 text-base leading-6 tracking-[0.15px]',
  sm: 'min-w-5 px-1 text-sm leading-5 tracking-[0.15px]',
  xsm: 'min-w-5 px-1 text-xs leading-4 tracking-[0.15px]',
}

const variantClasses: Record<ContrastButtonVariant, string> = {
  contained:
    'border border-transparent bg-[var(--parser-fill-contrast)] text-[var(--parser-text-neutral-primary)] hover:bg-[var(--parser-fill-contrast-hover)]',
  outlined:
    'border border-[var(--parser-border-contrast)] bg-transparent text-[var(--parser-text-primary-contrast)] hover:bg-[var(--parser-fill-contrast-light-hover)]',
  text: 'border border-transparent bg-transparent text-[var(--parser-text-primary-contrast)] hover:bg-[var(--parser-fill-contrast-light-hover)]',
}

const disabledClasses: Record<ContrastButtonVariant, string> = {
  contained:
    'border-transparent bg-[var(--parser-fill-contast-disabled)] text-[var(--parser-text-neutral-contrast-disabled)]',
  outlined:
    'border-[var(--parser-border-contrast-disabled)] bg-transparent text-[var(--parser-text-neutral-contrast-disabled)]',
  text: 'border-transparent bg-transparent text-[var(--parser-text-neutral-contrast-disabled)]',
}

function renderIcon(icon: React.ReactNode | boolean | undefined) {
  if (icon === false) {
    return null
  }

  if (icon === true || icon === undefined) {
    return <CheckCircle2 aria-hidden="true" strokeWidth={2.25} />
  }

  return icon
}

/**
 * Parser contrast button matching the Figma `button-contrast` component set.
 */
function ContrastButton({
  children = 'Label',
  className,
  counter = false,
  counterValue = 1,
  disabled = false,
  endIcon = true,
  iconOnly = false,
  loading = false,
  size = 'lg',
  startIcon = true,
  type = 'button',
  variant = 'contained',
  ...props
}: ContrastButtonProps) {
  const iconColor =
    variant === 'contained' && !disabled
      ? 'text-[var(--parser-text-neutral-primary)]'
      : 'text-current'
  const counterTone =
    variant === 'contained' && !disabled
      ? 'bg-[var(--parser-fill-neutral-dark)] text-[var(--parser-text-primary-contrast)]'
      : 'bg-[var(--parser-fill-contrast)] text-[var(--parser-text-neutral-primary)]'
  const resolvedStartIcon = loading ? (
    <LoaderCircle
      aria-hidden="true"
      className="animate-spin"
      strokeWidth={2.25}
    />
  ) : (
    renderIcon(startIcon)
  )
  const resolvedEndIcon = loading ? null : renderIcon(endIcon)

  return (
    <button
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)] disabled:pointer-events-none disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        variant === 'text' && textSizeClasses[size],
        disabled && disabledClasses[variant],
        iconOnly && iconOnlyClasses[size],
        className,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {resolvedStartIcon && (
        <span
          className={cn(
            'flex shrink-0 items-center justify-center',
            iconSlotClasses[size],
            iconColor,
          )}
        >
          {resolvedStartIcon}
        </span>
      )}
      {!iconOnly && counter && (
        <span
          className={cn(
            'flex h-6 shrink-0 items-center justify-center rounded-full font-semibold',
            counterClasses[size],
            counterTone,
            disabled && 'bg-transparent text-current',
          )}
        >
          {counterValue}
        </span>
      )}
      {!iconOnly && <span className="whitespace-nowrap">{children}</span>}
      {!iconOnly && resolvedEndIcon && (
        <span
          className={cn(
            'flex shrink-0 items-center justify-center',
            iconSlotClasses[size],
            iconColor,
          )}
        >
          {resolvedEndIcon}
        </span>
      )}
    </button>
  )
}

export { ContrastButton }
export type { ContrastButtonProps, ContrastButtonSize, ContrastButtonVariant }
