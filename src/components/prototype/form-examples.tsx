import { Button } from "@/components/ui/button"
import { FormBlock } from "@/components/ui/form-block"
import { FormSet } from "@/components/ui/form-set"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSection } from "@/components/ui/showcase-section"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"
import { Textfield } from "@/components/ui/text-field"

function CodeSyntax({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--rh-theme-text-neutral-secondary)]">{children}</span>
}

function CodeComponent({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--rh-palette-purple-700)]">{children}</span>
}

function CodeProp({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--rh-theme-text-info)]">{children}</span>
}

function CodeValue({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--rh-theme-text-success)]">{children}</span>
}

function FormBlockSnippet() {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <CodeSyntax>{"<"}</CodeSyntax><CodeComponent>FormBlock</CodeComponent>{" "}<CodeProp>direction</CodeProp><CodeSyntax>=</CodeSyntax><CodeValue>{'"row"'}</CodeValue>{" "}<CodeProp>label</CodeProp><CodeSyntax>=</CodeSyntax><CodeValue>{'"Электронная почта"'}</CodeValue><CodeSyntax>{">\n  <"}</CodeSyntax><CodeComponent>Textfield</CodeComponent>{" "}<CodeProp>type</CodeProp><CodeSyntax>=</CodeSyntax><CodeValue>{'"email"'}</CodeValue><CodeSyntax>{" />\n</"}</CodeSyntax><CodeComponent>FormBlock</CodeComponent><CodeSyntax>{">"}</CodeSyntax>
    </code>
  )
}

function FormSetSnippet() {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <CodeSyntax>{"<"}</CodeSyntax><CodeComponent>FormSet</CodeComponent>{" "}<CodeProp>direction</CodeProp><CodeSyntax>=</CodeSyntax><CodeValue>{'"row"'}</CodeValue><CodeSyntax>{">\n  <"}</CodeSyntax><CodeComponent>FormBlock</CodeComponent>{" "}<CodeProp>label</CodeProp><CodeSyntax>=</CodeSyntax><CodeValue>{'"Город"'}</CodeValue><CodeSyntax>{"><"}</CodeSyntax><CodeComponent>Textfield</CodeComponent><CodeSyntax>{" /></"}</CodeSyntax><CodeComponent>FormBlock</CodeComponent><CodeSyntax>{">\n  <"}</CodeSyntax><CodeComponent>FormBlock</CodeComponent>{" "}<CodeProp>label</CodeProp><CodeSyntax>=</CodeSyntax><CodeValue>{'"Индекс"'}</CodeValue><CodeSyntax>{"><"}</CodeSyntax><CodeComponent>Textfield</CodeComponent><CodeSyntax>{" /></"}</CodeSyntax><CodeComponent>FormBlock</CodeComponent><CodeSyntax>{">\n</"}</CodeSyntax><CodeComponent>FormSet</CodeComponent><CodeSyntax>{">"}</CodeSyntax>
    </code>
  )
}

export function FormExamples() {
  return (
    <div className="grid min-w-0 gap-10">
      <ShowcaseSection
        codeSnippet={<FormBlockSnippet />}
        description="FormBlock объединяет FormLabel и контрол. В column лейбл располагается сверху, а в row получает стандартный верхний отступ."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <div className="grid w-full max-w-[640px] gap-6">
                <FormBlock label="Имя">
                  <Textfield aria-label="Имя" placeholder="Введите имя" />
                </FormBlock>
                <FormBlock direction="row" label="Электронная почта">
                  <Textfield aria-label="Электронная почта" placeholder="name@example.com" type="email" />
                </FormBlock>
              </div>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Состав"
      />

      <ShowcaseSection
        codeSnippet={<FormSetSnippet />}
        description="FormSet располагает FormBlock в столбец или строку и задаёт одинаковое расстояние между ними."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <div className="grid w-full max-w-[640px] gap-6">
                <form onSubmit={(event) => event.preventDefault()}>
                  <FormSet>
                    <FormBlock label="Имя">
                      <Textfield aria-label="Имя" placeholder="Введите имя" />
                    </FormBlock>
                    <FormBlock label="Электронная почта">
                      <Textfield aria-label="Электронная почта" placeholder="name@example.com" type="email" />
                    </FormBlock>
                    <Button className="self-start" type="submit">
                      Сохранить
                    </Button>
                  </FormSet>
                </form>
                <FormSet direction="row">
                  <FormBlock className="flex-1" label="Город">
                    <Textfield aria-label="Город" placeholder="Екатеринбург" />
                  </FormBlock>
                  <FormBlock className="flex-1" label="Индекс">
                    <Textfield aria-label="Индекс" placeholder="620000" />
                  </FormBlock>
                </FormSet>
              </div>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="FormSet"
      />
    </div>
  )
}
