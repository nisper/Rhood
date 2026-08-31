import { Button, type ButtonAppearance, type ButtonSize } from "@/components/ui/button"

const appearances: ButtonAppearance[] = [
  "primary",
  "secondary",
  "ghost",
  "destructive",
  "contrast",
  "inherit",
]

const sizes: ButtonSize[] = ["md", "sm", "xsm"]

function ButtonRow({
  appearance,
  dark = false,
}: {
  appearance: ButtonAppearance
  dark?: boolean
}) {
  return (
    <div className={dark ? "rounded-lg bg-[var(--parser-fill-neutral-dark-ultra)] p-4" : ""}>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button appearance={appearance} key={`${appearance}-${size}`} size={size}>
            Label
          </Button>
        ))}
      </div>
    </div>
  )
}

export function ComponentDocs() {
  return (
    <main className="min-h-[calc(100svh-56px)] bg-white px-6 py-8 text-[var(--parser-text-neutral-primary)]">
      <div className="mx-auto grid max-w-[1180px] gap-8">
        <header className="grid gap-3 border-b border-[var(--parser-border-light)] pb-8">
          <p className="text-sm font-semibold uppercase leading-5 tracking-[0.15px] text-[var(--parser-text-neutral-secondary)]">
            Components
          </p>
          <div className="grid gap-2">
            <h1 className="text-4xl font-semibold leading-[46px] tracking-normal">
              Button
            </h1>
            <p className="max-w-[720px] text-base leading-6 tracking-[0.15px] text-[var(--parser-text-neutral-secondary)]">
              Один React-компонент для всех вариантов кнопки из Figma:
              primary, secondary, ghost, destructive, contrast и inherit.
            </p>
          </div>
        </header>

        <section className="grid gap-4">
          <h2 className="text-xl font-semibold leading-7 tracking-normal">Styles</h2>
          <div className="grid gap-5 rounded-lg border border-[var(--parser-border-light)] bg-white p-5">
            {appearances.map((appearance) => (
              <div className="grid gap-2" key={appearance}>
                <h3 className="text-sm font-semibold uppercase leading-5 tracking-[0.15px] text-[var(--parser-text-neutral-secondary)]">
                  {appearance}
                </h3>
                <ButtonRow appearance={appearance} dark={appearance === "contrast"} />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4">
          <h2 className="text-xl font-semibold leading-7 tracking-normal">States</h2>
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[var(--parser-border-light)] bg-white p-5">
            <Button>Label</Button>
            <Button state="hover">Label</Button>
            <Button disabled>Label</Button>
            <Button counter>Label</Button>
            <Button loading>Label</Button>
            <Button iconOnly />
          </div>
        </section>

        <section className="grid gap-4">
          <h2 className="text-xl font-semibold leading-7 tracking-normal">Usage</h2>
          <pre className="overflow-x-auto rounded-lg border border-[var(--parser-border-light)] bg-[var(--parser-fill-neutral)] p-4 text-xs leading-5">
            <code>{`import { Button } from "@/components/ui/button"

<Button appearance="primary" size="md">
  Label
</Button>

<Button appearance="destructive" counter state="hover">
  Label
</Button>`}</code>
          </pre>
        </section>
      </div>
    </main>
  )
}
