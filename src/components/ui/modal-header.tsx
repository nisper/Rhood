import * as React from "react";
import { X } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

type ModalHeaderProps = Omit<React.ComponentProps<"header">, "title"> & {
  closeButton?: boolean;
  description?: React.ReactNode;
  onClose?: () => void;
  title: React.ReactNode;
  titleAs?: "h1" | "h2";
  titleId?: string;
};

function ModalHeader({
  className,
  closeButton = true,
  description,
  onClose,
  title,
  titleAs: Title = "h2",
  titleId,
  ...props
}: ModalHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-start justify-between gap-4 p-6 pb-2",
        className,
      )}
      {...props}
    >
      <div className="grid min-w-0 flex-1 gap-2">
        <Title
          className="rh-typography-h4 text-[var(--rh-theme-text-neutral-primary)]"
          id={titleId}
        >
          {title}
        </Title>
        {description && (
          <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-primary)]">
            {description}
          </p>
        )}
      </div>

      {closeButton && (
        <IconButton
          appearance="ghost"
          aria-label="Закрыть modal"
          className="-m-2"
          icon={<X aria-hidden="true" />}
          onClick={onClose}
          size="md"
        />
      )}
    </header>
  );
}

export { ModalHeader };
export type { ModalHeaderProps };
