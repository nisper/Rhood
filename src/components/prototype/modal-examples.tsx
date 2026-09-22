import * as React from "react";

import { Button } from "@/components/ui/button";
import { Modal, ModalContainer } from "@/components/ui/modal";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

type SaveChangesModalProps = Pick<
  React.ComponentProps<typeof Modal>,
  "closeButton" | "onOpenChange" | "open" | "presentation"
>;

type FooterVariant = "one-default" | "two-default" | "default-primary";

const footerVariants: FooterVariant[] = [
  "one-default",
  "two-default",
  "default-primary",
];

function ModalFooter({ variant }: { variant: FooterVariant }) {
  if (variant === "one-default") {
    return (
      <Button appearance="default" endIcon={false} startIcon={false}>
        Закрыть
      </Button>
    );
  }

  if (variant === "two-default") {
    return (
      <>
        <Button appearance="default" endIcon={false} startIcon={false}>
          Отмена
        </Button>
        <Button appearance="default" endIcon={false} startIcon={false}>
          Продолжить
        </Button>
      </>
    );
  }

  return (
    <>
      <Button appearance="default" endIcon={false} startIcon={false}>
        Отмена
      </Button>
      <Button endIcon={false} startIcon={false}>
        Продолжить
      </Button>
    </>
  );
}

function FooterModalPreviews({
  presentation,
}: {
  presentation: "dialog" | "bottom-sheet";
}) {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-1">
      {footerVariants.map((variant) => (
        <ModalContainer
          alignment={presentation === "bottom-sheet" ? "bottom" : "center"}
          className="min-h-[300px]"
          display="embedded"
          key={variant}
        >
          <Modal
            closeButton={presentation === "dialog"}
            description="Краткое пояснение действия."
            footer={<ModalFooter variant={variant} />}
            maxWidth="none"
            presentation={presentation}
            title="Заголовок modal"
          />
        </ModalContainer>
      ))}
    </div>
  );
}

function SaveChangesModal({
  closeButton,
  onOpenChange,
  open,
  presentation,
}: SaveChangesModalProps = {}) {
  return (
    <Modal
      closeButton={closeButton}
      description="Изменения будут сохранены и станут доступны всем участникам."
      footer={
        <>
          <Button
            appearance="default"
            endIcon={false}
            onClick={() => onOpenChange?.(false)}
            startIcon={false}
          >
            Отмена
          </Button>
          <Button endIcon={false} startIcon={false}>
            Сохранить
          </Button>
        </>
      }
      onOpenChange={onOpenChange}
      open={open}
      presentation={presentation}
      title="Сохранить изменения?"
    />
  );
}

function MobileModalPreview() {
  const [open, setOpen] = React.useState(true);

  return (
    <ModalContainer
      alignment="bottom"
      className="mx-auto h-[844px] max-w-[390px]"
      display="embedded"
    >
      {open ? (
        <SaveChangesModal
          closeButton={false}
          onOpenChange={setOpen}
          open={open}
          presentation="bottom-sheet"
        />
      ) : (
        <Button
          appearance="contrast"
          endIcon={false}
          onClick={() => setOpen(true)}
          startIcon={false}
        >
          Открыть modal
        </Button>
      )}
    </ModalContainer>
  );
}

export function ModalExamples() {
  return (
    <section className="grid gap-3">
      <ShowcaseSection
        description="До 767px включительно Modal отображается как bottom sheet; от 768px — как диалог по центру экрана."
        showcase={
          <ShowcaseSurface
            className="bg-[var(--rh-palette-neutral-600)] p-0"
            direction="vertical"
          >
            <ShowcasePanel className="p-0" tone="transparent">
              <ModalContainer className="h-full" display="embedded">
                <SaveChangesModal />
              </ModalContainer>
            </ShowcasePanel>
            <ShowcasePanel className="p-0" tone="transparent">
              <MobileModalPreview />
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Адаптив"
      />

      <ShowcaseSection
        description="В footer можно разместить одну или две кнопки: default или сочетание default и primary."
        showcase={
          <ShowcaseSurface
            className="bg-[var(--rh-palette-neutral-600)] p-0"
            direction="vertical"
          >
            <ShowcasePanel className="p-0" tone="transparent">
              <FooterModalPreviews presentation="dialog" />
            </ShowcasePanel>
            <ShowcasePanel className="p-0" tone="transparent">
              <FooterModalPreviews presentation="bottom-sheet" />
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Footer"
      />

      <section className="grid gap-1">
        <h2 className="rh-typography-headline-4">Размер</h2>
        <p className="rh-typography-body-1">
          Modal занимает 100% доступной ширины, но не превышает maxWidth.
        </p>
        <p className="rh-typography-body-1">
          По умолчанию maxWidth равен 480px; для более широкого сценария задай
          значение вручную.
        </p>
      </section>
    </section>
  );
}
