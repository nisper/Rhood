import { ShowcaseSection } from "@/components/ui/showcase-section"
import { Button } from "@/components/ui/button"
import { FormBlock } from "@/components/ui/form-block"
import { FormSet } from "@/components/ui/form-set"
import { Textfield } from "@/components/ui/text-field"

function DemoPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[136px] min-w-0 items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4">
      {children}
    </div>
  )
}

export function FormExamples() {
  return (
    <div className="grid min-w-0 gap-10">
      <ShowcaseSection
        description="FormBlock располагает лейбл и контрол вертикально или в одну строку."
        panels={[
          <DemoPanel key="column"><div className="w-full max-w-[360px]"><FormBlock direction="column" label="Имя"><Textfield appearance="neutral" aria-label="Имя" placeholder="Введите имя" /></FormBlock></div></DemoPanel>,
          <DemoPanel key="row"><div className="w-full max-w-[520px]"><FormBlock direction="row" label="Электронная почта"><Textfield appearance="neutral" aria-label="Электронная почта" placeholder="name@example.com" type="email" /></FormBlock></div></DemoPanel>,
        ]}
        settings={["FormBlock.direction: column · row"]}
        title="Направление"
      />

      <ShowcaseSection
        description="controlSize выравнивает лейбл по вертикали относительно контрола того же размера."
        panels={[
          <DemoPanel key="sizes">
            <div className="grid w-full max-w-[640px] gap-4">
              {(["sm", "md", "lg"] as const).map((size) => (
                <FormBlock controlSize={size} direction="row" key={size} label={size} labelWidth="56px">
                  <Textfield appearance="neutral" aria-label={`Поле размера ${size}`} placeholder="Значение" size={size} />
                </FormBlock>
              ))}
            </div>
          </DemoPanel>,
        ]}
        settings={["FormBlock.controlSize: sm · md · lg", "Textfield.size: sm · md · lg"]}
        title="Размер"
      />

      <ShowcaseSection
        description="FormSet группирует блоки формы, выравнивает лейблы и задаёт общее расстояние между полями."
        panels={[
          <DemoPanel key="column">
            <div className="w-full max-w-[520px]">
              <form onSubmit={(event) => event.preventDefault()}>
                <FormSet>
                  <FormBlock label="Имя"><Textfield appearance="neutral" aria-label="Имя" placeholder="Введите имя" /></FormBlock>
                  <FormBlock label="Электронная почта"><Textfield appearance="neutral" aria-label="Электронная почта" placeholder="name@example.com" type="email" /></FormBlock>
                  <Button className="self-start" type="submit">Сохранить</Button>
                </FormSet>
              </form>
            </div>
          </DemoPanel>,
        ]}
        settings={["FormSet.direction: column · row", "FormSet.gap: CSS gap value", "FormSet.labelWidth: CSS width value"]}
        title="FormSet"
      />
    </div>
  )
}
